<template>
  <div class="assumptions-container">
    <!-- Question Mark Trigger -->
    <div 
      class="question-mark-trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="togglePopup"
      :class="{ 'active': showPopup }"
      title="View System Assumptions & Limitations"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>

    <!-- Assumptions & Limitations Popup -->
    <transition name="popup-fade">
      <div 
        v-if="showPopup" 
        class="assumptions-popup"
        @mouseenter="handlePopupMouseEnter"
        @mouseleave="handlePopupMouseLeave"
        :class="{ 'dark': isDarkTheme }"
      >
        <!-- Popup Header -->
        <div class="popup-header">
          <div class="header-content">
            <div class="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="header-text">
              <h3>System Assumptions & Limitations</h3>
              <p>Understanding what this prototype can and cannot do</p>
            </div>
          </div>
          <button @click="closePopup" class="close-btn" title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Popup Content -->
        <div class="popup-content">
          <!-- What This System Does -->
          <div class="section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <h4>What This System Does</h4>
            </div>
            <p class="section-description">
              This chatbot answers questions from 2 DPR (Detailed Project Report) documents using AI technology. 
              When it can't find information in the documents, it can search the internet with your permission.
            </p>
          </div>

          <!-- Key Assumptions & Expectations -->
          <div class="section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7v7m0-7h10a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2H9m0-7V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>
                </svg>
              </div>
              <h4>Key Assumptions & Expectations</h4>
            </div>

            <!-- Assumption Items -->
            <div class="assumption-items">
              <div 
                v-for="(assumption, index) in assumptions" 
                :key="index"
                class="assumption-item"
                :class="{ 'expanded': expandedItems.includes(index) }"
              >
                <div 
                  class="assumption-header"
                  @click="toggleExpansion(index)"
                >
                  <div class="assumption-number">{{ index + 1 }}</div>
                  <div class="assumption-title">
                    <h5>{{ assumption.title }}</h5>
                    <p class="assumption-subtitle">{{ assumption.subtitle }}</p>
                  </div>
                  <div class="expand-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                
                <transition name="expand">
                  <div v-if="expandedItems.includes(index)" class="assumption-content">
                    <div class="assumption-details">
                      <div class="detail-item">
                        <span class="detail-label">Assumption:</span>
                        <span class="detail-value">{{ assumption.assumption }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Reasoning:</span>
                        <span class="detail-value">{{ assumption.reasoning }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Expectation:</span>
                        <span class="detail-value">{{ assumption.expectation }}</span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Recommended Usage Approach -->
          <div class="section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                </svg>
              </div>
              <h4>Recommended Usage Approach</h4>
            </div>
            <div class="usage-tips">
              <div 
                v-for="(tip, index) in usageTips" 
                :key="index"
                class="usage-tip"
              >
                <div class="tip-number">{{ index + 1 }}</div>
                <span class="tip-text">{{ tip }}</span>
              </div>
            </div>
          </div>

          <!-- System Version -->
          <div class="system-info">
            <div class="version-info">
              <span class="version-label">System Version:</span>
              <span class="version-value">Prototype v1.0</span>
            </div>
            <div class="contact-info">
              <span class="contact-label">Contact:</span>
              <span class="contact-value">Development Team</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Invisible bridge for better hover experience -->
    <div 
      v-if="showPopup" 
      class="popup-bridge"
      @mouseenter="handlePopupMouseEnter"
      @mouseleave="handlePopupMouseLeave"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'AssumptionsLimitations',
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showPopup: false,
      expandedItems: [],
      hoverTimeout: null,
      hideTimeout: null,
      assumptions: [
        {
          title: "Document Scope Assumptions",
          subtitle: "Limited to 2 specific documents",
          assumption: "Only 2 specific documents are currently available: Nagaland Innovation Hub.pdf and Mizoram Development of Helipads.pdf",
          reasoning: "At prototype level, we focus on core functionality with manageable document set",
          expectation: "Questions should relate to these documents for optimal results"
        },
        {
          title: "Query Quality Assumptions",
          subtitle: "Specific, detailed questions work better",
          assumption: "Users will ask specific, detailed questions rather than vague queries",
          reasoning: "AI systems perform better with clear, context-rich questions",
          expectation: "Questions like 'What is the total project cost for Nagaland Innovation Hub?' work better than 'Tell me about costs'. All queries will be in English (prototype limitation)"
        },
        {
          title: "Response Format Assumptions",
          subtitle: "Comprehensive 300-400 word responses",
          assumption: "Users expect comprehensive 300-400 word responses with detailed explanations",
          reasoning: "DPR documents contain complex information requiring thorough analysis",
          expectation: "Responses will show document sources but not specific page numbers (prototype-level citation system)"
        },
        {
          title: "Document Processing Assumptions",
          subtitle: "Text-based PDFs work better than image-heavy ones",
          assumption: "PDFs with heavy image content may not be fully processed",
          reasoning: "OCR processing for image-heavy PDFs is resource-intensive at prototype level",
          expectation: "Text-based PDFs will provide better results than image-heavy documents. Documents under 20MB are manageable for prototype processing"
        },
        {
          title: "Search Behavior Assumptions",
          subtitle: "Internet search as fallback option",
          assumption: "Users will consent to internet search when document information is insufficient",
          reasoning: "External search provides fallback when DPR content doesn't cover the query",
          expectation: "Internet search results may vary in accuracy and are limited to 750 words. Additional charges for external searches are acceptable for prototype testing"
        },
        {
          title: "System Performance Assumptions",
          subtitle: "5-15 second response times expected",
          assumption: "Users will accept 5-15 second response times for complex queries",
          reasoning: "AI processing and document analysis require time at prototype level",
          expectation: "System may occasionally experience delays during high usage. Long conversations may lose earlier context due to technical constraints"
        },
        {
          title: "User Experience Assumptions",
          subtitle: "Single-question sessions preferred",
          assumption: "Users will work with single-question sessions rather than bulk processing",
          reasoning: "Prototype focuses on core functionality over advanced features",
          expectation: "Users will sign in and use modern web browsers for optimal experience. PDF viewing will be handled externally (not built into prototype)"
        },
        {
          title: "Cost and Resource Assumptions",
          subtitle: "Usage costs scale with complexity",
          assumption: "Usage costs will scale with query complexity and response length",
          reasoning: "AI processing costs increase with document size and response detail",
          expectation: "Single-user or small-group testing scenarios"
        }
      ],
      usageTips: [
        "Ask specific, detailed questions to get the best results",
        "Be patient - allow 5-15 seconds for responses",
        "Use conversation context for follow-up questions",
        "Understand document scope - only 2 documents are currently available",
        "Be prepared to consent to internet search when needed",
        "Expect text-based content to work better than image-heavy documents"
      ]
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      this.showPopup = true;
    },
    
    handleMouseLeave() {
      this.hideTimeout = setTimeout(() => {
        this.showPopup = false;
      }, 150);
    },
    
    handlePopupMouseEnter() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      this.showPopup = true;
    },
    
    handlePopupMouseLeave() {
      this.showPopup = false;
    },
    
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    
    closePopup() {
      this.showPopup = false;
    },
    
    toggleExpansion(index) {
      const expandedIndex = this.expandedItems.indexOf(index);
      if (expandedIndex > -1) {
        this.expandedItems.splice(expandedIndex, 1);
      } else {
        this.expandedItems.push(index);
      }
    }
  },
  
  beforeDestroy() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }
}
</script>

