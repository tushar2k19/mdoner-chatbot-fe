import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    notifications: []
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },
    ADD_NOTIFICATION (state, notification) {
      state.notifications.unshift(notification)
    },
    MARK_NOTIFICATION_READ (state, notificationId) {
      const notification = state.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
      }
    }
  },
  actions: {
    login ({ commit }, userData) {
      commit('SET_USER', userData)
    },
    logout ({ commit }) {
      commit('SET_USER', null)
      localStorage.removeItem('jwt_access')
    }
  }
})

