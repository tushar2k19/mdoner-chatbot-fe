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
            <button @click.stop="renameConversation(conversation)" class="rename-btn" title="Rename">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </button>
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

        <!-- Chat Component -->
        <Chat 
          v-if="currentConversation"
          :current-conversation="currentConversation"
          :messages="messages"
          :loading="loading"
          :user="user"
          @send-message="handleSendMessage"
          @allow-web-search="handleAllowWebSearch"
          @deny-web-search="handleDenyWebSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import backendHealthService from '@/services/BackendHealthService.js'
import Chat from './Chat.vue'

export default {
  name: 'Dashboard',
  components: {
    Chat
  },
  data() {
    return {
      conversations: { current: null, list: [] },
      documents: [],
      currentConversation: null,
      messages: [],
      loading: false,
      sidebarCollapsed: false,
      isBackendHealthy: true
    }
  },

  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user') || '{}')
    }
  },

  async mounted() {
    // Check authentication
    const token = localStorage.getItem('jwt_access');
    if (!token) {
      this.$router.push('/login');
      return;
    }

    // Load state from localStorage
    this.loadStateFromStorage();
    
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
    // Load state from localStorage
    loadStateFromStorage() {
      try {
        const storedConversations = localStorage.getItem('dpr_conversations');
        if (storedConversations) {
          this.conversations = JSON.parse(storedConversations);
        }
        
        const storedDocuments = localStorage.getItem('dpr_documents');
        if (storedDocuments) {
          this.documents = JSON.parse(storedDocuments);
        }
        
        const storedMessages = localStorage.getItem('dpr_messages');
        if (storedMessages) {
          this.messages = JSON.parse(storedMessages);
          console.log('Messages loaded from localStorage:', this.messages);
        }
        
        const storedSidebarState = localStorage.getItem('dpr_sidebar_collapsed');
        if (storedSidebarState !== null) {
          this.sidebarCollapsed = JSON.parse(storedSidebarState);
        }
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
      }
    },

    // Save state to localStorage
    saveStateToStorage() {
      try {
        localStorage.setItem('dpr_conversations', JSON.stringify(this.conversations));
        localStorage.setItem('dpr_documents', JSON.stringify(this.documents));
        localStorage.setItem('dpr_sidebar_collapsed', JSON.stringify(this.sidebarCollapsed));
      } catch (error) {
        console.error('Error saving state to localStorage:', error);
      }
    },

    // Save messages to localStorage separately
    saveMessagesToStorage() {
      try {
        // alert('Saving messages to localStorage:', this.messages);
        localStorage.setItem('dpr_messages', JSON.stringify(this.messages));
        // alert('Messages saved successfully');
      } catch (error) {
        console.error('Error saving messages to localStorage:', error);
      }
    },

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
        // Load documents - using hardcoded data for now since backend doesn't have documents endpoint
        this.documents = [
          { id: 1, name: 'Meghalaya Skywalk.pdf' },
          { id: 2, name: 'Tripura Zoological Park.pdf' },
          { id: 3, name: 'Kohima Football Ground.pdf' },
          { id: 4, name: 'Nagaland Innovation Hub.pdf' },
          { id: 5, name: 'Mizoram Development of Helipads.pdf' }
        ];
        
        // Load conversations from real backend
        const response = await this.$http.secured.get('/api/conversations');
        this.conversations.list = response.data.conversations || [];
        
        // Save conversations and documents to localStorage (but NOT messages)
        this.saveStateToStorage();

        this.$toast.success('Loaded DPR documents successfully!');
      } catch (error) {
        console.error('Failed to load initial data:', error);
        this.$toast.error('Failed to load data');
      }
    },

    async createNewConversation() {
      try {
        const response = await this.$http.secured.post('/api/conversations', {
          title: `New Chat ${Date.now()}`
        });
        const newConversation = response.data.conversation;
        
        this.conversations.list.unshift(newConversation);
        this.selectConversation(newConversation.id);
        
        // Save to localStorage
        this.saveStateToStorage();
        
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
      // alert(this.currentConversation)
      
      // Save to localStorage
      this.saveStateToStorage();

      // Load messages for this conversation
      try {
        const response = await this.$http.secured.get(`/api/conversations/${conversationId}/messages`);
        // Support both wrapped { success, data: { messages: [] } } and plain { messages: [] }
        const apiData = response && response.data && response.data.data ? response.data.data : response.data;
        this.messages = (apiData && apiData.messages) ? apiData.messages : [];
        
        console.log('Messages loaded:', this.messages);
        console.log('Messages length:', this.messages.length);
        
        // Save messages to localStorage
        this.saveMessagesToStorage();
        
        // Defensive: ensure objects are normalized for Chat.vue expectations
        this.messages = this.messages.map(m => ({
          id: m.id,
          role: m.role,
          content: m.content,
          source: m.source || null,
          created_at: m.created_at
        }));
        

      } catch (error) {
        console.error('Failed to load messages:', error);
        this.messages = [];
      }
    },

    async deleteConversation(conversationId) {
      if (!confirm('Are you sure you want to delete this conversation?')) return;

      try {
        await this.$http.secured.delete(`/api/conversations/${conversationId}`);
        
        // Remove from list
        this.conversations.list = this.conversations.list.filter(c => c.id !== conversationId);
        
        // If this was the current conversation, clear it
        if (this.currentConversation && this.currentConversation.id === conversationId) {
          this.currentConversation = null;
          this.messages = [];
          this.conversations.current = null;
        }
        
        // Save to localStorage
        this.saveStateToStorage();
        this.saveMessagesToStorage();
        
        this.$toast.success('Conversation deleted');
      } catch (error) {
        console.error('Failed to delete conversation:', error);
        this.$toast.error('Failed to delete conversation');
      }
    },

    async renameConversation(conversation) {
      const newTitle = prompt('Enter new conversation title:', conversation.title);
      if (newTitle && newTitle.trim() !== '') {
        try {
          await this.$http.secured.patch(`/api/conversations/${conversation.id}`, {
            title: newTitle.trim()
          });
          conversation.title = newTitle.trim();
          this.$toast.success('Conversation renamed!');
          this.saveStateToStorage();
        } catch (error) {
          console.error('Failed to rename conversation:', error);
          this.$toast.error('Failed to rename conversation');
        }
      }
    },

    async handleSendMessage(messageText) {
      this.loading = true;
      
      // Show user that processing might take time
      this.$toast.info('Processing your message... This may take 15-30 seconds for complex queries.');
      
      try {
        // Push the user's message locally for immediate UI feedback
        this.messages.push({
          id: Date.now(),
          role: 'user',
          content: messageText,
          source: null,
          created_at: new Date().toISOString()
        });
        this.saveMessagesToStorage();

        // Use a longer timeout for OpenAI API calls
        const response = await this.$http.secured.post(`/api/conversations/${this.currentConversation.id}/messages`, {
          content: messageText
        }, {
          timeout: 90000 // 90 seconds for OpenAI processing
        });
        // alert(response.data.message)
        // Support both wrapped { success, data: { message } } and plain { message }
        const apiPostData = response && response.data && response.data.data ? response.data.data : response.data;
        if (apiPostData && apiPostData.message) {
          this.messages.push(apiPostData.message);
          this.saveMessagesToStorage();
          this.$toast.success('Response received!');
        }
      } catch (error) {
        console.error('Send message error:', error);
        
        let errorMessage = 'Sorry, there was an error processing your message.';
        
        // Provide specific error messages based on error type
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          errorMessage = 'Request timed out. The query might be too complex or the server is busy. Please try again with a simpler question.';
        } else if (error.response && error.response.status === 500) {
          errorMessage = 'Server error occurred. Please try again in a few moments.';
        } else if (error.response && error.response.status === 401) {
          errorMessage = 'Authentication expired. Please log in again.';
        }
        
        this.messages.push({
          id: Date.now() + 1,
          role: 'assistant',
          content: {
            answer: errorMessage,
            citations: [],
            needs_consent: false
          },
          source: 'dpr',
          created_at: new Date().toISOString()
        });
        this.saveMessagesToStorage();
        this.$toast.error(errorMessage);
      } finally {
        this.loading = false;
      }
    },

    async askExample(query) {
      if (!this.currentConversation) {
        await this.createNewConversation();
      }
      // Send the example query directly
      await this.handleSendMessage(query);
    },

    handleAllowWebSearch(message) {
      // For now, just show a success message since web search isn't implemented
      this.$toast.success('Web search feature coming soon!');
    },

    handleDenyWebSearch() {
      this.$toast.info('Web search cancelled');
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      // Save to localStorage
      this.saveStateToStorage();
    },



    async logout() {
      try {
        await this.$http.secured.delete('/signout');
        this.$toast.success('Logged out successfully');
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        // Clear localStorage
        localStorage.removeItem('dpr_conversations');
        localStorage.removeItem('dpr_documents');
        localStorage.removeItem('dpr_messages');
        localStorage.removeItem('dpr_sidebar_collapsed');
        localStorage.removeItem('jwt_access');
        localStorage.removeItem('user');
        
        this.$router.push('/login');
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.conversation-actions {
  display: flex;
  gap: 4px;
}

.rename-btn {
  background: transparent;
  border: none;
  color: #8e8ea0;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.rename-btn:hover {
  color: #10a37f;
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
  
  .docs-grid {
    grid-template-columns: 1fr;
  }
}

/* Scrollbar Styling */
.conversations-list::-webkit-scrollbar {
  width: 6px;
}

.conversations-list::-webkit-scrollbar-track {
  background: transparent;
}

.conversations-list::-webkit-scrollbar-thumb {
  background: #4d4d4f;
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
