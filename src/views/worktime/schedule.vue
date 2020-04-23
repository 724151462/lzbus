<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad"
               @tree-load="treeLoad">

    <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.schedule_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>

      <template slot="menu" slot-scope="scope">
        &nbsp;&nbsp;
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="scope.row.parentId == 0 && permissionList.editBtn == true"
                   @click.stop="handleEdit(scope.row,scope.index)">编辑
        </el-button>

        &nbsp;&nbsp;
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="scope.row.parentId == 0"
                   @click.stop="handleSchedule(scope.row,scope.index)">排班
        </el-button>
      </template>
    </avue-crud>

    <el-dialog title="排班" append-to-body :visible.sync="box">
      <avue-crud :option="scheduleOption"
                 :data="scheduleDate"
                 @row-save="rowScheduleSave"
                 @row-del="rowDel"
                 @refresh-change="refreshSchedule"
                 ref="crud2"/>
    </el-dialog>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,getLazyList} from "@/api/worktime/schedule";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        parentId: 0,
        selectionList: [],
        option: {
          lazy: true,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          tree: true,
          border: true,
          index: false,
          selection: false,
          viewBtn: false,
          editBtn: false,
          menuWidth: 300,
          dialogClickModal: false,
          column: [
            {
              label: '地区',
              prop: 'areaId',
              type: 'select',
              search: true,
              hide: true,
              cascaderItem: ['gridId'],
              props: {
                label: 'name',
                value: 'id'
              },
              dicFormatter: (res) => {
                return res.data;//返回字典的层级结构
              },
              dicUrl: `/api/blade-region/region/areasofsetting`,
              rules: [{
                required: true,
                message: '请选择地区',
                trigger: 'blur'
              }]
            },
            {
              label: "巡查片区",
              prop: "gridId",
              type: 'select',
              dicUrl: `/api/blade-stressperson/station/getGridSelect?areaId={{key}}`,
              dicFlag: false,
              search: true,
              hide:true,
              props: {
                label: 'gridName',
                value: 'gridId'
              },
              rules: [{
                required: true,
                message: "请选择巡查片区",
                trigger: "blur"
              }]
            },
            {
              label: "巡查片区",
              prop: "gridName",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
            {
              label: "排班日期",
              prop: "workDate",
              type: "date",
              format: 'yyyy-MM-dd',
              width: 95,
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: "请输入排班日期",
                trigger: "blur"
              }]
            },
            {
              label: "人员类型",
              prop: "userType",
              type: 'select',
              // cascaderItem: ['policeId'],
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
              dicFormatter: (res) => {
                return res.data;//返回字典的层级结构
              },
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=police_type",
              rules: [{
                required: true,
                message: "请选择人员类型",
                trigger: "blur"
              }]
            },
            {
              label: "人员",
              prop: "userId",
              addDisplay: false,
              editDisplay:false,
              viewDisplay:false,
              hide:true,
              rules: [{
                required: true,
                message: "请输入人员ID",
                trigger: "blur"
              }]
            },
            {
              label: "人员",
              prop: "userName",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
            {
              label: "班次",
              prop: "scheduleTypeId",
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
              addDisplay: false,
              editDisplay:false,
              viewDisplay:false,
              hide:true,
              rules: [{
                required: true,
                message: "请输入班次",
                trigger: "blur"
              }]
            },
            {
              label: "班次",
              prop: "scheduleTypeTitle",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
          ]
        },
        data: [],

        //*******************排班********************
        box: false,
        scheduleDate: [],
        scheduleOption: {
          delBtn: true,
          editBtn: false,
          addBtn: true,
          selection: false,
          columnBtn: false,
          refreshBtn: false,
          align: "center",
          column: [
            {
              label: "人员类型",
              prop: "userType",
              type: 'select',
              cascaderItem: ['policeId'],
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              dicFormatter: (res) => {
                return res.data;//返回字典的层级结构
              },
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=police_type",
              rules: [{
                required: true,
                message: "请选择人员类型",
                trigger: "blur"
              }]
            },
            {
              label: "人员",
              prop: "userId",
              type: 'select',
              dicUrl: "/api/blade-schedule/schedule/getPersonSelect?type={{key}}",
              hide:true,
              props: {
                label: "userName",
                value: "userId"
              },
              rules: [{
                required: true,
                message: "请选择人员",
                trigger: "blur"
              }]
            },
            {
              label: "人员",
              prop: "userName",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
            {
              label: "班次",
              prop: "scheduleTypeId",
              type: 'select',
              dicUrl: "/api/blade-schedule/schedule/scheduleTypeSelect",
              hide:true,
              props: {
                label: "title",
                value: "id"
              },
              rules: [{
                required: true,
                message: "请选择班次",
                trigger: "blur"
              }]
            },
            {
              label: "班次",
              prop: "scheduleTypeTitle",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
          ]
        },
        //*******************排班********************

      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.schedule_add, false),
          viewBtn: this.vaildData(this.permission.schedule_view, false),
          delBtn: this.vaildData(this.permission.schedule_delete, false),
          editBtn: this.vaildData(this.permission.schedule_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      }
    },
    methods: {
      //*********************排班******************************************
      handleSchedule(row) {
        this.box = true;
        this.form = row,
        getLazyList(this.form.id).then(res => {
          this.scheduleDate = res.data.data;
        });
      },
      rowScheduleSave(row, loading, done) {
        row.parentId = this.form.id;
        add(row).then(() => {
          loading();
          this.refreshSchedule();
          this.refreshChange();
          this.$message({
            type: "success",
            message: "新增排班人员成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },

      refreshSchedule(){
        getLazyList(this.form.id).then(res => {
          this.scheduleDate = res.data.data;
        });
      },
      //*********************排班******************************************
      rowSave(row, loading, done) {
        row.parentId = 0;
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      handleEdit (row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      rowUpdate(row, index, loading, done) {
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.refreshSchedule();
            this.refreshChange();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      },
      treeLoad(tree, treeNode, resolve) {
        const parentId = tree.id;
        getLazyList(parentId).then(res => {
          resolve(res.data.data);
        });
      }
    }
  };
</script>

<style>
</style>
