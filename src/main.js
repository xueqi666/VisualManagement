import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import './assets/less/index.less';
import * as echarts from 'echarts';
import img from './lib/img'
import utils from "./lib/utils";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "echarts";
import VueECharts from 'vue-echarts';
Vue.use(ElementUI);
Vue.prototype.$echarts = function (el) {
  return echarts.init(el, null, { renderer: 'svg' })
}
Vue.prototype.$images = img
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(utils)
Vue.component("v-chart", VueECharts);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
