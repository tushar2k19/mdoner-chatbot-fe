# Frontend Implementation Guide - DPR Chatbot

## Overview
This guide provides step-by-step implementation phases for building the Vue.js frontend that integrates with the Rails backend for the DPR Chatbot system.

## Tech Stack
- **Vue.js 2.x** - Frontend framework
- **Vue Router** - Client-side routing  
- **Axios** - HTTP client for API calls
- **localStorage** - Client-side state persistence
- **Server-Sent Events (SSE)** - Real-time streaming

## Project Structure
```
src/
├── components/
│   ├── auth/              # Login/Signup components
│   ├── chat/              # Chat interface components
│   ├── navigation/        # Header, Sidebar components
│   ├── common/            # Reusable UI components
│   └── modals/            # Consent modal, dialogs
├── services/
│   ├── api.js             # Axios configuration
│   ├── auth.js            # Authentication service
│   ├── chat.js            # Chat/conversation service
│   ├── streaming.js       # SSE streaming service
│   └── storage.js         # localStorage management
├── views/
│   ├── Login.vue          # Login page
│   └── Dashboard.vue      # Main chat interface
├── router/
│   └── index.js           # Vue Router configuration
├── utils/
│   └── helpers.js         # Utility functions
└── styles/                # Global styles
```

---

## Phase 1: Project Setup & Authentication (Week 1)

### Step 1.1: Initialize Vue.js Project
```bash
# Create Vue.js project
vue create dpr-chatbot-frontend
cd dpr-chatbot-frontend

# Install dependencies
npm install vue-router@3 axios vue-toastification
npm install -D @vue/test-utils jest
```

### Step 1.2: Configure Basic Routing
**Create `src/router/index.js`:**
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({ mode: 'history', routes })

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('dpr_chatbot_token')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
```

### Step 1.3: Create API Service
**Create `src/services/api.js`:**
```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor - add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dpr_chatbot_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### Step 1.4: Create Authentication Service
**Create `src/services/auth.js`:**
```javascript
import api from './api'

export const authService = {
  async login(credentials) {
    const response = await api.post('/signin', credentials)
    return response.data
  },

  async logout() {
    try {
      await api.delete('/signout')
    } finally {
      this.clearAuth()
    }
  },

  async getCurrentUser() {
    const response = await api.get('/api/auth/me')
    return response.data.user
  },

  isAuthenticated() {
    return !!localStorage.getItem('dpr_chatbot_token')
  },

  clearAuth() {
    localStorage.clear()
  }
}
```

### Step 1.5: Create Login Component
**Create `src/views/Login.vue`:**
```vue
<template>
  <div class="login-container">
    <div class="login-card">
      <h2>DPR Chatbot Login</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            type="email" 
            v-model="form.email" 
            placeholder="Email"
            required
          />
        </div>
        
        <div class="form-group">
          <input 
            type="password" 
            v-model="form.password" 
            placeholder="Password"
            required
          />
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
        
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/auth'

export default {
  name: 'Login',
  data() {
    return {
      form: { email: '', password: '' },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      
      try {
        const response = await authService.login(this.form)
        
        localStorage.setItem('dpr_chatbot_token', response.access)
        localStorage.setItem('dpr_chatbot_user', JSON.stringify(response.user))
        
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = 'Login failed. Please check your credentials.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

### Step 1.6: Testing Phase 1
- [ ] Test login/logout functionality
- [ ] Verify JWT token storage
- [ ] Test route protection
- [ ] Verify API interceptors work

---

## Phase 2: Core Chat Infrastructure (Week 2)

### Step 2.1: Create Storage Service
**Create `src/services/storage.js`:**
```javascript
export const storageService = {
  // User management
  setUser(user) {
    localStorage.setItem('dpr_chatbot_user', JSON.stringify(user))
  },
  
  getUser() {
    const user = localStorage.getItem('dpr_chatbot_user')
    return user ? JSON.parse(user) : null
  },
  
  // Conversations management
  setConversations(conversations) {
    localStorage.setItem('dpr_chatbot_conversations', JSON.stringify(conversations))
  },
  
  getConversations() {
    const conversations = localStorage.getItem('dpr_chatbot_conversations')
    return conversations ? JSON.parse(conversations) : { current: null, list: [] }
  },
  
  // Documents management
  setDocuments(documents) {
    localStorage.setItem('dpr_chatbot_documents', JSON.stringify(documents))
  },
  
  getDocuments() {
    const documents = localStorage.getItem('dpr_chatbot_documents')
    return documents ? JSON.parse(documents) : []
  }
}
```

### Step 2.2: Create Chat Service
**Create `src/services/chat.js`:**
```javascript
import api from './api'

