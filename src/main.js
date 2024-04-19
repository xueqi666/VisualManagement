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
import store from './store'
import VueECharts from 'vue-echarts';
Vue.use(ElementUI);
Vue.prototype.$echarts = function (el) {
  return echarts.init(el, null, { renderer: 'svg' })
}
router.beforeEach(function (to, from, next) {
  let visual_token = localStorage.getItem('visual_token')
  if (visual_token || to.fullPath === "/" || to.fullPath === "/registry") {
    next();
  } else {
    next({ path: '/' })
  }
  // if (to.meta.needLogin) {
  //   //页面是否登录
  //   if (localStorage.getItem("token")) {
  //     //本地存储中是否有token(uid)数据
  //     next(); //表示已经登录
  //   } else {
  //     //next可以传递一个路由对象作为参数 表示需要跳转到的页面
  //     next({
  //       name: "login"
  //     });
  //   }
  // } else {
  //   //表示不需要登录
  //   next(); //继续往后走
  // }

  console.log("222222222222222222222", to, from);
});

Vue.prototype.$images = img
Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(utils)
Vue.component("v-chart", VueECharts);
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
