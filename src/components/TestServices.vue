<template>
    <div class="test-services">
      <h2>API Services Test</h2>
      
      <div class="test-section">
        <h3>ConversationService Test</h3>
        <button @click="testConversations">Test Get Conversations</button>
        <button @click="testCreateConversation">Test Create Conversation</button>
        <div v-if="conversationResult" class="result">
          <pre>{{ conversationResult }}</pre>
        </div>
      </div>
  
      <div class="test-section">
        <h3>MessageService Test</h3>
        <button @click="testMessages">Test Get Messages</button>
        <div v-if="messageResult" class="result">
          <pre>{{ messageResult }}</pre>
        </div>
      </div>
  
      <div class="test-section">
        <h3>Error Log</h3>
        <div v-if="errors.length > 0" class="errors">
          <div v-for="error in errors" :key="error" class="error">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConversationService from '../services/ConversationService.js'
  import MessageService from '../services/MessageService.js'
  
  export default {
    name: 'TestServices',
    data() {
      return {
        conversationResult: null,
        messageResult: null,
        errors: []
      }
    },
    methods: {
      async testConversations() {
        try {
          this.errors = []
          console.log('Testing ConversationService.getConversations()...')
          
          const result = await ConversationService.getConversations()
          this.conversationResult = result
          console.log('✅ Conversations loaded successfully:', result)
          
        } catch (error) {
          const errorMsg = `❌ ConversationService failed: ${error.message}`
          this.errors.push(errorMsg)
          console.error(errorMsg, error)
        }
      },
  
      async testCreateConversation() {
        try {
          this.errors = []
          console.log('Testing ConversationService.createConversation()...')
          
          const result = await ConversationService.createConversation('Test Conversation')
          this.conversationResult = result
          console.log('✅ Conversation created successfully:', result)
          
        } catch (error) {
          const errorMsg = `❌ Create conversation failed: ${error.message}`
          this.errors.push(errorMsg)
          console.error(errorMsg, error)
        }
      },
  
      async testMessages() {
        try {
          this.errors = []
          console.log('Testing MessageService.getMessages()...')
          
          // Use conversation ID 1 for testing (you can change this)
          const result = await MessageService.getMessages(1)
          this.messageResult = result
          console.log('✅ Messages loaded successfully:', result)
          
        } catch (error) {
          const errorMsg = `❌ MessageService failed: ${error.message}`
          this.errors.push(errorMsg)
          console.error(errorMsg, error)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .test-services {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .test-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .test-section h3 {
    margin-top: 0;
    color: #333;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .result {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 15px;
    margin-top: 10px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .result pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .errors {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    padding: 15px;
  }
  
  .error {
    color: #721c24;
    margin-bottom: 5px;
  }
  </style>