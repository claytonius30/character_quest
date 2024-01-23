// Clayton DeSimone
// Client Side Programming
// Task 2
// 12/11/2023

import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

