# DPR Chatbot Frontend Development Roadmap

## Project Status Overview

### ✅ **COMPLETED COMPONENTS:**
- **Basic Vue.js 2 Project Setup**: ✅ Done
- **Authentication System**: ✅ Basic JWT login implemented (`Signin.vue`)
- **Router Configuration**: ✅ Basic routing with auth guards
- **Axios Integration**: ✅ HTTP client with interceptors configured
- **Toast Notifications**: ✅ Vue-toastification integrated
- **Backend Health Service**: ✅ Basic service exists

### ❌ **MISSING CRITICAL COMPONENTS:**
- **Chat Interface**: ❌ Not implemented
- **Dashboard/Main App**: ❌ Only skeleton `Home.vue` exists
- **Conversation Management**: ❌ Not implemented
- **Message Components**: ❌ Not implemented
- **Citation Display**: ❌ Not implemented
- **Streaming Support**: ❌ Not implemented
- **Consent Modal**: ❌ Not implemented
- **Sidebar Navigation**: ❌ Not implemented

---

## 🎯 **FRONTEND FUNCTIONS YOU NEED TO IMPLEMENT**

Based on the documentation analysis, here are ALL the functions you need to create:

### **1. Core Services (Priority: CRITICAL)**
```javascript
// src/services/chat.js
- getDocuments() // Fetch available DPR documents
- createConversation(title) // Create new chat conversation
- getConversations(limit, beforeId) // Get user's conversation list
- getMessages(conversationId, limit, beforeId) // Get conversation messages
- sendMessage(conversationId, content, prependWebSummary) // Send user message
- deleteConversation(conversationId) // Delete conversation
- allowWebSearch(conversationId, query) // Handle web search consent

// src/services/streaming.js
- streamMessage(conversationId, content, onChunk, onComplete, onError) // Stream responses
- handleStreamingChunk(chunk) // Process streaming data chunks
- reconnectStream() // Handle connection drops

// src/services/storage.js
- setUser(user) // Store user data
- getUser() // Retrieve user data
- setConversations(conversations) // Store conversations
- getConversations() // Retrieve conversations
- setDocuments(documents) // Store documents list
- getDocuments() // Retrieve documents list
- clearStorage() // Clear all stored data

// src/services/auth.js (enhance existing)
- refreshToken() // Refresh JWT token
- validateToken() // Check token validity
- getCurrentUser() // Get current user info
```

### **2. Vue Components (Priority: HIGH)**
```vue
<!-- src/views/Dashboard.vue -->
- loadInitialData() // Load documents and conversations
- createNewConversation() // Create new chat
- selectConversation(id) // Switch between conversations
- loadMessages(conversationId) // Load conversation messages
- sendMessage(content) // Send message to backend
- handleWebSearchConsent() // Handle consent modal
- toggleSidebar() // Toggle sidebar visibility

<!-- src/components/chat/ChatInterface.vue -->
- sendMessage() // Send user message
- scrollToBottom() // Auto-scroll to latest message
- formatTime(timestamp) // Format message timestamps
- getMessageText(content) // Extract message text from JSON
- getCitations(content) // Extract citations from response
- needsConsent(content) // Check if web search consent needed
- allowWebSearch() // Trigger web search
- denyWebSearch() // Deny web search
- handleKeyDown(event) // Handle Enter key for sending

<!-- src/components/chat/MessageBubble.vue -->
- formatMessage(content) // Format message content
- renderCitations(citations) // Render citation chips
- handleCitationClick(citation) // Handle citation click
- copyMessage() // Copy message to clipboard

<!-- src/components/navigation/Sidebar.vue -->
- selectConversation(id) // Select conversation
- deleteConversation(id) // Delete conversation with confirmation
- loadMoreConversations() // Infinite scroll for conversations
- searchConversations(query) // Search through conversations
- isActive(conversationId) // Check if conversation is active

<!-- src/components/navigation/Header.vue -->
- toggleSidebar() // Toggle sidebar
- handleLogout() // Logout user
- showUserMenu() // Show user dropdown

<!-- src/components/modals/ConsentModal.vue -->
- allowSearch() // Allow web search
- denySearch() // Deny web search
- handleOverlayClick() // Close on overlay click

<!-- src/components/chat/CitationChip.vue -->
- handleClick() // Handle citation click
- openDocument() // Open document viewer (future)

<!-- src/components/chat/StreamingIndicator.vue -->
- showTypingIndicator() // Show typing animation
- hideTypingIndicator() // Hide typing animation

<!-- src/components/common/LoadingSpinner.vue -->
- show() // Show spinner
- hide() // Hide spinner
```

