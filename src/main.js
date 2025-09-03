// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import store from './store'
import {securedAxiosInstance, plainAxiosInstance} from './backend/axios/index1'
import backendHealthService from './services/BackendHealthService.js'
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

// Clear any invalid tokens on app startup
function clearInvalidTokens() {
  const token = localStorage.getItem('jwt_access')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem('jwt_access')
        console.log('Cleared expired token on startup')
      }
    } catch (error) {
      localStorage.removeItem('jwt_access')
      console.log('Cleared invalid token on startup')
    }
  }
}

// Run token cleanup on startup
clearInvalidTokens()

// Start backend health monitoring
backendHealthService.startHealthMonitoring()

// Listen for backend health changes
window.addEventListener('backendHealthChange', (event) => {
  const { isHealthy } = event.detail
  if (!isHealthy) {
    console.warn('Backend is currently unavailable')
    // You can show a global notification here
    if (window.showGlobalNotification) {
      window.showGlobalNotification('Backend service is currently unavailable. Please try again later.', 'warning')
    }
  } else {
    console.log('Backend is back online')
    // You can show a success notification here
    if (window.showGlobalNotification) {
      window.showGlobalNotification('Backend service is back online!', 'success')
    }
  }
})

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
