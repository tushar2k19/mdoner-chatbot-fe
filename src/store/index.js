import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    notifications: [],
    conversations: {
      list: [],
      current: null
    },
    messages: [],
    documents: []
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
    },
    SET_CONVERSATIONS (state, conversations) {
      state.conversations.list = conversations
    },
    ADD_CONVERSATION (state, conversation) {
      state.conversations.list.unshift(conversation)
    },
    SET_CURRENT_CONVERSATION (state, conversation) {
      state.conversations.current = conversation
    },
    REMOVE_CONVERSATION (state, conversationId) {
      state.conversations.list = state.conversations.list.filter(c => c.id !== conversationId)
      if (state.conversations.current && state.conversations.current.id === conversationId) {
        state.conversations.current = null
      }
    },
    SET_MESSAGES (state, messages) {
      state.messages = messages
    },
    ADD_MESSAGE (state, message) {
      state.messages.push(message)
    },
    SET_DOCUMENTS (state, documents) {
      state.documents = documents
    }
  },
  actions: {
    logout ({ commit }) {
      // Clear all state
      commit('SET_USER', null)
      commit('SET_CONVERSATIONS', [])
      commit('SET_CURRENT_CONVERSATION', null)
      commit('SET_MESSAGES', [])
      commit('SET_DOCUMENTS', [])
      
      // Clear localStorage
      localStorage.removeItem('jwt_access')
    },
    
    setUser ({ commit }, user) {
      commit('SET_USER', user)
    },
    
    setConversations ({ commit }, conversations) {
      commit('SET_CONVERSATIONS', conversations)
    },
    
    addConversation ({ commit }, conversation) {
      commit('ADD_CONVERSATION', conversation)
    },
    
    setCurrentConversation ({ commit }, conversation) {
      commit('SET_CURRENT_CONVERSATION', conversation)
    },
    
    removeConversation ({ commit }, conversationId) {
      commit('REMOVE_CONVERSATION', conversationId)
    },
    
    setMessages ({ commit }, messages) {
      commit('SET_MESSAGES', messages)
    },
    
    addMessage ({ commit }, message) {
      commit('ADD_MESSAGE', message)
    },
    
    setDocuments ({ commit }, documents) {
      commit('SET_DOCUMENTS', documents)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentConversation: state => state.conversations.current,
    conversationList: state => state.conversations.list,
    currentMessages: state => state.messages,
    availableDocuments: state => state.documents
  }
})
