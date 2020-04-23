<template>
  <basic-container>

    <template>
      <div>


        <el-input placeholder="这里是自定" v-model="stationId"  disabled>
          <el-button slot="append" icon="el-icon-zoom-in" @click="dialogVisible = true"></el-button>
        </el-input>


        <el-dialog title="站点单选" :visible.sync="dialogVisible" append-to-body style="width: 120%;height:90%">

          <avue-crud :option="option"
                     :table-loading="loading"
                     :data="data"
                     :page="page"
                     :permission="permissionList"
                     :before-open="beforeOpen"
                     v-model="form"
                     ref="crud"
                     @search-change="searchChange"
                     @search-reset="searchReset"
                     @selection-change="selectionChange"
                     @current-change="currentChange"
                     @size-change="sizeChange"
                     @refresh-change="refreshChange"
                     @row-dblclick="handleRowDBLClick"
                     @on-load="onLoad">
          </avue-crud>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </div>
        </el-dialog>
      </div>
    </template>

  </basic-container>
</template>

<script>
  import {getList, getDetail} from "@/api/stressperson/station";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        dialogVisible: false,
        page: {
          pageSize: 5,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          // title:"选择站点",

          height: '80%',
          width: '180%',
          calcHeight: 50,
          tip: false,
          searchMenuSpan: 6,
          border: true,
          index: false,
          viewBtn: true,
          selection: true,
          dialogClickModal: false,
          menuWidth: 1,
          searchShow: false,
          column: [
            {
              label: '省份',
              prop: 'provinceId',
              type: 'select',
              search: true,
              cascaderItem: ['cityId', 'areaId', 'gridId'],
              props: {
                label: 'name',
                value: 'id'
              },
              dicFormatter: (res) => {
                return res.data;//返回字典的层级结构
              },
              dicUrl: `/api/blade-region/region/region?parentId=1`,
              rules: [{
                required: true,
                message: '请选择省份',
                trigger: 'blur'
              }]
            },
            {
              label: '城市',
              prop: 'cityId',
              type: 'select',
              dicFlag: false,
              search: true,
              props: {
                label: 'name',
                value: 'id'
              },
              dicUrl: `/api/blade-region/region/region?parentId={{key}}`,
              rules: [{
                required: true,
                message: '请选择城市',
                trigger: 'blur'
              }]
            },
            {
              label: '地区',
              prop: 'areaId',
              type: 'select',
              dicFlag: false,
              search: true,
              props: {
                label: 'name',
                value: 'id'
              },
              dicUrl: `/api/blade-region/region/region?parentId={{key}}`,
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
              dicFlag: false,
              search: true,
              searchShow: false,
              hide: true,
              props: {
                label: 'gridName',
                value: 'gridId'
              },
              dicUrl: `/api/blade-stressperson/station/getGridSelect?areaId={{key}}`,
              rules: [{
                required: true,
                message: "请选择巡查片区",
                trigger: "blur"
              }]
            },
            {
              label: "巡查片区",
              prop: "gridName",
              addDisplay: false,
              editDisplay: false,
              viewDisplay: false,
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
              prop: "station",
              search: true,
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
              valueFormat: 'hh:mm:ss',
              mock: {
                type: 'datetime',
                format: 'hh:mm:ss'
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
              valueFormat: 'hh:mm:ss',
              mock: {
                type: 'datetime',
                format: 'hh:mm:ss'
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
          addBtn: false,
          viewBtn: false,
          delBtn: false,
          editBtn: false
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
      //双击选中
      handleRowDBLClick(row, event) {
        var srr = [];
        srr.push(row);
        this.$refs.crud.toggleSelection(srr);
      },
      //确定提交
      handleSubmit() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        if (this.selectionList.length > 1) {
          this.$message.warning("请选择至多一条数据");
          return;
        }
        let stationName = this.selectionList[0].stationName;
        let stationId = this.selectionList[0].id;
        this.stationId = stationName;
        this.dialogVisible = false;
        this.$emit('selectFunc', stationId, stationName);
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
