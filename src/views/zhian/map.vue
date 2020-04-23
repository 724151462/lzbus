<template>
  <div style="height:100%;width:100%;position:relative">
    <div class="map" id="map"></div>
    <div class="win-left">
      <a-input-search
        placeholder="input search text"
        style="width: 280px;margin-top: 10px"
        @search="onSearch"
      />
      <div class="bus-cont pad-lr- split" v-loading="loading"
      element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="pu-column pu-al-start" v-for="city in busInfo" :key="city.id">
          <span class="city-name mar-tb-5">{{ city.text }}</span>
          <div v-if="city.children.length == 0">
            <span>暂无信息</span>
          </div>
          <div v-else class="pu-column mar-l-10 f-12" v-for="company in city.children" :key="company.id">
            <div class="pu-row pu-row-sb" style="width:180px">
              <div class="pu-row" @click="foldChange(company)">
                <img width="15" v-if="company.fold == true" src="../../assets/imgs/minus.png" alt />
                <img width="15" v-else src="../../assets/imgs/plus.png" alt />
                <span class="mar-l-5">{{ company.text }}</span>
              </div>
              <div>
                (
                <span>{{company.runBusCount}}</span>/
                <span>{{company.totalBusCount}}</span>)
              </div>
            </div>
            <div v-if="company.fold == true">
              <div class="mar-l-10" v-if="company.busList.length == 0">
                <span>暂无信息</span>
              </div>
              <div
                class="mar-l-10 mar-tb-5 pu-row pu-row-sb"
                v-else
                v-for="bus in company.busList"
                :key="bus.id"
                @click="busLineClick(bus)"
              >
                <div>
                  <i :style="bus.select == true ? 'color:#96b5d4' : ''" class="el-icon-success"></i>
                  <span :style="bus.anjian ? 'color: #FF4545;' : ''">{{ bus.carTitle }}</span>
                  <span v-if="bus.anjian" class="anjian mar-l-10">案件({{bus.anjian}})</span>
                </div>
                <div>
                  (
                  <span>{{bus.runBusCount}}</span>/
                  <span>{{bus.totalBusCount}}</span>)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pu-column pad-lr-10 pu-al-start split"
      style="position: absolute;bottom: 10px;">
        <span style="color:#96B5D4">运营统计</span>
        <div class="pu-row pu-row-wrap mar-t-10">
          <div class="pu-column yy-num">
            <span style="color:#50D987">{{totalData.runBusCount}}</span>
            <span>运营({{totalData.runPercent}}%)</span>
          </div>
          <div class="pu-column yy-num">
            <span>{{totalData.stopBusCount}}</span>
            <span>停运({{totalData.stopPercent}}%)</span>
          </div>
          <div class="pu-column yy-num">
            <span>{{totalData.totalEventCount}}</span>
            <span>事件</span>
          </div>
          <div class="pu-column yy-num">
            <span>{{totalData.totalPersonCount}}</span>
            <span>重点人员</span>
          </div>
        </div>
      </div>
    </div>
    <div class="win-right f-12">
      <infoWindow
        v-if="cInfo == true"
        :windowId="'cInfo'"
        @winClose="close"
        :text="'车辆信息'"
        :icon="require('../../assets/imgs/car-info.png')"
      >
        <div class="pu-column pad-tb-5">
          <div
            class="mar-lr-10 pu-row pu-row-sb pu-al-start"
            style="border-bottom: 1px solid #295182;"
          >
            <div class="pu-column">
              <div class="pu-row" style="color: #fff">
                <img src="../../assets/imgs/car.png" alt />
                <span class="mar-l-10">{{rightCarInfo.busVO.carTitle}}-{{rightCarInfo.busVO.carNo}}</span>
              </div>
              <div class="pu-row" style="color: #27ECD9">
                <img src="../../assets/imgs/driver.png" alt />
                <span class="mar-l-10">{{rightCarInfo.staffVO.realName}}</span>
              </div>
              <div class="pu-row" style="color: #9ABCE2">
                <img src="../../assets/imgs/tel.png" alt />
                <span class="mar-l-10">{{rightCarInfo.staffVO.phone}}</span>
              </div>
              <div class="pu-row" style="color: #9ABCE2">
                <img src="../../assets/imgs/speed.png" alt />
                <span class="mar-l-10">{{rightCarInfo.busVO.speed}}km/h</span>
              </div>
              <div v-if="rightCarEvent.length > 0" class="mar-b-10 pu-row" style="color: #FF4545" @click="showLines">
                <img src="../../assets/imgs/warn.png" alt />
                <span class="mar-l-10">案件({{rightCarEvent.length}})</span>
              </div>
            </div>
            <div class="pu-column">
              <img :src="rightCarInfo.staffVO.phote || '../../assets/imgs/avatar.png'" style="height: 13vh" alt />
              <div class="pu-row pu-row-sb mar-l-10" style="width: 80px">
                <img src="../../assets/imgs/camera.png" alt />
                <img src="../../assets/imgs/video.png" alt />
                <img src="../../assets/imgs/map.png" alt />
              </div>
            </div>
          </div>
          <div>
            <div class="pu-column mar-lr-10 pu-al-start" style="color: #27ECD9;">
              <div>
                <img src="../../assets/imgs/cur-pos.png" alt />
                <span>当前位置： {{rightCarInfo.curPos}}</span>
              </div>
              <span style="margin-left: 18px">下一站点：{{rightCarInfo.nextStation}}</span>
              <span style="margin-left: 18px">终点站：{{rightCarInfo.finalStation}}</span>
            </div>
          </div>
        </div>
      </infoWindow>
      <infoWindow
        v-if="event == true && rightCarEvent.length > 0"
        :windowId="'event'"
        @winClose="close"
        class="mar-t-5"
        :text="`事件(${rightCarEvent.length})`"
        :icon="require('../../assets/imgs/alarm.png')"
      >
        <div class="pu-column pad-tb-5 mar-lr-10">
          <div class="pu-row pu-row-sb even-con" @click="getCarCases(item)"
          v-for="(item,index) in rightCarEvent" :key="index" >
            <div class="pu-row" style="color: #FF4251;">
              <img src="../../assets/imgs/warn.png" alt />
              <span class="mar-l-10">{{item.eventName}}</span>
            </div>
            <span style="color: #9ABCE2">{{item.eventTime}}</span>
          </div>
          <div class="pu-row pu-ju-end">
            <span style="color: #9ABCE2">更多</span>
          </div>
        </div>
      </infoWindow>
      <infoWindow
        v-if="zhuapai == true"
        :windowId="'zhuapai'"
        @winClose="close"
        class="mar-t-5"
        :text="'抓拍(2)'"
        :icon="require('../../assets/imgs/paizhao.png')"
      >
        <div class="pad-lr-10">
          <div
            class="pu-row"
            @click="showZhuapai"
            style="border-bottom: 1px solid #295182"
          >
            <img src="../../assets/imgs/zp-avatar.png" alt />
            <div class="pu-column pu-al-start mar-l-10">
              <div class="mar-b-5">
                <img src="../../assets/imgs/warn.png" alt />
                <span class="mar-l-5" style="color: #FF4251;">抓拍到可疑人物</span>
              </div>
              <span class="mar-b-5 f-16" style="margin-left: 22px;color: #fff;">陈刚</span>
              <span class="mar-b-5" style="margin-left: 22px;color: #50D987;">相似度：95%</span>
            </div>
          </div>
          <div class="pu-row" style="border-bottom: 1px solid #295182">
            <img src="../../assets/imgs/zp-avatar.png" alt />
            <div class="pu-column pu-al-start mar-l-10">
              <div class="mar-b-5">
                <img src="../../assets/imgs/warn.png" alt />
                <span class="mar-l-5" style="color: #FF4251;">抓拍到可疑人物</span>
              </div>
              <span class="mar-b-5 f-16" style="margin-left: 22px;color: #fff;">陈刚</span>
              <span class="mar-b-5" style="margin-left: 22px;color: #50D987;">相似度：95%</span>
            </div>
          </div>
          <div class="pu-row pu-ju-end">
            <span style="color: #9ABCE2">更多</span>
          </div>
        </div>
      </infoWindow>
    </div>
    <div class="win-mid">
      <infoWindowMid v-if="tfEvent == true" :windowId="'tfEvent'" @winClose="close" :text="'突发事件'">
        <div class="pu-row pu-row-wrap">
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-car.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">事件车辆：</span>
            <span class="f-white">桂C80001</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-event.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">事件类型：</span>
            <span class="f-white">公共安全</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-event.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">发生时间：</span>
            <span class="f-white">2020-02-19 04:45:23</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-event.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">驾驶员：</span>
            <span class="f-white">陈师傅</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-event.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">联系方式：</span>
            <span class="f-white">13400000000</span>
          </div>
        </div>
        <div class="info-item pu-row">
          <img src="../../assets/imgs/cur-pos.png" alt />
          <span class="mar-l-5" style="color:#00F0FF">位置：</span>
          <span style="color:#00F0FF">桂中大道北段100米</span>
        </div>
        <div class="car-video pu-column pu-al-start">
          <span style="color:#9ABCE2;">车内视频</span>
          <div class="pu-row mar-t-10">
            <div class="pu-column">
              <video style="background-color: #fff" src width="230" height="140"></video>
              <span style="color:#9ABCE2;">车中段探头</span>
            </div>
            <div class="pu-column mar-l-10">
              <video style="background-color: #fff" src width="230" height="140"></video>
              <span style="color:#9ABCE2;">车中段探头</span>
            </div>
          </div>
        </div>
        <div class="car-video pu-column pu-al-start">
          <span style="color:#9ABCE2;">车内抓拍</span>
          <div class="pu-row mar-t-10" style="position: relative">
            <div class="img-wrapper">
              <div id="img-content" style="position: relative;left: 0px">
                <img
                  v-for="(item, index) in imgLength"
                  :key="index"
                  class="mar-r-10"
                  height="90"
                  width="135"
                  :src="require('../../assets/imgs/zp.png')"
                  alt
                />
              </div>
              <img class="al" src="../../assets/imgs/left.png" @click="toLeft" alt />
              <img class="ar" src="../../assets/imgs/right.png" @click="toRight" alt />
            </div>
          </div>
        </div>
        <div class="pu-row" style="justify-content: center">
          <el-button type="primary" style="background: #0DBD13;border: none">处理事件</el-button>
          <el-button class="mar-lr-10" type="primary">转110指挥中心</el-button>
          <el-button type="primary" style="background: #576066;border: none">忽略误判</el-button>
        </div>
      </infoWindowMid>
      <infoWindowMid
        v-if="dfCasesLine == true"
        :windowId="'dfCasesLine'"
        @winClose="close"
        :text="'多发案件路线'"
      >
        <a-table :columns="columns" :dataSource="carCases">
          <!-- <a slot="name" slot-scope="text">{{text}}</a> -->
          <span
            :style="isDone == 0 ? 'color:#FF4350' : 'color:#50D987'"
            slot="isDone"
            slot-scope="isDone"
          >{{isDone == 0 ? '未破案' : '已破案'}}</span>
        </a-table>
        <div class="pu-row" style="justify-content: center">
          <el-button type="primary" style="width: 200px;height:40px">查看路线</el-button>
        </div>
      </infoWindowMid>
      <infoWindowMid
        v-if="kyZhuapai == true"
        :windowId="'kyZhuapai'"
        @winClose="close"
        :text="'可疑抓拍'"
      >
        <div class="pu-row pu-row-wrap">
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-car.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">事件车辆：</span>
            <span class="f-white">桂C80001</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-event.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">抓拍分析：</span>
            <span class="f-white">重点人员</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-time.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">发生时间：</span>
            <span class="f-white">2020-02-19 04:45:23</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-dirver.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">驾驶员：</span>
            <span class="f-white">陈师傅</span>
          </div>
          <div class="info-item pu-row">
            <img src="../../assets/imgs/tf-tel.png" alt />
            <span class="mar-l-5" style="color: #9ABCE2;">联系方式：</span>
            <span class="f-white">13400000000</span>
          </div>
          <div class="info-item pu-row" style="color: #FF4251;">
            <img src="../../assets/imgs/warn.png" alt />
            <span class="mar-l-5">抓拍人员：</span>
            <span>王琦</span>
          </div>
        </div>
        <div class="info-item pu-row">
          <img src="../../assets/imgs/cur-pos.png" alt />
          <span class="mar-l-5" style="color:#00F0FF">位置：</span>
          <span style="color:#00F0FF">桂中大道北段100米</span>
        </div>
        <div class="car-video pu-column pu-al-start">
          <span style="color:#9ABCE2;">车内视频</span>
          <div class="pu-row mar-t-10">
            <div class="pu-column">
              <video style="background-color: #fff" src width="230" height="140"></video>
              <span style="color:#9ABCE2;">车中段探头</span>
            </div>
            <div class="pu-column mar-l-10">
              <video style="background-color: #fff" src width="230" height="140"></video>
              <span style="color:#9ABCE2;">车中段探头</span>
            </div>
          </div>
        </div>
        <div class="car-video pu-column pu-al-start">
          <span style="color:#9ABCE2;">抓拍比对</span>
          <div class="pu-row pu-row-sb mar-t-10" style="width:100%">
            <div class="pu-column">
              <img height="120" width="110" :src="zpImg" alt />
              <span style="color: #29D43A">抓拍照片</span>
            </div>
            <div class="pu-row">
              <div class="pu-column" v-for="(item, index) in zpImgList" :key="index">
                <img class="mar-r-5" height="120" width="110" :src="item.src" alt />
                <span style="color: #29D43A">{{item.name}}-{{item.like}}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pu-row" style="justify-content: center">
          <el-button type="primary" style="background: #FDA118;border: none">查看轨迹</el-button>
          <el-button class="mar-l-10" type="primary" style="background: #0DBD13;border: none">处理事件</el-button>
          <el-button class="mar-l-10" type="primary">转110指挥中心</el-button>
          <el-button class="mar-l-10" type="primary" style="background: #576066;border: none">忽略误判</el-button>
        </div>
      </infoWindowMid>
    </div>
    <div></div>
  </div>
