<template>
  <div class="chat-page">
    <!-- Header -->
    <div class="chat-header">
      <h3>DPR Chatbot</h3>
      <div class="user-info">
        <span>{{ user.email }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>

    <!-- Chat Messages -->
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="messages.length === 0" class="welcome-message">
        <h4>Welcome to DPR Chatbot!</h4>
        <p>Ask me anything about the DPR documents.</p>
      </div>
      
      <div v-for="message in messages" :key="message.id" class="message">
        <div v-if="message.role === 'user'" class="user-message">
          <div class="message-content">{{ message.content }}</div>
        </div>
        
        <div v-else class="bot-message">
          <div class="message-content">
            <div class="bot-answer">{{ message.content.answer || message.content }}</div>
            <div v-if="message.content.citations" class="citations">
              <strong>Sources:</strong>
              <span v-for="citation in message.content.citations" :key="citation" class="citation">
                {{ citation }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="bot-message">
        <div class="message-content">
          <div class="typing">Bot is typing...</div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="chat-input">
      <form @submit.prevent="sendMessage">
        <input 
          type="text" 
          v-model="newMessage" 
          placeholder="Ask about DPR documents..." 
          :disabled="loading"
        >
        <button type="submit" :disabled="!newMessage.trim() || loading">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { chatService, storageService } from '@/services/chatServices.js'

export default {
  name: 'Chat',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      messages: [],
      newMessage: '',
      loading: false,
      conversationId: null,
      documents: []
    }
  },
  async mounted() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.$router.push('/');
      return;
    }
    
    // Load initial data
    await this.loadInitialData();
    
    // Create a new conversation
    await this.createConversation();
  },
  methods: {
    async loadInitialData() {
      try {
        // Load documents using mock service
        const documentsData = await chatService.getDocuments();
        this.documents = documentsData.documents;
        storageService.setDocuments(this.documents);
        
        this.$toast.success('Loaded DPR documents successfully!');
      } catch (error) {
        console.error('Failed to load initial data:', error);
        this.$toast.error('Failed to load documents');
      }
    },
    
    async createConversation() {
      try {
        // Use mock service instead of real API
        const response = await chatService.createConversation('New DPR Chat');
        this.conversationId = response.conversation.id;
        
        // Load some initial mock messages
        const messagesData = await chatService.getMessages(this.conversationId);
        this.messages = messagesData.messages;
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (err) {
        console.error('Failed to create conversation:', err);
        this.$toast.error('Failed to create conversation');
      }
    },
    
    async sendMessage() {
      if (!this.newMessage.trim() || !this.conversationId) return;
      
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: this.newMessage,
        source: null,
        created_at: new Date().toISOString()
      };
      
      this.messages.push(userMessage);
      const messageText = this.newMessage;
      this.newMessage = '';
      this.loading = true;
      
      try {
        // Use mock service instead of real API
        const response = await chatService.sendMessage(this.conversationId, messageText);
        this.messages.push(response.message);
        
        this.$toast.success('Message sent successfully!');
      } catch (err) {
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
        console.error('Send message error:', err);
        this.$toast.error('Failed to send message');
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.chat-header {
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.welcome-message {
  text-align: center;
  color: #6c757d;
  margin-top: 2rem;
}

.message {
  margin-bottom: 1rem;
}

.user-message {
  display: flex;
  justify-content: flex-end;
}

.user-message .message-content {
  background: #007bff;
  color: white;
  padding: 0.75rem;
  border-radius: 18px;
  max-width: 70%;
}

.bot-message {
  display: flex;
  justify-content: flex-start;
}

.bot-message .message-content {
  background: white;
  padding: 0.75rem;
  border-radius: 18px;
  max-width: 70%;
  border: 1px solid #e9ecef;
}

.citations {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.citation {
  display: inline-block;
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
}

.typing {
  color: #6c757d;
  font-style: italic;
}

.chat-input {
  background: white;
  padding: 1rem;
  border-top: 1px solid #e9ecef;
}

.chat-input form {
  display: flex;
  gap: 0.5rem;
}

.chat-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 20px;
  outline: none;
}

.chat-input button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
}

.chat-input button:hover {
  background: #0056b3;
}

.chat-input button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>
