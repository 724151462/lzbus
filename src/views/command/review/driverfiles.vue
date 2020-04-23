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
                   v-if="permission.driverfiles_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   size="small"
                   icon="el-icon-edit"
                   plain
                   v-if="permission.driverfiles_check"
                   @click="check(scope.row)">审 核
        </el-button>
      </template>
    </avue-crud>
    <el-dialog title="档案审核"
               append-to-body
               :visible.sync="box"
               width="550px">
     <avue-form ref="form" :option="checkOption" v-model="checkForm" @submit="checkSubmit"/>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,check} from "@/api/command/review/driverfiles";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        query: {},
        loading: true,
        box: false,
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
              label: "所属公司",
              prop: "busCompanyId",
              type: "select",
              dicUrl: '/api/blade-bus/bus/company',
              search: true,
              props: {
                label: "companyName",
                value: "id"
              },
              rules: [{
                required: true,
                message: "请输入所属公司",
                trigger: "blur"
              }]
            },
            {
              label: "姓名",
              prop: "realName",
              search:true,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "身份证",
              prop: "idCard",
              search:true,
              rules: [{
                required: true,
                message: "请输入身份证",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "birthday",
              type: "date",
              format: "yyyy-MM-dd",
              valueFormat: "yyyy-MM-dd",
              rules: [{
                required: true,
                message: "请选择出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "驾照等级",
              prop: "level",
              type:"select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=driving_license",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search:true,
              rules: [{
                required: true,
                message: "请选择驾照等级",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              search:true,
              prop: "phone",
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "工作时间",
              prop: "workTime",
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请选择工作时间",
                trigger: "blur"
              }]
            },{
              display:false,
              label: "审核情况",
              prop: "isCheck",
              type:"select",
              search:"true",
              dicData:[{
                label:"是",
                value: 1
              },{
                label:"否",
                value: 0
              }],
              rules: [{
                required: true,
                message: "请选择审核情况",
                trigger: "blur"
              }]
            },{
              display:false,
              label: "审核时间",
              prop: "checkTime",
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请选择审核情况",
                trigger: "blur"
              }]
            },
            {
              display:false,
              label: "审核理由",
              prop: "remark",
              type:'textarea',
              minRows:10,
              maxlength:200,
              span:24,
              showWordLimit:true,
              formatter: function (row, value) {
                let va = "暂无审核理由";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: true,
                message: "请填写审核理由",
                trigger: "blur"
              }]
            },
            {
              label: '头像',
              prop: 'photo',
              type: 'upload',
              loadText: '附件上传中，请稍等',
              span: 24,
              listType: 'picture-img',
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
              hide:true,
            },
          ]
        },
        data: [],
        checkForm: {},
        checkOption: {
          submitText: "提交",
          column: [
            {
              label: "审核理由",
              prop: "remark",
              type:'textarea',
              minRows:10,
              maxlength:200,
              span:24,
              showWordLimit:true,
              rules: [{
                required: true,
                message: "请填写审核理由",
                trigger: "blur"
              }]
            }
          ]
        }
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.driverfiles_add, false),
          viewBtn: this.vaildData(this.permission.driverfiles_view, false),
          delBtn: this.vaildData(this.permission.driverfiles_delete, false),
          editBtn: this.vaildData(this.permission.driverfiles_edit, false),
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
      check(row){
        //显示弹出框
        this.box = true;
        this.checkForm.remark = row.remark;
        this.checkForm.id = row.id;
      },
      checkSubmit(form,loading,done) {
          check(form).then(() => {
             loading();
              this.onLoad(this.page);
              this.$message({
                type: "success",
                message: `审核成功`,
              });
            this.box = false;
            done();
          }, error => {
            console.log(error);
            this.box = false;
          });
        done();
      },
      searchReset() {
        this.query = {};
        console.log(this.query)
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
          let driverType={staffType:1};//司机
          getList(page.currentPage, page.pageSize, Object.assign(params, this.query,driverType)).then(res => {
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
