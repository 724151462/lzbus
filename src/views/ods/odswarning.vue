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
                   v-if="permission.odswarning_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odswarning";
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
              label: "信息主键编号",
              prop: "xxzjbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信息主键编号",
                trigger: "blur"
              }]
            },
            {
              label: "预警信息编号",
              prop: "yjxxbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入预警信息编号",
                trigger: "blur"
              }]
            },
            {
              label: "来源类型",
              prop: "sourceType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入来源：1:车辆，2：站点，3：其他",
                trigger: "blur"
              }]
            },
            {
              label: "来源",
              prop: "sourceId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入来源",
                trigger: "blur"
              }]
            },
            {
              label: "预警标题",
              prop: "warningName",
              hide:true,
              rules: [{
                required: true,
                message: "请输入预警标题",
                trigger: "blur"
              }]
            },
            {
              label: "类型",
              prop: "warningType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入类型：1人脸，2违禁品，3重点车站",
                trigger: "blur"
              }]
            },
            {
              label: "照片",
              prop: "photo",
              hide:true,
              rules: [{
                required: true,
                message: "请输入照片",
                trigger: "blur"
              }]
            },
            {
              label: "状态",
              prop: "state",
              hide:true,
              rules: [{
                required: true,
                message: "请输入状态，0：待处理",
                trigger: "blur"
              }]
            },
            {
              label: "是否已读",
              prop: "isRead",
              hide:true,
              rules: [{
                required: true,
                message: "请输入0：未读，1：已读",
                trigger: "blur"
              }]
            },
            {
              label: "预警接收单位_dcode",
              prop: "yjjsdwDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入预警接收单位_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "预警接收单位",
              prop: "yjjsdw",
              rules: [{
                required: true,
                message: "请输入预警接收单位",
                trigger: "blur"
              }]
            },
            {
              label: "接收时间",
              prop: "jssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接收时间",
                trigger: "blur"
              }]
            },
            {
              label: "预警级别_dcode",
              prop: "yjjbDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入预警级别_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "预警级别",
              prop: "yjjb",
              rules: [{
                required: true,
                message: "请输入预警级别",
                trigger: "blur"
              }]
            },
            {
              label: "预警发布时间",
              prop: "yjfbsj",
              type:"datetime",
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请输入预警发布时间",
                trigger: "blur"
              }]
            },
            {
              label: "预警发布时间cr",
              prop: "yjfbsjCr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入yjfbsj_cr",
                trigger: "blur"
              }]
            },
            {
              label: "预警备注",
              prop: "bz",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入预警备注",
                trigger: "blur"
              }]
            },
            {
              label: "发文字号",
              prop: "fwzh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发文字号",
                trigger: "blur"
              }]
            },
            {
              label: "发布人姓名",
              prop: "fbrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发布人姓名",
                trigger: "blur"
              }]
            },
            {
              label: "发布单位",
              prop: "fbrDwmc",
              rules: [{
                required: true,
                message: "请输入发布单位",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员编号",
              prop: "zdrybh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员编号",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员姓名",
              prop: "zdryXm",
              rules: [{
                required: true,
                message: "请输入重点人员姓名",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员外文姓名",
              prop: "zdryWwxm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员外文姓名",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员类别标记_dcode",
              prop: "zdrylbbjDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员类别标记_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员类别标记",
              prop: "zdrylbbj",
              rules: [{
                required: true,
                message: "请输入重点人员类别标记",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员细类_dcode",
              prop: "zdryxlDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员细类_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员细类",
              prop: "zdryxl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员细类",
                trigger: "blur"
              }]
            },
            {
              label: "公民身份号码",
              prop: "gmsfhm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入公民身份号码",
                trigger: "blur"
              }]
            },
            {
              label: "其它证件号码",
              prop: "zjhm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其它证件号码",
                trigger: "blur"
              }]
            },
            {
              label: "登记姓名",
              prop: "djrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入登记姓名",
                trigger: "blur"
              }]
            },
            {
              label: "登记证件号码",
              prop: "djzjhm",
              rules: [{
                required: true,
                message: "请输入登记证件号码",
                trigger: "blur"
              }]
            },
            {
              label: "登记性别",
              prop: "xbmzwz",
              rules: [{
                required: true,
                message: "请输入登记性别",
                trigger: "blur"
              }]
            },
            {
              label: "登记出生日期",
              prop: "csrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入登记出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "省市县区_dcode",
              prop: "xzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入省市县区_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "省市县区",
              prop: "xzqhmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入省市县区",
                trigger: "blur"
              }]
            },
            {
              label: "详址",
              prop: "dzmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入详址",
                trigger: "blur"
              }]
            },
            {
              label: "所属社会场所",
              prop: "ssshcs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属社会场所",
                trigger: "blur"
              }]
            },
            {
              label: "所属社会场所代码_dcode",
              prop: "ssshcsdmDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属社会场所代码_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "所属公安机关机构代码_dcode",
              prop: "gajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属公安机关机构代码_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "所属公安机关",
              prop: "gajgmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属公安机关",
                trigger: "blur"
              }]
            },
            {
              label: "活动发生时间",
              prop: "hdfssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入活动发生时间",
                trigger: "blur"
              }]
            },
            {
              label: "活动相关信息",
              prop: "hdxgxx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入活动相关信息",
                trigger: "blur"
              }]
            },
            {
              label: "动态信息类别_dcode",
              prop: "dtxxlbDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入动态信息类别_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "动态轨迹信息编号",
              prop: "dtgjxxbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入动态轨迹信息编号",
                trigger: "blur"
              }]
            },
            {
              label: "动态信息类别",
              prop: "dtxxlb",
              hide:true,
              rules: [{
                required: true,
                message: "请输入动态信息类别",
                trigger: "blur"
              }]
            },
            {
              label: "动态信息提供单位",
              prop: "dtxxtgdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入动态信息提供单位",
                trigger: "blur"
              }]
            },
            {
              label: "动态信息提供单位_dcode",
              prop: "dtxxtgdwDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入动态信息提供单位_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "信息比对时间",
              prop: "xxbdsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信息比对时间",
                trigger: "blur"
              }]
            },
            {
              label: "信息比对单位",
              prop: "xxbddw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信息比对单位",
                trigger: "blur"
              }]
            },
            {
              label: "信息比对单位_dcode",
              prop: "xxbddwDcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信息比对单位_dcode",
                trigger: "blur"
              }]
            },
            {
              label: "信息比对时间",
              prop: "xxbdsjCr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入xxbdsj_cr",
                trigger: "blur"
              }]
            },
            {
              label: "签收时限",
              prop: "qssx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入签收时限",
                trigger: "blur"
              }]
            },
            {
              label: "签收时限cr",
              prop: "qssxCr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入qssx_cr",
                trigger: "blur"
              }]
            },
            {
              label: "签收标志",
              prop: "qsbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入签收标志",
                trigger: "blur"
              }]
            },
            {
              label: "反馈情况",
              prop: "fkqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入反馈情况",
                trigger: "blur"
              }]
            },
            {
              label: "核实状态",
              prop: "hszt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入核实状态",
                trigger: "blur"
              }]
            },
            {
              label: "研判类型",
              prop: "yplx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入研判类型",
                trigger: "blur"
              }]
            },
            {
              label: "首次处置反馈时限",
              prop: "scczfksx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入首次处置反馈时限",
                trigger: "blur"
              }]
            },
            {
              label: "首次处置反馈时限_cr",
              prop: "scczfksxCr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入scczfksx_cr",
                trigger: "blur"
              }]
            },
            {
              label: "布单位机构代码",
              prop: "bkdwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入布单位机构代码",
                trigger: "blur"
              }]
            },
           /* {
              label: "dindate_cr",
              prop: "dindateCr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入dindate_cr",
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
          addBtn: this.vaildData(this.permission.odswarning_add, false),
          viewBtn: this.vaildData(this.permission.odswarning_view, false),
          delBtn: this.vaildData(this.permission.odswarning_delete, false),
          editBtn: this.vaildData(this.permission.odswarning_edit, false)
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
