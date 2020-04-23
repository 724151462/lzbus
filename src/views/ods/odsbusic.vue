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
                   v-if="permission.odsbusic_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsbusic";
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
          menuWidth:150,//菜单宽度
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
              label: "ID",
              prop: "xxzjbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入ID",
                trigger: "blur"
              }]
            },
            {
              label: "卡号",
              prop: "ickh",
              rules: [{
                required: true,
                message: "请输入卡号",
                trigger: "blur"
              }]
            },
            {
              label: "发证公司",
              prop: "fzgs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发证公司",
                trigger: "blur"
              }]
            },
            {
              label: "录入时间",
              prop: "lrsj",
              rules: [{
                required: true,
                message: "请输入录入时间",
                trigger: "blur"
              }]
            },

            {
              label: "姓名",
              prop: "xm",
              width:120,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "xbmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "csrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "身份证号",
              prop: "gmsfhm",
              width:180,
              rules: [{
                required: true,
                message: "请输入身份证号",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              prop: "lxdh",
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "现住址行政区划",
              prop: "xzzXzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住址行政区划",
                trigger: "blur"
              }]
            },
            {
              label: "现住址",
              prop: "xzzXzqh",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入现住址",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              rules: [{
                required: true,
                message: "请输入创建时间",
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
          addBtn: this.vaildData(this.permission.odsbusic_add, false),
          viewBtn: this.vaildData(this.permission.odsbusic_view, false),
          delBtn: this.vaildData(this.permission.odsbusic_delete, false),
          editBtn: this.vaildData(this.permission.odsbusic_edit, false)
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
