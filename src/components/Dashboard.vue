<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <div :class="['sidebar', { 'sidebar-collapsed': sidebarCollapsed }]">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <!-- Logo (left side) -->
        <div v-if="!sidebarCollapsed" class="sidebar-logo">
          <img src="@/assets/logo.png" alt="DPR Logo" class="logo-img" />
        </div>
        
        <!-- Collapse Button (right side) -->
        <button @click="toggleSidebar" class="collapse-btn">
          <!-- Logo Icon (shown when collapsed) -->
          <div class="logo-icon" v-if="sidebarCollapsed">
            <img src="@/assets/logo.png" alt="DPR Logo" class="logo-img-small" />
          </div>
          <!-- Hamburger Menu Icon (shown when expanded or on hover) -->
          <div class="menu-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- New Chat Section -->
      <div v-if="!sidebarCollapsed" class="new-chat-section">
        <button @click="createNewConversation" class="new-chat-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>New chat</span>
        </button>
      </div>

      <!-- Previous Chats Heading -->
      <div v-if="!sidebarCollapsed && conversations.list.length > 0" class="previous-chats-heading">
        <h3>Previous Chats</h3>
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
            <div class="conversation-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
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
        <div class="user-menu" @click="toggleUserDropdown">
          <div class="user-info">
            <div class="user-avatar">
              {{ user.email ? user.email.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div v-if="!sidebarCollapsed" class="user-details">
              <div class="user-name">{{ user.email }}</div>
              <div class="user-role">DPR User</div>
            </div>
          </div>
        </div>
        
        <!-- User Dropdown Menu -->
        <div v-if="showUserDropdown && !sidebarCollapsed" class="user-dropdown">
          <div class="dropdown-item" @click="setTheme('light')" :class="{ 'active': !isDarkTheme }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <span>Light Theme</span>
          </div>
          <div class="dropdown-item" @click="setTheme('dark')" :class="{ 'active': isDarkTheme }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <span>Dark Theme</span>
          </div>
          <div class="dropdown-item logout-item" @click="logout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <div class="main-header">
        <h1 @click="resetToGreeting" class="clickable-title" title="Click to start fresh">DPR Chatbot</h1>
        <div class="header-info">
          <div class="document-count-container" 
               @mouseenter="handleMouseEnter" 
               @mouseleave="handleMouseLeave">
            <span class="document-count">{{ documents.length }} DPR Documents</span>
            
            <!-- Document List Popup -->
            <div v-if="showDocumentPopup" class="document-popup" @mouseenter="handlePopupMouseEnter" @mouseleave="handlePopupMouseLeave">
              <div class="popup-header">
                <h4>Available Documents</h4>
                <span class="popup-count">{{ documents.length }} documents</span>
              </div>
              <div class="popup-content">
                <div v-for="doc in documents" :key="doc.id" class="document-item">
                  <div class="document-info">
                    <div class="document-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                      </svg>
                    </div>
                    <span class="document-name">"{{ getDocumentDisplayName(doc.name) }}"</span>
                  </div>
                  <button 
                    class="copy-btn" 
                    @click="copyDocumentName(doc.name)"
                    :title="`Copy '${doc.name}' to clipboard`">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="popup-footer">
                <button class="copy-all-btn" @click="copyAllDocumentNames">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy All Names
                </button>
              </div>
            </div>
          </div>
          <button class="btn-checklist" @click="$router.push('/checklist')" title="Checklist Analyzer">
            Checklist
          </button>
          <!-- Theme Toggle Button -->
          <div class="theme-toggle-container">
            <button @click="toggleTheme" class="theme-toggle-btn" :class="{ 'dark': isDarkTheme }">
              <div class="toggle-slider">
                <div class="toggle-icon">
                  <svg v-if="!isDarkTheme" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
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

        <!-- Chat Component -->
        <Chat 
          :current-conversation="currentConversation"
          :messages="messages"
          :loading="loading"
          :user="user"
          :is-new-chat="messages.length === 0"
          @send-message="handleSendMessage"
          @allow-web-search="handleAllowWebSearch"
          @deny-web-search="handleDenyWebSearch"
          @chat-started="handleChatStarted"
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
      isBackendHealthy: true,
      showUserDropdown: false,
      isDarkTheme: false,
      welcomeMessage: '',
      isWebSearchInProgress: false,
      showDocumentPopup: false,
      hoverTimeout: null,
      hideTimeout: null
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

    // Load theme preference
    const savedTheme = localStorage.getItem('dpr_theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.classList.add('dark-theme');
    }
    
    // Check backend health
    await this.checkBackendHealth();
    
    // Load initial data first (conversations from backend)
    await this.loadInitialData();
    
    // Then restore state from localStorage (this will properly restore currentConversation)
    this.loadStateFromStorage();

    // Listen for backend health changes
    this.backendHealthListener = (event) => {
      this.updateBackendHealth(event.detail.isHealthy);
    };
    window.addEventListener('backendHealthChange', this.backendHealthListener);

    // Listen for clicks outside dropdown
    this.clickOutsideListener = (event) => {
      if (!event.target.closest('.sidebar-footer')) {
        this.showUserDropdown = false;
      }
    };
    document.addEventListener('click', this.clickOutsideListener);

    // Listen for page visibility changes to reload messages when tab becomes active
    this.visibilityChangeListener = () => {
      if (!document.hidden && this.currentConversation && !this.isWebSearchInProgress) {
        // Tab became visible and we have a current conversation
        // Reload messages to ensure we have the latest data
        this.reloadCurrentConversationMessages();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityChangeListener);

    // Listen for window focus to reload messages when window regains focus
    this.windowFocusListener = () => {
      if (this.currentConversation && !this.isWebSearchInProgress) {
        // Window gained focus and we have a current conversation
        // Reload messages to ensure we have the latest data
        this.reloadCurrentConversationMessages();
      }
    };
    window.addEventListener('focus', this.windowFocusListener);
  },

  beforeDestroy() {
    // Clean up event listeners
    if (this.backendHealthListener) {
      window.removeEventListener('backendHealthChange', this.backendHealthListener);
    }
    if (this.clickOutsideListener) {
      document.removeEventListener('click', this.clickOutsideListener);
    }
    if (this.visibilityChangeListener) {
      document.removeEventListener('visibilitychange', this.visibilityChangeListener);
    }
    if (this.windowFocusListener) {
      window.removeEventListener('focus', this.windowFocusListener);
    }
    
    // Clean up hover timeouts
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  },

  methods: {
    // Load state from localStorage
    loadStateFromStorage() {
      try {
        // Don't overwrite conversations list - it was just loaded from backend
        // Only restore the current conversation reference
        
        const storedMessages = localStorage.getItem('dpr_messages');
        if (storedMessages) {
          this.messages = JSON.parse(storedMessages);
          console.log('Messages loaded from localStorage:', this.messages);
        }
        
        const storedSidebarState = localStorage.getItem('dpr_sidebar_collapsed');
        if (storedSidebarState !== null) {
          this.sidebarCollapsed = JSON.parse(storedSidebarState);
        }
        
        // Restore current conversation if it exists
        const storedCurrentConversationId = localStorage.getItem('dpr_current_conversation_id');
        if (storedCurrentConversationId && this.conversations.list.length > 0) {
          const conversation = this.conversations.list.find(c => c.id === storedCurrentConversationId);
          if (conversation) {
            this.currentConversation = conversation;
            this.conversations.current = conversation;
            console.log('Restored current conversation:', conversation.id, conversation.title);
            // Load messages for the restored conversation
            this.$nextTick(() => {
              this.loadConversationMessages(conversation.id);
            });
          } else {
            console.warn('Stored conversation ID not found in current conversations list:', storedCurrentConversationId);
            // Clear the invalid stored conversation ID
            localStorage.removeItem('dpr_current_conversation_id');
          }
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
        // Also save current conversation ID separately for better persistence
        if (this.currentConversation) {
          localStorage.setItem('dpr_current_conversation_id', this.currentConversation.id);
        }
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
          // this.$toast.success('Backend health check passed!');
        } else {
          // this.$toast.error('Backend health check failed!');
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
        // Currently using 4 documents with normalized names for backend consistency
        this.documents = [
          // { id: 1, name: 'Meghalaya_Skywalk.pdf', displayName: 'Meghalaya Skywalk.pdf' }, // COMMENTED OUT - not currently used
          // { id: 2, name: 'Tripura_Zoological_Park.pdf', displayName: 'Tripura Zoological Park.pdf' }, // COMMENTED OUT - not currently used
          // { id: 3, name: 'Kohima_Football_Ground.pdf', displayName: 'Kohima Football Ground.pdf' }, // COMMENTED OUT - not currently used
          { id: 4, name: 'Nagaland_Innovation_Hub.pdf', displayName: 'Nagaland Innovation Hub.pdf' },
          { id: 5, name: 'Mizoram_Development_of_Helipads.pdf', displayName: 'Mizoram Development of Helipads.pdf' },
          { id: 6, name: 'Assam_Road_Project.pdf', displayName: 'Assam Road Project.pdf' },
          { id: 7, name: 'Khankawn_Rongura_Road_Project.pdf', displayName: 'Khankawn Rongura Road Project.pdf' }
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
        console.log('Creating new conversation...');
        const response = await this.$http.secured.post('/api/conversations', {
          title: `New Chat ${Date.now()}`
        });
        const newConversation = response.data.conversation;
        
        this.conversations.list.unshift(newConversation);
        
        // Set the new conversation as current to go directly to chat
        this.currentConversation = newConversation;
        this.conversations.current = newConversation;
        this.messages = [];
        
        // Save to localStorage
        this.saveStateToStorage();
        this.saveMessagesToStorage();
        
        console.log('New conversation created:', newConversation.id, newConversation.title);
        this.$toast.success('New conversation created!');
      } catch (error) {
        console.error('Failed to create conversation:', error);
        this.$toast.error('Failed to create conversation');
      }
    },

    async selectConversation(conversationId) {
      const conversation = this.conversations.list.find(c => c.id === conversationId);
      if (!conversation) {
        console.error('Conversation not found:', conversationId);
        return;
      }

      console.log('Selecting conversation:', conversation.id, conversation.title);
      this.currentConversation = conversation;
      this.conversations.current = conversation;
      
      // Save to localStorage
      this.saveStateToStorage();

      // Load messages for this conversation
      await this.loadConversationMessages(conversationId);
    },

    // Helper method to load messages for a conversation
    async loadConversationMessages(conversationId) {
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

    // Method to reload messages for the current conversation
    async reloadCurrentConversationMessages() {
      if (!this.currentConversation) {
        console.log('No current conversation to reload messages for');
        return;
      }

      console.log('Reloading messages for current conversation:', this.currentConversation.id);
      
      try {
        // Load fresh messages from the backend
        await this.loadConversationMessages(this.currentConversation.id);
        console.log('Successfully reloaded messages for conversation:', this.currentConversation.id);
      } catch (error) {
        console.error('Failed to reload messages for current conversation:', error);
        // Don't show error to user as this is a background operation
      }
    },

    // Method to reset to greeting screen
    resetToGreeting() {
      console.log('Resetting to greeting screen...');
      
      // Clear current conversation
      this.currentConversation = null;
      this.conversations.current = null;
      
      // Clear messages to show greeting
      this.messages = [];
      
      // Save the cleared state to localStorage
      this.saveStateToStorage();
      this.saveMessagesToStorage();
      
      // Show success message
      this.$toast.success('Started fresh! Ask me anything about the DPR documents.');
      
      console.log('Reset complete - showing greeting screen');
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
        // Ensure we have a current conversation
        if (!this.currentConversation) {
          console.warn('No current conversation found, creating new one. Messages count:', this.messages.length);
          console.warn('Current conversation state:', this.currentConversation);
          console.warn('Available conversations:', this.conversations.list.length);
          await this.createNewConversation();
        } else {
          // Verify that the current conversation still exists in the conversations list
          const conversationExists = this.conversations.list.find(c => c.id === this.currentConversation.id);
          if (!conversationExists) {
            console.warn('Current conversation no longer exists in conversations list, creating new one');
            console.warn('Current conversation ID:', this.currentConversation.id);
            console.warn('Available conversation IDs:', this.conversations.list.map(c => c.id));
            await this.createNewConversation();
          }
        }

        // Check if this is the first message before adding it
        const isFirstMessage = this.messages.length === 0;

        // Push the user's message locally for immediate UI feedback
        this.messages.push({
          id: Date.now(),
          role: 'user',
          content: messageText,
          source: null,
          created_at: new Date().toISOString()
        });
        this.saveMessagesToStorage();

        // Update conversation title if this is the first message
        if (isFirstMessage && this.currentConversation) {
          try {
            const newTitle = this.generateConversationTitle(messageText);
            await this.updateConversationTitle(this.currentConversation.id, newTitle);
          } catch (error) {
            console.warn('Failed to update conversation title:', error);
            // Don't let title update failure break the message sending
          }
        }

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
          const aiMessage = apiPostData.message;
          
          const fullText = this.getMessageText(aiMessage.content);
          
          // Add message with typing effect
          aiMessage.isTyping = true;
          aiMessage.displayText = '';
          this.messages.push(aiMessage);
          this.saveMessagesToStorage();
          
          // Start typing effect
          this.$nextTick(() => {
            this.simulateTyping(aiMessage, fullText);
          });
          
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

    getMessageText(content) {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return parsed.answer || content;
        } catch (e) {
          return content;
        }
      }
      return content.answer || '';
    },

    needsConsent(content) {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          
          // Handle nested JSON in the answer field
          if (parsed.answer && typeof parsed.answer === 'string' && parsed.answer.trim().startsWith('{')) {
            try {
              const nestedParsed = JSON.parse(parsed.answer);
              if (nestedParsed.needs_consent !== undefined) {
                return nestedParsed.needs_consent === true;
              }
            } catch (e) {
              // If nested parsing fails, continue with original logic
            }
          }
          
          return parsed.needs_consent === true;
        } catch (e) {
          return false;
        }
      }
      
      // Check if needs_consent is explicitly true
      if (content.needs_consent === true) {
        return true;
      }
      
      // Fallback: Check if the AI response indicates it can't find information
      const answerText = content.answer || '';
      const consentIndicators = [
        'not found in the provided',
        'cannot provide details',
        'do not contain specific information',
        'do not contain any specific information',
        'no information available',
        'cannot be answered from',
        'outside the dpr domain',
        'not available in the documents',
        'uploaded documents do not contain',
        'documents do not contain',
        'cannot find information',
        'no specific information about'
      ];
      
      const needsConsentFallback = consentIndicators.some(indicator => 
        answerText.toLowerCase().includes(indicator.toLowerCase())
      );
      
      return content.needs_consent === true || needsConsentFallback;
    },

    // Enhanced typing effect with pre-processed markdown
    async simulateTyping(message, fullText) {
      message.isTyping = true;
      message.displayText = 'Processing response...';
      
      // Small delay to show processing message
      await new Promise(resolve => setTimeout(resolve, 0.01));
      
      // Pre-process markdown to HTML for readable typing effect
      const processedHtml = this.preprocessMarkdown(fullText);
      
      // For very long responses (>800 chars), show instantly to avoid long delays
      if (fullText.length > 5000) {
        message.displayText = processedHtml;
        message.isTyping = false;
        return;
      }
      
      // Smart HTML typing effect
      await this.typeHtmlContent(message, processedHtml, fullText);
      
      message.isTyping = false;
      message.displayText = processedHtml;
    },

    // Pre-process markdown to HTML for readable typing effect
    preprocessMarkdown(text) {
      if (!text || text.trim() === '') {
        return '';
      }
      
      // Import marked dynamically to avoid issues
      const { marked } = require('marked');
      
      // Configure marked options for better rendering
      const renderer = new marked.Renderer();
      
      // Custom table renderer to ensure proper spacing
      renderer.table = function(header, body) {
        return '<table class="markdown-table">\n<thead>\n' + header + '</thead>\n<tbody>\n' + body + '</tbody>\n</table>\n';
      };
      
      renderer.tablerow = function(content) {
        return '<tr>' + content + '</tr>\n';
      };
      
      renderer.tablecell = function(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const align = flags.align ? ' style="text-align:' + flags.align + '"' : '';
        return '<' + type + align + '>' + content + '</' + type + '>';
      };
      
      // Convert markdown to HTML with options
      const html = marked(text, {
        breaks: true, // Convert \n to <br>
        gfm: true, // GitHub Flavored Markdown
        tables: true, // Enable tables
        sanitize: false, // Allow HTML (we trust our content)
        smartLists: true,
        smartypants: true,
        renderer: renderer
      });
      
      return html;
    },

    // Smart HTML typing effect that handles HTML tags gracefully
    async typeHtmlContent(message, htmlContent, originalText) {
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Extract text content for character counting
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      // Calculate typing speed based on content length
      const baseDelay = 15; // Base delay in ms
      const maxDelay = 50; // Maximum delay for very short content
      const delay = Math.min(maxDelay, Math.max(baseDelay, 1000 / (textContent.length / 10)));
      
      // Progressive typing with HTML awareness
      let currentLength = 0;
      const totalLength = textContent.length;
      
      while (currentLength < totalLength) {
        // Calculate how much to show based on text content
        const targetLength = Math.min(currentLength + 2, totalLength); // Type 2 characters at a time for smoothness
        
        // Get the substring of text content
        const targetText = textContent.substring(0, targetLength);
        
        // Find the corresponding HTML position
        const htmlToShow = this.getHtmlForTextLength(htmlContent, targetText);
        
        message.displayText = htmlToShow;
        currentLength = targetLength;
        
        // Wait before next iteration
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    },

    // Helper method to get HTML content up to a certain text length
    getHtmlForTextLength(htmlContent, targetText) {
      // For complex structures, use a simplified approach
      if (htmlContent.includes('<table') || htmlContent.includes('<ul') || htmlContent.includes('<ol')) {
        // For complex structures, show plain text during typing with basic formatting
        return this.simplifyHtmlForTyping(targetText);
      }
      
      // For simple content, try to preserve HTML structure
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        const walker = document.createTreeWalker(
          tempDiv,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let currentText = '';
        let resultHtml = '';
        
        // Walk through text nodes and build result
        const processNode = (node) => {
          const nodeText = node.textContent;
          const remainingLength = targetText.length - currentText.length;
          
          if (remainingLength <= 0) {
            return;
          }
          
          if (currentText.length + nodeText.length <= targetText.length) {
            // Include the entire text node
            currentText += nodeText;
            resultHtml += nodeText;
          } else {
            // Include partial text node
            const partialText = nodeText.substring(0, remainingLength);
            currentText += partialText;
            resultHtml += partialText;
          }
        };
        
        let node;
        while (node = walker.nextNode()) {
          processNode(node);
          if (currentText.length >= targetText.length) {
            break;
          }
        }
        
        return resultHtml;
      } catch (error) {
        // Fallback to simplified text
        return this.simplifyHtmlForTyping(targetText);
      }
    },

    // Simplify HTML for typing effect
    simplifyHtmlForTyping(text) {
      // Convert line breaks to <br> tags
      return text.replace(/\n/g, '<br>');
    },

    // Generate conversation title from first message
    generateConversationTitle(messageText) {
      // Clean and truncate the message
      let title = messageText.trim();
      
      // Remove common question words and make it more concise
      title = title.replace(/^(what|how|when|where|why|can|could|would|should|is|are|do|does|did|will|tell me about|explain|describe|give me|show me|help me with)/i, '');
      title = title.trim();
      
      // Capitalize first letter
      title = title.charAt(0).toUpperCase() + title.slice(1);
      
      // Truncate to reasonable length (max 50 characters)
      if (title.length > 50) {
        title = title.substring(0, 47) + '...';
      }
      
      // If title is too short or empty, use a default
      if (title.length < 3) {
        title = 'New Chat';
      }
      
      return title;
    },

    // Update conversation title
    async updateConversationTitle(conversationId, newTitle) {
      try {
        await this.$http.secured.put(`/api/conversations/${conversationId}`, {
          title: newTitle
        });
        
        // Update local conversation title
        const conversation = this.conversations.list.find(c => c.id === conversationId);
        if (conversation) {
          conversation.title = newTitle;
          this.saveStateToStorage();
        }
      } catch (error) {
        console.error('Failed to update conversation title:', error);
      }
    },

    async handleAllowWebSearch(message) {
      
      this.loading = true;
      this.isWebSearchInProgress = true;
  
  try {
    // Get the user's original question from the conversation
    const userMessages = this.messages.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1];
    
    if (!lastUserMessage) {
      this.$toast.error('Could not find your original question');
      return;
    }
    
    // Call the external search API directly
    const response = await this.$http.secured.post('/external_search/search', {
      query: lastUserMessage.content,
      conversation_id: this.currentConversation.id
    });
    
    // Add the web search result to messages
    if (response.data.message) {
      const aiMessage = response.data.message;
      const fullText = this.getMessageText(aiMessage.content);
      
      // Add message with typing effect
      aiMessage.isTyping = true;
      aiMessage.displayText = '';
      this.messages.push(aiMessage);
      this.saveMessagesToStorage();
      
      // Start typing effect
      this.$nextTick(() => {
        this.simulateTyping(aiMessage, fullText);
      });
      
      this.$toast.success('Web search completed!');
    }
    
  } catch (error) {
    console.error('External search error:', error);
    
    // Add error message to chat
    this.messages.push({
      id: Date.now(),
      role: 'assistant',
      content: {
        answer: 'Sorry, I couldn\'t search the internet right now. Please try again later.',
        citations: [],
        needs_consent: false
      },
      source: 'web',
      created_at: new Date().toISOString()
    });
    this.saveMessagesToStorage();
    this.$toast.error('Web search failed');
  } finally {
    this.loading = false;
    // Reset the flag after a delay to allow typing effect to complete
    setTimeout(() => {
      this.isWebSearchInProgress = false;
    }, 2000);
  }
},

    handleDenyWebSearch() {
      // Find the consent request message and modify it to remove consent
      const consentMessageIndex = this.messages.findIndex(message => 
        message.role === 'assistant' && this.needsConsent(message.content)
      );
      
      if (consentMessageIndex !== -1) {
        const message = this.messages[consentMessageIndex];
        
        // Create a new content without consent request
        let newContent;
        if (typeof message.content === 'string') {
          try {
            const parsed = JSON.parse(message.content);
            newContent = {
              answer: parsed.message || "Result not found in the DPR documents.",
              citations: parsed.citations || [],
              needs_consent: false
            };
          } catch (e) {
            newContent = {
              answer: "Result not found in the DPR documents.",
              citations: [],
              needs_consent: false
            };
          }
        } else {
          newContent = {
            answer: message.content.message || "Result not found in the DPR documents.",
            citations: message.content.citations || [],
            needs_consent: false
          };
        }
        
        // Update the message content
        this.messages[consentMessageIndex].content = newContent;
        this.saveMessagesToStorage();
      }
      
      this.$toast.info('Web search cancelled. Please try asking a different question about the DPR documents.');
    },


    handleChatStarted() {
      // This method is called when user starts typing in a new chat
      // The transition from centered to bottom position is handled by CSS
      // No additional logic needed here
    },

    startConversationFromWelcome() {
      if (!this.welcomeMessage.trim()) return;
      
      // Create new conversation and start with the welcome message
      this.createNewConversation();
      this.$nextTick(() => {
        this.handleSendMessage(this.welcomeMessage);
        this.welcomeMessage = '';
      });
    },

    handleWelcomeKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.startConversationFromWelcome();
      }
    },

    handleWelcomeInput() {
      // Auto-resize textarea based on content
      this.autoResizeWelcomeTextarea();
    },

    autoResizeWelcomeTextarea() {
      const textarea = this.$refs.welcomeMessageInput;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Set height based on content, with max height limit
        const maxHeight = 120; // Maximum height in pixels
        const newHeight = Math.min(textarea.scrollHeight, maxHeight);
        textarea.style.height = newHeight + 'px';
        
        // Enable scrolling if content exceeds max height
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
      }
    },

    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      // Close dropdown when sidebar collapses
      this.showUserDropdown = false;
      // Save to localStorage
      this.saveStateToStorage();
    },

    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },

    setTheme(theme) {
      this.isDarkTheme = (theme === 'dark');
      // Apply theme to document
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
      // Save theme preference
      localStorage.setItem('dpr_theme', theme);
      // Close dropdown
      this.showUserDropdown = false;
    },

    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      // Apply theme to document
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('dpr_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('dpr_theme', 'light');
      }
    },

    // Copy individual document name to clipboard
    async copyDocumentName(documentName) {
      const formattedName = `"${this.getDocumentDisplayName(documentName)}"`;
      try {
        await navigator.clipboard.writeText(formattedName);
        this.showCopyFeedback(`Copied ${formattedName}`);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = formattedName;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showCopyFeedback(`Copied ${formattedName}`);
      }
    },

    // Copy all document names to clipboard
    async copyAllDocumentNames() {
      const allNames = this.documents.map(doc => `"${this.getDocumentDisplayName(doc.name)}"`).join('\n');
      try {
        await navigator.clipboard.writeText(allNames);
        this.showCopyFeedback(`Copied all ${this.documents.length} document names`);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = allNames;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showCopyFeedback(`Copied all ${this.documents.length} document names`);
      }
    },

    // Show copy feedback (you can enhance this with a toast notification)
    showCopyFeedback(message) {
      // Simple console log for now - you can enhance this with a toast notification
      console.log(message);
      // Optional: Add a temporary visual feedback
      // You could implement a toast notification system here
    },

    // Improved hover handling for better UX
    handleMouseEnter() {
      // Clear any pending hide timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      
      // Show popup immediately on hover
      this.showDocumentPopup = true;
    },

    handleMouseLeave() {
      // Set a delay before hiding to allow mouse to move to popup
      this.hideTimeout = setTimeout(() => {
        this.showDocumentPopup = false;
      }, 150); // 150ms delay
    },

    handlePopupMouseEnter() {
      // Clear any pending hide timeout when mouse enters popup
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      // Keep popup visible
      this.showDocumentPopup = true;
    },

    handlePopupMouseLeave() {
      // Hide popup when mouse leaves popup area
      this.showDocumentPopup = false;
    },

    // Format document name for display (use displayName if available, otherwise remove .pdf extension)
    getDocumentDisplayName(documentName) {
      const doc = this.documents.find(d => d.name === documentName)
      if (doc && doc.displayName) {
        return doc.displayName.replace(/\.pdf$/i, '')
      }
      return documentName.replace(/\.pdf$/i, '')
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
        localStorage.removeItem('dpr_current_conversation_id');
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
  background: #3c3c3c;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease, background-color 0.3s ease;
}

