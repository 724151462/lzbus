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
                   v-if="permission.odsevent_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/ods/odsevent";
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
              label: "事件编号",
              prop: "asjbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事件编号",
                trigger: "blur"
              }]
            },
            {
              label: "事件名称",
              prop: "sjmc",
              rules: [{
                required: true,
                message: "请输入事件名称",
                trigger: "blur"
              }]
            },
            {
              label: "事件类型",
              prop: "jlxdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事件类型 字典项:KIND=sj9",
                trigger: "blur"
              }]
            },
            {
              label: "事件发生时间初值",
              prop: "asjfskssj",
              rules: [{
                required: true,
                message: "请输入事件发生时间初值",
                trigger: "blur"
              }]
            },
            {
              label: "事件发生时间终值",
              prop: "asjfsjssj",
              rules: [{
                required: true,
                message: "请输入事件发生时间终值",
                trigger: "blur"
              }]
            },
            {
              label: "事件状态",
              prop: "sjzt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事件状态 字典项:KIND=sj_sjjb",
                trigger: "blur"
              }]
            },
            {
              label: "原因",
              prop: "yy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入原因 字典项:KIND=sj6",
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
              label: "车辆",
              prop: "busId",
              hide:true,
              rules: [{
                required: true,
                message: "请输入车辆ID",
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
              label: "参与人员类别 ",
              prop: "reservation58",
              hide:true,
              rules: [{
                required: true,
                message: "请输入参与人员类别 字典项:KIND=sj4",
                trigger: "blur"
              }]
            },
            {
              label: "发生地点",
              prop: "fsddDzmc",
              rules: [{
                required: true,
                message: "请输入发生地点",
                trigger: "blur"
              }]
            },
            {
              label: "是否转案件",
              prop: "isCase",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否转案件(0:否1:是)",
                trigger: "blur"
              }]
            },
            {
              label: "转案操作人",
              prop: "casePerson",
              hide:true,
              rules: [{
                required: true,
                message: "请输入转案操作人",
                trigger: "blur"
              }]
            },
            {
              label: "转案时间",
              prop: "caseTime",
              hide:true,
              rules: [{
                required: true,
                message: "请输入转案时间",
                trigger: "blur"
              }]
            },
            {
              label: "转案备注",
              prop: "remark",
              hide:true,
              rules: [{
                required: true,
                message: "请输入转案备注",
                trigger: "blur"
              }]
            },
            {
              label: "经度",
              prop: "lng",
              hide:true,
              rules: [{
                required: true,
                message: "请输入经度",
                trigger: "blur"
              }]
            },
            {
              label: "纬度",
              prop: "lat",
              hide:true,
              rules: [{
                required: true,
                message: "请输入纬度",
                trigger: "blur"
              }]
            },
            {
              label: "简要情况",
              prop: "jyqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入简要情况",
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
              label: "相关警情编号",
              prop: "jqbh",
              hide:true,
              rules: [{
                required: true,
                message: "请输入相关警情编号",
                trigger: "blur"
              }]
            },
            {
              label: "行政区划",
              prop: "xzqhdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入行政区划 字典项:KIND=7",
                trigger: "blur"
              }]
            },
            {
              label: "行政区划名称",
              prop: "xzqhmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入行政区划名称",
                trigger: "blur"
              }]
            },
            {
              label: "街路巷",
              prop: "jlx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入街路巷 字典项:KIND=17",
                trigger: "blur"
              }]
            },
            {
              label: "详细地址",
              prop: "dzmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入详细地址",
                trigger: "blur"
              }]
            },
            {
              label: "行为方式",
              prop: "xwfs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入行为方式 字典项:KIND=sj1",
                trigger: "blur"
              }]
            },
            {
              label: "发生地域",
              prop: "fsdy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发生地域 字典项:KIND=sj11",
                trigger: "blur"
              }]
            },
            {
              label: "发生处所",
              prop: "fscs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入发生处所 字典项:KIND=sj12",
                trigger: "blur"
              }]
            },
            {
              label: "组织串联情况",
              prop: "zzclqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入组织串联情况 字典项:KIND=sj1",
                trigger: "blur"
              }]
            },

            {
              label: "督办级别",
              prop: "asjdbjbdm",
              hide:true,
              rules: [{
                required: true,
                message: "请输入督办级别",
                trigger: "blur"
              }]
            },
            {
              label: "处置级别",
              prop: "czjb",
              hide:true,
              rules: [{
                required: true,
                message: "请输入处置级别",
                trigger: "blur"
              }]
            },
            {
              label: "活动范围",
              prop: "hdfw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入活动范围",
                trigger: "blur"
              }]
            },
            {
              label: "跨区情况",
              prop: "kqqk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入跨区情况 字典项:KIND=sj15",
                trigger: "blur"
              }]
            },
            {
              label: "持续时间",
              prop: "cxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入持续时间 字典项:KIND=sj16",
                trigger: "blur"
              }]
            },
            {
              label: "参与人数",
              prop: "cyrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入参与人数",
                trigger: "blur"
              }]
            },
            {
              label: "围观人数",
              prop: "wgrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入围观人数",
                trigger: "blur"
              }]
            },
            {
              label: "死亡人数(合计)",
              prop: "swrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入死亡人数(合计)",
                trigger: "blur"
              }]
            },
            {
              label: "重伤人数(合计)",
              prop: "zsrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入重伤人数(合计)",
                trigger: "blur"
              }]
            },
            {
              label: "轻伤人数(合计)",
              prop: "qsrs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入轻伤人数(合计)",
                trigger: "blur"
              }]
            },
            {
              label: "诉求",
              prop: "sq",
              hide:true,
              rules: [{
                required: true,
                message: "请输入诉求",
                trigger: "blur"
              }]
            },
            {
              label: "出警批示时间",
              prop: "cjpssj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出警批示时间",
                trigger: "blur"
              }]
            },
            {
              label: "出警批示领导",
              prop: "cjpsld",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出警批示领导",
                trigger: "blur"
              }]
            },
            {
              label: "出动公安民警数",
              prop: "cdgamjs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动公安民警数",
                trigger: "blur"
              }]
            },
            {
              label: "出动武警数",
              prop: "cdwjs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动武警数",
                trigger: "blur"
              }]
            },
            {
              label: "出警人员总数",
              prop: "cjryzs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出警人员总数",
                trigger: "blur"
              }]
            },
            {
              label: "出动警犬数",
              prop: "cdjqs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动警犬数",
                trigger: "blur"
              }]
            },
            {
              label: "出动机动车次",
              prop: "cdjdcc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动机动车次",
                trigger: "blur"
              }]
            },
            {
              label: "出动船次",
              prop: "cdcc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动船次",
                trigger: "blur"
              }]
            },
            {
              label: "出动航空器次",
              prop: "cdhkqc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出动航空器次",
                trigger: "blur"
              }]
            },
            {
              label: "使用警械",
              prop: "syjx",
              hide:true,
              rules: [{
                required: true,
                message: "请输入使用警械 字典项:KIND=sj_jxzb",
                trigger: "blur"
              }]
            },
            {
              label: "刑事拘留（人数）",
              prop: "xsjl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入刑事拘留（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "逮捕（人数）",
              prop: "db",
              hide:true,
              rules: [{
                required: true,
                message: "请输入逮捕（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "劳动教养（人数）",
              prop: "ldjy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入劳动教养（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "治安拘留（人数）",
              prop: "zajl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入治安拘留（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "警告（人数）",
              prop: "jg",
              hide:true,
              rules: [{
                required: true,
                message: "请输入警告（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "强制驱散（人数）",
              prop: "qzqs",
              hide:true,
              rules: [{
                required: true,
                message: "请输入强制驱散（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "罚款（人数）",
              prop: "fk",
              hide:true,
              rules: [{
                required: true,
                message: "请输入罚款（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "强制带离（人数）",
              prop: "qzdl",
              hide:true,
              rules: [{
                required: true,
                message: "请输入强制带离（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "留置盘问（人数）",
              prop: "lzpw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入留置盘问（人数）",
                trigger: "blur"
              }]
            },
            {
              label: "其他",
              prop: "qt",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其他",
                trigger: "blur"
              }]
            },
            {
              label: "事件终结原因",
              prop: "sjzjyy",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事件终结原因",
                trigger: "blur"
              }]
            },
            {
              label: "事件终结时间",
              prop: "sjzjsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事件终结时间",
                trigger: "blur"
              }]
            },
            {
              label: "填表人",
              prop: "tbrXm",
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
            {
              label: "密级名称",
              prop: "mmdjmc",
              hide:true,
              rules: [{
                required: true,
                message: "请输入密级名称",
                trigger: "blur"
              }]
            },
            {
              label: "已用做记录参与人员",
              prop: "reservation14",
              hide:true,
              rules: [{
                required: true,
                message: "请输入已用做记录参与人员",
                trigger: "blur"
              }]
            },
            {
              label: "是否上报",
              prop: "reservation15",
              hide:true,
              rules: [{
                required: true,
                message: "请输入是否上报",
                trigger: "blur"
              }]
            },
            {
              label: "填报单位",
              prop: "tbdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入填报单位 字典项:KIND=6",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转事件时间",
              prop: "reservation17",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转事件时间",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转事件人",
              prop: "reservation18",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转事件人",
                trigger: "blur"
              }]
            },
            {
              label: "苗头转事件单位",
              prop: "reservation19",
              hide:true,
              rules: [{
                required: true,
                message: "请输入苗头转事件单位 字典项:KIND=6",
                trigger: "blur"
              }]
            },
            {
              label: "状态",
              prop: "reservation20",
              hide:true,
              rules: [{
                required: true,
                message: "请输入状态（未解决、正在解决、完全解决、转行政案件、转刑事案件）",
                trigger: "blur"
              }]
            },
            {
              label: "接报人",
              prop: "jbr",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接报人",
                trigger: "blur"
              }]
            },
            {
              label: "接报时间",
              prop: "jbsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接报时间",
                trigger: "blur"
              }]
            },
            {
              label: "接报单位",
              prop: "jbdw",
              hide:true,
              rules: [{
                required: true,
                message: "请输入接报单位 字典项:KIND=6",
                trigger: "blur"
              }]
            },
            {
              label: "企业职工",
              prop: "reservation29",
              hide:true,
              rules: [{
                required: true,
                message: "请输入企业职工",
                trigger: "blur"
              }]
            },
            {
              label: "在岗人员",
              prop: "reservation30",
              hide:true,
              rules: [{
                required: true,
                message: "请输入在岗人员",
                trigger: "blur"
              }]
            },
            {
              label: "离退休人员",
              prop: "reservation31",
              hide:true,
              rules: [{
                required: true,
                message: "请输入离退休人员",
                trigger: "blur"
              }]
            },
            {
              label: "下岗人员",
              prop: "reservation32",
              hide:true,
              rules: [{
                required: true,
                message: "请输入下岗人员",
                trigger: "blur"
              }]
            },
            {
              label: "其他",
              prop: "reservation33",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其他",
                trigger: "blur"
              }]
            },
            {
              label: "自由职业",
              prop: "reservation34",
              hide:true,
              rules: [{
                required: true,
                message: "请输入自由职业",
                trigger: "blur"
              }]
            },
            {
              label: "个体工商户",
              prop: "reservation35",
              hide:true,
              rules: [{
                required: true,
                message: "请输入个体工商户",
                trigger: "blur"
              }]
            },
            {
              label: "农用车司机",
              prop: "reservation36",
              hide:true,
              rules: [{
                required: true,
                message: "请输入农用车司机",
                trigger: "blur"
              }]
            },
            {
              label: "出租车司机",
              prop: "reservation37",
              hide:true,
              rules: [{
                required: true,
                message: "请输入出租车司机",
                trigger: "blur"
              }]
            },
            {
              label: "其他",
              prop: "reservation38",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其他",
                trigger: "blur"
              }]
            },
            {
              label: "事业单位",
              prop: "reservation39",
              hide:true,
              rules: [{
                required: true,
                message: "请输入事业单位",
                trigger: "blur"
              }]
            },
            {
              label: "民师",
              prop: "reservation40",
              hide:true,
              rules: [{
                required: true,
                message: "请输入民师",
                trigger: "blur"
              }]
            },
            {
              label: "一般事业单位人员",
              prop: "reservation41",
              hide:true,
              rules: [{
                required: true,
                message: "请输入一般事业单位人员",
                trigger: "blur"
              }]
            },
            {
              label: "幼师",
              prop: "reservation42",
              hide:true,
              rules: [{
                required: true,
                message: "请输入幼师",
                trigger: "blur"
              }]
            },
            {
              label: "其他",
              prop: "reservation43",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其他",
                trigger: "blur"
              }]
            },
            {
              label: "农民",
              prop: "reservation44",
              hide:true,
              rules: [{
                required: true,
                message: "请输入农民",
                trigger: "blur"
              }]
            },
            {
              label: "农民工",
              prop: "reservation45",
              hide:true,
              rules: [{
                required: true,
                message: "请输入农民工",
                trigger: "blur"
              }]
            },
            {
              label: "参与人数",
              prop: "reservation46",
              hide:true,
              rules: [{
                required: true,
                message: "请输入参与人数",
                trigger: "blur"
              }]
            },
            {
              label: "务农农民",
              prop: "reservation47",
              hide:true,
              rules: [{
                required: true,
                message: "请输入务农农民",
                trigger: "blur"
              }]
            },
            {
              label: "行政事业单位",
              prop: "reservation49",
              hide:true,
              rules: [{
                required: true,
                message: "请输入行政事业单位",
                trigger: "blur"
              }]
            },
            {
              label: "失业人员",
              prop: "reservation50",
              hide:true,
              rules: [{
                required: true,
                message: "请输入失业人员",
                trigger: "blur"
              }]
            },
            {
              label: "学生",
              prop: "reservation51",
              hide:true,
              rules: [{
                required: true,
                message: "请输入学生",
                trigger: "blur"
              }]
            },
            {
              label: "城镇居民",
              prop: "reservation52",
              hide:true,
              rules: [{
                required: true,
                message: "请输入城镇居民",
                trigger: "blur"
              }]
            },
            {
              label: "其他",
              prop: "reservation53",
              hide:true,
              rules: [{
                required: true,
                message: "请输入其他",
                trigger: "blur"
              }]
            },
            {
              label: "信教群众",
              prop: "reservation55",
              hide:true,
              rules: [{
                required: true,
                message: "请输入信教群众",
                trigger: "blur"
              }]
            },
            {
              label: "涉军人员",
              prop: "reservation56",
              hide:true,
              rules: [{
                required: true,
                message: "请输入涉军人员",
                trigger: "blur"
              }]
            },
            {
              label: "少数民族",
              prop: "reservation57",
              hide:true,
              rules: [{
                required: true,
                message: "请输入少数民族",
                trigger: "blur"
              }]
            },
            {
              label: "创建者",
              prop: "creator",
              rules: [{
                required: true,
                message: "请输入创建者",
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
              label: "删除标志",
              prop: "deleteflag",
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
              prop: "gxsj",
              hide:true,
              rules: [{
                required: true,
                message: "请输入更新时间",
                trigger: "blur"
              }]
            },
           /*
            {
              label: "保留字段1",
              prop: "reservation01",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段1",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段2 字典项:KIND=yw",
              prop: "reservation02",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段2 字典项:KIND=yw",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段3",
              prop: "reservation03",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段3",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段4 字典项:KIND=yw",
              prop: "reservation04",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段4 字典项:KIND=yw",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段5 字典项:KIND=yw",
              prop: "reservation05",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段5 字典项:KIND=yw",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段6 字典项:KIND=yw",
              prop: "reservation06",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段6 字典项:KIND=yw",
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
              label: "保字字段8",
              prop: "reservation08",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保字字段8",
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
              label: "保留字段1",
              prop: "reservation10",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段1 字典项:KIND=7",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段11",
              prop: "reservation11",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段11 字典项:KIND=17",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段12",
              prop: "reservation12",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段12 字典项:KIND=sj_jjqk",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段13",
              prop: "reservation13",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段13 字典项:KIND=SYQZXSD",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段16",
              prop: "reservation16",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段16",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段21",
              prop: "reservation21",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段21",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段22",
              prop: "reservation22",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段22",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段23",
              prop: "reservation23",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段23",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段24",
              prop: "reservation24",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段24",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段25",
              prop: "reservation25",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段25",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段26",
              prop: "reservation26",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段26",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段27",
              prop: "reservation27",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段27",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段28",
              prop: "reservation28",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段28",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段48",
              prop: "reservation48",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段48",
                trigger: "blur"
              }]
            },
            {
              label: "保留字段54",
              prop: "reservation54",
              hide:true,
              rules: [{
                required: true,
                message: "请输入保留字段54",
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
          addBtn: this.vaildData(this.permission.odsevent_add, false),
          viewBtn: this.vaildData(this.permission.odsevent_view, false),
          delBtn: this.vaildData(this.permission.odsevent_delete, false),
          editBtn: this.vaildData(this.permission.odsevent_edit, false)
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
