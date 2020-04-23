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
                   v-if="permission.line_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row}"
                slot="cityId">
        <el-tag>{{row.areaName}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="startLine">
        <el-tag>{{row.startName}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="endLine">
        <el-tag>{{row.endName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/desk/bus/line";
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
          headerAlign: 'center',
          align: 'center',
          column: [
            {
              label: "名称",
              prop: "lineName",
              search: true,
              rules: [{
                required: true,
                message: "请输入名称",
                trigger: "blur"
              }] ,
             span:12
            },
            {
              label: "编码",
              prop: "code",
              search: true,
              rules: [{
                required: true,
                message: "请输入编码",
                trigger: "blur"
              }],
              span:12
            },
            {
              label: "所属片区",
              prop: "gridId",
              search: true,
              row:true,
              rules: [{
                required: true,
                message: "请输入所属片区",
                trigger: "blur"
              }],
              span:12
            },
            {
              label: "市级",
              prop: "cityId",
              type: "select",
              dicUrl: "/api/blade-company/buscompany/city",
              cascaderItem: ['lineStation'],
              dicFormatter:(res)=>{
                return res.data;//返回字典的层级结构
              },
              props: {
                label: "name",
                value: "id"
              },
              slot: true,
              search: true,
              rules: [{
                required: true,
                message: "请选择区域",
                trigger: "blur"
              }],
              span:12
            },
            {
              label: "站点选择",
              prop: "lineStation",
              type: "select",
              multiple:"true",
              dicUrl: "/api/blade-stressperson/station/getStationSelect?cityId={{key}}",
             /* change: () => {
                this.from()
                this.$message.success('查看控制台')
                console.log('值改变')
              },*/
              props: {
                label: "stationName",
                value: "id"
              },
              slot: true,
              hide:true,
              tip:"请选择线路沿途站点",
              rules: [{
                required: true,
                message: "请选择线路沿途站点",
                trigger: "blur"
              }],
              span:12
            },
            {
              label: '起点站首末车',
              row:true,
              children: [{
                  addDisplay:false,
                  editDisplay:false,
                  viewDisplay:false,
                  label: '起点站',
                  prop: 'startLine',
                  slot: true,
                  search: true,
                  span:12,
                  row:true,
                  rules: [{
                  required: false,
                  message: "请选择起点站路线",
                  trigger: "blur"
                }],
              },
                {
                label: '时间段',
                children: [{
                  label: '开始时间',
                  prop: 'startOpenTime',
                  type: "time",
                  valueFormat:'hh:mm',
                  mock:{
                    type:'datetime',
                    format:'hh:mm'
                  },
                  span:12,
                  rules: [{
                    required: true,
                    message: "请选择起点开始时间",
                    trigger: "blur"
                  }],
                }, {
                  label: '结束时间',
                  prop: 'startCloseTime',
                  type: "time",
                  valueFormat:'hh:mm',
                  mock:{
                    type:'datetime',
                    format:'hh:mm'
                  },
                  span:12,
                  rules: [{
                    required: true,
                    message: "请选择起点结束时间",
                    trigger: "blur"
                  }],
                }]
              }]
            },
            {
              label: '终点站首末车',
              row:true,
              children: [{
                  addDisplay:false,
                  editDisplay:false,
                  viewDisplay:false,
                  label: '终点站',
                  prop: 'endLine',
                  type: 'select',
                  dicFlag: true,
                  slot: true,
                  search: true,
                  row:true,
                  span:12,
                   rules: [{
                      required: false,
                      message: "请选择终点站路线",
                      trigger: "blur"
                    }],
              },
                {
                label: '时间段',
                children: [{
                  label: '开始时间',
                  prop: 'endOpenTime',
                  type: "time",
                  valueFormat:'hh:mm',
                  mock:{
                    type:'datetime',
                    format:'hh:mm'
                  },
                  span:12,
                  rules: [{
                    required: true,
                    message: "请选择终点结束时间",
                    trigger: "blur"
                  }],
                }, {
                  label: '结束时间',
                  prop: 'endCloseTime',
                  type: "time",
                  valueFormat:'hh:mm',
                  mock:{
                    type:'datetime',
                    format:'hh:mm'
                  },
                  span:12,
                  rules: [{
                    required: true,
                    message: "请选择终点结束时间",
                    trigger: "blur"
                  }],
                }]
              }]
            },
          ],

        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.line_add, false),
          viewBtn: this.vaildData(this.permission.line_view, false),
          delBtn: this.vaildData(this.permission.line_delete, false),
          editBtn: this.vaildData(this.permission.line_edit, false)
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
        row.lineStation = row.lineStation.join(",");
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
        row.lineStation = row.lineStation.join(",");
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
            if(this.form.hasOwnProperty("lineStation")){
              this.form.lineStation = this.form.lineStation.split(",");
              /*this.form.lineStation.forEach((ele, index) => {
                console.log(this.form.lineStation[index] );
                console.log(Number(ele) );
                this.form.lineStation[index] = Number(ele);
              });*/
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
