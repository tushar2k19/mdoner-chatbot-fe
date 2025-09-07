<template>
  <div class="chat-component">
    <!-- Chat Messages -->
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id" class="message-wrapper">
        <!-- User Message -->
        <div v-if="message.role === 'user'" class="message user-message">
          <div class="message-avatar user-avatar">
            {{ user.email ? user.email.charAt(0).toUpperCase() : 'U' }}
          </div>
          <div class="message-content">
            <div class="message-text user-text">{{ message.content }}</div>
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
            <div class="message-text assistant-text">
              {{ getMessageText(message.content) }}
            </div>
            
            <!-- Citations -->
            <div v-if="getCitations(message.content).length > 0" class="citations">
              <div class="citations-label">Sources:</div>
              <div class="citation-chips">
                <a 
                  v-for="citation in getCitations(message.content)" 
                  :key="citation.url || citation"
                  :href="getCitationUrl(citation)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="citation-chip citation-link"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  {{ getCitationTitle(citation) }}
                </a>
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
            <div class="processing-info">
              <p>🤖 Processing your query...</p>
              <p class="processing-note">This may take 15-30 seconds for complex questions as I search through the DPR documents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="message-input-container">
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
</template>

<script>
export default {
  name: 'Chat',
  props: {
    // Current conversation data
    currentConversation: {
      type: Object,
      required: true
    },
    // Messages for current conversation
    messages: {
      type: Array,
      required: true
    },
    // Loading state
    loading: {
      type: Boolean,
      default: false
    },
    // User data
    user: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      newMessage: ''
    }
  },

  methods: {
    async sendMessage() {
      if (!this.newMessage.trim() || !this.currentConversation) return;

      const messageText = this.newMessage;
      this.newMessage = '';

      // Auto-resize textarea
      if (this.$refs.messageInput) {
        this.$refs.messageInput.style.height = 'auto';
      }

      // Emit only the text; parent handles pushing and API
      this.$emit('send-message', messageText);
    },

    async allowWebSearch(message) {
      this.$emit('allow-web-search', message);
    },

    denyWebSearch() {
      this.$emit('deny-web-search');
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

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
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

    getCitations(content) {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return parsed.citations || [];
        } catch (e) {
          return [];
        }
      }
      return content.citations || [];
    },

    needsConsent(content) {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return parsed.needs_consent === true;
        } catch (e) {
          return false;
        }
      }
      return content.needs_consent === true;
    },



      getCitationTitle(citation) {
        // Handle both string citations (from DPR) and object citations (from web search)
        if (typeof citation === 'string') {
          return citation;
        }
        
        // For web search citations, return the title
        return citation.title || 'Web Source';
      },

      getCitationUrl(citation) {
        // Handle both string citations (from DPR) and object citations (from web search)
        if (typeof citation === 'string') {
          // For DPR citations, we don't have URLs, so return '#'
          return '#';
        }
        
        // For web search citations, return the URL
        return citation.url || '#';
      }
  },

  watch: {
    // Watch for new messages to scroll to bottom
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.chat-component {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-wrapper {
  margin-bottom: 32px;
  opacity: 0;
  animation: messageSlideIn 0.6s ease-out forwards;
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

/* Citation Links */
.citation-link {
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.citation-link:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.citation-link:active {
  transform: translateY(0);
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

/* Processing Info */
.processing-info {
  margin-top: 12px;
  padding: 12px;
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
  border-radius: 8px;
}

.processing-info p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #0c4a6e;
}

.processing-info p:last-child {
  margin-bottom: 0;
}

.processing-note {
  font-size: 12px;
  color: #0369a1;
  font-style: italic;
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

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

/* Responsive */
@media (max-width: 768px) {
  .message {
    max-width: 100%;
  }
}
</style>
