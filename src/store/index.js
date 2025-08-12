import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    notifications: []
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
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
    logout ({ commit }) {
      // Call your logout API
      commit('SET_USER', null)
    }
  }
})
