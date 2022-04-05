import Vue from "vue";
import App from "./App.vue"
import './style/index.css'

import router from './router'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  el: "#app",
  router,
}).$mount();