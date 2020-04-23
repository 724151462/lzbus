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
                   v-if="permission.odspersonrelationbetween_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odspersonrelationbetween";
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
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: "在押人员编号",
              prop: "zyrybh",
              rules: [{
                required: true,
                message: "请输入在押人员编号",
                trigger: "blur"
              }]
            },
            {
              label: "同案人员编号",
              prop: "tarybh",
              rules: [{
                required: true,
                message: "请输入同案人员编号",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "cjsj",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "创建人ID",
              prop: "cjrid",
              rules: [{
                required: true,
                message: "请输入创建人ID",
                trigger: "blur"
              }]
            },
            {
              label: "创建人姓名",
              prop: "cjrxm",
              rules: [{
                required: true,
                message: "请输入创建人姓名",
                trigger: "blur"
              }]
            },
            {
              label: "创建人警号",
              prop: "cjrjh",
              rules: [{
                required: true,
                message: "请输入创建人警号",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "gxsj",
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新人ID",
              prop: "gxrid",
              rules: [{
                required: true,
                message: "请输入更新人ID",
                trigger: "blur"
              }]
            },
            {
              label: "更新人姓名",
              prop: "gxrxm",
              rules: [{
                required: true,
                message: "请输入更新人姓名",
                trigger: "blur"
              }]
            },
            {
              label: "更新人警号",
              prop: "gxrjh",
              rules: [{
                required: true,
                message: "请输入更新人警号",
                trigger: "blur"
              }]
            },
            {
              label: "标记是否删除,0:否,1:是(已删除)",
              prop: "flag",
              rules: [{
                required: true,
                message: "请输入标记是否删除,0:否,1:是(已删除)",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "bz",
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "入库时间",
              prop: "xxrksj",
              rules: [{
                required: true,
                message: "请输入入库时间",
                trigger: "blur"
              }]
            },
            {
              label: "修改时间",
              prop: "xxxgsj",
              rules: [{
                required: true,
                message: "请输入修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "所属地市",
              prop: "ssdsxzqhdm",
              rules: [{
                required: true,
                message: "请输入所属地市",
                trigger: "blur"
              }]
            },
            {
              label: "stg信息入库时间",
              prop: "stgXxrksj",
              rules: [{
                required: true,
                message: "请输入stg信息入库时间",
                trigger: "blur"
              }]
            },
            {
              label: "stg信息修改时间",
              prop: "stgXxxgsj",
              rules: [{
                required: true,
                message: "请输入stg信息修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "ods主记录ID",
              prop: "odsZjlid",
              rules: [{
                required: true,
                message: "请输入ods主记录ID",
                trigger: "blur"
              }]
            },
            {
              label: "ods数据来源系统分类代码",
              prop: "odsSjlyxtfldm",
              rules: [{
                required: true,
                message: "请输入ods数据来源系统分类代码",
                trigger: "blur"
              }]
            },
            {
              label: "ods采集地",
              prop: "odsCjd",
              rules: [{
                required: true,
                message: "请输入ods采集地",
                trigger: "blur"
              }]
            },
            {
              label: "ods信息入库时间",
              prop: "odsXxrksj",
              rules: [{
                required: true,
                message: "请输入ods信息入库时间",
                trigger: "blur"
              }]
            },
            {
              label: "ods信息修改时间",
              prop: "odsXxxgsj",
              rules: [{
                required: true,
                message: "请输入ods信息修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "ods数据敏感级别",
              prop: "odsSjmgjb",
              rules: [{
                required: true,
                message: "请输入ods数据敏感级别",
                trigger: "blur"
              }]
            },
            {
              label: "ods备注",
              prop: "odsBz",
              rules: [{
                required: true,
                message: "请输入ods备注",
                trigger: "blur"
              }]
            },
            {
              label: "ods数据资源标识符",
              prop: "odsSjzybsf",
              rules: [{
                required: true,
                message: "请输入ods数据资源标识符",
                trigger: "blur"
              }]
            },
            {
              label: "分区列",
              prop: "comPId",
              rules: [{
                required: true,
                message: "请输入分区列",
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
          addBtn: this.vaildData(this.permission.odspersonrelationbetween_add, false),
          viewBtn: this.vaildData(this.permission.odspersonrelationbetween_view, false),
          delBtn: this.vaildData(this.permission.odspersonrelationbetween_delete, false),
          editBtn: this.vaildData(this.permission.odspersonrelationbetween_edit, false)
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
