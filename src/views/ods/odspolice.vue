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
                   v-if="permission.odspolice_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odspolice";
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
          height:'auto',
          calcHeight: 30,
          menuWidth:150,
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
              label: "系统编号",
              prop: "systemid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入系统编号",
                trigger: "blur"
              }]
            },
            {
              label: "序号",
              prop: "xh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入序号",
                trigger: "blur"
              }]
            },

            {
              label: "姓名",
              prop: "xm",
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "性别代码",
              prop: "xbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别代码",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "xb",
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "csrq",
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "公民身份号码",
              prop: "gmsfhm",
              rules: [{
                required: true,
                message: "请输入公民身份号码",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              prop: "phone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "公交公司",
              prop: "companyId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入公交公司ID",
                trigger: "blur"
              }]
            },
            {
              label: "站点",
              prop: "stationId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入站点ID",
                trigger: "blur"
              }]
            },
            {
              label: "线路",
              prop: "lineId",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入线路ID",
                trigger: "blur"
              }]
            },
            {
              label: "警员编号",
              prop: "jh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警员编号",
                trigger: "blur"
              }]
            },
            {
              label: "单位代码",
              prop: "dwdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "证件代码",
              prop: "zjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入证件代码",
                trigger: "blur"
              }]
            },
            {
              label: "警务类别",
              prop: "xc",
              rules: [{
                required: true,
                message: "请输入警务类别",
                trigger: "blur"
              }]
            },
            {
              label: "警务类别代码（单位）",
              prop: "xcdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入xcdm",
                trigger: "blur"
              }]
            },
            {
              label: "级别",
              prop: "zj",
              rules: [{
                required: true,
                message: "请输入级别",
                trigger: "blur"
              }]
            },
            {
              label: "警衔归属单位",
              prop: "gbzwdm",
              rules: [{
                required: true,
                message: "请输入警衔归属单位",
                trigger: "blur"
              }]
            },
            {
              label: "服务场所",
              prop: "fwcs",
              row:true,
              rules: [{
                required: true,
                message: "请输入服务场所",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "gxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            {
              label: "删除标识",
              prop: "deleteflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入删除标识",
                trigger: "blur"
              }]
            },

          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.odspolice_add, false),
          viewBtn: this.vaildData(this.permission.odspolice_view, false),
          delBtn: this.vaildData(this.permission.odspolice_delete, false),
          editBtn: this.vaildData(this.permission.odspolice_edit, false)
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
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
