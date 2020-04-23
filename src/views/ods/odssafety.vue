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
                   v-if="permission.odssafety_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odssafety";
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
              label: "ID",
              prop: "systemid",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主键id",
                trigger: "blur"
              }]
            },
            {
              label: "人员编号",
              prop: "rybh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入人员编号",
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
              label: "身份证号",
              prop: "gmsfzh",
              rules: [{
                required: true,
                message: "请输入身份证号",
                trigger: "blur"
              }]
            }, {
              label: "性别代码",
              prop: "xbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入性别代码",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "xbmc",
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            },
            {
              label: "出生日期",
              prop: "csrq",
              row:true,
              rules: [{
                required: true,
                message: "请输入出生日期",
                trigger: "blur"
              }]
            },
            {
              label: "站点",
              prop: "stationId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入站点ID",
                trigger: "blur"
              }]
            },
            {
              label: "线路",
              prop: "lineId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入线路ID",
                trigger: "blur"
              }]
            },
            {
              label: "单位名称",
              prop: "unitName",
              hide:true,
              rules: [{
                required: true,
                message: "请输入单位名称",
                trigger: "blur"
              }]
            },
            {
              label: "机构编号",
              prop: "bafwgsbm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入机构编号",
                trigger: "blur"
              }]
            },
            {
              label: "机构名称",
              prop: "bafwgsmc",
              rules: [{
                required: true,
                message: "请输入机构名称",
                trigger: "blur"
              }]
            },
            {
              label: "是否有资格证",
              prop: "sfyzgz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否有资格证(0无1有)",
                trigger: "blur"
              }]
            },
            {
              label: "资格证号",
              prop: "bayzbm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入资格证号",
                trigger: "blur"
              }]
            },
            {
              label: "警察证号",
              prop: "jczh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警察证号",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯代码",
              prop: "jgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入籍贯代码",
                trigger: "blur"
              }]
            },
            {
              label: "籍贯",
              prop: "jgmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入籍贯",
                trigger: "blur"
              }]
            },
            {
              label: "国家代码",
              prop: "gjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入国家代码",
                trigger: "blur"
              }]
            },
            {
              label: "国家",
              prop: "gjmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入国家",
                trigger: "blur"
              }]
            },
            {
              label: "省市县",
              prop: "jgssxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入省市县",
                trigger: "blur"
              }]
            },
            {
              label: "民族代码",
              prop: "mzdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族代码",
                trigger: "blur"
              }]
            },
            {
              label: "民族",
              prop: "mzmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民族",
                trigger: "blur"
              }]
            },
            {
              label: "文化程度代码",
              prop: "xldm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入文化程度代码",
                trigger: "blur"
              }]
            },
            {
              label: "文化程度",
              prop: "whcd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入文化程度",
                trigger: "blur"
              }]
            },
            {
              label: "政治面貌代码",
              prop: "zzmmdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入政治面貌代码",
                trigger: "blur"
              }]
            },
            {
              label: "政治面貌",
              prop: "zzmm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入政治面貌",
                trigger: "blur"
              }]
            },
            {
              label: "宗教信仰代码",
              prop: "zjxydm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入宗教信仰代码",
                trigger: "blur"
              }]
            },
            {
              label: "宗教信仰",
              prop: "zjxy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入宗教信仰",
                trigger: "blur"
              }]
            },
            {
              label: "婚姻状况代码",
              prop: "hyzkdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入婚姻状况代码",
                trigger: "blur"
              }]
            },
            {
              label: "婚姻状况",
              prop: "hyzk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入婚姻状况",
                trigger: "blur"
              }]
            },
            {
              label: "职称",
              prop: "bayzydjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入职称",
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
              label: "保安员类别",
              prop: "bafwlxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保安员类别",
                trigger: "blur"
              }]
            },
            {
              label: "户籍住址",
              prop: "hjzz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入户籍住址",
                trigger: "blur"
              }]
            },
            {
              label: "现住址",
              prop: "dzmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入现住址",
                trigger: "blur"
              }]
            },
            {
              label: "接听电话",
              prop: "gddh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接听电话",
                trigger: "blur"
              }]
            },
            {
              label: "移动电话",
              prop: "yddh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移动电话",
                trigger: "blur"
              }]
            },
            {
              label: "手机串号",
              prop: "sjch",
              hide:true,
              rules: [{
                required: true,
                message: "请输入手机串号",
                trigger: "blur"
              }]
            },
            {
              label: "兵役状况代码",
              prop: "byzkdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入兵役状况代码",
                trigger: "blur"
              }]
            },
            {
              label: "兵役状况",
              prop: "byzk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入兵役状况",
                trigger: "blur"
              }]
            },
            {
              label: "入编制时间",
              prop: "rbzsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入入编制时间",
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
              label: "健康状况",
              prop: "jkzkbq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入健康状况",
                trigger: "blur"
              }]
            },
            {
              label: "指纹编号",
              prop: "szzwbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入指纹编号",
                trigger: "blur"
              }]
            },
            {
              label: "状态",
              prop: "zt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入状态",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "bz",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "录入人警号",
              prop: "lrr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入录入人警号",
                trigger: "blur"
              }]
            },
            {
              label: "录入单位",
              prop: "lrdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入录入单位",
                trigger: "blur"
              }]
            },
            {
              label: "录入时间",
              prop: "lrsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入录入时间",
                trigger: "blur"
              }]
            },
            {
              label: "录入单位编码",
              prop: "departmentcode",
              hide:true,
              rules: [{
                required: true,
                message: "请输入录入单位编码",
                trigger: "blur"
              }]
            },
            {
              label: "录入人",
              prop: "creator",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入录入人",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "cjsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "修改人",
              prop: "lastupdatedby",
              rules: [{
                required: true,
                message: "请输入修改人",
                trigger: "blur"
              }]
            },
            {
              label: "修改时间",
              prop: "gxsj",
              rules: [{
                required: true,
                message: "请输入修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "refreshtime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入refreshtime",
                trigger: "blur"
              }]
            },
            {
              label: "上传标志",
              prop: "uploadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入uploadflag",
                trigger: "blur"
              }]
            },
            {
              label: "下传标志",
              prop: "downloadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入downloadflag",
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
           /* {
              label: "v_dealflag",
              prop: "vDealflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入v_dealflag",
                trigger: "blur"
              }]
            },*/

            /*
            {
              label: "xx",
              prop: "xx",
              hide:true,
              rules: [{
              required: true,
              message: "请输入xx",
              trigger: "blur"
            }]
            },

            {
              label: "bazgzbh",
              prop: "bazgzbh",
              hide:true,
              rules: [{
              required: true,
              message: "请输入bazgzbh",
              trigger: "blur"
            }]
            },
            {
              label: "bazgdj",
              prop: "bazgdj",
              hide:true,
              rules: [{
              required: true,
              message: "请输入bazgdj",
              trigger: "blur"
            }]
            },
            {
              label: "fzjg",
              prop: "fzjg",
              hide:true,
              rules: [{
              required: true,
              message: "请输入fzjg",
              trigger: "blur"
            }]
            },
            {
              label: "cqzh",
              prop: "cqzh",
              hide:true,
              rules: [{
              required: true,
              message: "请输入cqzh",
              trigger: "blur"
            }]
            },
            {
              label: "fzrq",
              prop: "fzrq",
              hide:true,
              rules: [{
              required: true,
              message: "请输入fzrq",
              trigger: "blur"
            }]
            },
            {
              label: "yxqx",
              prop: "yxqx",
              hide:true,
              rules: [{
              required: true,
              message: "请输入yxqx",
              trigger: "blur"
            }]
            },
            {
              label: "yxqsrq",
              prop: "yxqsrq",
              hide:true,
              rules: [{
              required: true,
              message: "请输入yxqsrq",
              trigger: "blur"
            }]
            },
            {
              label: "jszh",
              prop: "jszh",
              hide:true,
              rules: [{
              required: true,
              message: "请输入jszh",
              trigger: "blur"
            }]
            },
            {
              label: "dabh",
              prop: "dabh",
              hide:true,
              rules: [{
              required: true,
              message: "请输入dabh",
              trigger: "blur"
            }]
            },
            {
              label: "zjcx",
              prop: "zjcx",
              hide:true,
              rules: [{
              required: true,
              message: "请输入zjcx",
              trigger: "blur"
            }]
            },
            {
              label: "cclzrq",
              prop: "cclzrq",
              hide:true,
              rules: [{
              required: true,
              message: "请输入cclzrq",
              trigger: "blur"
            }]
            },
            {
              label: "cclzgzsj",
              prop: "cclzgzsj",
              hide:true,
              rules: [{
              required: true,
              message: "请输入cclzgzsj",
              trigger: "blur"
            }]
            },
            {
              label: "zwcj",
              prop: "zwcj",
              hide:true,
              rules: [{
              required: true,
              message: "请输入zwcj",
              trigger: "blur"
            }]
            },
            {
              label: "ryzk",
              prop: "ryzk",
              hide:true,
              rules: [{
              required: true,
              message: "请输入ryzk",
              trigger: "blur"
            }]
            },

            {
              label: "zgzzxyy",
              prop: "zgzzxyy",
              hide:true,
              rules: [{
              required: true,
              message: "请输入zgzzxyy",
              trigger: "blur"
            }]
            },
            {
              label: "zgzzxsj",
              prop: "zgzzxsj",
              hide:true,
              rules: [{
              required: true,
              message: "请输入zgzzxsj",
              trigger: "blur"
            }]
            },

            {
              label: "xqshgajg",
              prop: "xqshgajg",
              hide:true,
              rules: [{
              required: true,
              message: "请输入xqshgajg",
              trigger: "blur"
            }]
            },

            {
            label: "xqgajgshrq",
            prop: "xqgajgshyj",
            hide:true,
            rules: [{
            required: true,
            message: "请输入xqgajgshyj",
            trigger: "blur"
            }]
            },
            {
            label: "xqgajgshrq",
            prop: "xqgajgshrq",
            hide:true,
            rules: [{
            required: true,
            message: "请输入xqgajgshrq",
            trigger: "blur"
            }]
            },
            {
            label: "xqgajgshr",
            prop: "xqgajgshr",
            hide:true,
            rules: [{
            required: true,
            message: "请输入xqgajgshr",
            trigger: "blur"
            }]
            },
            {
            label: "djyssshgajg",
            prop: "djyssshgajg",
            hide:true,
            rules: [{
            required: true,
            message: "请输入djyssshgajg",
            trigger: "blur"
            }]
            },
            {
            label: "djyssgajgshyj",
            prop: "djyssgajgshyj",
            hide:true,
            rules: [{
            required: true,
            message: "请输入djyssgajgshyj",
            trigger: "blur"
            }]
            },
            {
            label: "djyssgajgshrq",
            prop: "djyssgajgshrq",
            hide:true,
            rules: [{
            required: true,
            message: "请输入djyssgajgshrq",
            trigger: "blur"
            }]
            },
            {
            label: "djyssgajgshy",
            prop: "djyssgajgshy",
            hide:true,
            rules: [{
            required: true,
            message: "请输入djyssgajgshy",
            trigger: "blur"
            }]
            },
            {
            label: "sgajgspdw",
            prop: "sgajgspdw",
            hide:true,
            rules: [{
            required: true,
            message: "请输入sgajgspdw",
            trigger: "blur"
            }]
            },
            {
            label: "sgajgspyj",
            prop: "sgajgspyj",
            hide:true,
            rules: [{
            required: true,
            message: "请输入sgajgspyj",
            trigger: "blur"
            }]
            },
            {
            label: "sgatsprq",
            prop: "sgatsprq",
            hide:true,
            rules: [{
            required: true,
            message: "请输入sgatsprq",
            trigger: "blur"
            }]
            },
            {
            label: "sgatspr",
            prop: "sgatspr",
            hide:true,
            rules: [{
            required: true,
            message: "请输入sgatspr",
            trigger: "blur"
            }]
            },
            {
            label: "securitygrade",
            prop: "securitygrade",
            hide:true,
            rules: [{
            required: true,
            message: "请输入securitygrade",
            trigger: "blur"
            }]
            },
            */
           /*
            {
              label: "reservation01",
              prop: "reservation01",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation01",
                trigger: "blur"
              }]
            },
            {
              label: "reservation02",
              prop: "reservation02",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation02",
                trigger: "blur"
              }]
            },
            {
              label: "reservation03",
              prop: "reservation03",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation03",
                trigger: "blur"
              }]
            },
            {
              label: "reservation04",
              prop: "reservation04",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation04",
                trigger: "blur"
              }]
            },
            {
              label: "reservation05",
              prop: "reservation05",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation05",
                trigger: "blur"
              }]
            },
            {
              label: "reservation06",
              prop: "reservation06",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation06",
                trigger: "blur"
              }]
            },
            {
              label: "reservation07",
              prop: "reservation07",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation07",
                trigger: "blur"
              }]
            },
            {
              label: "reservation08",
              prop: "reservation08",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation08",
                trigger: "blur"
              }]
            },
            {
              label: "reservation09",
              prop: "reservation09",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation09",
                trigger: "blur"
              }]
            },
            {
              label: "reservation10",
              prop: "reservation10",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation10",
                trigger: "blur"
              }]
            },
            {
              label: "reservation11",
              prop: "reservation11",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation11",
                trigger: "blur"
              }]
            },
            {
              label: "reservation12",
              prop: "reservation12",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation12",
                trigger: "blur"
              }]
            },
            {
              label: "reservation13",
              prop: "reservation13",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation13",
                trigger: "blur"
              }]
            },
            {
              label: "reservation14",
              prop: "reservation14",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation14",
                trigger: "blur"
              }]
            },
            {
              label: "reservation15",
              prop: "reservation15",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation15",
                trigger: "blur"
              }]
            },
            {
              label: "reservation16",
              prop: "reservation16",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation16",
                trigger: "blur"
              }]
            },
            {
              label: "reservation17",
              prop: "reservation17",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation17",
                trigger: "blur"
              }]
            },
            {
              label: "reservation18",
              prop: "reservation18",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation18",
                trigger: "blur"
              }]
            },
            {
              label: "reservation21",
              prop: "reservation21",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation21",
                trigger: "blur"
              }]
            },
            {
              label: "reservation20",
              prop: "reservation20",
              hide:true,
              rules: [{
                required: true,
                message: "请输入reservation20",
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
          addBtn: this.vaildData(this.permission.odssafety_add, false),
          viewBtn: this.vaildData(this.permission.odssafety_view, false),
          delBtn: this.vaildData(this.permission.odssafety_delete, false),
          editBtn: this.vaildData(this.permission.odssafety_edit, false)
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
