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
                   v-if="permission.odsschedule_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsschedule";
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
              label: "系统编号",
              prop: "systemid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入系统编号",
                trigger: "blur"
              }]
            },
            {
              label: "计划编号",
              prop: "jhbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入计划编号",
                trigger: "blur"
              }]
            },
            {
              label: "日期",
              prop: "xlrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入日期",
                trigger: "blur"
              }]
            },
            {
              label: "巡逻区域编号",
              prop: "xlqybh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入巡逻区域编号",
                trigger: "blur"
              }]
            },
            {
              label: "巡逻区域名称",
              prop: "xlqymc",
              rules: [{
                required: true,
                message: "请输入巡逻区域名称",
                trigger: "blur"
              }]
            },
            {
              label: "警区编号",
              prop: "jqbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警区编号",
                trigger: "blur"
              }]
            },
            {
              label: "警区名称",
              prop: "jqmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警区名称",
                trigger: "blur"
              }]
            },
            {
              label: "巡区编号",
              prop: "xqbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入巡区编号",
                trigger: "blur"
              }]
            },
            {
              label: "巡区名称",
              prop: "xqmc",
              rules: [{
                required: true,
                message: "请输入巡区名称",
                trigger: "blur"
              }]
            },
            {
              label: "呼号",
              prop: "hh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入呼号",
                trigger: "blur"
              }]
            },
            {
              label: "巡逻开始时间",
              prop: "xlkssj",
              rules: [{
                required: true,
                message: "请输入巡逻开始时间",
                trigger: "blur"
              }]
            },
            {
              label: "巡逻结束时间",
              prop: "xljssj",
              rules: [{
                required: true,
                message: "请输入巡逻结束时间",
                trigger: "blur"
              }]
            },
            {
              label: "巡逻方式 ",
              prop: "xlfs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入巡逻方式 字典项:xjtj_xlfs",
                trigger: "blur"
              }]
            },
            {
              label: "着装方式",
              prop: "zzfs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入着装方式(字典项: xjtj_zzfs)",
                trigger: "blur"
              }]
            },
            {
              label: "部门编号",
              prop: "departmentcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入部门编号 字典项：06",
                trigger: "blur"
              }]
            },
            {
              label: "密级",
              prop: "securitygrade",
              hide:true,
              rules: [{
                required: true,
                message: "请输入密级",
                trigger: "blur"
              }]
            },
            {
              label: "工歇时间",
              prop: "reservation01",
              hide:true,
              rules: [{
                required: true,
                message: "请输入工歇时间",
                trigger: "blur"
              }]
            },
            {
              label: "开始时间",
              prop: "reservation02",
              hide:true,
              rules: [{
                required: true,
                message: "请输入开始时间",
                trigger: "blur"
              }]
            },
            {
              label: "结束时间",
              prop: "reservation03",
              hide:true,
              rules: [{
                required: true,
                message: "请输入结束时间",
                trigger: "blur"
              }]
            },
            {
              label: "车牌号码",
              prop: "reservation04",
              hide:true,
              rules: [{
                required: true,
                message: "请输入车牌号码",
                trigger: "blur"
              }]
            },
            {
              label: "车辆品牌",
              prop: "reservation07",
              hide:true,
              rules: [{
                required: true,
                message: "请输入车辆品牌",
                trigger: "blur"
              }]
            },
            {
              label: "车载电话",
              prop: "reservation05",
              hide:true,
              rules: [{
                required: true,
                message: "请输入车载电话",
                trigger: "blur"
              }]
            },
            {
              label: "计划时间",
              prop: "reservation06",
              hide:true,
              rules: [{
                required: true,
                message: "请输入计划时间",
                trigger: "blur"
              }]
            },
            {
              label: "岗前确认状态",
              prop: "reservation11",
              hide:true,
              rules: [{
                required: true,
                message: "请输入岗前确认状态",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "bz",
              row:true,
              hide:true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "创建者",
              prop: "cjrxm",
              rules: [{
                required: true,
                message: "请输入创建者",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "cjsj",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "最终修改人",
              prop: "lastupdatedby",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最终修改人",
                trigger: "blur"
              }]
            },
            {
              label: "最后修改时间",
              prop: "lastupdatedtime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最后修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "refreshtime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
           {
              label: "上传标志",
              prop: "uploadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入上传标志",
                trigger: "blur"
              }]
            },
            {
              label: "下传标志",
              prop: "downloadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入下传标志",
                trigger: "blur"
              }]
            },
            {
              label: "删除标志",
              prop: "deleteflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入删除标志",
                trigger: "blur"
              }]
            },
            {
              label: "处理标识",
              prop: "vDealflag",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入处理标识",
                trigger: "blur"
              }]
            },
            {
              label: "入库时间",
              prop: "rksj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入入库时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "gxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            /*  {
              label: "保留字段12",
              prop: "reservation12",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段12",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段8",
              prop: "reservation08",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段8",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段9",
              prop: "reservation09",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段9",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段10",
              prop: "reservation10",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段10",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段13",
              prop: "reservation13",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段13",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段14",
              prop: "reservation14",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段14",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段15",
              prop: "reservation15",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段15",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段16",
              prop: "reservation16",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段16",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段17",
              prop: "reservation17",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段17",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段18",
              prop: "reservation18",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段18",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段19",
              prop: "reservation19",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段19",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段20",
              prop: "reservation20",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段20",
                trigger: "blur"
              }]
            },*/
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.odsschedule_add, false),
          viewBtn: this.vaildData(this.permission.odsschedule_view, false),
          delBtn: this.vaildData(this.permission.odsschedule_delete, false),
          editBtn: this.vaildData(this.permission.odsschedule_edit, false)
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
