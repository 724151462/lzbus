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
                   v-if="permission.person_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>

      <template slot="relPersonForm" slot-scope="scope">
        <avue-crud :option="relPersonOption"
                   :data="relPersonDate"
                   @row-save="rowRelPersonSave"
                   @row-del="rowRelPersonDel"
                   @refresh-change="refreshRelPerson"
                   ref="crud2">
        </avue-crud>
      </template>


    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove, getPrimarykey} from "@/api/stressperson/person";
  import {
    getRelPersonList,
    addRelPerson,
    removeRelPerson
  } from "@/api/stressperson/personrelation";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {

        relPersonDate: [],
        relPersonOption: {
          title: '同案人员',
          delBtn: true,
          editBtn: false,
          addBtn: true,
          selection: false,
          columnBtn: false,
          refreshBtn: false,
          align: "center",
          column: [
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
              label: "身份证",
              prop: "idCard",
              rules: [{
                required: true,
                message: "请输入身份证",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              addDisplay: false,
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            }
          ]
        },


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
          dialogDirection:'rtl',
          dialogType:'drawer',
          height: 'auto',
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
            /*{
              label: '省份',
              prop: 'provinceId',
              type: 'select',
              search:true,
              hide:true,
              cascaderItem: ['cityId', 'areaId'],
              props: {
                label: 'name',
                value: 'id'
              },
              dicFormatter:(res)=>{
                return res.data;//返回字典的层级结构
              },
              dicUrl: `/api/blade-region/region/region?parentId=1`,
              rules: [{
                required: true,
                message: '请选择省份',
                trigger: 'blur'
              }]
            },
            {
              label: '城市',
              prop: 'cityId',
              type: 'select',
              dicFlag: false,
              hide:true,
              search:true,
              props: {
                label: 'name',
                value: 'id'
              },
              dicUrl: `/api/blade-region/region/region?parentId={{key}}`,
              rules: [{
                required: true,
                message: '请选择城市',
                trigger: 'blur'
              }]
            },
            {
              label: '地区',
              prop: 'areaId',
              type: 'select',
              dicFlag: false,
              hide:true,
              search:true,
              props: {
                label: 'name',
                value: 'id'
              },
              dicUrl: `/api/blade-region/region/region?parentId={{key}}`,
              rules: [{
                required: true,
                message: '请选择地区',
                trigger: 'blur'
              }]
            },*/
            // {
            //   label: '街道',
            //   prop: 'streetId',
            //   type: 'select',
            //   dicFlag: false,
            //   search:true,
            //   hide : true,
            //   props: {
            //     label: 'name',
            //     value: 'id'
            //   },
            //   dicUrl: `/api/blade-region/region/region?parentId={{key}}`,
            //   rules: [{
            //     required: true,
            //     message: '请选择街道',
            //     trigger: 'blur'
            //   }]
            // },
            {
              label: "省份",
              prop: "provinceName",
              addDisplay:false,
              editDisplay:false,
  /*            viewDisplay:false,*/
            },
            {
              label: "城市",
              prop: "cityName",
              addDisplay:false,
              editDisplay:false,
             /* viewDisplay:false,*/
            },	{
              label: "地区",
              prop: "areaName",
              addDisplay:false,
              editDisplay:false,
              /*viewDisplay:false,*/
            },
            {
              label: "姓名",
              prop: "realName",
              search:true,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            },

            {
              label: "身份证",
              prop: "idCard",
              hide : true,
              search:true,
              rules: [{
                required: true,
                message: "请输入身份证",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "sex",
              type: "radio",
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=sex",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "选择",
                trigger: "blur"
              }]
            },
            {
              label: '照片',
              prop: 'photo',
              type: 'upload',
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
              tip: '只能上传jpg/png头像照片，且不超过500kb',
              span: 12,
            },
            {
              label: "简要案情",
              prop: "caseRemark",
              type: "textarea",
              maxRows : 16,
              minRows : 8,
              span: 12,
              hide : true,
              rules: [{
                required: true,
                message: "请输入简要案情",
                trigger: "blur"
              }]
            },

            {
              label: "政治面貌",
              prop: "political",
              type: 'select',
              hide : true,
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=political",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入政治面貌",
                trigger: "blur"
              }]
            },
            {
              label: "职业",
              prop: "job",
              hide : true,
              rules: [{
                // required: true,
                message: "请输入职业",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "birthday",
              type: "date",
              format: 'yyyy-MM-dd',
              width: 95,
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "学历",
              prop: "edu",
              type: 'select',
              hide : true,
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=edu",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入学历",
                trigger: "blur"
              }]
            },
            {
              label: "民族",
              prop: "nation",
              type: 'select',
              dicUrl: "/api/blade-system/dict-biz/dictionary?code=nation",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入民族",
                trigger: "blur"
              }]
            },
            {
              label: "地址",
              prop: "address",
              hide : true,
              rules: [{
                // required: true,
                message: "请输入地址",
                trigger: "blur"
              }]
            },
            // {
            //   label: "重点人员类别",
            //   prop: "typeCode",
            //   type: 'select',
            //   dicUrl: "/api/blade-system/dict-biz/dictionary?code=type_code",
            //   props: {
            //     label: "dictValue",
            //     value: "dictKey"
            //   },
            //   hide:true,
            //   rules: [{
            //     required: true,
            //     message: "请选择重点人员类别",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "重点人员类别",
              prop: "typeName",
              addDisplay:false,
              editDisplay:false,
              // viewDisplay:false,
            },

            {
              label: "案件名称",
              prop: "caseName",
              addDisplay:false,
              editDisplay:false,
              // viewDisplay:false,
            },
            // {
            //   label: "案件类别",
            //   prop: "caseCode",
            //   type: 'select',
            //   dicUrl: "/api/blade-system/dict-biz/dictionary?code=case_code",
            //   props: {
            //     label: "dictValue",
            //     value: "dictKey"
            //   },
            //   hide:true,
            //   rules: [{
            //     required: true,
            //     message: "请输入案件类别",
            //     trigger: "blur"
            //   }]
            // },
            {
              label: "案件编号",
              prop: "caseNo",
              hide : true,
              rules: [{
                // required: true,
                message: "请输入案件编号",
                trigger: "blur"
              }]
            },
            {
              label: "列管单位",
              prop: "managerDetp",
              hide : true,
              rules: [{
                // required: true,
                message: "请输入列管单位",
                trigger: "blur"
              }]
            },
            {
              label: "列管人联系电话",
              prop: "managerPhone",
              rules: [{
                // required: true,
                message: "请输入列管人联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "列管时间",
              prop: "managerTime",
              hide : true,
              width: 95,
              type: "date",
              format: 'yyyy-MM-dd',
              valueFormat: 'yyyy-MM-dd',
              rules: [{
                // required: true,
                message: "请输入列管时间",
                trigger: "blur"
              }]
            },
            {
              labelWidth: 0,
              label: '',
              prop: 'relPerson',
              span: 24,
              hide: true,
              addDisplay: true,
              formslot: true,
            }
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.person_add, false),
          viewBtn: this.vaildData(this.permission.person_view, false),
          delBtn: this.vaildData(this.permission.person_delete, false),
          editBtn: this.vaildData(this.permission.person_edit, false)
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
      //**************************************同案人员*********************************************
      getList: function (personId) {
        getRelPersonList(personId).then(res => {
          this.relPersonDate = res.data.data;
        });
      },
      rowRelPersonSave(row, loading, done) {
        row.personId = this.form.id;
        addRelPerson(row).then(() => {
          loading();
          this.refreshRelPerson();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowRelPersonDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return removeRelPerson(row.id);
          })
          .then(() => {
            this.refreshRelPerson();
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      refreshRelPerson() {
        this.getList(this.form.id);
      },
      beforeOpen(done, type) {
        this.form.sex = "0";
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
          //编辑和查看重点人员时，查询同案人员
          this.getList(this.form.id);
        }
        //新增重点人员时先,生成重点人员主键，与同案人员关联
        if (["add"].includes(type)) {
          getPrimarykey().then(res => {
            // console.log(res.data.data);
            this.form.id = res.data.data;
            this.getList(0);
          });
        }
        done();
      },
      //**************************************同案人员*********************************************
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
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
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