export const chatService = {
  // Get available documents
  async getDocuments() {
    const response = await api.get('/api/documents')
    return response.data.documents
  },

  // Create new conversation
  async createConversation(title = null) {
    const response = await api.post('/api/conversations', { title })
    return response.data.conversation
  },

  // Get user conversations
  async getConversations(limit = 20, beforeId = null) {
    const params = { limit }
    if (beforeId) params.before_id = beforeId
    
    const response = await api.get('/api/conversations', { params })
    return response.data
  },

  // Get conversation messages
  async getMessages(conversationId, limit = 50, beforeId = null) {
    const params = { limit }
    if (beforeId) params.before_id = beforeId
    
    const response = await api.get(`/api/conversations/${conversationId}/messages`, { params })
    return response.data
  },

  // Send message
  async sendMessage(conversationId, content, prependWebSummary = null) {
    const payload = { content }
    if (prependWebSummary) payload.prepend_web_summary = prependWebSummary
    
    const response = await api.post(`/api/conversations/${conversationId}/messages`, payload)
    return response.data
  },

  // Delete conversation
  async deleteConversation(conversationId) {
    const response = await api.delete(`/api/conversations/${conversationId}`)
    return response.data
  }
}
```

### Step 2.3: Create Basic Dashboard Structure
**Create `src/views/Dashboard.vue`:**
```vue
<template>
  <div class="dashboard">
    <Header @logout="handleLogout" @toggle-sidebar="toggleSidebar" />
    
    <div class="dashboard-content">
      <Sidebar 
        :collapsed="sidebarCollapsed"
        :conversations="conversations"
        :documents="documents"
        @select-conversation="selectConversation"
        @new-conversation="createNewConversation"
      />
      
      <div class="chat-area">
        <ChatInterface 
          v-if="currentConversation"
          :conversation="currentConversation"
          :messages="messages"
          @send-message="sendMessage"
        />
        
        <WelcomeScreen 
          v-else
          @new-conversation="createNewConversation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigation/Header.vue'
import Sidebar from '@/components/navigation/Sidebar.vue'
import ChatInterface from '@/components/chat/ChatInterface.vue'
import WelcomeScreen from '@/components/chat/WelcomeScreen.vue'
import { chatService } from '@/services/chat'
import { storageService } from '@/services/storage'

