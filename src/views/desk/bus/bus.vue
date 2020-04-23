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
                   v-if="permission.bus_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
       <template slot-scope="{row}"
                slot="busCompayId">
        <el-tag>{{row.companyName}}</el-tag>
      </template>
       <template slot-scope="{row}"
                slot="driver">
        <el-tag>{{row.driverName}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="lineId">
        <el-tag>{{row.lineName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/desk/bus/bus";
  import {mapGetters} from "vuex";
  import {getDriverSelect, getSecuritySelect} from "../../../api/desk/bus/bus";

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
              label: "所属公司",
              prop: "busCompanyId",
              type: "select",
              dicUrl: '/api/blade-bus/bus/company',
              search: true,
              cascaderItem: ['driver'],
              dicFormatter:(res)=>{
                return res.data;//返回字典的层级结构
              },
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
              label: "编号",
              prop: "code",
              search: true,
              rules: [{
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }]
            },
            {
              label: "车牌号",
              prop: "carNo",
              search: true,
              rules: [{
                required: true,
                message: "请输入车牌号",
                trigger: "blur"
              }]
            },
            {
              label: "车辆类型",
              prop: "busType",
              type: "radio",
              search: true,
               dicData: [{
                  label: '公交',
                  value: '1'
               },{
                  label: '地铁',
                  value: '2'
               }],
              rules: [{
                required: true,
                message: "请选择车辆类型",
                trigger: "blur"
              }]
            },
            {
              label: "坐位数",
              prop: "sitNum",
              hide: "true",
              rules: [{
                required: true,
                message: "请输入坐位数",
                trigger: "blur"
              }]
            },
            {
              label: "司机",
              prop: "driver",
              type: 'tree',
              multiple:true,
              dicFlag: false,
              dicData: [],
              props: {
                label: "name",
                value: "id"
              },
              slot: true,
              rules: [{
                required: true,
                message: "请选择司机",
                trigger: "blur"
              }]
            },
            {
              label: "保安",
              prop: "security",
              type: 'tree',
              multiple:true,
              dicData: [],
              props: {
                label: "name",
                value: "id"
              },
              hide: "true",
              slot: true,
              rules: [{
                required: true,
                message: "请选择保安",
                trigger: "blur"
              }]
            },

            {
              label: "运营时间",
              prop: "workTime",
              type: "datetime",
              search: true,
              format: "yyyy-MM-dd HH:mm:ss",
              valueFormat: "yyyy-MM-dd HH:mm:ss",
              rules: [{
                required: true,
                message: "请选择开始运营时间",
                trigger: "click"
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
              slot: true,
              search: true,
              rules: [{
                required: true,
                message: "请选择线路",
                trigger: "blur"
              }]
            },


          ]
        },
        data: []
      };
    },
    watch: {
      'form.busCompanyId'() {
        let busCompanyId = this.form.busCompanyId;
        if (busCompanyId != undefined && busCompanyId != '') {
            getSecuritySelect(busCompanyId).then(res => {
            //当前字段数据是否存在下拉列表中，不存在需清空值，负责会显示错误的id
            let data = JSON.stringify(res.data.data);
            if (data.indexOf(this.form.security) < 0) {
              this.form.security = '';
            }
            //为下拉框赋下拉列表数据
            this.option.column[this.$refs.crud.findColumnIndex("security")].dicData = res.data.data;
          });
            getDriverSelect(busCompanyId).then(res => {
            //当前字段数据是否存在下拉列表中，不存在需清空值，负责会显示错误的id
            let data = JSON.stringify(res.data.data);
            if (data.indexOf(this.form.driver) < 0) {
              this.form.driver = '';
            }
            //为下拉框赋下拉列表数据
            this.option.column[this.$refs.crud.findColumnIndex("driver")].dicData = res.data.data;
          });
        }
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.bus_add, false),
          viewBtn: this.vaildData(this.permission.bus_view, false),
          delBtn: this.vaildData(this.permission.bus_delete, false),
          editBtn: this.vaildData(this.permission.bus_edit, false)
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
        row.driver = row.driver.join(",");
        row.security = row.security.join(",");
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
        row.driver = row.driver.join(",");
        row.security = row.security.join(",");
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
          if(this.form.hasOwnProperty("driver")){
              this.form.driver = this.form.driver.split(",");
              this.form.driver.forEach((ele, index) => {
                this.form.driver[index] = Number(ele);
              });
            }
          if(this.form.hasOwnProperty("security")){
              this.form.security = this.form.security.split(",");
              this.form.security.forEach((ele, index) => {
                this.form.security[index] = Number(ele);
              });
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
