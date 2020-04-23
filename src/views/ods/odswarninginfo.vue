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
                   v-if="permission.odswarninginfo_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odswarninginfo";
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
              label: "系统编号",
              prop: "xxzjbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入系统编号",
                trigger: "blur"
              }]
            },
            {
              label: "案件编号",
              prop: "ajbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件编号",
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
              label: "站点",
              prop: "stationId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入站点",
                trigger: "blur"
              }]
            },
            {
              label: "线路",
              prop: "lineId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入线路",
                trigger: "blur"
              }]
            },
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
              label: "性别代码",
              prop: "sex",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别代码",
                trigger: "blur"
              }]
            },
            {
              label: "联系电话",
              prop: "phone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "报警电话",
              prop: "policePhone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入报警电话",
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
              row:true,
              rules: [{
                required: true,
                message: "请输入状态：0待处理",
                trigger: "blur"
              }]
            },
            {
              label: "警情名称",
              prop: "ajmc",
              rules: [{
                required: true,
                message: "请输入警情名称",
                trigger: "blur"
              }]
            },
            {
              label: "警情类别",
              prop: "jqlb",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警情类别 字典项：ASJ_JQ_1",
                trigger: "blur"
              }]
            },
            {
              label: "报警时间",
              prop: "jjsj01",
              rules: [{
                required: true,
                message: "请输入报警时间",
                trigger: "blur"
              }]
            },
            {
              label: "接警受理号_接警编号",
              prop: "slBjslh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警受理号_接警编号",
                trigger: "blur"
              }]
            },
            {
              label: "接警单位 ",
              prop: "sljjdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警单位 字典项：6",
                trigger: "blur"
              }]
            },
            {
              label: "接警人员（警号）",
              prop: "jjrJh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警人员（警号）",
                trigger: "blur"
              }]
            },
            {
              label: "接警方式",
              prop: "slJjfs",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入接警方式 字典项：81",
                trigger: "blur"
              }]
            },
            {
              label: "案别/案由",
              prop: "ab",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案别/案由 字典项：ASJ_JQ_1",
                trigger: "blur"
              }]
            },
            {
              label: "发现时间",
              prop: "fxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发现时间",
                trigger: "blur"
              }]
            },
            {
              label: "发现形式",
              prop: "fxxs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发现形式",
                trigger: "blur"
              }]
            },
            {
              label: "发案时间初值",
              prop: "asjfskssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案时间初值",
                trigger: "blur"
              }]
            },
            {
              label: "发案时间终值",
              prop: "asjfsjssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案时间终值",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_区县",
              prop: "faddQx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_区县 字典项：7",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_街道",
              prop: "faddJd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_街道 字典项：17",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点详址",
              prop: "faddDzmc",
              rules: [{
                required: true,
                message: "请输入发案地点详址",
                trigger: "blur"
              }]
            },
            {
              label: "所属警区",
              prop: "ajssjq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属警区  字典项：18",
                trigger: "blur"
              }]
            },
            {
              label: "所属社区",
              prop: "sssq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属社区  字典项：19",
                trigger: "blur"
              }]
            },
            {
              label: "简要案情",
              prop: "jyaq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入简要案情",
                trigger: "blur"
              }]
            },
           /* {
              label: "swrs",
              prop: "swrs",
              rules: [{
                required: true,
                message: "请输入swrs",
                trigger: "blur"
              }]
            },
            {
              label: "ssrs",
              prop: "ssrs",
              rules: [{
                required: true,
                message: "请输入ssrs",
                trigger: "blur"
              }]
            },*/
            {
              label: "损失折款",
              prop: "ssjz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入损失折款",
                trigger: "blur"
              }]
            },
            {
              label: "涉案总值",
              prop: "sazz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入涉案总值",
                trigger: "blur"
              }]
            },
            {
              label: "处理日志",
              prop: "slAjclqk",
              rules: [{
                required: true,
                message: "请输入处理日志",
                trigger: "blur"
              }]
            },
            {
              label: "抓获犯罪嫌疑人",
              prop: "slZhrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入抓获犯罪嫌疑人",
                trigger: "blur"
              }]
            },
            {
              label: "救助群众人数",
              prop: "slJzrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入救助群众人数",
                trigger: "blur"
              }]
            },
            {
              label: "解救拐卖妇女人数",
              prop: "slJjfnrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入解救拐卖妇女人数",
                trigger: "blur"
              }]
            },
            {
              label: "解救拐卖儿童人数",
              prop: "slJjetrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入解救拐卖儿童人数",
                trigger: "blur"
              }]
            },
            {
              label: "出警人",
              prop: "slCjry",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出警人",
                trigger: "blur"
              }]
            },
            {
              label: "出动警力",
              prop: "slCjrc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动警力",
                trigger: "blur"
              }]
            },
            {
              label: "出动机动车数量",
              prop: "slCjcl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动机动车数量",
                trigger: "blur"
              }]
            },
            {
              label: "出动船只数量",
              prop: "slCjcz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动船只数量",
                trigger: "blur"
              }]
            },
            {
              label: "出动航空器数量",
              prop: "slCjhk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动航空器数量",
                trigger: "blur"
              }]
            },
            {
              label: "领导意见",
              prop: "ldps",
              hide:true,
              rules: [{
                required: true,
                message: "请输入领导意见",
                trigger: "blur"
              }]
            },
            {
              label: "处理结果",
              prop: "jqcljgdm",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入处理结果  字典项：13",
                trigger: "blur"
              }]
            },
            {
              label: "受理时间",
              prop: "slsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受理时间",
                trigger: "blur"
              }]
            },
            {
              label: "受理人姓名/接收",
              prop: "slrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受理人姓名/接收",
                trigger: "blur"
              }]
            },
            {
              label: "受理单位/接收单位",
              prop: "sljsdw",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入受理单位/接收单位  字典项：6",
                trigger: "blur"
              }]
            },
            {
              label: "填表人",
              prop: "slLrr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入填表人",
                trigger: "blur"
              }]
            },
            {
              label: "填表时间",
              prop: "tbrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入填表时间",
                trigger: "blur"
              }]
            },
            {
              label: "移送时间",
              prop: "yssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送时间",
                trigger: "blur"
              }]
            },
            {
              label: "移送原因",
              prop: "ysyy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送原因",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位 ",
              prop: "ysdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位 字典项：6",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位承办人",
              prop: "ysdwcbr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位承办人",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位电话",
              prop: "ysdwGddh",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入移送单位电话",
                trigger: "blur"
              }]
            },
            {
              label: "部门编号",
              prop: "departmentcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入部门编号",
                trigger: "blur"
              }]
            },
            {
              label: "密级",
              prop: "mmdjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入密级",
                trigger: "blur"
              }]
            },
           /* {
              label: "密级_zw",
              prop: "mmdjZw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入mmdj_zw",
                trigger: "blur"
              }]
            },*/
            {
              label: "在案件角色 ",
              prop: "reservation01",
              hide:true,
              rules: [{
                required: true,
                message: "请输入在案件角色 ",
                trigger: "blur"
              }]
            },
            {
              label: "案别",
              prop: "reservation02",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案别 字典项：kind=24",
                trigger: "blur"
              }]
            },
            {
              label: "简要案情",
              prop: "reservation03",
              hide:true,
              rules: [{
                required: true,
                message: "请输入简要案情",
                trigger: "blur"
              }]
            },
            {
              label: "是否自主案件",
              prop: "reservation04",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否自主案件",
                trigger: "blur"
              }]
            },
            {
              label: "卷宗编号",
              prop: "reservation05",
              hide:true,
              rules: [{
                required: true,
                message: "请输入卷宗编号",
                trigger: "blur"
              }]
            },
            {
              label: "嫌疑人当前状态（预审） ",
              prop: "reservation06",
              hide:true,
              rules: [{
                required: true,
                message: "请输入嫌疑人当前状态（预审） ",
                trigger: "blur"
              }]
            },
            {
              label: "嫌疑人前一状态（预审） ",
              prop: "reservation07",
              hide:true,
              rules: [{
                required: true,
                message: "请输入嫌疑人前一状态（预审） ",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "bz",
              row:true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "数据接收时间",
              prop: "reservation39",
              hide:true,
              rules: [{
                required: true,
                message: "请输入数据接收时间",
                trigger: "blur"
              }]
            },
            {
              label: "创建者 ",
              prop: "creator",
              rules: [{
                required: true,
                message: "请输入创建者 ",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createdtime",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "最终修改人 ",
              prop: "lastupdatedby",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最终修改人 ",
                trigger: "blur"
              }]
            },
            {
              label: "最后更新时间",
              prop: "lastupdatedtime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最后更新时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "refreshtime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            {
              label: "上传标识",
              prop: "uploadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入上传标识",
                trigger: "blur"
              }]
            },
            {
              label: "下传标志",
              prop: "downloadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入下传标志",
                trigger: "blur"
              }]
            },
            {
              label: "删除标记",
              prop: "deleteflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入deleteflag",
                trigger: "blur"
              }]
            },
            {
              label: "处理标志位 ",
              prop: "vDealflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入处理标志位 ",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "gxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            {
              label: "入库时间",
              prop: "xxrsksj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入入库时间",
                trigger: "blur"
              }]
            },

            /*
            {
               label: "保留字段1",
               prop: "reservation10",
               rules: [{
                 required: true,
                 message: "请输入保留字段1",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段17 ",
               prop: "reservation17",
               rules: [{
                 required: true,
                 message: "请输入备用字段17  字典项：xsjs_xckyqk",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段18 ",
               prop: "reservation18",
               rules: [{
                 required: true,
                 message: "请输入备用字段18  字典项：6",
                 trigger: "blur"
               }]
             },
             {
               label: "保留字段8 ",
               prop: "reservation08",
               rules: [{
                 required: true,
                 message: "请输入保留字段8 ",
                 trigger: "blur"
               }]
             },
             {
               label: "保留字段9 ",
               prop: "reservation09",
               rules: [{
                 required: true,
                 message: "请输入保留字段9 ",
                 trigger: "blur"
               }]
             },
                        {
               label: "备用字段11",
               prop: "reservation11",
               rules: [{
                 required: true,
                 message: "请输入备用字段11",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段12",
               prop: "reservation12",
               rules: [{
                 required: true,
                 message: "请输入备用字段12",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段13",
               prop: "reservation13",
               rules: [{
                 required: true,
                 message: "请输入备用字段13",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段14",
               prop: "reservation14",
               rules: [{
                 required: true,
                 message: "请输入备用字段14",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段15",
               prop: "reservation15",
               rules: [{
                 required: true,
                 message: "请输入备用字段15",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段16",
               prop: "reservation16",
               rules: [{
                 required: true,
                 message: "请输入备用字段16",
                 trigger: "blur"
               }]
             },
            {
               label: "备用字段4",
               prop: "reservation40",
               rules: [{
                 required: true,
                 message: "请输入备用字段4",
                 trigger: "blur"
               }]
             },
                        {
               label: "备用字段19",
               prop: "reservation19",
               rules: [{
                 required: true,
                 message: "请输入备用字段19",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段2",
               prop: "reservation20",
               rules: [{
                 required: true,
                 message: "请输入备用字段2",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段31",
               prop: "reservation31",
               rules: [{
                 required: true,
                 message: "请输入备用字段31",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段32",
               prop: "reservation32",
               rules: [{
                 required: true,
                 message: "请输入备用字段32",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段33",
               prop: "reservation33",
               rules: [{
                 required: true,
                 message: "请输入备用字段33",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段34",
               prop: "reservation34",
               rules: [{
                 required: true,
                 message: "请输入备用字段34",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段35",
               prop: "reservation35",
               rules: [{
                 required: true,
                 message: "请输入备用字段35",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段36",
               prop: "reservation36",
               rules: [{
                 required: true,
                 message: "请输入备用字段36",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段37",
               prop: "reservation37",
               rules: [{
                 required: true,
                 message: "请输入备用字段37",
                 trigger: "blur"
               }]
             },
             {
               label: "备用字段38",
               prop: "reservation38",
               rules: [{
                 required: true,
                 message: "请输入备用字段38",
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
          addBtn: this.vaildData(this.permission.odswarninginfo_add, false),
          viewBtn: this.vaildData(this.permission.odswarninginfo_view, false),
          delBtn: this.vaildData(this.permission.odswarninginfo_delete, false),
          editBtn: this.vaildData(this.permission.odswarninginfo_edit, false)
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
