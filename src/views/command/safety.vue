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
                   v-if="permission.safety_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/command/safety";
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
          calcHeight: 50,
          tip: false,
          searchShow: true,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            // {
            //   label: "站点ID",
            //   prop: "stationId",
            //   rules: [{
            //     required: true,
            //     message: "请输入站点ID",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "线路ID",
            //   prop: "lineId",
            //   rules: [{
            //     required: true,
            //     message: "请输入线路ID",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "身份证号",
              prop: "idCard",
              rules: [{
                required: true,
                message: "请输入身份证号",
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
              label: "电话",
              prop: "phone",
              rules: [{
                required: true,
                message: "请输入电话",
                trigger: "blur"
              }]
            },
            {
              label: "政治面貌",
              prop: "political",
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=political",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择政治面貌",
                trigger: "blur"
              }]
            },
            {
              label: "民族",
              prop: "nation",
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=nation",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择民族",
                trigger: "blur"
              }]
            },
            {
              label: "地址名称",
              prop: "address",
              rules: [{
                required: true,
                message: "请输入地址名称",
                trigger: "blur"
              }]
            },
            {
              label: "单位名称",
              prop: "unitName",
              rules: [{
                required: true,
                message: "请输入单位名称",
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
          addBtn: this.vaildData(this.permission.safety_add, false),
          viewBtn: this.vaildData(this.permission.safety_view, false),
          delBtn: this.vaildData(this.permission.safety_delete, false),
          editBtn: this.vaildData(this.permission.safety_edit, false)
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
