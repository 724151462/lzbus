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
                   v-if="permission.odsstaff_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsstaff";
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
              label: "所属公司",
              prop: "busCompanyId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属公司",
                trigger: "blur"
              }]
            },
            {
              label: "工号",
              prop: "code",
              hide:true,
              rules: [{
                required: true,
                message: "请输入工号",
                trigger: "blur"
              }]
            },
            {
              label: "姓名",
              prop: "realName",
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "身份证号",
              prop: "gmsfhm",
              rules: [{
                required: true,
                message: "请输入身份证号",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "birthday",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "现住址",
              prop: "xzzDzmc",
              rules: [{
                required: true,
                message: "请输入现住址",
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
              label: "驾照等级",
              prop: "level",
              hide:true,
              rules: [{
                required: true,
                message: "请输入驾照等级",
                trigger: "blur"
              }]
            },
            {
              label: "类型",
              prop: "staffType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入类型，1：司机，2：保安，3：勤务，4：安保，5:其它从业人员",
                trigger: "blur"
              }]
            },
            {
              label: "职务",
              prop: "zw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职务",
                trigger: "blur"
              }]
            },
            {
              label: "照片",
              prop: "photo",
              row:true,
              rules: [{
                required: true,
                message: "请输入照片",
                trigger: "blur"
              }]
            },
            {
              label: "数据来源",
              prop: "sjly",
              rules: [{
                required: true,
                message: "请输入数据来源",
                trigger: "blur"
              }]
            },
            {
              label: "工作时间",
              prop: "lrsj",
              rules: [{
                required: true,
                message: "请输入工作时间",
                trigger: "blur"
              }]
            },
            {
              label: "工种",
              prop: "gz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入工种",
                trigger: "blur"
              }]
            },
            {
              label: "录入人",
              prop: "lrrXm",
              rules: [{
                required: true,
                message: "请输入录入人",
                trigger: "blur"
              }]
            },
            {
              label: "录入人身份证号",
              prop: "lrrGmsfhm",
              rules: [{
                required: true,
                message: "请输入录入人身份证号",
                trigger: "blur"
              }]
            },
            {
              label: "是否核查",
              prop: "isCheck",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否核查",
                trigger: "blur"
              }]
            },
            {
              label: "审核人",
              prop: "checkPerson",
              hide:true,
              rules: [{
                required: true,
                message: "请输入审核人",
                trigger: "blur"
              }]
            },
            {
              label: "审核时间",
              prop: "checkTime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入审核时间",
                trigger: "blur"
              }]
            },
            {
              label: "核查说明",
              prop: "remark",
              hide:true,
              rules: [{
                required: true,
                message: "请输入核查说明",
                trigger: "blur"
              }]
            },
 /*           {
              label: "cq_id",
              prop: "cqId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入cq_id",
                trigger: "blur"
              }]
            },
            {
              label: "cq_date",
              prop: "cqDate",
              hide:true,
              rules: [{
                required: true,
                message: "请输入cq_date",
                trigger: "blur"
              }]
            },
            {
              label: "cq_scbz",
              prop: "cqScbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入cq_scbz",
                trigger: "blur"
              }]
            },*/
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.odsstaff_add, false),
          viewBtn: this.vaildData(this.permission.odsstaff_view, false),
          delBtn: this.vaildData(this.permission.odsstaff_delete, false),
          editBtn: this.vaildData(this.permission.odsstaff_edit, false)
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