export default {
  name: 'Dashboard',
  components: { Header, Sidebar, ChatInterface, WelcomeScreen },
  
  data() {
    return {
      currentUser: storageService.getUser(),
      conversations: storageService.getConversations(),
      documents: storageService.getDocuments(),
      currentConversation: null,
      messages: [],
      sidebarCollapsed: false
    }
  },
  
  async mounted() {
    await this.loadInitialData()
  },
  
  methods: {
    async loadInitialData() {
      try {
        // Load documents
        const documents = await chatService.getDocuments()
        this.documents = documents
        storageService.setDocuments(documents)
        
        // Load conversations
        const conversationsData = await chatService.getConversations()
        this.conversations.list = conversationsData.conversations
        storageService.setConversations(this.conversations)
        
      } catch (error) {
        console.error('Failed to load initial data:', error)
        this.$toast.error('Failed to load data')
      }
    },
    
    async createNewConversation() {
      try {
        const conversation = await chatService.createConversation()
        this.conversations.list.unshift(conversation)
        this.selectConversation(conversation.id)
        storageService.setConversations(this.conversations)
      } catch (error) {
        console.error('Failed to create conversation:', error)
      }
    },
    
    async selectConversation(conversationId) {
      const conversation = this.conversations.list.find(c => c.id === conversationId)
      if (!conversation) return
      
      this.currentConversation = conversation
      this.conversations.current = conversation
      storageService.setConversations(this.conversations)
      
      await this.loadMessages(conversationId)
    },
    
    async loadMessages(conversationId) {
      try {
        const response = await chatService.getMessages(conversationId)
        this.messages = response.messages.reverse()
      } catch (error) {
        console.error('Failed to load messages:', error)
      }
    },
    
    async sendMessage(content) {
      if (!this.currentConversation) return
      
      try {
        // Add user message immediately
        const userMessage = {
          id: Date.now(),
          role: 'user',
          content: content,
          created_at: new Date().toISOString()
        }
        this.messages.push(userMessage)
        
        // Send to backend
        const response = await chatService.sendMessage(this.currentConversation.id, content)
        
        // Add assistant response
        this.messages.push(response.message)
        
      } catch (error) {
        console.error('Failed to send message:', error)
        this.messages.pop() // Remove failed user message
      }
    },
    
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    
    async handleLogout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
```

### Step 2.4: Testing Phase 2
- [ ] Test conversation creation
- [ ] Test message sending/receiving
- [ ] Verify localStorage persistence
- [ ] Test navigation between conversations

---

## Phase 3: Chat Interface Components (Week 3)

### Step 3.1: Create Chat Interface Component
**Create `src/components/chat/ChatInterface.vue`:**
```vue
<template>
  <div class="chat-interface">
    <div ref="messagesContainer" class="messages-container">
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="['message', `message-${message.role}`]"
      >
        <!-- User Message -->
        <div v-if="message.role === 'user'" class="message-content">
          <div class="message-bubble user-bubble">
            {{ message.content }}
          </div>
          <div class="message-time">{{ formatTime(message.created_at) }}</div>
        </div>
        
        <!-- Assistant Message -->
        <div v-else class="message-content">
          <div class="message-bubble assistant-bubble">
            <div class="message-text">
              {{ getMessageText(message.content) }}
            </div>
            
            <!-- Citations -->
            <div v-if="getCitations(message.content).length > 0" class="citations">
              <div class="citations-label">Sources:</div>
              <div class="citation-chips">
                <span 
                  v-for="citation in getCitations(message.content)" 
                  :key="citation"
                  class="citation-chip"
                >
                  {{ citation }}
                </span>
              </div>
            </div>
            
            <!-- Consent Request -->
            <div v-if="needsConsent(message.content)" class="consent-request">
              <p>{{ message.content.message }}</p>
              <div class="consent-actions">
                <button @click="allowWebSearch" class="btn btn-primary">
                  Allow Web Search
                </button>
                <button @click="denyWebSearch" class="btn btn-secondary">
                  No, thanks
                </button>
              </div>
            </div>
          </div>
          <div class="message-time">{{ formatTime(message.created_at) }}</div>
        </div>
      </div>
    </div>
    
    <!-- Message Input -->
    <div class="message-input-container">
      <form @submit.prevent="sendMessage" class="message-form">
        <div class="input-wrapper">
          <textarea
            v-model="messageText"
            @keydown="handleKeyDown"
            placeholder="Ask about the DPR documents..."
            class="message-input"
            rows="1"
            ref="messageInput"
          ></textarea>
          
          <button 
            type="submit" 
            :disabled="!messageText.trim() || sending"
            class="send-button"
          >
            {{ sending ? 'Sending...' : 'Send' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatInterface',
  props: {
    conversation: { type: Object, required: true },
    messages: { type: Array, default: () => [] }
  },
  
  data() {
    return {
      messageText: '',
      sending: false
    }
  },
  
  watch: {
    messages() {
      this.$nextTick(() => this.scrollToBottom())
    }
  },
  
  methods: {
    async sendMessage() {
      if (!this.messageText.trim() || this.sending) return
      
      const content = this.messageText.trim()
      this.messageText = ''
      this.sending = true
      
      try {
        await this.$emit('send-message', content)
      } finally {
        this.sending = false
      }
    },
    
    handleKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.sendMessage()
      }
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    
    getMessageText(content) {
      return typeof content === 'string' ? content : content.answer || ''
    },
    
    getCitations(content) {
      return typeof content === 'object' ? (content.citations || []) : []
    },
    
    needsConsent(content) {
      return typeof content === 'object' && content.needs_consent === true
    },
    
    allowWebSearch() {
      this.$emit('allow-web-search')
    },
    
    denyWebSearch() {
      this.$emit('deny-web-search')
    }
  },
  
  mounted() {
    this.scrollToBottom()
  }
}
</script>
```

### Step 3.2: Create Sidebar Component
**Create `src/components/navigation/Sidebar.vue`:**
```vue
<template>
  <div :class="['sidebar', { 'collapsed': collapsed }]">
    <div class="sidebar-header">
      <button @click="$emit('new-conversation')" class="new-chat-btn">
        + <span v-if="!collapsed">New Chat</span>
      </button>
    </div>
    
    <div class="conversations-section">
      <h3 v-if="!collapsed">Conversations</h3>
      
      <div class="conversations-list">
        <div
          v-for="conversation in conversations.list"
          :key="conversation.id"
          :class="['conversation-item', { 'active': isActive(conversation.id) }]"
          @click="selectConversation(conversation.id)"
        >
          <div class="conversation-title">
            {{ conversation.title || `Chat ${conversation.id}` }}
          </div>
          <div v-if="!collapsed" class="conversation-meta">
            {{ conversation.message_count || 0 }} messages
          </div>
        </div>
      </div>
    </div>
    
    <div class="documents-section" v-if="!collapsed">
      <h3>Available Documents</h3>
      <div class="documents-list">
        <div
          v-for="document in documents"
          :key="document.id"
          class="document-item"
        >
          <div class="document-name">{{ document.name }}</div>
          <div class="document-status">{{ document.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    collapsed: { type: Boolean, default: false },
    conversations: { type: Object, default: () => ({ current: null, list: [] }) },
    documents: { type: Array, default: () => [] }
  },
  
  methods: {
    selectConversation(conversationId) {
      this.$emit('select-conversation', conversationId)
    },
    
    isActive(conversationId) {
      return this.conversations.current?.id === conversationId
    }
  }
}
</script>
```

### Step 3.3: Create Header Component
**Create `src/components/navigation/Header.vue`:**
```vue
<template>
  <header class="app-header">
    <div class="header-left">
      <button @click="$emit('toggle-sidebar')" class="sidebar-toggle">
        ☰
      </button>
      <h1 class="app-title">DPR Chatbot</h1>
    </div>
    
    <div class="header-right">
      <div class="user-menu">
        <span class="user-name">{{ user?.email }}</span>
        <button @click="$emit('logout')" class="logout-btn">
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user: { type: Object, default: null }
  }
}
</script>
```

### Step 3.4: Testing Phase 3
- [ ] Test chat interface rendering
- [ ] Test message display (user/assistant)
- [ ] Test citation chips display
- [ ] Test sidebar functionality
- [ ] Test responsive design

---

## Phase 4: Streaming & Advanced Features (Week 4)

### Step 4.1: Create Streaming Service
**Create `src/services/streaming.js`:**
```javascript
export class StreamingService {
  constructor() {
    this.eventSource = null
  }
  
