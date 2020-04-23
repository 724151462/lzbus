import Vue from 'vue';
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router/router';
import './permission'; // 权限
import './error'; // 日志
import './cache'; //页面缓存
import store from './store';
import { loadStyle } from './util/util'
import * as urls from '@/config/env';
import Element from 'element-ui';
import 'ant-design-vue/dist/antd.css';
import Table from 'ant-design-vue/lib/table';
const env = process.env
Vue.component(Table.name, Table);
import {
    iconfontUrl,
    iconfontVersion
} from '@/config/env';
import i18n from './lang' // Internationalization
import './styles/common.scss';
import './assets/css/index.css'
import basicBlock from './components/basic-block/main'
import basicContainer from './components/basic-container/main'
import stationSelect from './views/stressperson/stationSelect';


import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(router)
Vue.use(VueAxios, axios)
Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})
Vue.use(window.AVUE, {
        i18n: (key, value) => i18n.t(key, value)
    })
    //注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('basicBlock', basicBlock)
Vue.component('stationSelect', stationSelect)
    // 加载相关url地址
Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

// 字体css内网环境改为静态加载

// if(env.NODE_ENV == 'development') {
//   // 动态加载阿里云字体库
//   iconfontVersion.forEach(ele => {
//       loadStyle(iconfontUrl.replace('$key', ele));
//   })
// }


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
