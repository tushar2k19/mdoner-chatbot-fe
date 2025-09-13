<template>
  <div class="chat-component" :class="{ 'new-chat-mode': isNewChat }">
    <!-- Animated Background -->
    <div class="animated-background">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-circle circle-4"></div>
      <div class="bg-gradient gradient-1"></div>
      <div class="bg-gradient gradient-2"></div>
    </div>

    <!-- Chat Messages -->
    <div v-if="messages.length > 0" class="chat-messages" ref="messagesContainer">
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
            <div class="message-text assistant-text" :class="{ 'typing-effect': message.isTyping }">
              <span v-if="message.isTyping" class="typing-text">{{ message.displayText }}</span>
              <div v-else v-html="getMessageText(message.content)" class="markdown-content"></div>
            </div>
            
            <!-- Copy Button for AI Messages -->
            <div v-if="!message.isTyping" class="message-actions">
              <button @click="copyMessage(message)" class="copy-btn" :class="{ 'copied': message.copied }" title="Copy message">
                <svg v-if="!message.copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                {{ message.copied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            
            <!-- Citations -->
            <div v-if="getCitations(message.content).length > 0" class="citations">
              <div class="citations-label">Sources:</div>
              <div class="citation-chips">
                <a 
                    v-for="citation in getCitations(message.content)" 
                    :key="citation.url || citation"
                    :href="getCitationUrl(citation)"
                    @click="handleCitationClick(citation, $event)"
                    :target="getCitationTarget(citation)"
                    rel="noopener noreferrer"
                    class="citation-chip citation-link">
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

    <!-- Greeting -->
    <div v-if="messages.length === 0" class="greeting-text">
      <p>Hello sir, what can I do for you?</p>
    </div>


    <!-- Message Input -->
    <div class="message-input-container">
      <form @submit.prevent="sendMessage" class="message-form">
        <div class="input-wrapper">
          <textarea
            v-model="newMessage"
            @keydown="handleKeyDown"
            @input="handleInput"
            @focus="handleFocus"
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13"/>
              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
            </svg>
          </button>
        </div>
      </form>
    </div>

    <!-- Sample Questions -->
    <div v-if="messages.length === 0" class="sample-questions">
      <div class="question-grid">
        <button @click="askSampleQuestion('What are the environmental impact mitigation measures?')" class="sample-question-btn">
          🌿 What are the environmental impact mitigation measures?
        </button>
        <button @click="askSampleQuestion('Tell me about the Meghalaya Skywalk infrastructure details')" class="sample-question-btn">
          🌉 Tell me about the Meghalaya Skywalk infrastructure details
        </button>
        <button @click="askSampleQuestion('What are the key features of the DPR project?')" class="sample-question-btn">
          📋 What are the key features of the DPR project?
        </button>
        <button @click="askSampleQuestion('How will this project benefit the local community?')" class="sample-question-btn">
          🤝 How will this project benefit the local community?
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'Chat',
  props: {
    // Current conversation data
    currentConversation: {
      type: Object,
      required: false,
      default: null
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
    },
    // Whether this is a new chat (no messages yet)
    isNewChat: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      newMessage: '',
      isLoading: false
    }
  },

  watch: {
    messages: {
      handler(newMessages, oldMessages) {
        // Stop loading when a new assistant message arrives
        if (newMessages.length > oldMessages.length) {
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'assistant') {
            this.isLoading = false;
          }
        }
      },
      deep: true
    }
  },

  methods: {
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      const messageText = this.newMessage;
      this.newMessage = '';

      // Reset textarea height to minimum
      this.resetTextareaHeight();

      // Set loading state
      this.isLoading = true;

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
        // Only send if there's actual content and not just whitespace
        if (this.newMessage.trim()) {
          this.sendMessage();
        }
      }
    },

    handleInput() {
      // Auto-resize textarea based on content
      this.autoResizeTextarea();
    },

    handleFocus() {
      // When user focuses on input, transition from centered to bottom position
      if (this.isNewChat && this.messages.length === 0) {
        this.$emit('chat-started');
      }
    },

    autoResizeTextarea() {
      const textarea = this.$refs.messageInput;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Set height based on content, with max height limit
        const maxHeight = 120; // Maximum height in pixels
        const minHeight = 24; // Minimum height in pixels
        const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
        textarea.style.height = newHeight + 'px';
        
        // Enable scrolling if content exceeds max height
        textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
      }
    },

    resetTextareaHeight() {
      const textarea = this.$refs.messageInput;
      if (textarea) {
        // Reset to minimum height
        textarea.style.height = '24px';
        textarea.style.overflowY = 'hidden';
      }
    },

    askSampleQuestion(question) {
      this.newMessage = question;
      this.sendMessage();
    },

    stopLoading() {
      this.isLoading = false;
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
      let text = '';
      
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          text = parsed.answer || content;
        } catch (e) {
          text = content;
        }
      } else {
        text = content.answer || '';
      }
      
      // Handle nested JSON in the answer field (common issue with OpenAI)
      if (typeof text === 'string' && text.trim().startsWith('{')) {
        try {
          const nestedParsed = JSON.parse(text);
          if (nestedParsed.answer) {
            text = nestedParsed.answer;
            console.log('Extracted nested JSON answer:', text);
          }
        } catch (e) {
          // If parsing fails, use the original text
          console.log('Failed to parse nested JSON, using original text');
        }
      }
      
      // Debug: Log the text to see what we're working with
      console.log('Final text:', text);
      
      
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
      
      // Debug: Log the HTML output
      console.log('Generated HTML:', html);
      
      return html;
    },
    // Add this new method after getMessageText