  async streamMessage(conversationId, content, onChunk, onComplete, onError) {
    try {
      const token = localStorage.getItem('dpr_chatbot_token')
      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              onChunk(data)
            } catch (e) {
              console.warn('Failed to parse SSE data:', e)
            }
          }
        }
      }
      
      onComplete()
      
    } catch (error) {
      onError(error)
    }
  }
}

export const streamingService = new StreamingService()
```

### Step 4.2: Update Chat Interface for Streaming
**Update `src/components/chat/ChatInterface.vue` sendMessage method:**
```javascript
import { streamingService } from '@/services/streaming'

// In methods:
async sendMessage() {
  if (!this.messageText.trim() || this.sending) return
  
  const content = this.messageText.trim()
  this.messageText = ''
  this.sending = true
  
  try {
    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      created_at: new Date().toISOString()
    }
    this.messages.push(userMessage)
    
    // Create placeholder for assistant response
    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: { answer: '', citations: [], needs_consent: false },
      source: 'dpr',
      created_at: new Date().toISOString()
    }
    this.messages.push(assistantMessage)
    
    // Stream the response
    await streamingService.streamMessage(
      this.conversation.id,
      content,
      (chunk) => {
        if (chunk.type === 'content') {
          assistantMessage.content.answer += chunk.text
        } else if (chunk.type === 'citations') {
          assistantMessage.content.citations = chunk.citations
        } else if (chunk.type === 'needs_consent') {
          assistantMessage.content.needs_consent = chunk.needs_consent
          if (chunk.message) {
            assistantMessage.content.message = chunk.message
          }
        }
      },
      () => {
        this.sending = false
        this.scrollToBottom()
      },
      (error) => {
        console.error('Streaming error:', error)
        this.messages.pop() // Remove failed assistant message
        this.sending = false
      }
    )
    
  } catch (error) {
    console.error('Failed to send message:', error)
    this.messages.pop() // Remove failed user message
    this.sending = false
  }
}
```

### Step 4.3: Add Infinite Scroll
**Update ChatInterface.vue to add infinite scroll:**
```javascript
// Add to methods:
handleScroll(event) {
  const { scrollTop } = event.target
  
  if (scrollTop === 0 && this.messages.length > 0) {
    this.$emit('load-more')
  }
},

