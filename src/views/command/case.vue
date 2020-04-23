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
                   v-if="permission.case_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot="menu" slot-scope="scope">
        &nbsp;&nbsp;
        <el-button :size="scope.size"
                   :type="scope.type"
                   icon="el-icon-edit"
                   style="margin-left: 0px;"
                   v-if="scope.row.isDone == 0 && permissionList.overBtn == true"
                   @click="over(scope.row,scope.index)">结 案
        </el-button>
      </template>
    </avue-crud>
    <el-dialog title="结案"
               append-to-body
               :visible.sync="box"
               width="550px">
      <avue-form ref="form"
                 :option="overOption"
                 v-model="overForm"
                 @submit="overSubmit"/>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,overCase} from "@/api/command/case";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        box:false,
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
              label: "案件名称",
              prop: "caseName",
              search:true,
              rules: [{
                required: true,
                message: "请输入案件名称",
                trigger: "blur"
              }]
            },
            {
              label: "案件类型",
              prop: "caseType",
              type:"select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=case_code",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search:true,
              formatter: function (row,value) {
                let va = "未选择案件类型";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: true,
                message: "请选择案件类型",
                trigger: "blur"
              }]
            },
            {
              label: "提供人",
              prop: "userName",
              formatter: function (row,value) {
                let va = "未填写提供人";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              hide:true,
              rules: [{
                required: true,
                message: "请输入提供人",
                trigger: "blur"
              }]
            },
            {
              label: "联系方式",
              prop: "userPhone",
              formatter: function (row,value) {
                let va = "未填写联系方式";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              hide:true,
              rules: [{
                required: true,
                message: "请输入联系方式",
                trigger: "blur"
              }]
            },

            {
              label: "来源类型",
              prop: "sourceType",
              type:"select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=source_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              cascaderItem: ['sourceId'],
              dicFormatter:(res)=>{
                return res.data;//返回字典的层级结构
              },
              search:true,
             // editDisabled:false,
              rules: [{
                required: true,
                message: "请选择来源类型",
                trigger: "blur"
              }]
            },
            {
              label: "来源",
              prop: "sourceId",
              type:"select",
              //editDisabled:false,
              dicUrl: "/api/blade-case/case/sourceSelList?sourceType={{key}}",
              props: {
                label: "sourceName",
                value: "sourceId"
              },
              rules: [{
                required: true,
                message: "请选择来源",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "remark",
              type:'textarea',
              minRows:5,
              maxlength:100,
              span:12,
              showWordLimit:true,
              formatter: function (row,value) {
                let va = "暂无备注";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              hide:true,
              rules: [{
                required: false,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "结案状态",
              prop: "isDone",
              type:"radio",
              dicData:[{
                label:'已结案',
                value:1
              },{
                label:'未结案',
                value:0,
              }],
              search:true,
              display:false,
              rules: [{
                required: true,
                message: "请选择是否结案",
                trigger: "blur"
              }]
            },
            {
              label: "结案时间",
              prop: "caseTime",
              type:"datetime",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
              display:false,
              rules: [{
                required: true,
                message: "请选择结案时间",
                trigger: "blur"
              }]
            },
            {
              label: "结案说明",
              prop: "caseExplain",
              type:'textarea',
              minRows:5,
              maxlength:100,
              span:12,
              showWordLimit:true,
              display:false,
              formatter: function (row,value) {
                let va = "暂无结案说明";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: false,
                message: "请输入结案说明",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],
        overForm:{},
        overOption:{
          submitText: "提交",
          column: [
            {
              label: "结案说明",
              prop: "caseExplain",
              type:'textarea',
              minRows:7,
              maxlength:150,
              span:24,
              showWordLimit:true,
              disabled:false,
              rules: [{
                required: true,
                message: "请填写结案说明",
                trigger: "blur"
              }]
            },
          ]
        }
      };
    },
    watch:{
      'form.sourceType'() {
        if (this.form.sourceType==4){
          this.option.column[this.$refs.crud.findColumnIndex("sourceId")].editDisplay=false;
          this.option.column[this.$refs.crud.findColumnIndex("sourceType")].editDisplay=false;
        }else {
          this.option.column[this.$refs.crud.findColumnIndex("sourceId")].editDisplay=true;
          this.option.column[this.$refs.crud.findColumnIndex("sourceType")].editDisplay=true;
        }
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.case_add, false),
          viewBtn: this.vaildData(this.permission.case_view, false),
          delBtn: this.vaildData(this.permission.case_delete, false),
          editBtn: this.vaildData(this.permission.case_edit, false),
          overBtn: this.vaildData(this.permission.case_over, false),
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
      //**************************结案*********************************************
      over(row){
        //显示弹出框
        this.box = true;
        this.overForm.id = row.id;
        this.overForm.explain = row.explain;
      },
      overSubmit(form,loading) {
        overCase(form).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "结案成功!"
          });
          this.box = false;
        }, error => {
          console.log(error);
          this.box = false;
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
