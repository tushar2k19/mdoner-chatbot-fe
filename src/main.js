// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import store from './store'
import {securedAxiosInstance, plainAxiosInstance} from './backend/axios/index1'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// import ActionCable from 'actioncable'
// window.ActionCable = ActionCable

// import './main.css'

Vue.config.productionTip = false
export const bus = new Vue()
Vue.prototype.bus = bus

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

Vue.use(Toast, {
  position: 'top-right',
  timeout: 3000
})

Vue.prototype.$http = {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
