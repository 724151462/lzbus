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
                   v-if="permission.plan_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>

      <template slot="menu" slot-scope="scope">

        &nbsp;&nbsp
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="scope.row.status == 0 && permissionList.reviewBtn == true"
                   @click="review(scope.row,scope.index)">审核
        </el-button>
        &nbsp;&nbsp
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="permissionList.deduceBtn == true"
                   @click.stop="handleDeduce(scope.row,scope.index)">推演
        </el-button>
      </template>
    </avue-crud>

    <el-dialog title="推演" append-to-body :visible.sync="box" width="800px">
      <avue-form ref="form" :option="deduceOption" v-model="deduceForm" @submit="deduceSubmit"/>
    </el-dialog>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, reviewPlan,deducePlan} from "@/api/command/plan";
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
          editBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: "预案名称",
              prop: "planName",
              search: true,
              rules: [{
                required: true,
                message: "请输入预案名称",
                trigger: "blur"
              }]
            },
            {
              label: "预案类型",
              prop: "planType",
              type: "select",
              search: true,
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=plan_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入预案类型",
                trigger: "blur"
              }]
            },
            {
              label: "审核人",
              prop: "auditUser",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              hide:true,
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
            },
            {
              label: "审核人",
              prop: "auditName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
            },
            {
              label: "审核时间",
              prop: "auditTime",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
            },
            {
              label: "备注",
              prop: "remark",
              type: "textarea",
              hide: true,
              span: 24,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "推演人",
              prop: "deduceUser",
              addDisplay: false,
              editDisplay: false,
              viewDisplay:false,
              hide:true,
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
            },
            {
              label: "推演人",
              prop: "deduceName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
              formatter: function (row, value) {
                return value == -1 ? "" : value;
              },
            },
            {
              label: "推演结果",
              prop: "deduceResult",
              addDisplay: false,
              editDisplay: false,
              type: "textarea",
              span: 24,
              rules: [{
                required: true,
                message: "请输入推演结果",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],

        //*******************推演********************
        box: false,
        deduceForm: {},
        deduceOption: {
          submitText: "提交",
          column: [
            {
              label: "推演结果",
              prop: "deduceResult",
              addDisplay: false,
              editDisplay: false,
              type: "textarea",
              span: 24,
              rules: [{
                required: true,
                message: "请输入推演结果",
                trigger: "blur"
              }]
            },
          ]
        },
        //*******************推演********************

      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.plan_add, false),
          viewBtn: this.vaildData(this.permission.plan_view, false),
          delBtn: this.vaildData(this.permission.plan_delete, false),
          editBtn: this.vaildData(this.permission.plan_edit, false),
          reviewBtn: this.vaildData(this.permission.plan_review, false),
          deduceBtn: this.vaildData(this.permission.plan_deduce, false),
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
      //*******************推演********************
      handleDeduce(row) {
        this.box = true;
        this.deduceForm.id = row.id;
        this.deduceForm.deduceResult = row.deduceResult;
      },
      deduceSubmit(row, done) {
        deducePlan(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "提交推演成功!"
          });
          this.box = false,
          done();
        }, error => {
          done();
          console.log(error);
        });
      },
      //*******************推演********************
      //审核
      review(row, index) {
        this.$confirm("确认审核?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return reviewPlan(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "审核成功!"
            });
          });
      },
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

            if (this.form.auditUser == -1) {
              this.form.auditUser = ""
            }
            if (this.form.deduceUser == -1) {
              this.form.deduceUser = ""
            }
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
