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
                   v-if="permission.goods_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row}" slot="areaId">
        <el-tag>{{row.areaName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/command/goods/contraband";
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
              label: "区域",
              prop: "areaId",
              type:"select",
              dicUrl:"/api/blade-region/region/areasofsetting",
              props: {
                label: "name",
                value: "id"
              },
              search:true,
              rules: [{
                required: true,
                message: "请选择区域",
                trigger: "blur"
              }]
            },
            {
              label: "物品来源",
              prop: "sourceType",
              type:"select",
              dicUrl:"/api/blade-system/dict-biz/dictionary?code=goods_source",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search:true,
              rules: [{
                required: true,
                message: "请选择物品来源",
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
              formatter: function (row, value) {
                let va = "暂无备注";
                if(value != -1 && value !=""){
                  va = value;
                }
                return va;
              },
              rules: [{
                required: false,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
          ]
        },
        data: [],
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.relic_add, false),
          viewBtn: this.vaildData(this.permission.relic_view, false),
          delBtn: this.vaildData(this.permission.relic_delete, false),
          editBtn: this.vaildData(this.permission.relic_edit, false)
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
        add(row,2).then(() => {
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
        update(row,2).then(() => {
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
          getDetail(this.form.id,2).then(res => {
            this.form = res.data.data;
            if (this.form.remark==''||this.form.remark==null){
              this.form.remark="暂无备注";
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
        let contrabandType={contrabandType:2};//违禁品
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query,contrabandType)).then(res => {
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
