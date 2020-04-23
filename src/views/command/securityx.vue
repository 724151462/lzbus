<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               :upload-before="uploadBefore"
               :upload-after="uploadAfter"
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
                   v-if="permission.securityx_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="{row}"
                slot="lineId">
        <el-tag>{{row.lineName}}</el-tag>
      </template>
      <template slot-scope="{row}"
                slot="stationId">
        <el-tag>{{row.stationName}}</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/security/securityx";
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
              label: "标题",
              width:220,
              prop: "title",
              search: true,
              rules: [{
                required: true,
                message: "请输入标题",
                trigger: "blur"
              }]
            },
           /* {
              label: "区域",
              prop: "areaId",
              type:"select",
              dicUrl:"/api/blade-region/region/areasofsetting",
              props: {
                label: "name",
                value: "id"
              },
              search:true,
              cascaderItem: ['lineId', 'stationId'],
              rules: [{
                required: true,
                message: "请输入区域",
                trigger: "blur"
              }]
            },*/
            {
              label: "线路",
              width:120,
              prop: "lineId",
              type: "select",
              cascaderItem: ['stationId'],
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
            {
              label: "站点",
              width:120,
              prop: "stationId",
              type: "select",
              dicUrl: "/api/blade-stressperson/station/getLineStationSelect?lineId={{key}}",
              props: {
                label: "stationName",
                value: "id"
              },
              slot: true,
              search: true,
              rules: [{
                required: true,
                message: "请选择站点",
                trigger: "blur"
              }]
            },
           /* {
              label: "图片类型",
              prop: "imageType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入图片类型",
                trigger: "blur"
              }]
            },*/
            {
              label: "地址",
              prop: "address",
              type:"textarea",
              width:360,
              minRows:2,
              rules: [{
                required: true,
                message: "请输入地址",
                trigger: "blur"
              }]
            },
            {
              label: "说明",
              prop: "remark",
              type:"textarea",
              minRows:5,
              maxlength:100,
              span:12,
              showWordLimit:true,
              hide:true,
              rules: [{
                required: false,
                message: "请输入说明",
                trigger: "blur"
              }]
            },
            {
              label: "图片",
              prop: "path",
              type: 'upload',
              width:120,
              height:70,
              listType: 'picture-img',
              propsHttp: {
                res: 'data',
                url: 'link',
              },
              canvasOption: {
                text: ' ',
                ratio: 0.1
              },
              action: '/api/blade-resource/oss/endpoint/put-file',
              tip: '只能上传jpg/png图片，且不超过500kb',
              span: 12,
              rules: [{
                required: true,
                message: "请上传图片",
                trigger: "blur"
              }]
            },
            {
              label: "图片大小",
              prop: "imageSize",
              hide:true,
              display:false,
              rules: [{
                required: true,
                message: "请输入图片大小",
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
          addBtn: this.vaildData(this.permission.securityx_add, false),
          viewBtn: this.vaildData(this.permission.securityx_view, false),
          delBtn: this.vaildData(this.permission.securityx_delete, false),
          editBtn: this.vaildData(this.permission.securityx_edit, false)
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
      uploadBefore(file, done, loading,column) {
        console.log(file,column)
        this.form.imageSize = file.size;//获取图片大小
        //如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
       // var newFile = new File([file], '1234', { type: file.type });
       // done(newFile)
        done()
        //this.$message.success('上传前的方法')
      },
      uploadAfter(res, done, loading,column) {
       // console.log(res,column)
        done()
       // this.$message.success('上传后的方法')
      },
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
