<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-collapsed': sidebarCollapsed }]">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <button @click="createNewConversation" class="new-chat-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span v-if="!sidebarCollapsed">New chat</span>
        </button>
      </div>

      <!-- Conversations List -->
      <div class="conversations-list">
        <div 
          v-for="conversation in conversations.list" 
          :key="conversation.id"
          :class="['conversation-item', { 'active': conversation.id === (currentConversation && currentConversation.id) }]"
          @click="selectConversation(conversation.id)"
        >
          <div class="conversation-content">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span v-if="!sidebarCollapsed" class="conversation-title">
              {{ conversation.title || `Chat ${conversation.id}` }}
            </span>
          </div>
          <div v-if="!sidebarCollapsed && conversation.id === (currentConversation && currentConversation.id)" class="conversation-actions">
            <button @click.stop="deleteConversation(conversation.id)" class="delete-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <div class="user-menu">
          <div class="user-info">
            <div class="user-avatar">
              {{ user.email ? user.email.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div v-if="!sidebarCollapsed" class="user-details">
              <div class="user-name">{{ user.email }}</div>
              <div class="user-role">DPR User</div>
            </div>
          </div>
          <button @click="logout" class="logout-btn" :title="sidebarCollapsed ? 'Logout' : ''">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <div class="main-header">
        <button @click="toggleSidebar" class="sidebar-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <h1>DPR Chatbot</h1>
        <div class="header-info">
          <span class="document-count">{{ documents.length }} DPR Documents</span>
          <span 
            :class="['backend-status', { 'healthy': isBackendHealthy, 'unhealthy': !isBackendHealthy }]" 
            @click="testBackendHealth" 
            @contextmenu.prevent="showBackendStatusDetails"
            style="cursor: pointer;" 
            title="Click to test backend health, Right-click for details"
          >
            <span class="status-dot"></span>
            {{ isBackendHealthy ? 'Backend Online' : 'Backend Offline' }}
          </span>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-container">
        <!-- Welcome Screen -->
        <div v-if="!currentConversation" class="welcome-screen">
          <div class="welcome-content">
            <h2>Welcome to DPR Chatbot</h2>
            <p>Ask me anything about the DPR (Detailed Project Report) documents from Northeast India.</p>
            
            <div class="available-docs">
              <h3>Available Documents:</h3>
              <div class="docs-grid">
                <div v-for="doc in documents" :key="doc.id" class="doc-card">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  <span>{{ doc.name }}</span>
                </div>
              </div>
            </div>

            <div class="example-queries">
              <h3>Try asking:</h3>
              <div class="query-examples">
                <button @click="askExample('What are the project timelines for all DPR projects?')" class="example-btn">
                  📅 What are the project timelines for all DPR projects?
                </button>
                <button @click="askExample('Compare the budget allocation across different states')" class="example-btn">
                  💰 Compare the budget allocation across different states
                </button>
                <button @click="askExample('What are the environmental impact mitigation measures?')" class="example-btn">
                  🌿 What are the environmental impact mitigation measures?
                </button>
                <button @click="askExample('Tell me about the Meghalaya Skywalk infrastructure details')" class="example-btn">
                  🌉 Tell me about the Meghalaya Skywalk infrastructure details
                </button>
                <button @click="askExample('What are the employment opportunities in these projects?')" class="example-btn">
                  👷 What are the employment opportunities in these projects?
                </button>
                <button @click="askExample('Which project has the highest cost and why?')" class="example-btn">
                  📊 Which project has the highest cost and why?
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Messages -->
        <div v-else class="chat-messages" ref="messagesContainer">
          <div v-for="message in messages" :key="message.id" class="message-wrapper">
            <!-- User Message -->
            <div v-if="message.role === 'user'" class="message user-message">
              <div class="message-avatar user-avatar">
                {{ user.email ? user.email.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="message-content">
                <div class="message-text">{{ message.content }}</div>
                <div class="message-time">{{ formatTime(message.created_at) }}</div>
              </div>
            </div>

            <!-- Assistant Message -->
            <div v-else class="message assistant-message">
              <div class="message-avatar assistant-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.84.21 4 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div class="message-content">
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
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"/>
                        <polyline points="14,2 14,8 20,8"/>
                      </svg>
                      {{ citation }}
                    </span>
                  </div>
                </div>
                
                <!-- Consent Request -->
                <div v-if="needsConsent(message.content)" class="consent-request">
                  <p class="consent-message">{{ message.content.message }}</p>
                  <div class="consent-actions">
                    <button @click="allowWebSearch(message)" class="consent-btn allow-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                      </svg>
                      Search the web
                    </button>
                    <button @click="denyWebSearch" class="consent-btn deny-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                      No thanks
                    </button>
                  </div>
                </div>
                
                <div class="message-time">{{ formatTime(message.created_at) }}</div>
              </div>
            </div>
          </div>

          <!-- Loading Message -->
          <div v-if="loading" class="message assistant-message loading-message">
            <div class="message-avatar assistant-avatar">
              <div class="loading-spinner"></div>
            </div>
            <div class="message-content">
              <div class="message-text">
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div v-if="currentConversation" class="message-input-container">
          <form @submit.prevent="sendMessage" class="message-form">
            <div class="input-wrapper">
              <textarea
                v-model="newMessage"
                @keydown="handleKeyDown"
                placeholder="Message DPR Chatbot..."
                class="message-input"
                rows="1"
                ref="messageInput"
                :disabled="loading"
              ></textarea>
              
              <button 
                type="submit" 
                :disabled="!newMessage.trim() || loading"
                class="send-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from '@/services/apiService.js'
import backendHealthService from '@/services/BackendHealthService.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      conversations: { current: null, list: [] },
      documents: [],
      currentConversation: null,
      messages: [],
      newMessage: '',
      loading: false,
      sidebarCollapsed: false,
      isBackendHealthy: true
    }
  },

  computed: {
    user() {
      return this.$store.state.user || {}
    }
  },

  async mounted() {
    // Check authentication
    const token = localStorage.getItem('jwt_access');
    if (!token) {
      this.$router.push('/');
      return;
    }

    // Check backend health
    await this.checkBackendHealth();
    await this.loadInitialData();

    // Listen for backend health changes
    this.backendHealthListener = (event) => {
      this.updateBackendHealth(event.detail.isHealthy);
    };
    window.addEventListener('backendHealthChange', this.backendHealthListener);
  },

  beforeDestroy() {
    // Clean up event listener
    if (this.backendHealthListener) {
      window.removeEventListener('backendHealthChange', this.backendHealthListener);
    }
  },

  methods: {
    async checkBackendHealth() {
      try {
        const status = backendHealthService.getBackendStatus();
        this.isBackendHealthy = status.isHealthy;
        if (!status.isHealthy) {
          this.$toast.warning('Backend service is currently unavailable. Some features may not work properly.');
        }
      } catch (error) {
        console.error('Backend health check failed:', error);
      }
    },

    updateBackendHealth(isHealthy) {
      this.isBackendHealthy = isHealthy;
    },

    async testBackendHealth() {
      try {
        await backendHealthService.forceHealthCheck();
        const status = backendHealthService.getBackendStatus();
        this.updateBackendHealth(status.isHealthy);
        
        if (status.isHealthy) {
          this.$toast.success('Backend health check passed!');
        } else {
          this.$toast.error('Backend health check failed!');
        }
      } catch (error) {
        console.error('Backend health test failed:', error);
        this.$toast.error('Backend health test failed!');
      }
    },

    showBackendStatusDetails() {
      const status = backendHealthService.getBackendStatus();
      const message = `
Backend Status: ${status.isHealthy ? 'Healthy' : 'Unhealthy'}
Failure Count: ${status.failureCount}
Last Failure: ${status.lastFailureTime ? new Date(status.lastFailureTime).toLocaleString() : 'Never'}
Circuit Breaker: ${status.shouldReset ? 'Should Reset' : 'Normal'}
      `;
      alert(message);
    },

    async loadInitialData() {
      try {
        // Load documents - using mock data for now since backend doesn't have documents endpoint
        this.documents = [
          { id: 1, name: 'Meghalaya Skywalk.pdf' },
          { id: 2, name: 'Tripura Zoological Park.pdf' },
          { id: 3, name: 'Kohima Football Ground.pdf' },
          { id: 4, name: 'Nagaland Innovation Hub.pdf' },
          { id: 5, name: 'Mizoram Development of Helipads.pdf' }
        ];

        // Load conversations from real backend
        const conversationsData = await apiService.listConversations();
        this.conversations.list = conversationsData.conversations || [];

        this.$toast.success('Loaded DPR documents successfully!');
      } catch (error) {
        console.error('Failed to load initial data:', error);
        this.$toast.error('Failed to load data');
      }
    },

    async createNewConversation() {
      try {
        const response = await apiService.createConversation(`New Chat ${Date.now()}`);
        const newConversation = response.conversation;
        
        this.conversations.list.unshift(newConversation);
        this.selectConversation(newConversation.id);
        
        this.$toast.success('New conversation created!');
      } catch (error) {
        console.error('Failed to create conversation:', error);
        this.$toast.error('Failed to create conversation');
      }
    },

    async selectConversation(conversationId) {
      const conversation = this.conversations.list.find(c => c.id === conversationId);
      if (!conversation) return;

      this.currentConversation = conversation;
      this.conversations.current = conversation;

      // Load messages for this conversation
      try {
        const messagesData = await apiService.getMessages(conversationId);
        this.messages = messagesData.messages || [];
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error('Failed to load messages:', error);
        this.messages = [];
      }
    },

    async deleteConversation(conversationId) {
      if (!confirm('Are you sure you want to delete this conversation?')) return;

      try {
        await apiService.deleteConversation(conversationId);
        
        // Remove from list
        this.conversations.list = this.conversations.list.filter(c => c.id !== conversationId);
        
        // If this was the current conversation, clear it
        if (this.currentConversation && this.currentConversation.id === conversationId) {
          this.currentConversation = null;
          this.messages = [];
          this.conversations.current = null;
        }
        
        this.$toast.success('Conversation deleted');
      } catch (error) {
        console.error('Failed to delete conversation:', error);
        this.$toast.error('Failed to delete conversation');
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim() || !this.currentConversation) return;

      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: this.newMessage.trim(),
        source: null,
        created_at: new Date().toISOString()
      };

      this.messages.push(userMessage);
      const messageText = this.newMessage;
      this.newMessage = '';
      this.loading = true;

      // Auto-resize textarea
      if (this.$refs.messageInput) {
        this.$refs.messageInput.style.height = 'auto';
      }

      try {
        const response = await apiService.sendMessage(this.currentConversation.id, messageText);
        this.messages.push(response.message);
      } catch (error) {
        console.error('Send message error:', error);
        this.messages.push({
          id: Date.now() + 1,
          role: 'assistant',
          content: {
            answer: 'Sorry, there was an error processing your message. Please try again.',
            citations: [],
            needs_consent: false
          },
          source: 'dpr',
          created_at: new Date().toISOString()
        });
        this.$toast.error('Failed to send message');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    async askExample(query) {
      if (!this.currentConversation) {
        await this.createNewConversation();
      }
      this.newMessage = query;
      await this.sendMessage();
    },

    async allowWebSearch(message) {
      if (!this.currentConversation) return;

      this.loading = true;
      try {
        // For now, just show a success message since web search isn't implemented
        this.$toast.success('Web search feature coming soon!');
      } catch (error) {
        console.error('Web search error:', error);
        this.$toast.error('Web search failed');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },

    denyWebSearch() {
      this.$toast.info('Web search cancelled');
    },

    handleKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    },

    getMessageText(content) {
      return typeof content === 'string' ? content : content.answer || '';
    },

    getCitations(content) {
      return typeof content === 'object' ? (content.citations || []) : [];
    },

    needsConsent(content) {
      return typeof content === 'object' && content.needs_consent === true;
    },

    async logout() {
      try {
        await apiService.logout();
        this.$toast.success('Logged out successfully');
        this.$router.push('/');
      } catch (error) {
        console.error('Logout error:', error);
        // Force logout anyway
        localStorage.clear();
        this.$router.push('/');
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  background: #f7f7f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background: #171717;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 12px;
  border-bottom: 1px solid #2d2d30;
}

.new-chat-btn {
  width: 100%;
  background: transparent;
  border: 1px solid #4d4d4f;
  color: white;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  transition: background 0.2s ease;
}

.new-chat-btn:hover {
  background: #2d2d30;
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.conversation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
}

.conversation-item:hover {
  background: #2d2d30;
}

.conversation-item.active {
  background: #343541;
}

.conversation-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}

.conversation-title {
  truncate: true;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-actions {
  display: flex;
  gap: 4px;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #8e8ea0;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.delete-btn:hover {
  color: #ff6b6b;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid #2d2d30;
}

.user-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #10a37f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  truncate: true;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: #8e8ea0;
}

.logout-btn {
  background: transparent;
  border: none;
  color: #8e8ea0;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.logout-btn:hover {
  color: white;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-toggle {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #565869;
  transition: background 0.2s ease;
}

.sidebar-toggle:hover {
  background: #f1f1f1;
}

.main-header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #2d333a;
  margin: 0;
  flex: 1;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.document-count {
  font-size: 14px;
  color: #565869;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 12px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Welcome Screen */
.welcome-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.welcome-content {
  text-align: center;
  max-width: 600px;
}

.welcome-content h2 {
  font-size: 32px;
  font-weight: 600;
  color: #2d333a;
  margin-bottom: 12px;
}

.welcome-content p {
  font-size: 16px;
  color: #565869;
  margin-bottom: 40px;
}

.available-docs h3,
.example-queries h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2d333a;
  margin-bottom: 16px;
}

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 40px;
}

.doc-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #2d333a;
}

.query-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.example-btn {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #2d333a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.example-btn:hover {
  border-color: #10a37f;
  background: #f0fdf4;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 163, 127, 0.15);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-wrapper {
  margin-bottom: 24px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 800px;
}

.user-message {
  margin-left: auto;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: #10a37f;
  color: white;
}

.assistant-avatar {
  background: #f7f7f8;
  border: 1px solid #e5e5e5;
  color: #2d333a;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-text {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #2d333a;
  margin-bottom: 8px;
}

.user-message .message-text {
  background: #10a37f;
  border-color: #10a37f;
  color: white;
}

.message-time {
  font-size: 12px;
  color: #8e8ea0;
  margin-left: 16px;
}

.user-message .message-time {
  text-align: right;
  margin-left: 0;
  margin-right: 16px;
}

/* Citations */
.citations {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e5e5;
}

.citations-label {
  font-size: 12px;
  font-weight: 600;
  color: #565869;
  margin-bottom: 8px;
}

.citation-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.citation-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f1f1f1;
  color: #2d333a;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Consent Request */
.consent-request {
  margin-top: 12px;
  padding: 16px;
  background: #fffbeb;
  border: 1px solid #fbbf24;
  border-radius: 8px;
}

.consent-message {
  font-size: 14px;
  color: #92400e;
  margin-bottom: 12px;
}

.consent-actions {
  display: flex;
  gap: 8px;
}

.consent-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.allow-btn {
  background: #10a37f;
  border: 1px solid #10a37f;
  color: white;
}

.allow-btn:hover {
  background: #0d8f68;
}

.deny-btn {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.deny-btn:hover {
  background: #f9fafb;
}

/* Loading States */
.loading-message .message-avatar {
  background: #f7f7f8;
  border: 1px solid #e5e5e5;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e5e5e5;
  border-top: 2px solid #10a37f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #8e8ea0;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Message Input */
.message-input-container {
  padding: 20px;
  background: white;
  border-top: 1px solid #e5e5e5;
}

.message-form {
  max-width: 800px;
  margin: 0 auto;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
  max-height: 120px;
  min-height: 20px;
}

.send-button {
  background: #10a37f;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: #0d8f68;
}

.send-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes typing {
  0%, 20% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.7; }
  80%, 100% { transform: scale(1); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -260px;
    z-index: 1000;
    height: 100vh;
    transition: left 0.3s ease;
  }
  
  .sidebar.show {
    left: 0;
  }
  
  .sidebar-collapsed {
    left: -60px;
  }
  
  .main-content {
    width: 100%;
  }
  
  .message {
    max-width: 100%;
  }
  
  .docs-grid {
    grid-template-columns: 1fr;
  }
}

/* Scrollbar Styling */
.conversations-list::-webkit-scrollbar,
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.conversations-list::-webkit-scrollbar-track,
.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.conversations-list::-webkit-scrollbar-thumb {
  background: #4d4d4f;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

/* Backend Status Indicator */
.backend-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 12px;
}

.backend-status.healthy {
  background-color: #dcfce7;
  color: #166534;
}

.backend-status.unhealthy {
  background-color: #fef2f2;
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

.backend-status.healthy .status-dot {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
