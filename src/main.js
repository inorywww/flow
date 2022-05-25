import Vue from "vue";
import App from "./App.vue"
import './style/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import router from './router'
Vue.config.productionTip = false
import x2js from 'x2js'
Vue.prototype.$x2js = new x2js()
new Vue({
  render: (h) => h(App),
  el: "#app",
  router,
}).$mount();