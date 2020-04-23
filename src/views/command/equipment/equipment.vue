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
                   v-if="permission.equipment_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row}" slot="supplyId">
        <el-tag>{{row.supplyName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/command/equipment/equipment";
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
              label: "设备号",
              prop: "code",
              search:true,
              rules: [{
                required: true,
                message: "请输入设备号",
                trigger: "blur"
              }]
            },
            {
              label: "设备名称",
              prop: "equipmentName",
              search:true,
              rules: [{
                required: true,
                message: "请输入设备名称",
                trigger: "blur"
              }]
            },
            {
              label: "设备类型",
              prop: "equipmentType",
              type:"select",
              dicUrl:"/api/blade-system/dict-biz/dictionary?code=equipment_type",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search:true,
              rules: [{
                required: true,
                message: "请选择设备类型",
                trigger: "blur"
              }]
            },
            {
              label: "供应商ID",
              prop: "supplyId",
              type:"select",
              dicUrl:"/api/blade-supply/supply/getList",
              props: {
                label: "supplyName",
                value: "id"
              },
              search:true,
              formatter: function (row, value) {
                let va = "未知供应商";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: false,
                message: "请选择供应商ID",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "remark",
              type: "textarea",
              minRows:5,
              maxlength:100,
              span:12,
              showWordLimit:true,
              rules: [{
                required: false,
                message: "请输入备注",
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
          addBtn: this.vaildData(this.permission.equipment_add, false),
          viewBtn: this.vaildData(this.permission.equipment_view, false),
          delBtn: this.vaildData(this.permission.equipment_delete, false),
          editBtn: this.vaildData(this.permission.equipment_edit, false)
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