<style scoped>
/* Container */
.assumptions-container {
  position: relative;
  display: inline-block;
}

/* Question Mark Trigger */
.question-mark-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.question-mark-trigger::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.question-mark-trigger:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.question-mark-trigger:hover::before {
  opacity: 1;
}

.question-mark-trigger.active {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.question-mark-trigger svg {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.question-mark-trigger:hover svg {
  transform: rotate(10deg);
}

/* Popup */
.assumptions-popup {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  width: 480px;
  max-width: 90vw;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05);
  z-index: 1000;
  overflow: hidden;
}

.assumptions-popup.dark {
  background: rgba(45, 45, 48, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* Popup Bridge */
.popup-bridge {
  position: absolute;
  top: 100%;
  right: 0;
  width: 100px;
  height: 20px;
  z-index: 999;
}

/* Popup Header */
.popup-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.assumptions-popup.dark .popup-header {
  border-bottom-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.header-text h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  line-height: 1.3;
}

.assumptions-popup.dark .header-text h3 {
  color: #e5e5e5;
}

.header-text p {
  margin: 0;
  font-size: 14px;
  color: #718096;
  line-height: 1.4;
}

.assumptions-popup.dark .header-text p {
  color: #a0aec0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.05);
  color: #718096;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.assumptions-popup.dark .close-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #2d3748;
}

.assumptions-popup.dark .close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #e5e5e5;
}

/* Popup Content */
.popup-content {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0;
}

/* Section */
.section {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.assumptions-popup.dark .section {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.section:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.section-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.3;
}

.assumptions-popup.dark .section-header h4 {
  color: #e5e5e5;
}

.section-description {
  margin: 0;
  font-size: 14px;
  color: #4a5568;
  line-height: 1.6;
}

.assumptions-popup.dark .section-description {
  color: #a0aec0;
}

/* Assumption Items */
.assumption-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.assumption-item {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  overflow: hidden;
}

.assumptions-popup.dark .assumption-item {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.assumption-item:hover {
  border-color: rgba(102, 126, 234, 0.3);
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.assumptions-popup.dark .assumption-item:hover {
  border-color: rgba(102, 126, 234, 0.4);
  background: rgba(102, 126, 234, 0.1);
}

.assumption-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.assumption-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.assumption-title {
  flex: 1;
  min-width: 0;
}

.assumption-title h5 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  line-height: 1.3;
}

.assumptions-popup.dark .assumption-title h5 {
  color: #e5e5e5;
}

.assumption-subtitle {
  margin: 0;
  font-size: 12px;
  color: #718096;
  line-height: 1.4;
}

.assumptions-popup.dark .assumption-subtitle {
  color: #a0aec0;
}

.expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
  color: #718096;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.assumptions-popup.dark .expand-icon {
  background: rgba(255, 255, 255, 0.1);
  color: #a0aec0;
}

.assumption-item.expanded .expand-icon {
  transform: rotate(180deg);
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.assumptions-popup.dark .assumption-item.expanded .expand-icon {
  background: rgba(102, 126, 234, 0.2);
  color: #8b9cf7;
}

/* Assumption Content */
.assumption-content {
  padding: 0 16px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.assumptions-popup.dark .assumption-content {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.assumption-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.assumptions-popup.dark .detail-label {
  color: #8b9cf7;
}

.detail-value {
  font-size: 13px;
  color: #4a5568;
  line-height: 1.5;
}

.assumptions-popup.dark .detail-value {
  color: #a0aec0;
}

/* Usage Tips */
.usage-tips {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.usage-tip {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 3px solid #667eea;
}

.assumptions-popup.dark .usage-tip {
  background: rgba(102, 126, 234, 0.1);
  border-left-color: #8b9cf7;
}

.tip-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.tip-text {
  font-size: 13px;
  color: #4a5568;
  line-height: 1.5;
  flex: 1;
}

.assumptions-popup.dark .tip-text {
  color: #a0aec0;
}

/* System Info */
.system-info {
  padding: 16px 24px 20px;
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assumptions-popup.dark .system-info {
  background: rgba(255, 255, 255, 0.02);
  border-top-color: rgba(255, 255, 255, 0.1);
}

.version-info,
.contact-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.version-label,
.contact-label {
  font-size: 12px;
  color: #718096;
  font-weight: 500;
}

.assumptions-popup.dark .version-label,
.assumptions-popup.dark .contact-label {
  color: #a0aec0;
}

.version-value,
.contact-value {
  font-size: 12px;
  color: #4a5568;
  font-weight: 600;
}

.assumptions-popup.dark .version-value,
.assumptions-popup.dark .contact-value {
  color: #e5e5e5;
}

/* Transitions */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave {
  max-height: 500px;
  opacity: 1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .assumptions-popup {
    width: 320px;
    right: -140px;
  }
  
  .popup-header {
    padding: 16px 20px 12px;
  }
  
  .header-content {
    gap: 10px;
  }
  
  .header-icon {
    width: 36px;
    height: 36px;
  }
  
  .header-text h3 {
    font-size: 16px;
  }
  
  .header-text p {
    font-size: 13px;
  }
  
  .section {
    padding: 16px 20px;
  }
  
  .section-header {
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .section-icon {
    width: 32px;
    height: 32px;
  }
  
  .section-header h4 {
    font-size: 15px;
  }
  
  .assumption-header {
    padding: 12px;
    gap: 10px;
  }
  
  .assumption-number {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
  
  .assumption-title h5 {
    font-size: 13px;
  }
  
  .assumption-subtitle {
    font-size: 11px;
  }
  
  .assumption-content {
    padding: 0 12px 12px;
  }
  
  .assumption-details {
    gap: 10px;
    padding-top: 12px;
  }
  
  .detail-label {
    font-size: 11px;
  }
  
  .detail-value {
    font-size: 12px;
  }
  
  .usage-tip {
    padding: 10px;
    gap: 10px;
  }
  
  .tip-number {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
  
  .tip-text {
    font-size: 12px;
  }
  
  .system-info {
    padding: 12px 20px 16px;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .assumptions-popup {
    width: 280px;
    right: -120px;
  }
  
  .popup-header {
    padding: 12px 16px 8px;
  }
  
  .section {
    padding: 12px 16px;
  }
  
  .assumption-header {
    padding: 10px;
  }
  
  .assumption-content {
    padding: 0 10px 10px;
  }
  
  .usage-tip {
    padding: 8px;
  }
  
  .system-info {
    padding: 10px 16px 12px;
  }
}
</style>
