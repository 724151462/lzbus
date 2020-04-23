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
                   v-if="permission.warninginfo_delete"
                   @click="handleDelete">删 除
        </el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-edit"
                   plain
                   v-if="permission.stateRemarkBtn"
                   @click="handleRemark">处 理
        </el-button>
      </template>
    </avue-crud>

    <el-dialog title="警情处理日志" append-to-body :visible.sync="box" width="800px">
      <avue-form ref="form" :option="remarkOption" v-model="remarkForm" @submit="remarkSubmit"/>
    </el-dialog>

  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove,submitRemark} from "@/api/warning/warninginfo";
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
              cascaderItem: ['stationId'],
              search:true,
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
              label: "站点",
              prop: "stationId",
              type: 'select',
              hide:true,
              dicUrl: `/api/blade-warning-info/warninginfo/getAreaStationSelect?areaId={{key}}`,
              props: {
                label: 'stationName',
                value: 'id'
              },
              rules: [{
                required: true,
                message: "请选择站点",
                trigger: "blur"
              }]
            },
            {
              label: "线路",
              prop: "lineId",
              type: 'select',
              hide:true,
              dicUrl: `/api/blade-line/line/getLineofsetting`,
              props: {
                label: 'lineName',
                value: 'id'
              },
              rules: [{
                required: true,
                message: "请输入线路ID",
                trigger: "blur"
              }]
            },
            {
              label: "接警编号",
              prop: "code",
              rules: [{
                required: true,
                message: "请输入接警编号",
                trigger: "blur"
              }]
            },
            {
              label: "报警方式",
              prop: "codeWay",
              type: "select",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=code_way",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择报警方式",
                trigger: "blur"
              }]
            },
            {
              label: "警情类别",
              prop: "codeType",
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=code_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择警情类别",
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
              label: "性别",
              prop: "sex",
              type: 'select',
              hide:true,
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=sex",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择性别",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              prop: "phone",
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "报警电话",
              prop: "policePhone",
              rules: [{
                required: true,
                message: "请输入报警电话",
                trigger: "blur"
              }]
            },
            {
              label: "报警时间",
              prop: "policeTime",
              type: "datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请输入报警时间",
                trigger: "blur"
              }]
            },
            {
              label: '照片',
              prop: 'photo',
              type: 'upload',
              dataType: 'string',
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
              hide:true,
            },
            {
              label: "状态",
              prop: "state",
              type: 'select',
              search:true,
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=warning_state",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
            },
            {
              label: "简要警情",
              prop: "remark",
              hide:true,
              type: "textarea",
              span:24,
              rules: [{
                required: true,
                message: "请输入简要警情",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],

        //*******************处理日志********************
        box: false,
        remarkForm: {},
        remarkOption: {
          submitText: "提交",
          column: [
            {
              label: "警情处理日志",
              prop: "stateRemark",
              addDisplay: false,
              editDisplay: false,
              type: "textarea",
              span: 24,
              rules: [{
                required: true,
                message: "请输入警情处理日志",
                trigger: "blur"
              }]
            },
          ]
        },
        //*******************处理意见********************

      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.warninginfo_add, false),
          viewBtn: this.vaildData(this.permission.warninginfo_view, false),
          delBtn: this.vaildData(this.permission.warninginfo_delete, false),
          editBtn: this.vaildData(this.permission.warninginfo_edit, false),
          stateRemarkBtn: this.vaildData(this.permission.warninginfo_stateRemark, false)
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

      //*******************警情处理日志********************
      handleRemark() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        if (this.selectionList.length > 1) {
          this.$message.warning("请选择至多一条数据");
          return;
        }
        this.box = true;
        this.remarkForm.id = this.selectionList[0].id;
        this.remarkForm.stateRemark = this.selectionList[0].stateRemark;
      },
      remarkSubmit(row, done) {
        submitRemark(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "提交警情处理日志成功!"
          });
          this.box = false,
            done();
        }, error => {
          done();
          console.log(error);
        });
      },
      //*******************警情处理日志********************

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