</template>

<script>
// @ is an alias to /src

import infoWindow from "../../components/zhian/infoWindow.vue";
import infoWindowMid from "../../components/zhian/infoWindowMid.vue";
import { busLinesAPI, getCarsAPI, getRightCarInfoAPI, getCarCasesAPI, getRightCarEventsAPI, busTotalData} from "@/api/zhian/map";
export default {
  name: "Home",
  data() {
    return {
        loading: false,
      cInfo: false,
      event: false,
      zhuapai: false,
      tfEvent: false,
      dfCasesLine: false,
      kyZhuapai: false,
      totalData: {},
      busInfo: [
        {
          id: "29489",
          parentid: "0",
          text: "柳州市",
          level: 2,
          busList: [],
          children: [
            {
              id: "1240876701365116930",
              parentid: "29489",
              text: "公交总公司",
              level: 2,
              fold: false,
              busList: [
                {
                  id: -1,
                  createUser: -1,
                  createDept: -1,
                  createTime: "",
                  updateUser: -1,
                  updateTime: "",
                  status: -1,
                  isDeleted: -1,
                  busCompanyId: "1240876701365116930",
                  code: "",
                  carNo: "",
                  carTitle: "10路",
                  sitNum: -1,
                  workTime: "",
                  busType: "",
                  speed: -1,
                  lineId: -1,
                  lng: -1,
                  lat: -1,
                  driver: "",
                  security: "",
                  driverId: "",
                  driverType: "",
                  companyName: "",
                  driverName: "",
                  lineName: "",
                  runBusCount: 1,
                  totalBusCount: 2,
                  select: false
                },
                {
                  id: -1,
                  createUser: -1,
                  createDept: -1,
                  createTime: "",
                  updateUser: -1,
                  updateTime: "",
                  status: -1,
                  isDeleted: -1,
                  busCompanyId: "1240876701365116930",
                  code: "",
                  carNo: "",
                  carTitle: "11路",
                  sitNum: -1,
                  workTime: "",
                  busType: "",
                  speed: -1,
                  lineId: -1,
                  lng: -1,
                  lat: -1,
                  driver: "",
                  security: "",
                  driverId: "",
                  driverType: "",
                  companyName: "",
                  driverName: "",
                  lineName: "",
                  runBusCount: 1,
                  totalBusCount: 1,
                  select: false
                }
              ],
              children: [],
              runBusCount: 2,
              totalBusCount: 3
            }
          ],
          runBusCount: 2,
          totalBusCount: 3
        },
        {
          id: "29618",
          parentid: "0",
          text: "桂林市",
          level: 2,
          busList: [],
          children: [
            {
              id: "1242295072862363649",
              parentid: "29618",
              text: "公交二分部有限公司",
              level: 2,
              busList: [],
              children: [],
              runBusCount: 0,
              totalBusCount: 0,
              fold: false
            }
          ],
          runBusCount: 0,
          totalBusCount: 0
        }
      ],
      carInfo: {
        code: "171路-桂C800001",
        driver: "陈师傅",
        tel: 18459183928,
        speed: 40,
        warn: "案件多发线路(20)",
        curPos: "桂中大道北段100m",
        nextStation: "文化中学",
        finalStation: "火车站"
      },
      curPicIdx: 0,
      imgLength: 11,
      columns: [
        {
          title: "案件",
          dataIndex: "caseName",
          width: 50
        },
        {
          title: "案发地",
          dataIndex: "address",
          width: 150
        },
        {
          title: "案发时间",
          dataIndex: "caseTime",
          width: 70
        },
        {
          title: "是否破案",
          dataIndex: "isDone",
          width: 55,
          scopedSlots: { customRender: "isDone" }
        }
      ],
      carCases: [
        {
          key: "1",
          id: "车辆劫持",
          address: "文兴路与桂中大道交界",
          caseTime: "2019-8-30",
          isDone: "未破案"
        },
        {
          key: "2",
          id: "车辆劫持",
          address: "文兴路与桂中大道交界",
          caseTime: "2019-8-30",
          isDone: "已破案"
        }
      ],
      zpImg: require("../../assets/imgs/zp-img.png"),
      zpImgList: [
        {
          src: require("../../assets/imgs/zp-img1.png"),
          like: 98,
          name: "张琪"
        },
        {
          src: require("../../assets/imgs/zp-img2.png"),
          like: 94,
          name: "张琪1"
        },
        {
          src: require("../../assets/imgs/zp-img3.png"),
          like: 96,
          name: "张琪2"
        },
        {
          src: require("../../assets/imgs/zp-img4.png"),
          like: 96,
          name: "张琪3"
        },
        {
          src: require("../../assets/imgs/zp-img5.png"),
          like: 98,
          name: "张琪4"
        }
      ],
      mapCars: [{
            "id": "1241976547278958594",
            "createUser": "1123598821738675201",
            "createDept": "1123598813738675201",
            "createTime": "2020-03-23 14:34:18",
            "updateUser": "1123598821738675201",
            "updateTime": "2020-03-31 16:41:24",
            "status": 1,
            "isDeleted": 0,
            "busCompanyId": "1240876701365116930",
            "code": "DT301",
            "carNo": "桂0000",
            "carTitle": "10路",
            "sitNum": 156,
            "workTime": "2020-03-23 02:34",
            "busType": "1",
            "speed": -1,
            "lineId": "1243018066001764354",
            "lng": 109.419256,
            "lat": 24.32588
        }, {
            "id": "1241982434219425794",
            "createUser": "1123598821738675201",
            "createDept": "1123598813738675201",
            "createTime": "2020-03-23 14:57:42",
            "updateUser": "1123598821738675201",
            "updateTime": "2020-03-31 16:40:58",
            "status": 0,
            "isDeleted": 0,
            "busCompanyId": "1240876701365116930",
            "code": "18",
            "carNo": "桂1111",
            "carTitle": "10路",
            "sitNum": 48,
            "workTime": "2020-03-05 12:00",
            "busType": "1",
            "speed": -1,
            "lineId": "1243358981106962434",
            "lng": 109.39694,
            "lat": 24.311645
        }],
        // 当前点击的车的id
      curCarId: '',
      lineIds: [],
      markers: [],
      rightCarInfo: {},
      mapInfoWindow: ''
    };
  },
  components: {
    infoWindow,
    infoWindowMid
  },
  mounted() {
    window.map = new AMap.Map("map", {
      center: [109.413677, 24.308829],
      zoom: 11
    });
    this.initBusList();
    if (this.imgLength > 5) {
      this.curPicIdx = 5;
    } else {
      this.curPicIdx = this.imgLength;
    }
    // 获取运营统计数据
    this.getTotalData()
  },
  methods: {
      getTotalData() {
          busTotalData().then(res => {
              let totalBus = res.data.data.runBusCount + res.data.data.stopBusCount
              res.data.data.runPercent = (res.data.data.runBusCount/totalBus).toFixed(4)*100
              res.data.data.stopPercent = 100 - res.data.data.runPercent
              this.totalData = res.data.data
          })
      },
    initBusList() {
      busLinesAPI().then(res => {
          console.log(res.data)
          res.data.data.forEach(element => {
              element.children.forEach(ele => {
                  ele.fold = false
              })
          });
          this.busInfo = res.data.data
      })
    },
    // 多发事件
    getRightCarEvent() {
        getRightCarEventsAPI({ids: this.curCarId}).then(res => {
            console.log(res.data.data)
            this.rightCarEvent = res.data.data
        })
    },
    // 可以抓拍
    showZhuapai() {
      this.dfCasesLine = false;
      this.tfEvent = false;
      this.kyZhuapai = true;
    },
    // 突发事件
    showLines() {
      this.dfCasesLine = false;
      this.tfEvent = true;
      this.kyZhuapai = false;
    },
    close(val) {
      switch (val) {
        case "cInfo":
          this.cInfo = false;
          console.log(this.cInfo);
          break;
        case "event":
          this.event = false;
          break;
        case "zhuapai":
          this.zhuapai = false;
          break;
        case "tfEvent":
          this.tfEvent = false;
          break;
        case "dfCasesLine":
          this.dfCasesLine = false;
          break;
        case "kyZhuapai":
          this.kyZhuapai = false;
          break;
        default:
          break;
      }
    },
    onSearch(val) {},
    foldChange(item) {
      item.fold = !item.fold;
    },
    busLineClick(bus) {
        //UI展示
        bus.select = !bus.select

        // 查无此id时加入id数组，请求数据，有就删除这个id
        if (bus.select == true) {
            this.showBusLocation(bus)
        } else {
            console.log(this.mapInfoWindow)
            if(this.mapInfoWindow != '') {
                this.mapInfoWindow.close()
            }
            this.delBusLocation(bus)
        }

    },
    showBusLocation(bus) {
        this.loading = true
        getCarsAPI({
        ids: bus.busCompanyId,
        lineId: bus.lineId
      }).then(res => {
          this.loading = false
        if (res.data.code == 200) {
            let lineId = ''
            let ids = []
            console.log(res.data.data)
            this.mapCars = res.data.data;
            this.mapCars.forEach(element => {
                // 自定义点标记内容
                var markerContent = document.createElement("div");
                // 点标记中的图标
                var markerImg = document.createElement("img");
                markerImg.src = require("../../assets/imgs/bus.png");
                markerContent.id = element.id;
                markerContent.appendChild(markerImg);

                lineId = element.lineId
                ids.push(element.id)

                // 构造点标记
                var marker = new AMap.Marker({
                    position: [element.lng, element.lat],
                    extData:{
                        id: element.id
                    }
                });
                marker.setContent(markerContent); //更新点标记内容
                // 单独将点标记添加到地图上
                window.map.add(marker);
                this.markers.push(marker)
                setTimeout(() => {
                    document
                    .getElementById(element.id)
                    .addEventListener("click", () => {
                        this.showInfo(element);
                    });
                }, 500);
            });
            this.lineIds.push({lineId, cars: ids})
            console.log(this.lineIds)
            window.map.setFitView();

        }

      });
    },
    delBusLocation(bus) {
        console.log(bus, this.lineIds)
            this.lineIds.forEach((line, index) => {
              console.log(line)
                if (line.lineId == bus.lineId) {
                    if (line.cars.length != 0) {
                        line.cars.forEach(id =>{
                            let m = this.markers.find(item => item.getExtData().id == id)
                            let midx = this.markers.findIndex(item => item.getExtData().id == id)
                            window.map.remove(m)
                            this.markers.splice(midx, 1)
                        })
                    }
                    this.lineIds.splice(index, 1)
                }
            })
    },
    openMapCarInfo(item) {
        let dsDom = item.status == 1 ? '<span class="mar-t-5" style="background: #0DBD13;border-radius: 2px;color: #fff">正常行驶</span></div>' : '<span class="mar-t-5" style="background: red;border-radius: 2px;color: #fff">有情况</span></div>'
      // 信息窗体的内容
      var content = `<div style="background: rgba(40, 83, 123, 0.95);border-radius: 6px;">
                <div class="mar-t-5" style="color:#00F0FF;">${item.carTitle}</div>
                <div class="mar-t-5" style="color:#00F0FF;">${item.carNo}</div>
                <div class="mar-t-5"><span style="color: #E1E1E1;">${item.speed}km/h</span>
                ${dsDom}
            </div>`;

      // 创建 infoWindow 实例
      this.mapInfoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(10, -40),
        content: content //传入 dom 对象，或者 html 字符串
      });

      // 打开信息窗体
      this.mapInfoWindow.open(window.map, [item.lng, item.lat]);
    },
    showInfo(item) {
        this.curCarId = item.id
      this.openMapCarInfo(item);
      this.getRightCarInfo(item);
      this.getRightCarEvent(item);
      this.cInfo = true;
      this.event = true;
      this.zhuapai = true;
    },
    getRightCarInfo(item) {
        getRightCarInfoAPI({ids: item.id}).then(res => {
            console.log(res.data.data)
            this.rightCarInfo = res.data.data[0]
        })
    },
    getCarCases() {
        getCarCasesAPI({ids: this.curCarId}).then(res => {
            console.log(res.data.data)
            this.carCases = res.data.data
            this.dfCasesLine = true;
            this.tfEvent = false;
            this.kyZhuapai = false;
        })
    },
    toLeft() {
      if (this.curPicIdx < 6) {
        return;
      }
      this.curPicIdx -= 1;
      let left = Number(
        document.getElementById("img-content").style.left.replace("px", "")
      );
      left += 145;
      document.getElementById("img-content").style.left = left + "px";
      console.log(this.curPicIdx);
    },
    toRight() {
      if (this.imgLength <= 5) {
        return;
      }
      if (this.curPicIdx < this.imgLength) {
        this.curPicIdx += 1;
        let left = Number(
          document.getElementById("img-content").style.left.replace("px", "")
        );
        left -= 145;
        document.getElementById("img-content").style.left = left + "px";
      }
      console.log(this.curPicIdx);
    }
  }
};
</script>
<style lang="scss">
@import url('../../assets/css/map.css');
.bus-cont {
  color: #fff;
}
.city-name {
  color: #96b5d4;
  float: left;
}
.anjian {
  background-color: #ff4350;
  border-radius: 3px;
  padding: 3px;
}
.amap-info-content {
  background-color: #295182;
  padding: 10px;
  border-radius: 5px
}
.bottom-center .amap-info-sharp {
  border-top: 8px solid #295182;
}
.even-con {
  border-bottom: 1px solid #295182;
  margin-bottom: 10px;
}
.info-item {
  width: 240px;
  margin-bottom: 10px;
}

.car-video {
  padding: 10px 0;
  border-top: 1px solid #295182;
}

.img-inner-wrapper {
}

.img-wrapper {
  width: 720px;
  white-space: nowrap;
  overflow: hidden;
}
.al {
  position: absolute;
  top: 40px;
  left: -16px;
}
.ar {
  position: absolute;
  top: 40px;
  right: -16px;
}

.ant-table {
  color: #fff;
}
.ant-table-thead > tr > th {
  background: #2f4a62;
  color: #8bb3d7;
}
.ant-table-tbody > tr:nth-child(odd) {
  background: #1e2e42;
  color: #8bb3d7;
}
.ant-table-tbody > tr:nth-child(even) {
  background: #23364e;
  color: #8bb3d7;
}
.ant-table-thead {
  height: 33px;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 10px;
}
.ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
  background: #000;
}
.ant-table-tbody > tr > td {
  border: none;
}
.ant-table-thead > tr > th {
  border: none;
}
.split {
  border-top: 1px solid #295182;
}
.yy-num {
  width: 50%;
  align-items: center;
}
.yy-num :first-child {
  font-size: 30px;
  color: #ff4251;
}
.yy-num :nth-child(2) {
  font-size: 15px;
  color: #fff;
}
</style>
