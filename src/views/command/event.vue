<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               :before-close="beforeColose"
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
               @on-load="onLoad"
               :upload-preview="uploadPreview">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.event_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   size="small"
                   icon="el-icon-edit"
                   plain
                   v-if="scope.row.isCase == 0 && permissionList.caseBtn == true"
                   @click="caseChange(scope.row)">转 案
        </el-button>
      </template>

      <template slot-scope="{row}" slot="lineId">
        <el-tag>{{row.lineName}}</el-tag>
      </template>
      <template slot-scope="{row}" slot="busId">
        <el-tag>{{row.carNo}}</el-tag>
      </template>

    </avue-crud>
    <el-dialog title="转案"
               append-to-body
               :visible.sync="box"
               width="550px">
      <avue-form ref="form"
                 :option="caseOption"
                 v-model="caseForm"
                 @submit="caseSubmit"/>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,caseChange} from "@/api/command/event";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        box: false,
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          height: 'auto',
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
              label: "事件类型",
              prop: "eventType",
              type: "select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=event_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search: true,
              rules: [{
                required: true,
                message: "请选择事件类型",
                trigger: "blur"
              }]
            },
            {
              label: "事件名称",
              prop: "eventName",
              search: true,
              rules: [{
                required: true,
                message: "请填写事件名称",
                trigger: "blur"
              }]
            },{
              label: "事件时间",
              prop: "eventTime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              search: true,
              rules: [{
                required: true,
                message: "请选择事件时间",
                trigger: "blur"
              }]
            },
            {
              label: "线路",
              prop: "lineId",
              type: "tree",
              dicUrl: "/api/blade-line/line/getLineList?cityId=0",
              props: {
                label: "lineName",
                value: "id"
              },
              cascaderItem: ['busId'],
              dicFormatter: (res) => {
                return res.data;//返回字典的层级结构
              },
              slot: true,
              search: "true",
              rules: [{
                required: true,
                message: "请选择线路",
                trigger: "blur"
              }]
            },
            {
              label: "车牌号",
              prop: "busId",
              type: "tree",
              dicUrl: "/api/blade-bus/bus/getBusList?lineId={{key}}",
              slot: true,
              search: true,
              props: {
                label: "carNo",
                value: "id"
              },

              filterable: true,
              rules: [{
                required: true,
                message: "请选择车牌号",
                trigger: "blur"
              }]
            },

            {
              label: '视频',
              prop: 'videos',
              type: 'upload',
              params: {
                is: 'video'
              },
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              // listType: 'picture-card',
              limit: 3,
              span: 24,
              tip: '',
              action: '/api/blade-resource/oss/endpoint/put-file',
              hide: true,
            },
            {
              label: '照片',
              prop: 'photos',
              type: 'upload',
              loadText: '附件上传中，请稍等',
              span: 24,
              listType: 'picture-card',
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              canvasOption: {
                text: ' ',
                ratio: 0.1
              },
              tip: '只能上传jpg/png文件，且不超过500kb',
              action: '/api/blade-resource/oss/endpoint/put-file',
              hide: true,
            },

            {
              label: "转案",
              prop: "isCase",
              type: "select",
              search: true,
              display:false,
              dicData: [{
                label: "待转案",
                value: 0,
              }, {
                label: "已转案",
                value: 1,
              }],
              rules: [{
                required: true,
                message: "请选择是否转案",
                trigger: "blur"
              }]
            },
            {
              label: "转案时间",
              prop: "caseTime",
              type: "datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              display:false,
              rules: [{
                required: true,
                message: "请选择转案时间",
                trigger: "blur"
              }]
            },
            {
              label: "转案说明",
              prop: "remark",
              type:'textarea',
              minRows:10,
              maxlength:200,
              span:24,
              showWordLimit:true,
              display:false,
              formatter: function (row, value) {
                let va = "暂无转案说明";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: true,
                message: "请填写转案说明",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],
        caseForm:{},
        caseOption:{
          submitText: "提交",
          column: [
            {
              label: "转案说明",
              prop: "remark",
              type:'textarea',
              minRows:7,
              maxlength:150,
              span:24,
              showWordLimit:true,
              disabled:false,
              rules: [{
                required: true,
                message: "请填写转案说明",
                trigger: "blur"
              }]
            },
          ]
        }
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.event_add, false),
          viewBtn: this.vaildData(this.permission.event_view, false),
          delBtn: this.vaildData(this.permission.event_delete, false),
          editBtn: this.vaildData(this.permission.event_edit, false),
          caseBtn: this.vaildData(this.permission.event_case, false),
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
      //**************************转案*********************************************
      caseChange(row){
        //显示弹出框
        this.box = true;
        this.caseForm.id = row.id;
        this.caseForm.remark = row.remark;
      },
      caseSubmit(form,loading) {
        caseChange(form).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: `转案件成功`,
          });
          this.box = false;
        }, error => {
          console.log(error);
          this.box = false;
        });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          // console.log(this.form.id)
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      beforeColose(done, type) {
        if (["edit", "view"].includes(type)) {
            // this.isCase = 2;
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
      },
      uploadPreview(file, column) {
        console.log(file, column)
        if (column.prop == 'videos') {
          window.open(file.url)
        }
        // this.$message.success('自定义查看方法,查看控制台')
      },
    }
  };
</script>

<style>
</style>