getPlainText(content) {
  let text = '';
  let isConsentResponse = false;
  
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      if (parsed.needs_consent === true) {
        isConsentResponse = true;
        text = parsed.message || 'Result not found, do you wish to search the internet?';
      } else {
        text = parsed.answer || '';
      }
    } catch (e) {
      text = content;
    }
  } else {
    if (content.needs_consent === true) {
      isConsentResponse = true;
      text = content.message || 'Result not found, do you wish to search the internet?';
    } else {
      text = content.answer || '';
    }
  }
  
  // Return plain text (no HTML conversion)
  return text || '';
},

    getCitations(content) {
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          
          // Handle nested JSON in the answer field
          if (parsed.answer && typeof parsed.answer === 'string' && parsed.answer.trim().startsWith('{')) {
            try {
              const nestedParsed = JSON.parse(parsed.answer);
              if (nestedParsed.citations) {
                return nestedParsed.citations;
              }
            } catch (e) {
              // If nested parsing fails, continue with original logic
            }
          }
          
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

    // Add these new methods after the needsConsent method:

getCitationTitle(citation) {
  // Handle both string citations (from DPR) and object citations (from web search)
  if (typeof citation === 'string') {
    // Check if this is a file ID and convert to document name
    return this.convertFileIdToDocumentName(citation);
  }
  
  // For web search citations, return the title
  return citation.title || 'Web Source';
},

convertFileIdToDocumentName(citation) {
  // Document ID to name mapping (should match backend DocumentMapper)
  const fileIdToNameMap = {
    'file-GsjEvcukShCjxT1Gqx1dri': 'Nagaland Innovation Hub.pdf',
    'file-WzxAXqwuUNpCHFwXLFkrbg': 'Mizoram Development of Helipads.pdf'
  };
  
  // If it's a file ID, return the mapped name
  if (fileIdToNameMap[citation]) {
    return fileIdToNameMap[citation];
  }
  
  // If it's already a document name or other format, return as-is
  return citation;
},

getCitationUrl(citation) {
  // Handle both string citations (from DPR) and object citations (from web search)
  if (typeof citation === 'string') {
    // For DPR citations, return a special URL that triggers popup
    return 'javascript:void(0)';
  }
  
  // For web search citations, return the URL
  return citation.url || '#';
},

handleCitationClick(citation, event) {
  // Only handle DPR citations (strings)
  if (typeof citation === 'string') {
    event.preventDefault(); // Prevent default link behavior
    
    // Show a better-looking popup
    const documentName = this.getCitationTitle(citation);
    this.showDocumentModal(documentName);
  }
  // For web search citations, let the default behavior work (open in new tab)
},

getCitationTarget(citation) {
  // Only open in new tab for web search citations (objects with URLs)
  if (typeof citation === 'object' && citation.url) {
    return '_blank';
  }
  // For DPR citations (strings), don't open in new tab
  return '_self';
},

showDocumentModal(documentName) {
  // Only detect chatbot theme, not browser theme
  const isDarkTheme = document.body.classList.contains('dark-theme') || 
                     document.documentElement.classList.contains('dark-theme');
  
  // Theme-specific colors
  const theme = {
    background: isDarkTheme ? '#2d2d30' : '#ffffff',
    surface: isDarkTheme ? '#3c3c3f' : '#f8f9fa',
    text: isDarkTheme ? '#e5e5e5' : '#2d333a',
    textSecondary: isDarkTheme ? '#d1d5db' : '#565869',
    textMuted: isDarkTheme ? '#8e8ea0' : '#6b7280',
    border: isDarkTheme ? '#4d4d4f' : '#e5e5e5',
    shadow: isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)',
    button: isDarkTheme ? '#10a37f' : '#10a37f',
    buttonHover: isDarkTheme ? '#0d8f68' : '#0d8f68',
    iconBg: isDarkTheme ? '#10a37f' : '#10a37f'
  };
  
  // Rest of the method remains the same...
  const modalHtml = `
    <div id="document-modal" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${theme.shadow};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      backdrop-filter: blur(8px);
      animation: modalFadeIn 0.3s ease-out;
    ">
      <div style="
        background: ${theme.background};
        border: 1px solid ${theme.border};
        border-radius: 16px;
        padding: 32px;
        max-width: 450px;
        width: 90%;
        box-shadow: 
          0 20px 40px ${theme.shadow},
          0 8px 16px ${theme.shadow},
          inset 0 1px 0 ${isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
        text-align: center;
        position: relative;
        overflow: hidden;
        animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        <!-- Background decoration -->
        <div style="
          position: absolute;
          top: -50px;
          right: -50px;
          width: 100px;
          height: 100px;
          background: ${theme.iconBg}20;
          border-radius: 50%;
          z-index: 0;
        "></div>
        <div style="
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 60px;
          height: 60px;
          background: ${theme.iconBg}15;
          border-radius: 50%;
          z-index: 0;
        "></div>
        
        <!-- Icon -->
        <div style="
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, ${theme.iconBg} 0%, ${theme.buttonHover} 100%);
          border-radius: 50%;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          box-shadow: 
            0 8px 24px ${theme.iconBg}40,
            0 4px 8px ${theme.shadow};
        ">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
        </div>
        
        <!-- Content -->
        <div style="position: relative; z-index: 1;">
          <h3 style="
            margin: 0 0 16px 0;
            font-size: 20px;
            font-weight: 700;
            color: ${theme.text};
            line-height: 1.3;
          ">Document Reference</h3>
          
          <div style="
            background: ${theme.surface};
            border: 1px solid ${theme.border};
            border-radius: 12px;
            padding: 16px;
            margin: 0 0 20px 0;
            position: relative;
          ">
            <div style="
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 8px;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${theme.iconBg}" stroke-width="2">
                <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Z"/>
                <polyline points="14,2 14,8 20,8"/>
              </svg>
              <span style="
                font-size: 12px;
                font-weight: 600;
                color: ${theme.iconBg};
                text-transform: uppercase;
                letter-spacing: 0.5px;
              ">DPR Document</span>
            </div>
            <p style="
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: ${theme.text};
              line-height: 1.4;
              word-break: break-word;
            ">${documentName}</p>
          </div>
          
          <p style="
            margin: 0 0 24px 0;
            font-size: 14px;
            color: ${theme.textSecondary};
            line-height: 1.5;
          ">This is a DPR (Detailed Project Report) document. The full PDF is not available for viewing in this prototype version.</p>
          
          <!-- Action Button -->
          <button onclick="document.getElementById('document-modal').remove()" style="
            background: linear-gradient(135deg, ${theme.button} 0%, ${theme.buttonHover} 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 
              0 4px 12px ${theme.iconBg}30,
              0 2px 4px ${theme.shadow};
            position: relative;
            overflow: hidden;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px ${theme.iconBg}40, 0 4px 8px ${theme.shadow}'" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px ${theme.iconBg}30, 0 2px 4px ${theme.shadow}'">
            <span style="position: relative; z-index: 1;">Got it</span>
            <div style="
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: left 0.5s;
            "></div>
          </button>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes modalSlideIn {
        from { 
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    </style>
  `;
  
  // Add modal to page
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Close modal when clicking outside
  document.getElementById('document-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.animation = 'modalFadeOut 0.2s ease-in forwards';
      setTimeout(() => this.remove(), 200);
    }
  });
  
  // Add fade out animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
},
    // Typing effect for AI responses
    async simulateTyping(message, fullText) {
      message.isTyping = true;
      message.displayText = '';
      
      for (let i = 0; i <= fullText.length; i++) {
        message.displayText = fullText.substring(0, i);
        await new Promise(resolve => setTimeout(resolve, 0.01)); //   ms delay between characters
      }
      
      message.isTyping = false;
      message.displayText = fullText;
    },

    // Copy message with user name appended
    async copyMessage(message) {
      try {
        const messageText = this.getPlainText(message.content);  // ✅ FIXED HERE
        const userName = this.user.email ? this.user.email.split('@')[0] : 'User';
        const textToCopy = `${messageText}\n\n- ${userName}`;
        
        await navigator.clipboard.writeText(textToCopy);
        
        // Set copied state
        this.$set(message, 'copied', true);
        
        // Revert back to "Copy" after 2 seconds
        setTimeout(() => {
          this.$set(message, 'copied', false);
        }, 2000);
        
        // Show success feedback
        this.$toast.success('Message copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy message:', error);
        this.$toast.error('Failed to copy message');
      }
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
  position: relative;
}

