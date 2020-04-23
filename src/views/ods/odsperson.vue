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
                   v-if="permission.odsperson_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsperson";
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
          menuWdith:150,
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
              label: "省",
              prop: "provinceId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入省",
                trigger: "blur"
              }]
            },
            {
              label: "市",
              prop: "cityId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入市",
                trigger: "blur"
              }]
            },
            {
              label: "区",
              prop: "areaId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入区",
                trigger: "blur"
              }]
            },
            {
              label: "街道",
              prop: "streetId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入街道",
                trigger: "blur"
              }]
            },
            {
              label: "政治面貌代码",
              prop: "political",
              hide:true,
              rules: [{
                required: true,
                message: "请输入政治面貌代码",
                trigger: "blur"
              }]
            },
            {
              label: "职业",
              prop: "job",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职业",
                trigger: "blur"
              }]
            },
            {
              label: "学历代码",
              prop: "edu",
              hide:true,
              rules: [{
                required: true,
                message: "请输入学历代码",
                trigger: "blur"
              }]
            },
            {
              label: "案件类别代码",
              prop: "caseCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件类别代码",
                trigger: "blur"
              }]
            },
            {
              label: "案件编号",
              prop: "caseNo",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件编号",
                trigger: "blur"
              }]
            },
            {
              label: "简要案情",
              prop: "caseRemark",
              hide:true,
              rules: [{
                required: true,
                message: "请输入简要案情",
                trigger: "blur"
              }]
            },
            {
              label: "列管人联系电话",
              prop: "managerPhone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入列管人联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "列管单位",
              prop: "managerDetp",
              hide:true,
              rules: [{
                required: true,
                message: "请输入列管单位",
                trigger: "blur"
              }]
            },
            {
              label: "列管时间",
              prop: "managerTime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入列管时间",
                trigger: "blur"
              }]
            },
            {
              label: "部级重点人员编号",
              prop: "bjzdrybh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入部级重点人员编号",
                trigger: "blur"
              }]
            },
            {
              label: "姓名",
              prop: "xm",
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },
            {
              label: "姓名拼音",
              prop: "xmpy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入姓名拼音",
                trigger: "blur"
              }]
            },
            {
              label: "外文姓名",
              prop: "wwxm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入外文姓名",
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
              label: "性别代码",
              prop: "xbCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别代码",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "xb",
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            },
            {
              label: "身份证号",
              prop: "sfzh",
              rules: [{
                required: true,
                message: "请输入身份证号",
                trigger: "blur"
              }]
            },
            {
              label: "身份证",
              prop: "gmsfhm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入身份证",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "csrq",
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "国籍",
              prop: "gj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入国籍",
                trigger: "blur"
              }]
            },
            {
              label: "国籍代码",
              prop: "gjCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入国籍_CODE",
                trigger: "blur"
              }]
            },
            {
              label: "其它证件号码",
              prop: "qtzjhm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其它证件号码",
                trigger: "blur"
              }]
            },
            {
              label: "民族",
              prop: "mz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族",
                trigger: "blur"
              }]
            },
            {
              label: "民族代码",
              prop: "mzCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族代码",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯",
              prop: "jg",
              hide:true,
              rules: [{
                required: true,
                message: "请输入籍贯",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯代码",
              prop: "jgCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入籍贯_CODE",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地省市县",
              prop: "hjdssx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍地省市县",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地省市县区划",
              prop: "hjdssxqh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍地省市县区划",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地详址",
              prop: "hjdxz",
              rules: [{
                required: true,
                message: "请输入户籍地详址",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地派出所",
              prop: "hjdpcs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍地派出所",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地派出所机构代码",
              prop: "hjdpcsjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍地派出所机构代码",
                trigger: "blur"
              }]
            },
            {
              label: "现住地省市县",
              prop: "xzdssx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住地省市县",
                trigger: "blur"
              }]
            },
            {
              label: "现住地省市县区划",
              prop: "xzdssxqh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住地省市县区划",
                trigger: "blur"
              }]
            },
            {
              label: "现住地地址名称",
              prop: "xzdxz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住地地址名称",
                trigger: "blur"
              }]
            },
            {
              label: "现住地派出所",
              prop: "xzdpcs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住地派出所",
                trigger: "blur"
              }]
            },
            {
              label: "现住地派出所机构代码",
              prop: "xzdpcsjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住地派出所机构代码",
                trigger: "blur"
              }]
            },
            {
              label: "管辖单位",
              prop: "gxdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入管辖单位",
                trigger: "blur"
              }]
            },
            {
              label: "管辖单位机构代码",
              prop: "gxdwjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入管辖单位机构代码",
                trigger: "blur"
              }]
            },
            {
              label: "立案单位",
              prop: "ladw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案单位",
                trigger: "blur"
              }]
            },
            {
              label: "立案单位机构代码",
              prop: "ladwjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案单位机构代码",
                trigger: "blur"
              }]
            },
            {
              label: "最近立案时间",
              prop: "zjlasj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最近立案时间",
                trigger: "blur"
              }]
            },
            {
              label: "案件类别代码",
              prop: "zdryxlCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件类别代码",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员类别标记代码",
              prop: "zdrylbbjCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员类别标记_CODE",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员类别编码",
              prop: "zdrylbbj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员类别编码",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员类别编码名称",
              prop: "zdrylbbjmc",
              rules: [{
                required: true,
                message: "请输入重点人员类别编码名称",
                trigger: "blur"
              }]
            },
            {
              label: "重点人员细类名称",
              prop: "zdryxlmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重点人员细类名称",
                trigger: "blur"
              }]
            },
            {
              label: "有效性",
              prop: "yxx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入有效性",
                trigger: "blur"
              }]
            },
            {
              label: "有效性代码",
              prop: "yxxCode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入有效性_CODE",
                trigger: "blur"
              }]
            },
            {
              label: "接收时间",
              prop: "jssj",
              rules: [{
                required: true,
                message: "请输入接收时间",
                trigger: "blur"
              }]
            },
            {
              label: "数据抽取",
              prop: "cqId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入数据抽取",
                trigger: "blur"
              }]
            },
            {
              label: "纳入部级重点人员库时间",
              prop: "nrbjzdryksj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入纳入部级重点人员库时间",
                trigger: "blur"
              }]
            },
            {
              label: "时间",
              prop: "sj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入时间",
                trigger: "blur"
              }]
            },
            {
              label: "记录新增时间",
              prop: "jlxzsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入记录新增时间",
                trigger: "blur"
              }]
            },
            {
              label: "记录撤销时间",
              prop: "jlcxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入记录撤销时间",
                trigger: "blur"
              }]
            },
            {
              label: "记录变更时间",
              prop: "jlbgsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入记录变更时间",
                trigger: "blur"
              }]
            },
            {
              label: "最后更新时间",
              prop: "zhgxsj",
              rules: [{
                required: true,
                message: "请输入最后更新时间",
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
          addBtn: this.vaildData(this.permission.odsperson_add, false),
          viewBtn: this.vaildData(this.permission.odsperson_view, false),
          delBtn: this.vaildData(this.permission.odsperson_delete, false),
          editBtn: this.vaildData(this.permission.odsperson_edit, false)
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
