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
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.control_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>

      <template slot="conPoliceForm" slot-scope="scope">
        <avue-crud :option="conPoliceOption"
                   :data="conPoliceDate"
                   @row-save="rowConPoliceSave"
                   @row-del="rowConPoliceDel"
                   @refresh-change="refreshConPolice"
                   ref="crud2">
        </avue-crud>
      </template>

      <template slot="menu" slot-scope="scope">
        &nbsp;&nbsp;
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="scope.row.state == 0 && permissionList.reviewBtn == true"
                   @click="review(scope.row,scope.index)">审核
        </el-button>
      </template>

    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, getPrimarykey,reviewControl} from "@/api/stressperson/control";
  import {getConPoliceList, conPoliceSave, removeConPolice} from "@/api/stressperson/controlpolice";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {

        conPoliceDate: [],
        conPoliceOption: {
          title: '布控人员',
          delBtn: true,
          editBtn: false,
          addBtn: true,
          selection: false,
          columnBtn: false,
          refreshBtn: true,
          align: "center",
          column: [
            {
              label: "布控人员类型",
              prop: "policeType",
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
                message: "请选择类型",
                trigger: "blur"
              }]
            },
            {
              label: "布控人员",
              prop: "policeId",
              type: 'select',
              hide:true,
              dicUrl: "/api/blade-stressperson/controlpolice/getControlPersonSelect?type={{key}}",
              props: {
                label: "controlPoliceName",
                value: "policeId"
              },
              rules: [{
                required: true,
                message: "请选择布控人员",
                trigger: "blur"
              }]
            },

            {
              label: "布控人员",
              prop: "controlPoliceName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },

          ]
        },


        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {

          height: 'auto',
          calcHeight: 50,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: "编码",
              prop: "code",
              rules: [{
                required: true,
                message: "请输入编码",
                trigger: "blur"
              }]
            },
            {
              label: "布控名称",
              search: true,
              prop: "controlName",
              rules: [{
                required: true,
                message: "请输入布控名称",
                trigger: "blur"
              }]
            },
            {
              label: "布控类型",
              prop: "controlType",
              type: "select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=control_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入布控类型",
                trigger: "blur"
              }]
            },
            {
              label: '地区',
              prop: 'areaId',
              type: 'select',
              cascaderItem: ['stationId'],
              search:true,
              props: {
                label: 'name',
                value: 'id'
              },
              dicFormatter:(res)=>{
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
              label: "站点",
              prop: "stationId",
              type: 'select',
              hide:true,
              dicUrl: `/api/blade-stressperson/station/getAreaStationSelect?areaId={{key}}`,
              props: {
                label: 'stationName',
                value: 'id'
              },
              rules: [{
                required: true,
                message: "请选择站点",
                trigger: "blur"
              }]
            },
            {
              label: "站点",
              prop: "stationName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },

            {
              label: "线路",
              prop: "lineId",
              type: 'select',
              dicUrl: `/api/blade-line/line/getLineofsetting`,
              props: {
                label: 'lineName',
                value: 'id'
              },
              rules: [{
                required: true,
                message: "请输入线路ID",
                trigger: "blur"
              }]
            },

            {
              label: "线路",
              prop: "lineName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },

            {
              label: "状态",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              prop: "state",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=review_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              }
            },
            {
              label: "审核人",
              prop: "auditName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "审核时间",
              prop: "auditTime",
              width:'150',
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              rules: [{
                required: true,
                message: "请输入审核时间",
                trigger: "blur"
              }]
            },
            {
              labelWidth: 0,
              label: '',
              prop: 'conPolice',
              span: 24,
              hide: true,
              addDisplay: true,
              formslot: true,
            }
          ]
        },
        data: []
      };
    },

    computed: {
      ...mapGetters(["permission"]),
      permissionList() {

        console.log("this.permission = " + this.permission.control_review);


        return {
          addBtn: this.vaildData(this.permission.control_add, false),
          viewBtn: this.vaildData(this.permission.control_view, false),
          delBtn: this.vaildData(this.permission.control_delete, false),
          editBtn: this.vaildData(this.permission.control_edit, false),
          reviewBtn: this.vaildData(this.permission.control_review, false),
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
      review(row) {
        this.$confirm("确定确认该布控生效?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return reviewControl(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "审核成功!"
            });
          });
      },
      //**************************************布控人员*********************************************
      rowConPoliceSave(row, loading, done) {
        row.controlId = this.form.id;
        conPoliceSave(row).then(() => {
          loading();
          this.refreshConPolice();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowConPoliceDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return removeConPolice(row.id);
          })
          .then(() => {
            this.refreshConPolice();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      refreshConPolice() {
        this.getList(this.form.id);
      },
      getList: function (controlId) {
        getConPoliceList(controlId).then(res => {
          this.conPoliceDate = res.data.data;
        });
      },

      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
          //编辑和查看布控时，查询布控人员
          this.getList(this.form.id);
        }

        //新增布控人员时先,生成布控主键，与布控人员关联
        if (["add"].includes(type)) {
          getPrimarykey().then(res => {
            this.form.id = res.data.data;
            this.getList(0);
          });
        }
        done();
      },
      //**************************************布控人员*********************************************
      rowSave(row, loading, done) {
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
            this.onLoad(this.page);
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

          for (let p in data.records) {
            if (data.records[p].auditId == -1) {
              data.records[p].auditId = null;
            }
          }
          // console.log("res.data.data = " + JSON.stringify(data.records[0]) );

          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