.dark-theme .sidebar {
  background: #181818;
}

.dark-theme .sidebar-collapsed {
  background: #181818;
}

.sidebar-collapsed {
  width: 60px;
}

/* Updated Sidebar Header Styles */
.sidebar-header {
  padding: 12px;
  border-bottom: 1px solid #2d2d30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 6px;
}


.collapse-btn {
  background: transparent;
  border: none;
  color: #8e8ea0;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover {
  background: #2d2d30;
  color: white;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img-small {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

/* When sidebar is expanded, show menu icon */
.sidebar:not(.sidebar-collapsed) .collapse-btn .logo-icon {
  display: none;
}

.sidebar:not(.sidebar-collapsed) .collapse-btn .menu-icon {
  display: flex;
}

/* When sidebar is collapsed, show logo icon by default */
.sidebar-collapsed .collapse-btn {
  width: 100%;
  justify-content: center;
}

.sidebar-collapsed .collapse-btn .logo-icon {
  display: flex;
}

.sidebar-collapsed .collapse-btn .menu-icon {
  display: none;
}

/* When hovering over collapsed sidebar button, show menu icon */
.sidebar-collapsed .collapse-btn:hover .logo-icon {
  display: none;
}

.sidebar-collapsed .collapse-btn:hover .menu-icon {
  display: flex;
}

/* New Chat Section */
.new-chat-section {
  padding: 8px 0;
}

.new-chat-btn {
  width: calc(100% - 16px);
  background: transparent;
  border: none;
  color: white;
  padding: 12px;
  margin: 2px 8px;
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

/* Previous Chats Heading */
.previous-chats-heading {
  padding: 12px 20px 8px 20px;
}

.previous-chats-heading h3 {
  font-size: 12px;
  font-weight: 600;
  color: #8e8ea0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
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
  min-height: 44px; /* Ensure consistent minimum height */
  box-sizing: border-box;
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
  height: 20px; /* Fixed height for consistent alignment */
}

.conversation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0; /* Prevent icon from shrinking */
}

.conversation-icon svg {
  width: 16px;
  height: 16px;
  display: block; /* Remove any inline spacing */
}

.conversation-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2; /* Consistent line height */
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
  position: relative;
}

.user-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.user-menu:hover {
  background: #2d2d30;
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

/* User Dropdown Menu */
.user-dropdown {
  position: absolute;
  bottom: 100%;
  left: 12px;
  right: 12px;
  background: #2d2d30;
  border: 1px solid #4d4d4f;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  margin-bottom: 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid #4d4d4f;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #343541;
}

.dropdown-item.active {
  background: #10a37f;
  color: white;
}

.dropdown-item.active:hover {
  background: #0d8f68;
}

.dropdown-item.logout-item {
  color: #ff6b6b;
}

.dropdown-item.logout-item:hover {
  background: #ff6b6b;
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
  background: #f7f7f8;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 60px;
  box-sizing: border-box;
}


.main-header h1 {
  font-size: 20px;
  font-weight: 600;
  color: #2d333a;
  margin: 0;
  flex: 1;
}

.clickable-title {
  cursor: pointer;
  transition: color .2s ease;
  user-select: none;
}

.clickable-title:hover {
  color: #10a37f;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Theme Toggle Button */
.theme-toggle-container {
  display: flex;
  align-items: center;
}

.theme-toggle-btn {
  position: relative;
  width: 60px;
  height: 30px;
  background: #e5e5e5;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.theme-toggle-btn:hover {
  background: #d1d5db;
}

.theme-toggle-btn.dark {
  background: #10a37f;
}

.theme-toggle-btn.dark:hover {
  background: #0d8f68;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 26px;
  height: 26px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.theme-toggle-btn.dark .toggle-slider {
  transform: translateX(30px);
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.document-count-container {
  position: relative;
  display: inline-block;
}

.document-count {
  font-size: 14px;
  color: #565869;
  background: #f1f1f1;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.document-count:hover {
  background: #e8e8e8;
  transform: translateY(-1px);
}

/* Document Popup Styles */
.document-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 4px; /* Reduced gap for better hover experience */
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  min-width: 320px;
  max-width: 400px;
  z-index: 1000;
  animation: popupFadeIn 0.2s ease-out;
}

/* Invisible bridge to connect trigger and popup for better hover */
.document-popup::before {
  content: '';
  position: absolute;
  top: -8px; /* Extends upward to bridge the gap */
  left: 0;
  right: 0;
  height: 8px;
  background: transparent;
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.popup-header {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
}

.popup-count {
  font-size: 12px;
  color: #718096;
  background: #f7fafc;
  padding: 4px 8px;
  border-radius: 8px;
}

.popup-content {
  max-height: 300px;
  overflow-y: auto;
  padding: 8px 0;
}

.document-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  transition: background-color 0.2s ease;
}

.document-item:hover {
  background-color: #f8f9fa;
}

.document-info {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.document-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #e3f2fd;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
}

.document-icon svg {
  color: #1976d2;
}

.document-name {
  font-size: 14px;
  color: #2d3748;
  font-weight: 500;
  word-break: break-word;
  line-height: 1.4;
  font-style: italic;
  letter-spacing: 0.025em;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.copy-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e0;
  transform: scale(1.05);
}

.copy-btn svg {
  color: #64748b;
}

.copy-btn:hover svg {
  color: #475569;
}

.popup-footer {
  padding: 12px 20px 16px;
  border-top: 1px solid #f0f0f0;
}

.copy-all-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 16px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.copy-all-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.copy-all-btn svg {
  margin-right: 8px;
  color: #64748b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .document-popup {
    min-width: 280px;
    max-width: 320px;
    left: 0;
    transform: none;
    margin-left: -20px;
  }
  
  .document-popup::before {
    left: 20px;
    right: 20px;
  }
  
  .popup-header {
    padding: 12px 16px 8px;
  }
  
  .popup-header h4 {
    font-size: 14px;
  }
  
  .document-item {
    padding: 10px 16px;
  }
  
  .document-name {
    font-size: 13px;
  }
  
  .popup-footer {
    padding: 8px 16px 12px;
  }
  
  .copy-all-btn {
    padding: 8px 12px;
    font-size: 13px;
  }
}

.btn-checklist {
  background: #10a37f;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.btn-checklist:hover {
  background: #0d8f68;
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
  font-size: 40px;
  font-weight: 700;
  color: #2d333a;
  margin-bottom: 20px;
}

.welcome-content p {
  font-size: 16px;
  color: #565869;
  margin-bottom: 40px;
}

.welcome-subtitle {
  font-size: 20px;
  color: #565869;
  margin-bottom: 16px;
  line-height: 1.5;
}

.welcome-greeting {
  font-size: 22px;
  color: #2d333a;
  margin-bottom: 40px;
  font-weight: 600;
}

/* Welcome Chat Input */
.welcome-chat-input {
  margin-top: 40px;
}

.welcome-message-form {
  max-width: 500px;
  margin: 0 auto;
}

.welcome-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  padding: 16px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.welcome-input-wrapper:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.welcome-input-wrapper:focus-within {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  border-color: #10a37f;
}

.welcome-message-input {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  font-family: inherit;
  max-height: 120px;
  min-height: 24px;
  background: transparent;
  color: #2d333a;
}

.welcome-message-input::placeholder {
  color: #8e8ea0;
  font-size: 16px;
}

.welcome-send-button {
  background: #10a37f;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(16, 163, 127, 0.3);
}

.welcome-send-button:hover:not(:disabled) {
  background: #0d8f68;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 163, 127, 0.4);
}

.welcome-send-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
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

/* Dark Theme Styles */
.dark-theme .dashboard {
  background: #2d2d30;
}

.dark-theme .main-content {
  background: #2d2d30;
}

.dark-theme .main-header {
  background: #2d2d30;
}

.dark-theme .main-header h1 {
  color: white;
}

.dark-theme .clickable-title:hover {
  color: #10a37f;
}

.dark-theme .theme-toggle-btn {
  background: #4d4d4f;
}

.dark-theme .theme-toggle-btn:hover {
  background: #565869;
}

.dark-theme .theme-toggle-btn.dark {
  background: #10a37f;
}

.dark-theme .theme-toggle-btn.dark:hover {
  background: #0d8f68;
}

.dark-theme .toggle-slider {
  background: #2d2d30;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}


.dark-theme .document-count {
  background: #4d4d4f;
  color: #e5e5e5;
}

.dark-theme .document-count:hover {
  background: #5a5a5c;
}

/* Dark Theme Popup Styles */
.dark-theme .document-popup {
  background: #2d2d30;
  border-color: #3e3e42;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.dark-theme .popup-header {
  border-bottom-color: #3e3e42;
}

.dark-theme .popup-header h4 {
  color: #e5e5e5;
}

.dark-theme .popup-count {
  background: #3e3e42;
  color: #b3b3b3;
}

.dark-theme .document-item:hover {
  background-color: #3e3e42;
}

.dark-theme .document-icon {
  background: #1e3a8a;
}

.dark-theme .document-icon svg {
  color: #60a5fa;
}

.dark-theme .document-name {
  color: #e5e5e5;
  font-style: italic;
  letter-spacing: 0.025em;
}

.dark-theme .copy-btn {
  border-color: #4a5568;
}

.dark-theme .copy-btn:hover {
  background: #4a5568;
  border-color: #718096;
}

.dark-theme .copy-btn svg {
  color: #a0aec0;
}

.dark-theme .copy-btn:hover svg {
  color: #e2e8f0;
}

.dark-theme .popup-footer {
  border-top-color: #3e3e42;
}

.dark-theme .copy-all-btn {
  background: #3e3e42;
  border-color: #4a5568;
  color: #e2e8f0;
}

.dark-theme .copy-all-btn:hover {
  background: #4a5568;
  border-color: #718096;
}

.dark-theme .copy-all-btn svg {
  color: #a0aec0;
}

.dark-theme .backend-status.healthy {
  background-color: #1f2937;
  color: #10b981;
}

.dark-theme .backend-status.unhealthy {
  background-color: #1f2937;
  color: #ef4444;
}

.dark-theme .welcome-screen {
  background: #2d2d30;
}

.dark-theme .welcome-content h2 {
  color: white;
}

.dark-theme .welcome-content p {
  color: #d1d5db;
}

.dark-theme .welcome-subtitle {
  color: #d1d5db;
}

.dark-theme .welcome-greeting {
  color: white;
}

.dark-theme .welcome-input-wrapper {
  background: #3a3a3f;
  border: 1px solid #4d4d4f;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.dark-theme .welcome-input-wrapper:hover {
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
}

.dark-theme .welcome-input-wrapper:focus-within {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  border-color: #10a37f;
}

.dark-theme .welcome-message-input {
  background: transparent;
  color: white;
}

.dark-theme .welcome-message-input::placeholder {
  color: #8e8ea0;
}

.dark-theme .available-docs h3,
.dark-theme .example-queries h3 {
  color: white;
}

.dark-theme .doc-card {
  background: #2d2d30;
  border: 1px solid #4d4d4f;
  color: white;
}

.dark-theme .example-btn {
  background: #2d2d30;
  border: 1px solid #4d4d4f;
  color: white;
}

.dark-theme .example-btn:hover {
  border-color: #10a37f;
  background: #343541;
}
</style>