### **3. Utility Functions (Priority: MEDIUM)**
```javascript
// src/utils/helpers.js
- formatTimestamp(timestamp) // Format dates/times
- generateUniqueId() // Generate unique IDs
- debounce(func, delay) // Debounce function calls
- validateEmail(email) // Email validation
- sanitizeInput(input) // Sanitize user inputs
- parseJWT(token) // Parse JWT tokens
- isTokenExpired(token) // Check token expiration
- generateConversationTitle(firstMessage) // Auto-generate titles

// src/utils/messageUtils.js
- parseMessageContent(content) // Parse JSON message content
- extractCitations(message) // Extract citations from messages
- formatMessageForDisplay(content) // Format for UI display
- isConsentMessage(message) // Check if message needs consent
- buildWebSummary(previousMessage) // Build summary for context

// src/utils/streamingUtils.js
- parseStreamChunk(chunk) // Parse streaming data chunks
- reconstructMessage(chunks) // Reconstruct message from chunks
- handleStreamError(error) // Handle streaming errors
```

---

## 📋 **PHASE-BY-PHASE IMPLEMENTATION ROADMAP**

### **PHASE 1: Core Infrastructure (Week 1) - CRITICAL**

#### **Step 1.1: Fix Current Setup Issues**
- [ ] **Fix Router Configuration**
  ```javascript
  // Fix src/router/index.js - missing Home import
  import Home from '../views/Dashboard.vue' // Create this file
  ```

- [ ] **Create Missing Views**
  ```bash
  # Create required view files
  touch src/views/Dashboard.vue
  mkdir -p src/components/{auth,chat,navigation,common,modals}
  ```

- [ ] **Update Package Dependencies**
  ```bash
  # Add missing dependencies for DPR chatbot
  npm install @vue/composition-api vue-virtual-scroller
  ```

#### **Step 1.2: Create Core Services**
- [ ] **Create `src/services/api.js`** (Enhanced axios configuration)
- [ ] **Create `src/services/chat.js`** (All chat-related API calls)
- [ ] **Create `src/services/storage.js`** (localStorage management)
- [ ] **Enhance `src/services/auth.js`** (Complete auth service)

#### **Step 1.3: Create Basic Dashboard Structure**
- [ ] **Create `src/views/Dashboard.vue`** (Main app layout)
- [ ] **Create `src/components/navigation/Header.vue`** (App header)
- [ ] **Create `src/components/navigation/Sidebar.vue`** (Conversation list)

**Testing Phase 1:**
- [ ] Login/logout works correctly
- [ ] Dashboard loads without errors
- [ ] Basic navigation functions
- [ ] API services can connect to backend

---

### **PHASE 2: Chat Interface Core (Week 2) - HIGH PRIORITY**

#### **Step 2.1: Create Chat Components**
- [ ] **Create `src/components/chat/ChatInterface.vue`** (Main chat area)
- [ ] **Create `src/components/chat/MessageBubble.vue`** (Individual messages)
- [ ] **Create `src/components/chat/MessageInput.vue`** (Message input area)
- [ ] **Create `src/components/chat/CitationChip.vue`** (Citation display)

#### **Step 2.2: Implement Basic Chat Flow**
- [ ] **Send/receive messages** (without streaming first)
- [ ] **Display user and assistant messages**
- [ ] **Show loading states**
- [ ] **Handle basic errors**

#### **Step 2.3: Implement Citation System**
- [ ] **Parse citation data from API responses**
- [ ] **Display citation chips under messages**
- [ ] **Handle citation click events**

**Testing Phase 2:**
- [ ] Can send messages and receive responses
- [ ] Messages display correctly (user vs assistant)
- [ ] Citations show up properly
- [ ] Basic error handling works

---