async loadMoreMessages() {
  if (this.messages.length === 0) return
  
  const oldestMessage = this.messages[0]
  this.$emit('load-more', oldestMessage.id)
}

// Update template to add scroll handler:
// <div ref="messagesContainer" class="messages-container" @scroll="handleScroll">
```

### Step 4.4: Add Consent Modal
**Create `src/components/modals/ConsentModal.vue`:**
```vue
<template>
  <div class="modal-overlay" @click="$emit('deny-search')">
    <div class="modal-content" @click.stop>
      <h3>Search the Internet?</h3>
      <p>I couldn't find the information in the DPR documents. Would you like me to search the internet for this information?</p>
      
      <div class="modal-actions">
        <button @click="$emit('allow-search')" class="btn btn-primary">
          Yes, search the internet
        </button>
        <button @click="$emit('deny-search')" class="btn btn-secondary">
          No, thanks
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsentModal'
}
</script>
```

### Step 4.5: Testing Phase 4
- [ ] Test streaming responses
- [ ] Test infinite scroll functionality
- [ ] Test consent modal flow
- [ ] Test error handling during streaming
- [ ] Test connection recovery

---

## Phase 5: Styling & Polish (Week 5)

### Step 5.1: Add Global Styles
**Create `src/styles/main.scss`:**
```scss
// Variables
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}

// Base styles
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
}

// Dashboard layout
.dashboard {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

// Chat interface
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.message {
  margin-bottom: 1rem;
}

.message-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 70%;
}

.user-bubble {
  background-color: var(--primary-color);
  color: white;
  margin-left: auto;
}

.assistant-bubble {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
}

