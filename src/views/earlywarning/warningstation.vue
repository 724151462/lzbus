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
                   v-if="permission.warning_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/earlywarning/warning";
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
              label: "预警标题",
              prop: "warningName",
              span: 24,
              rules: [{
                required: true,
                message: "请输入预警标题",
                trigger: "blur"
              }]
            },
            {
              label: "来源",
              prop: "sourceType",
              type: 'select',
              search:true,
              cascaderItem: ['stationId'],
              dicUrl: "/api/blade-system/dict-biz/dictionarywithdictKey?code=source_type&dictKey=1,2",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              dicFormatter:(res)=>{
                return res.data;//返回字典的层级结构
              },
              rules: [{
                required: true,
                message: "请选择来源",
                trigger: "blur"
              }]
            },
            {
              label: "具体来源",
              prop: "sourceId",
              type: 'tree',
              search:true,
              dicUrl: `/api/blade-earlywarning-monitor/warning/sourceids-select?sourcetype={{key}}`,
              props: {
                label: 'clearSourceName',
                value: 'clearSourceId'
              },
              rules: [{
                required: true,
                message: "请选择具体来源",
                trigger: "blur"
              }]
            },
            {
              label: "预警备注",
              prop: "remark",
              type: "textarea",
              hide:true,
              span: 24,
            },
            {
              label: "类型",
              prop: "warningType",
              type: 'select',
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
              dicUrl: "/api/blade-system/dict-biz/dictionarywithdictKey?code=warning_type&dictKey=3",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择类型",
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
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=warning_state",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
            },
            {
              label: "是否已读",
              prop: "isRead",
              addDisplay:false,
              editDisplay:false,
              viewDisplay:false,
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=warning_is_read",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
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
          addBtn: this.vaildData(this.permission.warningface_add, false),
          viewBtn: this.vaildData(this.permission.warningface_view, false),
          delBtn: this.vaildData(this.permission.warningface_delete, false),
          editBtn: this.vaildData(this.permission.warningface_edit, false)
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
        row.warningType = "3";
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
        row.warningType = "3";
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
        params.warningType = '3';
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