### **PHASE 3: Conversation Management (Week 3) - HIGH PRIORITY**

#### **Step 3.1: Implement Conversation CRUD**
- [ ] **Create new conversations**
- [ ] **List user conversations in sidebar**
- [ ] **Switch between conversations**
- [ ] **Delete conversations**

#### **Step 3.2: Add Message History**
- [ ] **Load conversation messages**
- [ ] **Implement infinite scroll for old messages**
- [ ] **Persist conversation state**

#### **Step 3.3: Add Conversation Features**
- [ ] **Auto-generate conversation titles**
- [ ] **Show last message preview**
- [ ] **Show message count**
- [ ] **Sort conversations by recency**

**Testing Phase 3:**
- [ ] Can create and manage multiple conversations
- [ ] Conversation switching works smoothly
- [ ] Message history loads correctly
- [ ] Sidebar shows proper conversation list

---

### **PHASE 4: Streaming Implementation (Week 4) - CRITICAL**

#### **Step 4.1: Create Streaming Service**
- [ ] **Create `src/services/streaming.js`**
- [ ] **Implement Server-Sent Events (SSE) handling**
- [ ] **Handle streaming message chunks**
- [ ] **Implement error recovery**

#### **Step 4.2: Update Chat Interface for Streaming**
- [ ] **Show typing indicators**
- [ ] **Display streaming text in real-time**
- [ ] **Handle streaming errors gracefully**
- [ ] **Buffer and display chunks properly**

#### **Step 4.3: Optimize Streaming Performance**
- [ ] **Implement proper buffering**
- [ ] **Handle connection drops**
- [ ] **Add reconnection logic**

**Testing Phase 4:**
- [ ] Messages stream in real-time
- [ ] Typing indicators work
- [ ] Connection recovery works
- [ ] Performance is smooth

---

### **PHASE 5: Web Search Consent System (Week 5) - HIGH PRIORITY**

#### **Step 5.1: Create Consent Modal**
- [ ] **Create `src/components/modals/ConsentModal.vue`**
- [ ] **Handle consent approval/denial**
- [ ] **Store consent preferences**

#### **Step 5.2: Implement Consent Logic**
- [ ] **Detect when consent is needed**
- [ ] **Show consent modal automatically**
- [ ] **Handle web search after consent**
- [ ] **Display web search results differently**

#### **Step 5.3: Add Context Continuity**
- [ ] **Implement web summary prepending**
- [ ] **Maintain conversation context**
- [ ] **Handle mixed DPR/web responses**

**Testing Phase 5:**
- [ ] Consent modal appears when needed
- [ ] Web search works after consent
- [ ] Context continuity works
- [ ] Mixed responses display correctly

---

### **PHASE 6: UI/UX Polish & Advanced Features (Week 6)**

#### **Step 6.1: Improve UI/UX**
- [ ] **Add responsive design**
- [ ] **Implement dark/light theme**
- [ ] **Add loading animations**
- [ ] **Improve accessibility**

#### **Step 6.2: Add Advanced Features**
- [ ] **Message search functionality**
- [ ] **Export conversation history**
- [ ] **Keyboard shortcuts**
- [ ] **Message reactions/feedback**

#### **Step 6.3: Performance Optimization**
- [ ] **Implement virtual scrolling for long chats**
- [ ] **Add message caching**
- [ ] **Optimize bundle size**
- [ ] **Add service worker for offline support**

**Testing Phase 6:**
- [ ] Responsive design works on all devices
- [ ] Performance is optimized
- [ ] Advanced features work correctly
- [ ] Accessibility compliance

---

### **PHASE 7: Testing & Deployment (Week 7)**

#### **Step 7.1: Comprehensive Testing**
- [ ] **Unit tests for all components**
- [ ] **Integration tests for services**
- [ ] **E2E tests for critical flows**
- [ ] **Performance testing**

#### **Step 7.2: Error Handling & Monitoring**
- [ ] **Global error handling**
- [ ] **User-friendly error messages**
- [ ] **Logging and monitoring**
- [ ] **Offline handling**

#### **Step 7.3: Deployment Preparation**
- [ ] **Environment configuration**
- [ ] **Build optimization**
- [ ] **CDN setup**
- [ ] **Production deployment**