// Citations
.citations {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.citation-chip {
  display: inline-block;
  background-color: var(--bg-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  margin: 0.25rem 0.25rem 0 0;
}

// Message input
.message-input-container {
  padding: 1rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--card-bg);
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  resize: none;
  font-family: inherit;
}

.send-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

// Sidebar
.sidebar {
  width: 300px;
  background-color: var(--card-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.new-chat-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.conversation-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border-color);
}

.conversation-item:hover {
  background-color: var(--bg-color);
}

.conversation-item.active {
  background-color: var(--primary-color);
  color: white;
}

// Header
.app-header {
  height: 60px;
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

// Modal
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 90%;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

// Responsive
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    left: -300px;
    z-index: 100;
    height: 100%;
  }
  
  .sidebar.show {
    left: 0;
  }
  
  .message-bubble {
    max-width: 85%;
  }
}
```

### Step 5.2: Testing Phase 5
- [ ] Test responsive design on mobile/tablet
- [ ] Test accessibility (keyboard navigation)
- [ ] Test dark mode compatibility
- [ ] Performance testing
- [ ] Cross-browser testing

---

## Phase 6: Testing & Deployment (Week 6)

### Step 6.1: Unit Testing Setup
**Create `tests/unit/components/ChatInterface.spec.js`:**
```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ChatInterface from '@/components/chat/ChatInterface.vue'

const localVue = createLocalVue()

describe('ChatInterface.vue', () => {
  let wrapper
  
  const mockConversation = { id: 1, title: 'Test' }
  const mockMessages = [
    { id: 1, role: 'user', content: 'Hello', created_at: new Date().toISOString() }
  ]
  
  beforeEach(() => {
    wrapper = shallowMount(ChatInterface, {
      localVue,
      propsData: { conversation: mockConversation, messages: mockMessages }
    })
  })
  
  it('renders messages correctly', () => {
    expect(wrapper.find('.message-user').exists()).toBe(true)
  })
  
  it('emits send-message event', async () => {
    const input = wrapper.find('.message-input')
    const form = wrapper.find('.message-form')
    
    await input.setValue('Test message')
    await form.trigger('submit')
    
    expect(wrapper.emitted('send-message')).toBeTruthy()
  })
})
```

### Step 6.2: Build Configuration
**Update `vue.config.js`:**
```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
```

### Step 6.3: Environment Configuration
**Create `.env.development`:**
```
VUE_APP_API_URL=http://localhost:3000
VUE_APP_ENV=development
```

**Create `.env.production`:**
```
VUE_APP_API_URL=https://your-production-api.com
VUE_APP_ENV=production
```

### Step 6.4: Final Testing Checklist
- [ ] Authentication flow works correctly
- [ ] Conversation creation and management
- [ ] Message sending and receiving
- [ ] Citation display and formatting
- [ ] Consent modal functionality
- [ ] Streaming responses
- [ ] Infinite scroll
- [ ] Error handling
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Cross-browser compatibility
- [ ] Accessibility compliance

---

## Deployment Instructions

### Development Server
```bash
npm run serve
```

### Production Build
```bash
npm run build
npm run test:unit
```

### Deploy to Static Hosting
```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting provider
# (Netlify, Vercel, AWS S3, etc.)
```

---

## Key Integration Points with Backend

### Required from Backend:
1. **Authentication endpoints** working (`/signin`, `/signout`)
2. **Conversation CRUD** endpoints (`/api/conversations/*`)
3. **Message endpoints** (`/api/conversations/:id/messages`)
4. **Document listing** endpoint (`/api/documents`)
5. **Streaming support** (SSE or WebSocket)
6. **CORS configuration** for frontend domain

### Provided by Frontend:
1. **JWT token** in Authorization header
2. **Proper error handling** and user feedback
3. **Loading states** during API calls
4. **Real-time UI updates** for streaming
5. **State persistence** in localStorage

This implementation guide provides a complete roadmap for building the Vue.js frontend that integrates seamlessly with your Rails backend. Follow each phase sequentially, test thoroughly at each step, and you'll have a professional chatbot interface ready for production.
