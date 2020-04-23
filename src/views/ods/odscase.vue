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
                   v-if="permission.odscase_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odscase";
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
              label: "案件号",
              prop: "ajWsbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件号",
                trigger: "blur"
              }]
            },
            {
              label: "事件名称",
              prop: "ajmc",
              rules: [{
                required: true,
                message: "请输入事件名称",
                trigger: "blur"
              }]
            },
            {
              label: "提供人",
              prop: "userName",
              hide:true,
              rules: [{
                required: true,
                message: "请输入提供人",
                trigger: "blur"
              }]
            },
            {
              label: "联系方式",
              prop: "userPhone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入联系方式",
                trigger: "blur"
              }]
            },
            {
              label: "来源类型",
              prop: "sourceType",
              hide:true,
              rules: [{
                required: true,
                message: "请输入来源类型，4：事件，2:站点，1:车辆",
                trigger: "blur"
              }]
            },
            {
              label: "来源",
              prop: "sourceId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入来源ID",
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
              label: "视频",
              prop: "video",
              hide:true,
              rules: [{
                required: true,
                message: "请输入视频",
                trigger: "blur"
              }]
            },
            {
              label: "是否结案",
              prop: "isDone",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否结案（是:1 否：0）",
                trigger: "blur"
              }]
            },
            {
              label: "结案操作人",
              prop: "overPerson",
              hide:true,
              rules: [{
                required: true,
                message: "请输入结案操作人",
                trigger: "blur"
              }]
            },
            {
              label: "结案说明",
              prop: "caseExplain",
              hide:true,
              rules: [{
                required: true,
                message: "请输入结案说明",
                trigger: "blur"
              }]
            },
            {
              label: "案件状态代码",
              prop: "ajstate",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件状态代码",
                trigger: "blur"
              }]
            },
            {
              label: "案件类型代码",
              prop: "ajlx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件类型代码",
                trigger: "blur"
              }]
            },
            {
              label: "案别/案由代码",
              prop: "ajlbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案别/案由代码",
                trigger: "blur"
              }]
            },
            {
              label: "简要案情_备注",
              prop: "jyaq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入简要案情_备注",
                trigger: "blur"
              }]
            },
            {
              label: "案事件发生地点区域名称",
              prop: "asjfsddXzqhmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案事件发生地点区域名称",
                trigger: "blur"
              }]
            },
            {
              label: "案别/案由_事件类型",
              prop: "ajlbmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案别/案由_事件类型",
                trigger: "blur"
              }]
            },
            {
              label: "具体案件来源",
              prop: "jtajly",
              hide:true,
              rules: [{
                required: true,
                message: "请输入具体案件来源",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              prop: "bz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备注",
                trigger: "blur"
              }]
            },
            {
              label: "创建者",
              prop: "lrrXm",
              rules: [{
                required: true,
                message: "请输入创建者",
                trigger: "blur"
              }]
            },
            {
              label: "接警受理号",
              prop: "slBjslh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警受理号",
                trigger: "blur"
              }]
            },
            {
              label: "接警方式代码",
              prop: "slJjfs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警方式代码",
                trigger: "blur"
              }]
            },
            {
              label: "接警单位代码",
              prop: "jijGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接警单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "报警时间",
              prop: "bjsj",
              rules: [{
                required: true,
                message: "请输入报警时间",
                trigger: "blur"
              }]
            },
            {
              label: "专案标识代码",
              prop: "zabz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入专案标识代码",
                trigger: "blur"
              }]
            },
            {
              label: "所属警区代码",
              prop: "ajssjq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属警区代码",
                trigger: "blur"
              }]
            },
            {
              label: "所属社区代码",
              prop: "asjfsddSqjcwhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入所属社区代码",
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
              label: "发案地点详址",
              prop: "asjfsddDzmc",
              rules: [{
                required: true,
                message: "请输入发案地点详址",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_地球经度",
              prop: "faddDqwd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_地球经度",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_地球纬度",
              prop: "faddDqjd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_地球纬度",
                trigger: "blur"
              }]
            },
            /* {
               label: "发案地点_jwdzbxlx",
               prop: "faddJwdzbxlx",
               hide:true,
               rules: [{
                 required: true,
                 message: "请输入fadd_jwdzbxlx",
                 trigger: "blur"
               }]
             },*/
            {
              label: "发案时间初值",
              prop: "asjfskssj",
              rules: [{
                required: true,
                message: "请输入发案时间初值",
                trigger: "blur"
              }]
            },
            {
              label: "发案时间终值",
              prop: "asjfsjssj",
              rules: [{
                required: true,
                message: "请输入发案时间终值",
                trigger: "blur"
              }]
            },
            {
              label: "发案地域代码",
              prop: "asjfsddDylbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地域代码",
                trigger: "blur"
              }]
            },
            {
              label: "发案地政区划",
              prop: "slfaqh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地政区划",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_区县代码",
              prop: "asjfsddXzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_区县代码",
                trigger: "blur"
              }]
            },
            {
              label: "发案地点_街道代码",
              prop: "asjfsddXzjddm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案地点_街道代码",
                trigger: "blur"
              }]
            },
            {
              label: "发案处所",
              prop: "asjfsddXzcsdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发案处所",
                trigger: "blur"
              }]
            },
            {
              label: "发现形式代码",
              prop: "fxxs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发现形式代码",
                trigger: "blur"
              }]
            },
            {
              label: "选择处所代码",
              prop: "xzcsdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择处所代码",
                trigger: "blur"
              }]
            },
            {
              label: "选择对象代码",
              prop: "xzdxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择对象代码",
                trigger: "blur"
              }]
            },
            {
              label: "选择物品代码",
              prop: "xzwpdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择物品代码",
                trigger: "blur"
              }]
            },
            {
              label: "选择部位",
              prop: "xzbw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择部位",
                trigger: "blur"
              }]
            },
            {
              label: "选择对象",
              prop: "xzdxmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择对象",
                trigger: "blur"
              }]
            },
            {
              label: "选择处所",
              prop: "xzcsmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择处所",
                trigger: "blur"
              }]
            },
            {
              label: "选择物品",
              prop: "xzwpmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入选择物品",
                trigger: "blur"
              }]
            },
            {
              label: "作案时机代码",
              prop: "zasjlbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案时机代码",
                trigger: "blur"
              }]
            },
            {
              label: "作案状态代码",
              prop: "zazt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案状态代码",
                trigger: "blur"
              }]
            },
            {
              label: "作案工具代码",
              prop: "zagjdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案工具代码",
                trigger: "blur"
              }]
            },
            {
              label: "作案人数",
              prop: "zaRs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案人数",
                trigger: "blur"
              }]
            },
            {
              label: "作案手段",
              prop: "sdtd",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案手段",
                trigger: "blur"
              }]
            },
            {
              label: "作案时机",
              prop: "zasjlbmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案时机",
                trigger: "blur"
              }]
            },
            {
              label: "死亡人数",
              prop: "swryRs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入死亡人数",
                trigger: "blur"
              }]
            },
            {
              label: "受伤人数",
              prop: "ssrsRs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受伤人数",
                trigger: "blur"
              }]
            },
            {
              label: "损失折款",
              prop: "ssjzrmby",
              hide:true,
              rules: [{
                required: true,
                message: "请输入损失折款",
                trigger: "blur"
              }]
            },
            {
              label: "涉案总值",
              prop: "sajzwy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入涉案总值",
                trigger: "blur"
              }]
            },

            {
              label: "危害程度代码",
              prop: "whcddm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入危害程度代码",
                trigger: "blur"
              }]
            },
            {
              label: "危害程度",
              prop: "whcdmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入危害程度",
                trigger: "blur"
              }]
            },
            {
              label: "补立原因代码",
              prop: "blayydm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入补立原因代码",
                trigger: "blur"
              }]
            },

            {
              label: "破案时间",
              prop: "parq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入破案时间",
                trigger: "blur"
              }]
            },
            {
              label: "结案时间",
              prop: "jarq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入结案时间",
                trigger: "blur"
              }]
            },
            {
              label: "销案时间",
              prop: "cxajRqsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入销案时间",
                trigger: "blur"
              }]
            },
            {
              label: "受理单位/接收单位代码",
              prop: "sldwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受理单位/接收单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "受理人",
              prop: "slrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入受理人",
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
              label: "备用",
              prop: "sljjry",
              hide:true,
              row:true,
              rules: [{
                required: true,
                message: "请输入备用",
                trigger: "blur"
              }]
            },
            {
              label: "填表人",
              prop: "tbrJh",
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
              label: "立案单位代码",
              prop: "ladwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "立案人",
              prop: "ajlary",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案人",
                trigger: "blur"
              }]
            },
            {
              label: "立案录入人警号",
              prop: "laJh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案录入人警号",
                trigger: "blur"
              }]
            },
            {
              label: "立案录入时间",
              prop: "laLrsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案录入时间",
                trigger: "blur"
              }]
            },
            {
              label: "立案批时间",
              prop: "laPzsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案批时间",
                trigger: "blur"
              }]
            },
            {
              label: "立案日期",
              prop: "laRqsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案日期",
                trigger: "blur"
              }]
            },
            {
              label: "立案批准人",
              prop: "sprXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入立案批准人",
                trigger: "blur"
              }]
            },
            {
              label: "案件来源",
              prop: "asjlydm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件来源",
                trigger: "blur"
              }]
            },
            {
              label: "主办单位代码",
              prop: "zbdwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主办单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "主要办案人警号",
              prop: "zbrJh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主要办案人警号",
                trigger: "blur"
              }]
            },
            {
              label: "主办侦查员中文姓名",
              prop: "zbrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主办侦查员中文姓名",
                trigger: "blur"
              }]
            },
            {
              label: "案件协办人警号",
              prop: "xbrJh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案件协办人警号",
                trigger: "blur"
              }]
            },
            {
              label: "协办侦查员中文姓名",
              prop: "xbrXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入协办侦查员中文姓名",
                trigger: "blur"
              }]
            },

            {
              label: "办案人联系电话",
              prop: "baryLxdh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入办案人联系电话",
                trigger: "blur"
              }]
            },
            {
              label: "案后修改人",
              prop: "laZhxgr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案后修改人",
                trigger: "blur"
              }]
            },
            {
              label: "案最后修改时间",
              prop: "laGxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案最后修改时间",
                trigger: "blur"
              }]
            },
            {
              label: "批示状态",
              prop: "laPsstate",
              hide:true,
              rules: [{
                required: true,
                message: "请输入批示状态",
                trigger: "blur"
              }]
            },
            {
              label: "督办信息",
              prop: "dbxx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入督办信息",
                trigger: "blur"
              }]
            },
            {
              label: "部门编号代码",
              prop: "lrdwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入部门编号代码",
                trigger: "blur"
              }]
            },
            {
              label: "密级",
              prop: "securitygrade",
              hide:true,
              rules: [{
                required: true,
                message: "请输入密级",
                trigger: "blur"
              }]
            },
            {
              label: "证据",
              prop: "zjlbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入证据",
                trigger: "blur"
              }]
            },
            {
              label: "省",
              prop: "reservation04",
              hide:true,
              rules: [{
                required: true,
                message: "请输入省",
                trigger: "blur"
              }]
            },
            {
              label: "当场处罚专用字段（处罚类型）",
              prop: "reservation08",
              hide:true,
              rules: [{
                required: true,
                message: "请输入当场处罚专用字段（处罚类型）",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位代码",
              prop: "ysdwGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "移送承办人",
              prop: "ysdwRmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送承办人",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位电话",
              prop: "ysdwBgdh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位电话",
                trigger: "blur"
              }]
            },
            {
              label: "移送时间",
              prop: "yjrq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送时间",
                trigger: "blur"
              }]
            },
            {
              label: "主案编号",
              prop: "reservation12",
              hide:true,
              rules: [{
                required: true,
                message: "请输入主案编号",
                trigger: "blur"
              }]
            },

            {
              label: "作案特点代码",
              prop: "zatddm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案特点代码",
                trigger: "blur"
              }]
            },
            {
              label: "作案特点",
              prop: "zatdmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案特点",
                trigger: "blur"
              }]
            },
            {
              label: "作案工具",
              prop: "zagjmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入作案工具",
                trigger: "blur"
              }]
            },
            {
              label: "不予立案时间",
              prop: "reservation22",
              hide:true,
              rules: [{
                required: true,
                message: "请输入不予立案时间",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转案件人",
              prop: "mtzajXm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转案件人",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转案件单位代码",
              prop: "mtzajGajgjgdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转案件单位代码",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转案件时间",
              prop: "reservation23",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转案件时间",
                trigger: "blur"
              }]
            },
            /*{
              label: "yssasj",
              prop: "yssasj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入yssasj",
                trigger: "blur"
              }]
            },
            {
              label: "ystcsj",
              prop: "ystcsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入ystcsj",
                trigger: "blur"
              }]
            },*/
            {
              label: "卷宗编号",
              prop: "jzbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入卷宗编号",
                trigger: "blur"
              }]
            },
            {
              label: "挽回损失价值",
              prop: "whjzwy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入挽回损失价值",
                trigger: "blur"
              }]
            },
            {
              label: "督办级别代码",
              prop: "asjdbjbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入督办级别代码",
                trigger: "blur"
              }]
            },
            {
              label: "督办级别",
              prop: "asjdbjbmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入督办级别",
                trigger: "blur"
              }]
            },
            {
              label: "犯罪主体类型代码",
              prop: "fzztlxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入犯罪主体类型代码",
                trigger: "blur"
              }]
            },
            {
              label: "案情是否涉外",
              prop: "sfswPdbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案情是否涉外",
                trigger: "blur"
              }]
            },
            {
              label: "案情涉及国家地区",
              prop: "sjgjdq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入案情涉及国家地区",
                trigger: "blur"
              }]
            },
            {
              label: "判案方式",
              prop: "paPafs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入判案方式",
                trigger: "blur"
              }]
            },
            {
              label: "初查审核结果",
              prop: "reservation36",
              hide:true,
              rules: [{
                required: true,
                message: "请输入初查审核结果",
                trigger: "blur"
              }]
            },
            {
              label: "一审时间",
              prop: "ysRqsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入一审时间",
                trigger: "blur"
              }]
            },
            {
              label: "二审时间",
              prop: "esRqsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入二审时间",
                trigger: "blur"
              }]
            },
            {
              label: "标识是否重新立案",
              prop: "cxlazcPdbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入标识是否重新立案，0或null否，1是",
                trigger: "blur"
              }]
            },
            {
              label: "为了避免与派综案件编号重复，经侦案件的案件编号要重新存储",
              prop: "reservation35",
              hide:true,
              rules: [{
                required: true,
                message: "请输入为了避免与派综案件编号重复，经侦案件的案件编号要重新存储",
                trigger: "blur"
              }]
            },
            {
              label: "标识是否通过统计数据审批",
              prop: "reservation37",
              hide:true,
              rules: [{
                required: true,
                message: "请输入标识是否通过统计数据审批。0或null否，1是",
                trigger: "blur"
              }]
            },
            {
              label: "与经侦同步更新的时间，下次更新与此时间作比较",
              prop: "reservation51",
              hide:true,
              rules: [{
                required: true,
                message: "请输入与经侦同步更新的时间，下次更新与此时间作比较",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位（经侦并入派综后使用，原有不知何用，警综未使用）",
              prop: "ysdwNew",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位（经侦并入派综后使用，原有不知何用，警综未使用）",
                trigger: "blur"
              }]
            },
            {
              label: "移送单位电话（经侦并入派综后使用，原有不知何用，警综未使用）",
              prop: "ysdwdhNew",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送单位电话（经侦并入派综后使用，原有不知何用，警综未使用）",
                trigger: "blur"
              }]
            },
            {
              label: "移送承办人（经侦并入派综后使用，原有不知何用，警综未使用）",
              prop: "yscbrNew",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送承办人（经侦并入派综后使用，原有不知何用，警综未使用）",
                trigger: "blur"
              }]
            },
            {
              label: "移送时间（经侦并入派综后使用，原有不知何用，警综未使用）",
              prop: "yssjNew",
              hide:true,
              rules: [{
                required: true,
                message: "请输入移送时间（经侦并入派综后使用，原有不知何用，警综未使用）",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "lrsj",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "最终修改人",
              prop: "lastupdatedby",
              hide:true,
              rules: [{
                required: true,
                message: "请输入最终修改人",
                trigger: "blur"
              }]
            },
            {
              label: "最后更新时间",
              prop: "gxsj",
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
              label: "上传标识代码",
              prop: "uploadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入上传标识代码",
                trigger: "blur"
              }]
            },
            {
              label: "下传标志代码",
              prop: "downloadflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入下传标志代码",
                trigger: "blur"
              }]
            },
            {
              label: "删除标志",
              prop: "xxscPdbz",
              hide:true,
              rules: [{
                required: true,
                message: "请输入删除标志",
                trigger: "blur"
              }]
            },
            {
              label: "处理标志位",
              prop: "vDealflag",
              hide:true,
              rules: [{
                required: true,
                message: "请输入处理标志位",
                trigger: "blur"
              }]
            },
            {
              label: "更新时间",
              prop: "dGxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
            /*{
              label: "la_pszt",
              prop: "laPszt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入la_pszt",
                trigger: "blur"
              }]
            },
            {
              label: "bylayydm",
              prop: "bylayydm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入bylayydm",
                trigger: "blur"
              }]
            },
            {
              label: "bylayymc",
              prop: "bylayymc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入bylayymc",
                trigger: "blur"
              }]
            },
            {
              label: "ccshjgmc",
              prop: "ccshjgmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入ccshjgmc",
                trigger: "blur"
              }]
            },*/

           /* {
              label: "保字段5",
              prop: "reservation05",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保字段5",
                trigger: "blur"
              }]
            },
            {
              label: "保字段6",
              prop: "reservation06",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保字段6",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段7",
              prop: "reservation07",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段7",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段9",
              prop: "reservation09",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段9",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段10",
              prop: "reservation10",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段10",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段11",
              prop: "reservation11",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段11",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段14",
              prop: "reservation14",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段14",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段15",
              prop: "reservation15",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段15",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段16",
              prop: "reservation16",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段16",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段17",
              prop: "reservation17",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段17",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段18",
              prop: "reservation18",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段18",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段19",
              prop: "reservation19",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段19",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段20",
              prop: "reservation20",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段20",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段21",
              prop: "reservation21",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段21",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段24",
              prop: "reservation24",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段24",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段25",
              prop: "reservation25",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段25",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段26",
              prop: "reservation26",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段26",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段27",
              prop: "reservation27",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段27",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段28",
              prop: "reservation28",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段28",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段29",
              prop: "reservation29",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段29",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段30",
              prop: "reservation30",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段30",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段31",
              prop: "reservation31",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段31",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段32",
              prop: "reservation32",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段32",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段33",
              prop: "reservation33",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段33",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段40",
              prop: "reservation40",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段40",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段41",
              prop: "reservation41",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段41",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段42",
              prop: "reservation42",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段42",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段43",
              prop: "reservation43",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段43",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段44",
              prop: "reservation44",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段44",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段45",
              prop: "reservation45",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段45",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段46",
              prop: "reservation46",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段46",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段47",
              prop: "reservation47",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段47",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段48",
              prop: "reservation48",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段48",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段49",
              prop: "reservation49",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段49",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段50",
              prop: "reservation50",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段50",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段51",
              prop: "reservation52",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段51",
                trigger: "blur"
              }]
            },
            {
              label: "备用字段52",
              prop: "reservation53",
              hide:true,
              rules: [{
                required: true,
                message: "请输入备用字段52",
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
          addBtn: this.vaildData(this.permission.odscase_add, false),
          viewBtn: this.vaildData(this.permission.odscase_view, false),
          delBtn: this.vaildData(this.permission.odscase_delete, false),
          editBtn: this.vaildData(this.permission.odscase_edit, false)
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