---

## 🚨 **CRITICAL DEPENDENCIES**

### **Backend APIs Required:**
Before you can complete the frontend, ensure these backend endpoints are working:

1. **Authentication APIs:**
   - `POST /signin` ✅ (Already working)
   - `DELETE /signout` ✅ (Already working)
   - `GET /api/auth/me` ❌ (Needs implementation)

2. **Conversation APIs:**
   - `POST /api/conversations` ❌ (Needs implementation)
   - `GET /api/conversations` ❌ (Needs implementation)
   - `DELETE /api/conversations/:id` ❌ (Needs implementation)

3. **Message APIs:**
   - `GET /api/conversations/:id/messages` ❌ (Needs implementation)
   - `POST /api/conversations/:id/messages` ❌ (Needs streaming)

4. **Document APIs:**
   - `GET /api/documents` ❌ (Needs implementation)

5. **Web Search APIs:**
   - `POST /api/conversations/:id/allow_web_search` ❌ (Needs implementation)

---

## 📊 **CURRENT PROJECT COMPLETION STATUS**

### **Overall Progress: ~15% Complete**

| Component | Status | Progress |
|-----------|--------|----------|
| **Project Setup** | ✅ Complete | 100% |
| **Authentication** | ✅ Complete | 100% |
| **Basic Routing** | ✅ Complete | 100% |
| **Dashboard Structure** | ❌ Missing | 0% |
| **Chat Interface** | ❌ Missing | 0% |
| **Conversation Management** | ❌ Missing | 0% |
| **Citation System** | ❌ Missing | 0% |
| **Streaming Support** | ❌ Missing | 0% |
| **Consent Modal** | ❌ Missing | 0% |
| **UI/UX Polish** | ❌ Missing | 0% |

### **Immediate Next Steps (This Week):**

1. **Create Dashboard.vue** - Main app layout
2. **Create chat services** - API integration
3. **Build basic chat interface** - Message display
4. **Implement conversation list** - Sidebar functionality

### **Files You Need to Create IMMEDIATELY:**

```
src/
├── views/
│   └── Dashboard.vue                    ❌ CRITICAL
├── components/
│   ├── chat/
│   │   ├── ChatInterface.vue           ❌ CRITICAL
│   │   ├── MessageBubble.vue           ❌ CRITICAL
│   │   ├── MessageInput.vue            ❌ CRITICAL
│   │   └── CitationChip.vue            ❌ HIGH
│   ├── navigation/
│   │   ├── Header.vue                  ❌ CRITICAL
│   │   └── Sidebar.vue                 ❌ CRITICAL
│   └── modals/
│       └── ConsentModal.vue            ❌ HIGH
├── services/
│   ├── chat.js                         ❌ CRITICAL
│   ├── streaming.js                    ❌ HIGH
│   └── storage.js                      ❌ CRITICAL
└── utils/
    ├── helpers.js                      ❌ MEDIUM
    └── messageUtils.js                 ❌ MEDIUM
```

---

## 🎯 **SUCCESS CRITERIA**

By the end of this roadmap, your DPR Chatbot frontend should:

1. ✅ **Authenticate users** with JWT tokens
2. ✅ **Display a professional chat interface**
3. ✅ **Send and receive messages** from the backend
4. ✅ **Show document citations** under responses
5. ✅ **Handle streaming responses** in real-time
6. ✅ **Manage multiple conversations** 
7. ✅ **Show consent modal** for web searches
8. ✅ **Work responsively** on all devices
9. ✅ **Handle errors gracefully**
10. ✅ **Provide smooth user experience**

---

## 💡 **DEVELOPMENT TIPS**

1. **Start with Phase 1** - Don't skip the infrastructure
2. **Test each component** as you build it
3. **Use the existing Signin.vue** as a reference for styling
4. **Follow the API documentation** for backend integration
5. **Implement streaming last** - get basic chat working first
6. **Use localStorage** for state persistence as designed
7. **Handle errors gracefully** - users should never see crashes
8. **Make it responsive** - mobile users are important

This roadmap will take you from the current ~15% completion to a fully functional DPR Chatbot frontend. Focus on completing each phase thoroughly before moving to the next one.
