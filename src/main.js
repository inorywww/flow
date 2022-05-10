import Vue from "vue";
import App from "./App.vue"
import './style/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import router from './router'
import axios from 'axios'
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  el: "#app",
  router,
}).$mount();