/* New Chat Mode */
.chat-component.new-chat-mode {
  position: relative;
}

/* Animated Background */
.animated-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(97, 97, 97, 0.15) 0%, rgba(97, 97, 97, 0.08) 100%);
  animation: float 20s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 30%;
  animation-delay: -10s;
}

.circle-4 {
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 20%;
  animation-delay: -15s;
}

.bg-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  animation: gradientShift 15s ease-in-out infinite;
}

.gradient-1 {
  background: radial-gradient(circle at 20% 80%, rgba(97, 97, 97, 0.15) 0%, transparent 50%);
  animation-delay: 0s;
}

.gradient-2 {
  background: radial-gradient(circle at 80% 20%, rgba(97, 97, 97, 0.12) 0%, transparent 50%);
  animation-delay: -7.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px) scale(1);
  }
  25% {
    transform: translateY(-20px) translateX(10px) scale(1.05);
  }
  50% {
    transform: translateY(-10px) translateX(-15px) scale(0.95);
  }
  75% {
    transform: translateY(-30px) translateX(5px) scale(1.02);
  }
}

@keyframes gradientShift {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}


/* Welcome Content */
.welcome-content {
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.welcome-content h2 {
  font-size: 40px;
  font-weight: 700;
  color: #2d333a;
  margin-bottom: 20px;
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

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.message-wrapper {
  margin-bottom: 32px;
  opacity: 0;
  animation: messageSlideIn 0.6s ease-out forwards;
}

.assistant-message .message-wrapper {
  animation: assistantMessageSlideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

@keyframes assistantMessageSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.message {
  display: flex;
  gap: 12px;
  max-width: 800px;
  width: fit-content;
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
  background: #616161;
  color: white;
}

.assistant-avatar {
  background: linear-gradient(135deg, #10a37f 0%, #0d8f68 100%);
  border: 2px solid #ffffff;
  color: #ffffff;
  box-shadow: 
    0 4px 12px rgba(16, 163, 127, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.assistant-avatar:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(16, 163, 127, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.message-content {
  flex: 1;
  min-width: 0;
  width: fit-content;
}

.message-text {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.5;
  color: #2d333a;
  margin-bottom: 8px;
  width: fit-content;
  max-width: 100%;
}

.user-message .message-text {
  background: #616161;
  border-color: #616161;
  color: white;
}

.assistant-message .message-text {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid #e5e7eb;
  color: #2d333a;
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 16px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.assistant-message .message-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 16px;
  pointer-events: none;
  z-index: 1;
}

.assistant-message .message-text:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(16, 163, 127, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Message Actions */
.message-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  position: relative;
  z-index: 2;
}

.assistant-message:hover .message-actions {
  opacity: 1;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: #e5e7eb;
  color: #374151;
  border-color: #d1d5db;
}

.copy-btn.copied {
  background: #10a37f;
  color: white;
  border-color: #10a37f;
}

.copy-btn.copied:hover {
  background: #0d8f68;
  border-color: #0d8f68;
}

.copy-btn svg {
  flex-shrink: 0;
}

/* Typing Effect */
.typing-effect {
  position: relative;
}

.typing-text::after {
  content: '|';
  animation: blink 1s infinite;
  color: #10a37f;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.message-time {
  font-size: 12px;
  color: #8e8ea0;
  margin-left: 16px;
  position: relative;
  z-index: 2;
}

.user-message .message-time {
  text-align: right;
  margin-left: 0;
  margin-right: 16px;
}

/* Citations */
.citations {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
  position: relative;
  z-index: 2;
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
  margin-top: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border: 1px solid #fbbf24;
  border-radius: 12px;
  position: relative;
  z-index: 2;
  box-shadow: 
    0 4px 12px rgba(251, 191, 36, 0.15),
    0 1px 3px rgba(251, 191, 36, 0.1);
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
  background: linear-gradient(135deg, #10a37f 0%, #0d8f68 100%);
  border: 2px solid #ffffff;
  color: #ffffff;
  box-shadow: 
    0 4px 12px rgba(16, 163, 127, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
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

/* Greeting Text */
.greeting-text {
  text-align: center;
  margin: 40px auto 20px auto;
  max-width: 600px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.greeting-text p {
  font-size: 24px;
  font-weight: 600;
  color: #2d333a;
  margin: 0;
}

/* Sample Questions */
.sample-questions {
  position: absolute;
  left: 50%;
  bottom: 120px;
  transform: translateX(-50%);
  max-width: 600px;
  width: 100%;
  animation: fadeInUp 0.8s ease-out;
  z-index: 2;
  padding: 0 20px;
  box-sizing: border-box;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.question-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  margin-bottom: 0;
}

.sample-question-btn {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
  line-height: 1.4;
  color: #2d333a;
  font-weight: 500;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.sample-question-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 163, 127, 0.1), transparent);
  transition: left 0.5s;
}

.sample-question-btn:hover::before {
  left: 100%;
}

.sample-question-btn:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-color: #616161;
  transform: translateY(-3px) scale(1.03);
  box-shadow: 
    0 6px 20px rgba(97, 97, 97, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.1);
  color: #1f2937;
}

/* Message Input */
.message-input-container {
  padding: 20px;
  background: transparent;
  border: none;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  bottom: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}


.message-form {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  border-radius: 28px;
  padding: 18px 24px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: 100%;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.input-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 28px;
  pointer-events: none;
  z-index: 1;
}

.input-wrapper:hover {
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-1px);
}

.input-wrapper:focus-within {
  box-shadow: 
    0 8px 30px rgba(97, 97, 97, 0.15),
    0 0 0 4px rgba(97, 97, 97, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  max-height: 200px;
  min-height: 24px;
  background: transparent;
  color: #374151;
  padding: 0;
  font-weight: 400;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  transition: all 0.2s ease;
}

.message-input:focus {
  color: #1f2937;
  font-weight: 500;
}

/* Custom scrollbar for message input */
.message-input::-webkit-scrollbar {
  width: 4px;
}

.message-input::-webkit-scrollbar-track {
  background: transparent;
}

.message-input::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 2px;
}

.message-input::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.message-input::placeholder {
  color: #9ca3af;
  font-size: 16px;
}

.send-button {
  background: linear-gradient(135deg, #616161 0%, #4a4a4a 100%);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  min-width: 44px;
  height: 44px;
  box-shadow: 
    0 4px 12px rgba(97, 97, 97, 0.3),
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.send-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.send-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 6px 20px rgba(97, 97, 97, 0.4),
    0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.send-button:disabled {
  background: linear-gradient(135deg, #d1d5db 0%, #c4c4c4 100%);
  cursor: not-allowed;
  opacity: 0.6;
  transform: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.send-button:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

.send-button:not(:disabled):not(:hover) {
  animation: pulse 2s ease-in-out infinite;
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { 
    box-shadow: 
      0 4px 12px rgba(97, 97, 97, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  50% { 
    box-shadow: 
      0 6px 20px rgba(97, 97, 97, 0.4),
      0 4px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
}

@keyframes glow {
  0%, 100% { 
    box-shadow: 
      0 8px 30px rgba(97, 97, 97, 0.15),
      0 0 0 4px rgba(97, 97, 97, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }
  50% { 
    box-shadow: 
      0 8px 30px rgba(97, 97, 97, 0.25),
      0 0 0 6px rgba(97, 97, 97, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
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

/* Dark Theme Styles */
.dark-theme .chat-component {
  background: #2d2d30;
}

.dark-theme .chat-messages {
  background: transparent;
}

.dark-theme .message-text {
  background: #2d2d30;
  border: 1px solid #4d4d4f;
  color: white;
}

.dark-theme .assistant-message .message-text {
  background: linear-gradient(135deg, #2d2d30 0%, #252526 100%);
  border: 1px solid #4d4d4f;
  color: #e5e5e5;
  padding: 20px 24px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 16px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-theme .assistant-message .message-text::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
}

.dark-theme .assistant-message .message-text:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(16, 163, 127, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dark-theme .copy-btn {
  background: #374151;
  border: 1px solid #4b5563;
  color: #d1d5db;
}

.dark-theme .copy-btn:hover {
  background: #4b5563;
  color: white;
  border-color: #6b7280;
}

.dark-theme .copy-btn.copied {
  background: #10a37f;
  color: white;
  border-color: #10a37f;
}

.dark-theme .copy-btn.copied:hover {
  background: #0d8f68;
  border-color: #0d8f68;
}

.dark-theme .user-message .message-text {
  background: #616161;
  border-color: #616161;
  color: white;
}

.dark-theme .message-time {
  color: #8e8ea0;
}

.dark-theme .citations {
  border-top: 1px solid #4d4d4f;
}

.dark-theme .citations-label {
  color: #d1d5db;
}

.dark-theme .citation-chip {
  background: #4d4d4f;
  color: white;
}

.dark-theme .consent-request {
  background: linear-gradient(135deg, #2d2d30 0%, #252526 100%);
  border: 1px solid #4d4d4f;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
}

.dark-theme .consent-message {
  color: #d1d5db;
}

.dark-theme .deny-btn {
  background: #2d2d30;
  border: 1px solid #4d4d4f;
  color: #d1d5db;
}

.dark-theme .deny-btn:hover {
  background: #343541;
}

.dark-theme .message-input-container {
  background: transparent;
  border: none;
}

.dark-theme .input-wrapper {
  background: linear-gradient(135deg, #2d2d30 0%, #252526 100%);
  border: none;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.dark-theme .input-wrapper::before {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
}

.dark-theme .input-wrapper:hover {
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.dark-theme .input-wrapper:focus-within {
  box-shadow: 
    0 8px 30px rgba(97, 97, 97, 0.2),
    0 0 0 4px rgba(97, 97, 97, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, #2d2d30 0%, #2a2a2b 100%);
}

.dark-theme .message-input {
  color: #d1d5db;
}

.dark-theme .message-input:focus {
  color: #ffffff;
  font-weight: 500;
}

.dark-theme .message-input::placeholder {
  color: #6b7280;
}

.dark-theme .input-wrapper:focus-within {
  border-color: #10a37f;
  box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.1);
}

.dark-theme .message-input {
  background: transparent;
  color: #e5e7eb;
}

/* Dark Theme Animated Background */
.dark-theme .bg-circle {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
}

.dark-theme .gradient-1 {
  background: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.12) 0%, transparent 50%);
}

.dark-theme .gradient-2 {
  background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.10) 0%, transparent 50%);
}


.dark-theme .message-input::placeholder {
  color: #9ca3af;
}

/* Dark theme scrollbar for message input */
.dark-theme .message-input::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark-theme .message-input::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Markdown Content Styles */
.markdown-content {
  line-height: 1.6;
  position: relative;
  z-index: 2;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin: 16px 0 8px 0;
  font-weight: 600;
  color: #2d333a;
}

.markdown-content h1 { font-size: 24px; }
.markdown-content h2 { font-size: 20px; }
.markdown-content h3 { font-size: 18px; }
.markdown-content h4 { font-size: 16px; }

.markdown-content p {
  margin: 8px 0;
  line-height: 1.6;
}

.markdown-content ul,
.markdown-content ol {
  margin: 8px 0;
  padding-left: 24px;
}

.markdown-content li {
  margin: 4px 0;
}

.markdown-content table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 16px 0 !important;
  font-size: 14px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  border: 1px solid #e5e5e5 !important;
  background: #fff !important;
}

.markdown-content th,
.markdown-content td {
  padding: 16px 20px !important;
  text-align: left !important;
  border-bottom: 1px solid #e5e5e5 !important;
  border-right: 1px solid #e5e5e5 !important;
  vertical-align: top !important;
  background: #fff !important;
}

.markdown-content th:last-child,
.markdown-content td:last-child {
  border-right: none !important;
}

.markdown-content th {
  background: #f8f9fa !important;
  font-weight: 600 !important;
  color: #2d333a !important;
  border-bottom: 2px solid #d1d5db !important;
  font-size: 14px !important;
}

.markdown-content td {
  font-size: 14px !important;
  line-height: 1.5 !important;
  color: #2d333a !important;
}

/* Dark theme table styles */
.dark-theme .markdown-content table {
  background: #2d2d30 !important;
  border-color: #4d4d4f !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
}

.dark-theme .markdown-content th,
.dark-theme .markdown-content td {
  border-color: #4d4d4f !important;
  color: #e5e5e5 !important;
  background: #2d2d30 !important;
}

.dark-theme .markdown-content th {
  background: #3c3c3f !important;
  color: #ffffff !important;
  border-bottom-color: #6b7280 !important;
}

.dark-theme .markdown-content tr:hover {
  background: #3c3c3f !important;
}

.markdown-content tr:hover {
  background: #f8f9fa !important;
}

/* More specific selectors to override any conflicting styles */
.chat-component .message-content .markdown-content table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 16px 0 !important;
  font-size: 14px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  border: 1px solid #e5e5e5 !important;
  background: #fff !important;
}

.chat-component .message-content .markdown-content th,
.chat-component .message-content .markdown-content td {
  padding: 16px 20px !important;
  text-align: left !important;
  border-bottom: 1px solid #e5e5e5 !important;
  border-right: 1px solid #e5e5e5 !important;
  vertical-align: top !important;
  background: #fff !important;
  color: #2d333a !important;
}

.chat-component .message-content .markdown-content th:last-child,
.chat-component .message-content .markdown-content td:last-child {
  border-right: none !important;
}

.chat-component .message-content .markdown-content th {
  background: #f8f9fa !important;
  font-weight: 600 !important;
  color: #2d333a !important;
  border-bottom: 2px solid #d1d5db !important;
  font-size: 14px !important;
}

/* Custom markdown table class */
.markdown-table {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 16px 0 !important;
  font-size: 14px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  border: 1px solid #e5e5e5 !important;
  background: #fff !important;
}

.markdown-table th,
.markdown-table td {
  padding: 16px 20px !important;
  text-align: left !important;
  border-bottom: 1px solid #e5e5e5 !important;
  border-right: 1px solid #e5e5e5 !important;
  vertical-align: top !important;
  background: #fff !important;
  color: #2d333a !important;
}

.markdown-table th:last-child,
.markdown-table td:last-child {
  border-right: none !important;
}

.markdown-table th {
  background: #f8f9fa !important;
  font-weight: 600 !important;
  color: #2d333a !important;
  border-bottom: 2px solid #d1d5db !important;
  font-size: 14px !important;
}

.markdown-table tr:hover {
  background: #f8f9fa !important;
}

.markdown-content tr:last-child td {
  border-bottom: none;
}

.markdown-content strong {
  font-weight: 600;
  color: #2d333a;
}

.markdown-content em {
  font-style: italic;
  color: #565869;
}

.markdown-content code {
  background: #f1f3f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  color: #d73a49;
}

.markdown-content pre {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
  border: 1px solid #e5e5e5;
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: #2d333a;
}

.markdown-content blockquote {
  border-left: 4px solid #10a37f;
  padding-left: 16px;
  margin: 16px 0;
  color: #565869;
  font-style: italic;
}

.markdown-content hr {
  border: none;
  height: 1px;
  background: #e5e5e5;
  margin: 24px 0;
}

/* Dark theme markdown styles */
.dark-theme .markdown-content h1,
.dark-theme .markdown-content h2,
.dark-theme .markdown-content h3,
.dark-theme .markdown-content h4,
.dark-theme .markdown-content h5,
.dark-theme .markdown-content h6 {
  color: #ffffff;
}

.dark-theme .markdown-content th {
  background: #2d2d30;
  color: #ffffff;
  border-bottom: 2px solid #4d4d4f;
}

.dark-theme .markdown-content th,
.dark-theme .markdown-content td {
  border-bottom: 1px solid #4d4d4f;
}

.dark-theme .markdown-content tr:hover {
  background: #2d2d30;
}

.dark-theme .markdown-content strong {
  color: #ffffff;
}

.dark-theme .markdown-content em {
  color: #d1d5db;
}

.dark-theme .markdown-content code {
  background: #374151;
  color: #fbbf24;
}

.dark-theme .markdown-content pre {
  background: #1f2937;
  border: 1px solid #4d4d4f;
}

.dark-theme .markdown-content pre code {
  color: #ffffff;
}

.dark-theme .markdown-content blockquote {
  border-left: 4px solid #10a37f;
  color: #d1d5db;
}

.dark-theme .markdown-content hr {
  background: #4d4d4f;
}

.dark-theme .assistant-avatar {
  background: linear-gradient(135deg, #10a37f 0%, #0d8f68 100%);
  border: 2px solid #2d2d30;
  color: #ffffff;
  box-shadow: 
    0 4px 12px rgba(16, 163, 127, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-theme .assistant-avatar:hover {
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(16, 163, 127, 0.5),
    0 4px 8px rgba(0, 0, 0, 0.4);
}

.dark-theme .loading-message .message-avatar {
  background: linear-gradient(135deg, #10a37f 0%, #0d8f68 100%);
  border: 2px solid #2d2d30;
  color: #ffffff;
  box-shadow: 
    0 4px 12px rgba(16, 163, 127, 0.4),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

.dark-theme .processing-info {
  background: #1f2937;
  border: 1px solid #0ea5e9;
}

.dark-theme .processing-info p {
  color: #93c5fd;
}

.dark-theme .processing-note {
  color: #60a5fa;
}

/* Dark Theme - New Chat Welcome */
.dark-theme .welcome-content h2 {
  color: white;
}

.dark-theme .welcome-subtitle {
  color: #d1d5db;
}

.dark-theme .greeting-text p {
  color: white;
}

.dark-theme .sample-question-btn {
  background: linear-gradient(135deg, #2d2d30 0%, #252526 100%);
  border: 1px solid #4d4d4f;
  color: #d1d5db;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.2);
}

.dark-theme .sample-question-btn::before {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.dark-theme .sample-question-btn:hover {
  background: linear-gradient(135deg, #3a3a3f 0%, #2d2d30 100%);
  border-color: #616161;
  color: #ffffff;
  box-shadow: 
    0 6px 20px rgba(97, 97, 97, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .message {
    max-width: 100%;
  }
  
  .assistant-message .message-text {
    padding: 16px 20px;
    font-size: 15px;
    border-radius: 12px;
  }
  
  .message-avatar {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .question-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 8px;
  }
  
  .sample-questions {
    left: 50%;
    bottom: 100px;
    max-width: 90%;
    transform: translateX(-50%);
  }
  
  .sample-questions h3 {
    font-size: 20px;
  }
  
  .sample-question-btn {
    padding: 6px 10px;
    font-size: 11px;
  }
  
  .citations {
    margin-top: 12px;
    padding-top: 12px;
  }
  
  .consent-request {
    margin-top: 12px;
    padding: 16px;
  }
}
</style>
