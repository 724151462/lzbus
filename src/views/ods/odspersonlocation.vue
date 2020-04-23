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
                   v-if="permission.odspersonlocation_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odspersonlocation";
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
              label: "ID",
              prop: "personId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员ID",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员姓名",
              prop: "xm",
              rules: [{
                required: true,
                message: "请输入重点人员姓名",
                trigger: "blur"
              }]
            },
            {
              label: "照片",
              prop: "photo",
              rules: [{
                required: true,
                message: "请输入照片",
                trigger: "blur"
              }]
            },
            {
              label: "视频",
              prop: "video",
              hide:true,
              rules: [{
                required: true,
                message: "请输入视频",
                trigger: "blur"
              }]
            },
            {
              label: "公民身份证号",
              prop: "gmsfhm",
              rules: [{
                required: true,
                message: "请输入公民身份证号",
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
              label: "号码类型",
              prop: "numberType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入号码类型",
                trigger: "blur"
              }]
            },
            {
              label: "轨迹地址",
              prop: "trackAddr",
              rules: [{
                required: true,
                message: "请输入轨迹地址",
                trigger: "blur"
              }]
            },

            {
              label: "轨迹维度",
              prop: "dqwd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入轨迹维度",
                trigger: "blur"
              }]
            },
            {
              label: "轨迹经度",
              prop: "dqjd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入轨迹经度",
                trigger: "blur"
              }]
            },
            {
              label: "经纬度坐标体系",
              prop: "trackTypeCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入经纬度坐标体系",
                trigger: "blur"
              }]
            },
            {
              label: "轨迹时间",
              prop: "trackTime",
              rules: [{
                required: true,
                message: "请输入轨迹时间",
                trigger: "blur"
              }]
            },
            {
              label: "主流程信息表",
              prop: "flowMainId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主流程信息表ID",
                trigger: "blur"
              }]
            },
            {
              label: "基站代码",
              prop: "stationCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入基站代码",
                trigger: "blur"
              }]
            },
            {
              label: "轨迹的详细描述",
              prop: "trackMsg",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入轨迹的详细描述",
                trigger: "blur"
              }]
            },
            {
              label: "数据来源，对应编码表",
              prop: "datasource",
              hide:true,
              rules: [{
                required: true,
                message: "请输入数据来源，对应编码表",
                trigger: "blur"
              }]
            },
            {
              label: "插入时间",
              prop: "xxrksj",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入插入时间",
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
          addBtn: this.vaildData(this.permission.odspersonlocation_add, false),
          viewBtn: this.vaildData(this.permission.odspersonlocation_view, false),
          delBtn: this.vaildData(this.permission.odspersonlocation_delete, false),
          editBtn: this.vaildData(this.permission.odspersonlocation_edit, false)
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
