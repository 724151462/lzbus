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
                   v-if="permission.station_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/stressperson/station";
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
          index: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          column: [
            {
              label: '地区',
              prop: 'areaId',
              type: 'select',
              search:true,
              hide:true,
              cascaderItem: ['gridId'],
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
              label: "巡查片区",
              prop: "gridId",
              type: 'select',
              dicUrl: `/api/blade-stressperson/station/getGridSelect?areaId={{key}}`,
              dicFlag:false,
              search:true,
              hide:true,
              props: {
                label: 'gridName',
                value: 'gridId'
              },
              rules: [{
                required: true,
                message: "请选择巡查片区",
                trigger: "blur"
              }]
            },
            {
              label: "地区",
              prop: "areaName",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
            {
              label: "巡查片区",
              prop: "gridName",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
            },
            {
              label: "站点编码",
              prop: "stationCode",
              rules: [{
                required: true,
                message: "请输入站点编码",
                trigger: "blur"
              }]
            },
            {
              label: "站点名称",
              prop: "stationName",
              search:true,
              rules: [{
                required: true,
                message: "请输入站点名称",
                trigger: "blur"
              }]
            },
            {
              label: "开始时间",
              prop: "startTime",
              type: "time",
              // format:'hh:mm:ss',
              valueFormat:'hh:mm:ss',
              mock:{
                type:'datetime',
                format:'hh:mm:ss'
              },
              rules: [{
                required: true,
                message: "请输入开始时间",
                trigger: "blur"
              }]
            },
            {
              label: "结束时间",
              prop: "endTime",
              type: "time",
              // format:'hh:mm:ss',
              valueFormat:'hh:mm:ss',
              mock:{
                type:'datetime',
                format:'hh:mm:ss'
              },
              rules: [{
                required: true,
                message: "请输入结束时间",
                trigger: "blur"
              }]
            },
            {
              label: "站点类型",
              prop: "siteType",
              type: "select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=site_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入站点类型,1:公交车，2：地铁",
                trigger: "blur"
              }]
            },
            {
              label: "派出所代码",
              prop: "policeCode",
              rules: [{
                required: true,
                message: "请输入派出所代码",
                trigger: "blur"
              }]
            },
            {
              label: "派出所名称",
              prop: "policeName",
              rules: [{
                required: true,
                message: "请输入派出所名称",
                trigger: "blur"
              }]
            },
            {
              label: "线路编码",
              prop: "lineCode",
              rules: [{
                required: true,
                message: "请输入线路编码",
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
          addBtn: this.vaildData(this.permission.station_add, false),
          viewBtn: this.vaildData(this.permission.station_view, false),
          delBtn: this.vaildData(this.permission.station_delete, false),
          editBtn: this.vaildData(this.permission.station_edit, false),
          mapBtn: this.vaildData(this.permission.stationmap, false)
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
      toStationFenbu() {
        this.$router.push({path: '/stressperson/stationmap'})
      },
      rowSave(row, loading, done) {
        add(row,1).then(() => {
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
        update(row,1).then(() => {
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
          getDetail(this.form.id,1).then(res => {
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
        let focusType = {focusType:1};
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query,focusType)).then(res => {
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
