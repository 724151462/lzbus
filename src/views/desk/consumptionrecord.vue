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
                   v-if="permission.consumptionrecord_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/desk/consumptionrecord";
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
          column: [
            {
              label: "导入类型",
              prop: "importType",
              rules: [{
                required: true,
                message: "请输入导入类型",
                trigger: "blur"
              }]
            },
            {
              label: "用户名",
              prop: "userName",
              rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
              }]
            },
            {
              label: "手机号",
              prop: "mobile",
              rules: [{
                required: true,
                message: "请输入手机号",
                trigger: "blur"
              }]
            },
            {
              label: "身份证号",
              prop: "idNumber",
              rules: [{
                required: true,
                message: "请输入身份证号",
                trigger: "blur"
              }]
            },
            {
              label: "交易时间",
              prop: "tradeTime",
              rules: [{
                required: true,
                message: "请输入交易时间",
                trigger: "blur"
              }]
            },
            {
              label: "交易金额",
              prop: "tradeAmount",
              rules: [{
                required: true,
                message: "请输入交易金额",
                trigger: "blur"
              }]
            },
            {
              label: "分公司",
              prop: "filiale",
              rules: [{
                required: true,
                message: "请输入分公司",
                trigger: "blur"
              }]
            },
            {
              label: "线路名称",
              prop: "routeName",
              rules: [{
                required: true,
                message: "请输入线路名称",
                trigger: "blur"
              }]
            },
            {
              label: "车号",
              prop: "carNumber",
              rules: [{
                required: true,
                message: "请输入车号",
                trigger: "blur"
              }]
            },
            {
              label: "司机工号",
              prop: "driverJobNumber",
              rules: [{
                required: true,
                message: "请输入司机工号",
                trigger: "blur"
              }]
            },
            {
              label: "司机名称",
              prop: "driverName",
              rules: [{
                required: true,
                message: "请输入司机名称",
                trigger: "blur"
              }]
            },
            {
              label: "入库时间",
              prop: "inStorageTime",
              rules: [{
                required: true,
                message: "请输入入库时间",
                trigger: "blur"
              }]
            },
            {
              label: "清算时间",
              prop: "clearTime",
              rules: [{
                required: true,
                message: "请输入清算时间",
                trigger: "blur"
              }]
            },
            {
              label: "乘车方式",
              prop: "byCarType",
              rules: [{
                required: true,
                message: "请输入乘车方式",
                trigger: "blur"
              }]
            },
            {
              label: "使用渠道",
              prop: "userChannel",
              rules: [{
                required: true,
                message: "请输入使用渠道",
                trigger: "blur"
              }]
            },
            {
              label: "扣款方式",
              prop: "deductType",
              rules: [{
                required: true,
                message: "请输入扣款方式",
                trigger: "blur"
              }]
            },
            {
              label: "消费次数",
              prop: "consumeCount",
              rules: [{
                required: true,
                message: "请输入消费次数",
                trigger: "blur"
              }]
            },
            {
              label: "交易TAC值",
              prop: "tradeTac",
              rules: [{
                required: true,
                message: "请输入交易TAC值",
                trigger: "blur"
              }]
            },
            {
              label: "余额",
              prop: "balance",
              rules: [{
                required: true,
                message: "请输入余额",
                trigger: "blur"
              }]
            },
            {
              label: "消费类型",
              prop: "consumeType",
              rules: [{
                required: true,
                message: "请输入消费类型",
                trigger: "blur"
              }]
            },
            {
              label: "消费卡号",
              prop: "consumeCard",
              rules: [{
                required: true,
                message: "请输入消费卡号",
                trigger: "blur"
              }]
            },
            {
              label: "pos流水",
              prop: "posSerialNumber",
              rules: [{
                required: true,
                message: "请输入pos流水",
                trigger: "blur"
              }]
            },
            {
              label: "原因代码",
              prop: "causeCode",
              rules: [{
                required: true,
                message: "请输入原因代码",
                trigger: "blur"
              }]
            },
            {
              label: "交易标志",
              prop: "tradeMark",
              rules: [{
                required: true,
                message: "请输入交易标志",
                trigger: "blur"
              }]
            },
            {
              label: "",
              prop: "total",
              rules: [{
                required: true,
                message: "请输入",
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
          addBtn: this.vaildData(this.permission.consumptionrecord_add, false),
          viewBtn: this.vaildData(this.permission.consumptionrecord_view, false),
          delBtn: this.vaildData(this.permission.consumptionrecord_delete, false),
          editBtn: this.vaildData(this.permission.consumptionrecord_edit, false)
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
