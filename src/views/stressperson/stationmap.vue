<template>
  <div id="station-map"></div>
</template>
<script>
import {stationPointsAPI, getDetail} from '../../api/stressperson/station'
export default {
  data() {
    return{

    }
  },
  mounted() {
    this.initMap()
    this.drawStationPoints()
  },
  methods: {
    initMap(){
      window.map = new AMap.Map("station-map", {
      center: [109.413677, 24.308829],
      zoom: 11
    });
    },
    drawStationPoints() {
      stationPointsAPI('', true).then(res => {
        res.data.forEach(element => {
          console.log(element)
          // 自定义点标记内容
          var markerContent = document.createElement("div");
          // 点标记中的图标
          var markerImg = document.createElement("img");
          console.log(element.focusType)
          markerImg.src = element.focusType == 1 ? require("../../assets/imgs/s-danger.png"):require("../../assets/imgs/s-normal.png");
          markerImg.width = 24
          markerContent.id = element.id;
          markerContent.appendChild(markerImg);
          let marker = new AMap.Marker({
              icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              position: [element.lng, element.lat],
          });
          marker.setContent(markerContent)
          window.map.add(marker)
          // 挂载点击事件
          setTimeout(() => {
                    document
                    .getElementById(element.id)
                    .addEventListener("click", () => {
                        this.showInfo(element);
                    });
                }, 500);
          });
          window.map.setFitView();
      })
    },
    showInfo(item) {
      getDetail(item.id, 1).then(res => {
        console.log(res.data)
        // 信息窗体的内容
        var content = `<div class="f-12">
                  <div class="mar-t-5" style="color:#00F0FF;">站点名称：${res.data.data.stationName}</div>
                  <div class="mar-t-5" style="color:#00F0FF;">站点编码：${res.data.data.stationCode}</div>
                  <div class="mar-t-5"><span style="color: #E1E1E1;">开始时间：${res.data.data.startTime}</span>
                  <div class="mar-t-5"><span style="color: #E1E1E1;">结束时间：${res.data.data.endTime}</span>
              </div>`;

        // 创建 infoWindow 实例
        this.mapInfoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(10, -40),
          content: content //传入 dom 对象，或者 html 字符串
        });

        // 打开信息窗体
        this.mapInfoWindow.open(window.map, [item.lng, item.lat]);
      })
    }
  }
}
</script>
<style lang="scss">
  #station-map{
    height: 100vh;
    width: 100%;
  }
  .amap-info-content{
    background: rgba(40, 83, 123, 0.95);
  }
  .bottom-center .amap-info-sharp {
    border-top: 8px solid #295182;
  }
</style>
