<template>
  <div>
    <!-- <ul class="infinite-list" infinite-scroll-immediate-check="false" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul> -->
    <el-date-picker
      v-model="value"
      type="daterange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </div>
</template>

<script>
import {getList} from '../api/test'
  export default {
    data () {
      return {
        count: 0,
        value: ''
      }
    },
    mounted() {
      getList()
    },
    methods: {
      load () {
        this.count += 2
      }
    }
  }
</script>
<style>
.infinite-list {
    height: 290px;
    padding: 0;
    margin: 0;
    list-style: none;
}
.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
}
</style>
