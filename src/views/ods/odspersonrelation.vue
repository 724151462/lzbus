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
                   v-if="permission.odspersonrelation_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odspersonrelation";
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
              label: "看守所编号",
              prop: "kssbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入看守所编号",
                trigger: "blur"
              }]
            },
            {
              label: "出入所登记ID",
              prop: "crsid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出入所登记ID",
                trigger: "blur"
              }]
            },
            {
              label: "管理类别编码",
              prop: "gllbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入管理类别编码",
                trigger: "blur"
              }]
            },
            {
              label: "管理类别名称",
              prop: "gllbmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入管理类别名称",
                trigger: "blur"
              }]
            },
            {
              label: "在押人员编号",
              prop: "systemid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入在押人员编号",
                trigger: "blur"
              }]
            },
            {
              label: "在押人员姓名",
              prop: "xm",
              rules: [{
                required: true,
                message: "请输入在押人员姓名",
                trigger: "blur"
              }]
            },
            {
              label: "姓名_拼音",
              prop: "xmPy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入姓名_拼音",
                trigger: "blur"
              }]
            },
            {
              label: "别名",
              prop: "bmch",
              rules: [{
                required: true,
                message: "请输入别名",
                trigger: "blur"
              }]
            },
            {
              label: "别名_拼音",
              prop: "bmchPy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入别名_拼音",
                trigger: "blur"
              }]
            },
            {
              label: "曾用名",
              prop: "cym",
              hide:true,
              rules: [{
                required: true,
                message: "请输入曾用名",
                trigger: "blur"
              }]
            },
            {
              label: "性别编码",
              prop: "xbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别编码",
                trigger: "blur"
              }]
            },
            {
              label: "性别名称",
              prop: "xbmc",
              rules: [{
                required: true,
                message: "请输入性别名称",
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
              label: "政治面貌编码",
              prop: "zzmmdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入政治面貌编码",
                trigger: "blur"
              }]
            },
            {
              label: "政治面貌名称",
              prop: "zzmm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入政治面貌名称",
                trigger: "blur"
              }]
            },
            {
              label: "证件类型编码",
              prop: "zjlxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入证件类型编码",
                trigger: "blur"
              }]
            },
            {
              label: "证件类型名称",
              prop: "zjlxmc",
              rules: [{
                required: true,
                message: "请输入证件类型名称",
                trigger: "blur"
              }]
            },
            {
              label: "证件号码",
              prop: "zjhm",
              rules: [{
                required: true,
                message: "请输入证件号码",
                trigger: "blur"
              }]
            },
            {
              label: "婚姻状况编码",
              prop: "hyzkdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入婚姻状况编码",
                trigger: "blur"
              }]
            },
            {
              label: "婚姻状况名称",
              prop: "hyzk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入婚姻状况名称",
                trigger: "blur"
              }]
            },
            {
              label: "民族编码",
              prop: "mzdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族编码",
                trigger: "blur"
              }]
            },
            {
              label: "民族名称",
              prop: "mzmc",
              rules: [{
                required: true,
                message: "请输入民族名称",
                trigger: "blur"
              }]
            },
            {
              label: "国籍编码",
              prop: "gjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入国籍编码",
                trigger: "blur"
              }]
            },
            {
              label: "国籍名称",
              prop: "gjmc",
              rules: [{
                required: true,
                message: "请输入国籍名称",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯编码",
              prop: "jgssxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入籍贯编码",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯名称",
              prop: "jgssxmc",
              rules: [{
                required: true,
                message: "请输入籍贯名称",
                trigger: "blur"
              }]
            },
            {
              label: "专长编码",
              prop: "zcdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入专长编码",
                trigger: "blur"
              }]
            },
            {
              label: "专长名称",
              prop: "zcmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入专长名称",
                trigger: "blur"
              }]
            },
            {
              label: "体型编码",
              prop: "txdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入体型编码",
                trigger: "blur"
              }]
            },
            {
              label: "体型名称",
              prop: "txmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入体型名称",
                trigger: "blur"
              }]
            },
            {
              label: "体重",
              prop: "tz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入体重",
                trigger: "blur"
              }]
            },
            {
              label: "脸型编码",
              prop: "lxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入脸型编码",
                trigger: "blur"
              }]
            },
            {
              label: "脸型名称",
              prop: "lxmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入脸型名称",
                trigger: "blur"
              }]
            },
            {
              label: "血压",
              prop: "xueya",
              hide:true,
              rules: [{
                required: true,
                message: "请输入血压",
                trigger: "blur"
              }]
            },
            {
              label: "血型编码",
              prop: "xxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入血型编码",
                trigger: "blur"
              }]
            },
            {
              label: "血型名称",
              prop: "xxmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入血型名称",
                trigger: "blur"
              }]
            },
            {
              label: "足长",
              prop: "zc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入足长",
                trigger: "blur"
              }]
            },
            {
              label: "身高",
              prop: "sg",
              hide:true,
              rules: [{
                required: true,
                message: "请输入身高",
                trigger: "blur"
              }]
            },
            {
              label: "文化程度编码",
              prop: "xldm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入文化程度编码",
                trigger: "blur"
              }]
            },
            {
              label: "文化程度名称",
              prop: "whcd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入文化程度名称",
                trigger: "blur"
              }]
            },
            {
              label: "职业编码",
              prop: "zydm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职业编码",
                trigger: "blur"
              }]
            },
            {
              label: "职业名称",
              prop: "zymc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职业名称",
                trigger: "blur"
              }]
            },
            {
              label: "工作单位",
              prop: "gzdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入工作单位",
                trigger: "blur"
              }]
            },
            {
              label: "身份编码",
              prop: "sfdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入身份编码",
                trigger: "blur"
              }]
            },
            {
              label: "身份名称",
              prop: "sfmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入身份名称",
                trigger: "blur"
              }]
            },
            {
              label: "职级编码",
              prop: "zjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职级编码",
                trigger: "blur"
              }]
            },
            {
              label: "职级名称",
              prop: "zjmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职级名称",
                trigger: "blur"
              }]
            },
            {
              label: "职务",
              prop: "zw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职务",
                trigger: "blur"
              }]
            },
            {
              label: "特殊身份编码",
              prop: "tssfdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入特殊身份编码",
                trigger: "blur"
              }]
            },
            {
              label: "特殊身份名称",
              prop: "tssfmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入特殊身份名称",
                trigger: "blur"
              }]
            },
            {
              label: "有无前科",
              prop: "ywqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入有无前科",
                trigger: "blur"
              }]
            },
            {
              label: "户籍所在地编码",
              prop: "hjdxzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍所在地编码",
                trigger: "blur"
              }]
            },
            {
              label: "户籍所在地名称",
              prop: "hjdxzqhmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍所在地名称",
                trigger: "blur"
              }]
            },
            {
              label: "户籍地详址",
              prop: "hjdxxdz",
              rules: [{
                required: true,
                message: "请输入户籍地详址",
                trigger: "blur"
              }]
            },
            {
              label: "现住址区划编码",
              prop: "xzzxzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住址区划编码",
                trigger: "blur"
              }]
            },
            {
              label: "现住址区划名称",
              prop: "xzzxzqhmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住址区划名称",
                trigger: "blur"
              }]
            },
            {
              label: "现住址详址",
              prop: "xzzxxdz",
              rules: [{
                required: true,
                message: "请输入现住址详址",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              prop: "lxdh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "监室编号",
              prop: "jsbh",
              rules: [{
                required: true,
                message: "请输入监室编号",
                trigger: "blur"
              }]
            },
            {
              label: "人员类型标记",
              prop: "rylb",
              hide:true,
              rules: [{
                required: true,
                message: "请输入人员类型标记",
                trigger: "blur"
              }]
            },
            {
              label: "是否临时羁押",
              prop: "sflsjy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否临时羁押",
                trigger: "blur"
              }]
            },
            {
              label: "是否重点人员",
              prop: "sfzdry",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否重点人员",
                trigger: "blur"
              }]
            },
            {
              label: "是否严管人员",
              prop: "sfygry",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否严管人员",
                trigger: "blur"
              }]
            },
            {
              label: "是否耳目",
              prop: "sfem",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否耳目",
                trigger: "blur"
              }]
            },
            {
              label: "是否使用戒具",
              prop: "sfsyjj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否使用戒具",
                trigger: "blur"
              }]
            },
            {
              label: "是否禁闭",
              prop: "sfjb",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否禁闭",
                trigger: "blur"
              }]
            },
            {
              label: "是否已决",
              prop: "sfyj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否已决",
                trigger: "blur"
              }]
            },
            {
              label: "是否涉密",
              prop: "sfsm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否涉密",
                trigger: "blur"
              }]
            },
            {
              label: "是否重要案犯",
              prop: "sfzyaf",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否重要案犯",
                trigger: "blur"
              }]
            },
            {
              label: "受过何种处罚",
              prop: "sghzcf",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受过何种处罚",
                trigger: "blur"
              }]
            },
            {
              label: "人员简历",
              prop: "ryjl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入人员简历",
                trigger: "blur"
              }]
            },
            {
              label: "人员基本信息备注",
              prop: "ryjbxxbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入人员基本信息备注",
                trigger: "blur"
              }]
            },
            {
              label: "可否出所",
              prop: "kfcs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入可否出所",
                trigger: "blur"
              }]
            },
            {
              label: "是否出所",
              prop: "sfcs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否出所",
                trigger: "blur"
              }]
            },
            {
              label: "出所处理状态",
              prop: "csclzt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出所处理状态",
                trigger: "blur"
              }]
            },
            {
              label: "是否留所服刑",
              prop: "sflsfx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否留所服刑",
                trigger: "blur"
              }]
            },
            {
              label: "留所服刑日期",
              prop: "lsfxrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入留所服刑日期",
                trigger: "blur"
              }]
            },
            {
              label: "Y档案编号",
              prop: "dabh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入Y档案编号",
                trigger: "blur"
              }]
            },
            {
              label: "是否爱滋病携带者",
              prop: "sfazbxdz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否爱滋病携带者",
                trigger: "blur"
              }]
            },
            {
              label: "是否爱滋病患者",
              prop: "sfazbhz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否爱滋病患者",
                trigger: "blur"
              }]
            },
            {
              label: "是否经鉴定的精神病人",
              prop: "sfjjddjsbr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否经鉴定的精神病人",
                trigger: "blur"
              }]
            },
            {
              label: "同案人员",
              prop: "tary",
              hide:true,
              rules: [{
                required: true,
                message: "请输入同案人员",
                trigger: "blur"
              }]
            },
            {
              label: "铺位号",
              prop: "pwh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入铺位号",
                trigger: "blur"
              }]
            },
            {
              label: "档案修改时间",
              prop: "daxgsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入档案修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "表现情况",
              prop: "bxqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入表现情况",
                trigger: "blur"
              }]
            },
            {
              label: "表现情况编码",
              prop: "bxqkdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入表现情况编码",
                trigger: "blur"
              }]
            },
            {
              label: "指纹号",
              prop: "zwh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入指纹号",
                trigger: "blur"
              }]
            },
            {
              label: "核查状态",
              prop: "hczt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入核查状态",
                trigger: "blur"
              }]
            },
            {
              label: "是否吸毒人员",
              prop: "sfxd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否吸毒人员",
                trigger: "blur"
              }]
            },
            {
              label: "是否预警",
              prop: "sfcqjyyj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否预警",
                trigger: "blur"
              }]
            },
            {
              label: "信件是否交由看守所处理",
              prop: "sjsfjyksscl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信件是否交由看守所处理",
                trigger: "blur"
              }]
            },
            {
              label: "不计入超期羁押其他原因",
              prop: "qtyy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入不计入超期羁押其他原因",
                trigger: "blur"
              }]
            },
            {
              label: "不计入超期羁押原因代码",
              prop: "bjcqjybm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入不计入超期羁押原因代码,对应字典的CLASSID为BJCQJYYY",
                trigger: "blur"
              }]
            },
            {
              label: "删除标识",
              prop: "deleteflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入删除标识",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "gxsj",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
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
          addBtn: this.vaildData(this.permission.odspersonrelation_add, false),
          viewBtn: this.vaildData(this.permission.odspersonrelation_view, false),
          delBtn: this.vaildData(this.permission.odspersonrelation_delete, false),
          editBtn: this.vaildData(this.permission.odspersonrelation_edit, false)
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
