import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "u-reset.css"
import store from "./store";

import vconsole from 'vconsole'

new vconsole()
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
