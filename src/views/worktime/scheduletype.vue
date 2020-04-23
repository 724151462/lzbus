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
                   v-if="permission.scheduletype_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/worktime/scheduletype";
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
              label: "类型",
              prop: "liType",
              type: "select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=li_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search: true,
              rules: [{
                required: true,
                message: "请选择类型",
                trigger: "blur"
              }]
            },
            {
              label: "标题",
              prop: "title",
              rules: [{
                required: true,
                message: "请输入",
                trigger: "blur"
              }]
            },
            {
              label: "排序",
              prop: "sort",
              type: "number",
              rules: [
                {
                  required: true,
                  message: "请输入排序",
                  trigger: "blur"
                }
              ]
            },
            {
              label: "开始时间",
              prop: "startTime",
              type: "time",
              addDisplay:true,
              editDisplay:true,
              viewDisplay:true,
              valueFormat: 'hh:mm:ss',
              mock: {
                type: 'datetime',
                format: 'hh:mm:ss'
              },
              rules: [{
                required: true,
                message: "请输入",
                trigger: "blur"
              }]
            },
            {
              label: "结束时间",
              prop: "endTime",
              type: "time",
              addDisplay:true,
              editDisplay:true,
              viewDisplay:true,
              valueFormat: 'hh:mm:ss',
              mock: {
                type: 'datetime',
                format: 'hh:mm:ss'
              },
              rules: [{
                required: true,
                message: "请输入",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    watch:{
      'form.liType'(){
        if (this.form.liType != '' && this.form.liType == '1') {
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].addDisplay = true;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].addDisplay = true;
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].editDisplay = true;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].editDisplay = true;
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].viewDisplay = true;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].viewDisplay = true;
        } else if (this.form.liType != '' && this.form.liType == '2'){
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].addDisplay = false;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].addDisplay = false;
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].editDisplay = false;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].editDisplay = false;
          this.option.column[this.$refs.crud.findColumnIndex("startTime")].viewDisplay = false;
          this.option.column[this.$refs.crud.findColumnIndex("endTime")].viewDisplay = false;
        }
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.scheduletype_add, false),
          viewBtn: this.vaildData(this.permission.scheduletype_view, false),
          delBtn: this.vaildData(this.permission.scheduletype_delete, false),
          editBtn: this.vaildData(this.permission.scheduletype_edit, false)
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
      }
    }
  };
</script>

<style>
</style>
