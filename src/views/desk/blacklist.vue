<template>
  <div style="position: relative; height: 100%; width: 100%">
    <div id="map" class="map"></div>
    <div class="win-left-mult">
      <a-input-search
        placeholder="input search text"
        style="width: 280px;margin-top: 10px"
        @search="onSearch"
      />
      <div class="left-mult-cont pad-tb-10 pad-lr-10 f-12" style="min-height: 120px" v-loading="loading"
      element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
        <div v-for="(area, index) in bList" :key="index">
          <div class="pu-row pu-row-sb">
            <div class="pu-row" @click="foldChange(area)">
              <img width="15" v-if="area.fold == true" src="../../assets/imgs/minus.png" alt />
              <img width="15" v-else src="../../assets/imgs/plus.png" alt />
              <span class="area-name">{{ area.name }}</span>
            </div>
            <span style="color: #9DB9D9;">({{area.count}})</span>
          </div>
          <div v-if="area.children.length == 0">
            <span>暂无信息</span>
          </div>
          <div v-else class="pu-column mar-l-10">
            <template v-if="area.fold == true">
              <div v-for="people in area.children" :key="people.id" class="pu-row pu-row-sb" style="width:220px">
                <div class="pu-row">
                  <span class="mar-l-5">{{ people.name }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <infoWindow
        @winClose="close"
        class="mar-t-10"
        :text="'人员分析统计'"
        :icon="require('../../assets/imgs/person.png')">
        <div id="fenbu" class="charts-cont"></div>
        <div class="pu-row pu-row-sb pu-row-wrap pad-b-10">
          <div v-for="(item, index) in carStatus" class="pu-row pu-ju-center" style="width:40%" :key="index">
            <span class="legend" :style="{backgroundColor: colors[index]}"></span>
            <span :style="{color: colors[index]}" class="f-12 mar-l-5">{{item.name}}</span>
          </div>
        </div>
      </infoWindow>
      <infoWindow
        @winClose="close"
        class="mar-t-10"
        :text="'人员出行频率'"
        :icon="require('../../assets/imgs/car-info.png')">
        <div id="chuxing" class="charts-cont"></div>
        <div class="pu-row pu-row-sb pu-row-wrap pad-b-10">
          <div v-for="(item, index) in carStatus" class="pu-row pu-ju-center" style="width:40%" :key="index">
            <span class="legend" :style="{backgroundColor: colors[index]}"></span>
            <span :style="{color: colors[index]}" class="f-12 mar-l-5">{{item.name}}</span>
          </div>
        </div>
      </infoWindow>
    </div>
    <div class="win-right" style="top: 10px">
      <infoWindow
        :windowId="'cInfo'"
        @winClose="close"
        :text="'人员信息'"
        :icon="require('../../assets/imgs/person.png')"
      >
        <div class="pu-column pad-tb-10">
          <div
            class="mar-lr-10 pu-row pu-row-sb pu-al-start"
            style="border-bottom: 1px solid #295182;"
          >
            <div class="pu-column">
              <div class="mar-b-10 pu-row" style="color: #27ECD9">
                <img src="../../assets/imgs/car.png" alt />
                <span class="mar-l-10">姓名：张三</span>
              </div>
              <div class="mar-b-10 pu-row pu-al-start" style="color: #27ECD9">
                <img src="../../assets/imgs/driver.png" alt />
                <div class="pu-column">
                  <span class="mar-l-10">身份证：</span>
                  <span style="margin-left: -20px">350521199412148022</span>
                </div>
              </div>
              <div class="mar-b-10 pu-row" style="color: #FF4545">
                <img src="../../assets/imgs/warn.png" alt />
                <span class="mar-l-10">黑名单人员</span>
              </div>
            </div>
            <div>
              <img src="../../assets/imgs/avatar.png" height="100" width="80" alt="">
            </div>
          </div>
          <span class="mar-l-10 mar-t-5" style="color: #27ECD9">原因：互联网诈骗，在逃</span>
        </div>
      </infoWindow>
      <infoWindow
        :windowId="'cInfo'"
        @winClose="close"
        :text="'附近单位'"
        :icon="require('../../assets/imgs/person.png')"
      >
      <div class="pu-row pu-row-sa">
        <span style="color: #27ECD9;">张斌</span>
        <span style="color: #9ABCE2;">柳州派出所</span>
        <div>
          <img width="10" src="../../assets/imgs/car-info.png" alt="">
          <img class="mar-l-10" width="12" src="../../assets/imgs/car-info.png" alt="">
          <img class="mar-l-10" width="12" src="../../assets/imgs/car-info.png" alt="">
        </div>
      </div>
      </infoWindow>
      <infoWindow
        :windowId="'cInfo'"
        @winClose="close"
        :text="'视频轨迹'"
        :icon="require('../../assets/imgs/person.png')"
      >
      <div class="pu-row pu-row-wrap pad-tb-10 pad-lr-10">
        <div class="pu-column" style="align-items: center;width:25%">
          <img height="60" width="50" src="../../assets/imgs/avatar.png" alt="">
          <div class="pu-column f-12">
            <span style="color: #29D43A;">桂1234 前门</span>
            <span style="color: #6187A8;">2019-12-30</span>
          </div>
        </div>
        <div class="pu-column" style="align-items: center;width:25%">
          <img height="60" width="50" src="../../assets/imgs/avatar.png" alt="">
          <div class="pu-column f-12">
            <span style="color: #29D43A;">桂1234 前门</span>
            <span style="color: #6187A8;">2019-12-30</span>
          </div>
        </div>
        <div class="pu-column" style="align-items: center;width:25%">
          <img height="60" width="50" src="../../assets/imgs/avatar.png" alt="">
          <div class="pu-column f-12">
            <span style="color: #29D43A;">桂1234 前门</span>
            <span style="color: #6187A8;">2019-12-30</span>
          </div>
        </div>
        <div class="pu-column" style="align-items: center;width:25%">
          <img height="60" width="50" src="../../assets/imgs/avatar.png" alt="">
          <div class="pu-column f-12">
            <span style="color: #29D43A;">桂1234 前门</span>
            <span style="color: #6187A8;">2019-12-30</span>
          </div>
        </div>
        <div class="pu-column" style="align-items: center;width:25%">
          <img height="60" width="50" src="../../assets/imgs/avatar.png" alt="">
          <div class="pu-column f-12">
            <span style="color: #29D43A;">桂1234 前门</span>
            <span style="color: #6187A8;">2019-12-30</span>
          </div>
        </div>
      </div>
      </infoWindow>
    </div>
    <div class="win-mid">
      <!-- <infoWindow
        v-if="zhuapai == true"
        :windowId="'zhuapai'"
        @winClose="close"
        class="mar-t-5"
        :text="'抓拍(2)'"
        :icon="require('../../assets/imgs/paizhao.png')"
      ></infoWindow> -->
    </div>
  </div>
</template>
<script>
  import {blackListAPI, personFenbuAPI, personChuxingAPI} from '@/api/desk/blacklist'
  import infoWindow from "../../components/zhian/infoWindow.vue";
  import infoWindowMid from '../../components/zhian/infoWindowMid.vue';
  export default{
    data() {
      return{
        loading: false,
        colors: [ '#FF4251', '#FE8850', '#F6FF8F', '#FFC658', '#4AA7DC', '#74D6F3', 'purple' ],
        // 黑名单列表
        bList: [],
        carStatus: [
            {"value": 335, "name": "柳中"},
            {"value": 310, "name": "柳东"},
            {"value": 234, "name": "柳北"},
            {"value": 135, "name": "柳南"},
            {"value": 1548, "name": "城中"}
        ]
      }
    },
    components:{
      infoWindow,
      infoWindowMid
    },
    mounted() {
      this.initMap()
      // 获取黑名单
      this.getBlackList()
      this.drawFenbuPie()
      this.drawChuxingPie()
    },
    methods:{
      close() {},
      onSearch(val) {},
      foldChange(item) {
        item.fold = !item.fold;
      },
      getBlackList() {
        blackListAPI('', true).then(res => {
          console.log(res.data.length)
          this.bList = res.data
        })
      },
      initMap() {
        window.map = new AMap.Map("map", {
          center: [109.413677, 24.308829],
          zoom: 11
        });
      },
      drawFenbuPie(){
        personFenbuAPI('', true).then(res => {
          // this.carStatus = res.data
          // 基于准备好的dom，初始化echarts实例
          let fenbu = this.$echarts.init(document.getElementById('fenbu'))
          // 绘制图表
          fenbu.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              color : this.colors,
              // legend : {
              //         show : true,
              //         type : 'scroll',
              //         orient : 'horizontal',
              //         bottom : 0,
              //         data : ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
              //         textStyle : {
              //             color : this.colors
              //         }
              //     },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['30%', '60%'],
                      // center: ['50%', '60%'],
                      data: this.carStatus,
                  }
              ]
          });
        })

    },
    drawChuxingPie(){
        personChuxingAPI('', true).then(res => {
          // this.carStatus = res.data
          // 基于准备好的dom，初始化echarts实例
          let chuxing = this.$echarts.init(document.getElementById('chuxing'))
          // 绘制图表
          chuxing.setOption({
              tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              color : this.colors,
              // legend : {
              //         show : true,
              //         type : 'scroll',
              //         orient : 'horizontal',
              //         bottom : 0,
              //         data : ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
              //         textStyle : {
              //             color : this.colors
              //         }
              //     },
              series: [
                  {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['30%', '60%'],
                      // center: ['50%', '60%'],
                      data: this.carStatus,
                  }
              ]
          });
        })

    }
    }

  }
</script>
<style lang="scss" scoped>
  @import url('../../assets/css/map.css');
  .charts-cont{
    min-width: 150px;
    height: 100px;
  }
  .legend{
    height: 10px;
    width: 20px;
    display: inline-block;
  }
</style>
