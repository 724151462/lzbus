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
                   v-if="permission.odsface_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsface";
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
          menuWdith:150,
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
              label: "姓名",
              prop: "xm",
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "xb",
              type: "select",
              dicData: [
                {
                  label: "男",
                  value: '1'
                },
                {
                  label: "女",
                  value: '2'
                },
              ],
            },
            {
              label: "来源类型",
              prop: "faceSourceType",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入来源",
                trigger: "blur"
              }]
            },
            {
              label: "来源",
              prop: "faceSourceId",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入来源",
                trigger: "blur"
              }]
            },
            {
              label: "识别后人员",
              prop: "personId",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入识别后人员",
                trigger: "blur"
              }]
            },
            {
              label: "nl",
              prop: "nl",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入nl",
                trigger: "blur"
              }]
            },
            {
              label: "daid",
              prop: "daid",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入daid",
                trigger: "blur"
              }]
            },
            {
              label: "algoversion",
              prop: "algoversion",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入algoversion",
                trigger: "blur"
              }]
            },
            {
              label: "图片路径",
              prop: "avatarurl",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入图片路径",
                trigger: "blur"
              }]
            },
            {
              label: "删除标准",
              prop: "deleteflag",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入删除标准",
                trigger: "blur"
              }]
            },
            {
              label: "featureinfo",
              prop: "featureinfo",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入featureinfo",
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
              label: "民族",
              prop: "mz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族",
                trigger: "blur"
              }]
            },  {
              label: "源类型",
              prop: "sourcetype",
              hide:true,
              viewDisplay:false,
              rules: [{
                required: true,
                message: "请输入源类型",
                trigger: "blur"
              }]
            },

            {
              label: "图片",
              prop: "imageid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入imageid",
                trigger: "blur"
              }]
            },
            {
              label: "图片路径",
              prop: "imageurl",
              rules: [{
                required: true,
                message: "请输入图片路径",
                trigger: "blur"
              }]
            },
            {
              label: "hyzk",
              prop: "hyzk",
              viewDisplay:false,
              hide:true,
              rules: [{
                required: true,
                message: "请输入hyzk",
                trigger: "blur"
              }]
            },
            {
              label: "synctime",
              prop: "synctime",
              viewDisplay:false,
              hide:true,
              rules: [{
                required: true,
                message: "请输入synctime",
                trigger: "blur"
              }]
            },
            {
              label: "thumbnailurl",
              prop: "thumbnailurl",
              viewDisplay:false,
              hide:true,
              rules: [{
                required: true,
                message: "请输入thumbnailurl",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "odsXxxgsj",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "odsXxrksj",
              rules: [{
                required: true,
                message: "请输入更新时间",
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
          addBtn: this.vaildData(this.permission.odsface_add, false),
          viewBtn: this.vaildData(this.permission.odsface_view, false),
          delBtn: this.vaildData(this.permission.odsface_delete, false),
          editBtn: this.vaildData(this.permission.odsface_edit, false)
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
