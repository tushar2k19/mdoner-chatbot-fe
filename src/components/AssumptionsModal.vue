<template>
  <div>
    <!-- Help Button -->
    <button 
      @click="showModal = true" 
      class="help-button"
      :class="{ 'dark-theme': isDarkTheme }"
      title="View assumptions and limitations"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </button>

    <!-- Modal Overlay -->
    <div 
      v-if="showModal" 
      class="modal-overlay"
      @click="closeModal"
      :class="{ 'dark-theme': isDarkTheme }"
    >
      <div 
        class="modal-container"
        @click.stop
        :class="{ 'dark-theme': isDarkTheme }"
      >
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="header-content">
            <div class="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="header-text">
              <h2>System Assumptions & Limitations</h2>
              <p>Understanding what this prototype can and cannot do</p>
            </div>
          </div>
          <button @click="closeModal" class="close-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="modal-content">
          <!-- System Overview -->
          <div class="section overview-section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <h3>What This System Does</h3>
            </div>
            <div class="section-content">
              <p>This chatbot answers questions from <strong>4 DPR (Detailed Project Report) documents</strong> using AI technology. When it can't find information in the documents, it can search the internet with your permission.</p>
            </div>
          </div>

          <!-- Key Assumptions -->
          <div class="section assumptions-section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 11l3 3l8-8"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
                </svg>
              </div>
              <h3>Key Assumptions & Expectations</h3>
            </div>
            
            <div class="assumptions-grid">
              <!-- Document Scope -->
              <div class="assumption-card">
                <div class="card-header">
                  <div class="card-icon document-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </div>
                  <h4>Document Scope</h4>
                </div>
                <div class="card-content">
                  <div class="assumption-item">
                    <span class="assumption-label">Available Documents:</span>
                    <span class="assumption-value">4 DPR documents</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Document Types:</span>
                    <span class="assumption-value">Text-based PDFs</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">File Size Limit:</span>
                    <span class="assumption-value">Under 20MB each</span>
                  </div>
                </div>
              </div>

              <!-- Query Quality -->
              <div class="assumption-card">
                <div class="card-header">
                  <div class="card-icon query-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <h4>Query Quality</h4>
                </div>
                <div class="card-content">
                  <div class="assumption-item">
                    <span class="assumption-label">Language:</span>
                    <span class="assumption-value">English only</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Query Type:</span>
                    <span class="assumption-value">Specific & detailed</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Response Length:</span>
                    <span class="assumption-value">300-400 words</span>
                  </div>
                </div>
              </div>

              <!-- Performance -->
              <div class="assumption-card">
                <div class="card-header">
                  <div class="card-icon performance-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                    </svg>
                  </div>
                  <h4>Performance</h4>
                </div>
                <div class="card-content">
                  <div class="assumption-item">
                    <span class="assumption-label">Response Time:</span>
                    <span class="assumption-value">5-15 seconds</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Usage Pattern:</span>
                    <span class="assumption-value">Single questions</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Context Limit:</span>
                    <span class="assumption-value">Recent messages</span>
                  </div>
                </div>
              </div>

              <!-- Search Behavior -->
              <div class="assumption-card">
                <div class="card-header">
                  <div class="card-icon search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                  <h4>Search Behavior</h4>
                </div>
                <div class="card-content">
                  <div class="assumption-item">
                    <span class="assumption-label">Internet Search:</span>
                    <span class="assumption-value">With permission</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Search Limit:</span>
                    <span class="assumption-value">750 words</span>
                  </div>
                  <div class="assumption-item">
                    <span class="assumption-label">Citation Level:</span>
                    <span class="assumption-value">Document names only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Usage -->
          <div class="section usage-section">
            <div class="section-header">
              <div class="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3>Recommended Usage Approach</h3>
            </div>
            <div class="usage-tips">
              <div class="tip-item">
                <div class="tip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3l8-8"/>
                  </svg>
                </div>
                <span>Ask specific, detailed questions for best results</span>
              </div>
              <div class="tip-item">
                <div class="tip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                </div>
                <span>Be patient - allow 5-15 seconds for responses</span>
              </div>
              <div class="tip-item">
                <div class="tip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <span>Use conversation context for follow-up questions</span>
              </div>
              <div class="tip-item">
                <div class="tip-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <span>Understand document scope - 4 documents available</span>
              </div>
              <div class="tip-item">
                <div class="tip-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </div>
                <span>Be prepared to consent to internet search when needed</span>
              </div>
            </div>
          </div>

          <!-- System Info -->
          <div class="section system-info-section">
            <div class="system-info">
              <div class="info-item">
                <span class="info-label">System Version:</span>
                <span class="info-value">Prototype v1.0</span>
              </div>
              <div class="info-item">
                <span class="info-label">Available Documents:</span>
                <span class="info-value">4 DPR PDFs</span>
              </div>
              <div class="info-item">
                <span class="info-label">Response Format:</span>
                <span class="info-value">Structured markdown with citations</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button @click="closeModal" class="close-modal-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3l8-8"/>
            </svg>
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssumptionsModal',
  props: {
    isDarkTheme: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal() {
      this.showModal = false
    }
  },
  mounted() {
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.showModal) {
        this.closeModal()
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeModal)
  }
}
</script>

<style scoped>
/* Help Button */
.help-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.help-button::before {
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

.help-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.help-button:hover::before {
  opacity: 1;
}

.help-button svg {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.help-button:hover svg {
  transform: scale(1.1);
}

/* Dark theme help button */
.help-button.dark-theme {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
}

.help-button.dark-theme::before {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
}

.help-button.dark-theme:hover {
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  padding: 20px;
}

.modal-overlay.dark-theme {
  background: rgba(0, 0, 0, 0.8);
}

/* Modal Container */
.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.modal-container.dark-theme {
  background: #1a1a1a;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.modal-container.dark-theme .modal-header {
  border-bottom-color: #374151;
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-container.dark-theme .header-icon {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.header-text h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
}

.modal-container.dark-theme .header-text h2 {
  color: #f9fafb;
}

.header-text p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.modal-container.dark-theme .header-text p {
  color: #9ca3af;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #f3f4f6;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-container.dark-theme .close-button {
  background: #374151;
  color: #9ca3af;
}

.close-button:hover {
  background: #e5e7eb;
  color: #374151;
  transform: scale(1.05);
}

.modal-container.dark-theme .close-button:hover {
  background: #4b5563;
  color: #f3f4f6;
}

/* Modal Content */
.modal-content {
  padding: 32px;
  max-height: calc(90vh - 200px);
  overflow-y: auto;
}

/* Sections */
.section {
  margin-bottom: 32px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-container.dark-theme .section-icon {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
}

.section-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.modal-container.dark-theme .section-header h3 {
  color: #f9fafb;
}

.section-content p {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
}

.modal-container.dark-theme .section-content p {
  color: #d1d5db;
}

/* Assumptions Grid */
.assumptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.assumption-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.modal-container.dark-theme .assumption-card {
  background: #1f2937;
  border-color: #374151;
}

.assumption-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.modal-container.dark-theme .assumption-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: white;
}

.document-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.query-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.performance-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.search-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.card-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.modal-container.dark-theme .card-header h4 {
  color: #f9fafb;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.assumption-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.modal-container.dark-theme .assumption-item {
  border-bottom-color: #374151;
}

.assumption-item:last-child {
  border-bottom: none;
}

.assumption-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.modal-container.dark-theme .assumption-label {
  color: #9ca3af;
}

.assumption-value {
  font-size: 14px;
  color: #111827;
  font-weight: 600;
  text-align: right;
}

.modal-container.dark-theme .assumption-value {
  color: #f9fafb;
}

/* Usage Tips */
.usage-tips {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.modal-container.dark-theme .tip-item {
  background: #1e3a8a;
  border-color: #3b82f6;
}

.tip-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.modal-container.dark-theme .tip-item:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.tip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #3b82f6;
  color: white;
  flex-shrink: 0;
}

.tip-item span {
  font-size: 14px;
  color: #1e40af;
  font-weight: 500;
}

.modal-container.dark-theme .tip-item span {
  color: #93c5fd;
}

/* System Info */
.system-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.modal-container.dark-theme .system-info {
  background: #1f2937;
  border-color: #374151;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-container.dark-theme .info-label {
  color: #9ca3af;
}

.info-value {
  font-size: 14px;
  color: #111827;
  font-weight: 600;
}

.modal-container.dark-theme .info-value {
  color: #f9fafb;
}

/* Modal Footer */
.modal-footer {
  padding: 24px 32px;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  display: flex;
  justify-content: center;
}

.modal-container.dark-theme .modal-footer {
  border-top-color: #374151;
  background: #111827;
}

.close-modal-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.modal-container.dark-theme .close-modal-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.close-modal-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.modal-container.dark-theme .close-modal-btn:hover {
  box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-container {
    margin: 10px;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 20px;
  }
  
  .assumptions-grid {
    grid-template-columns: 1fr;
  }
  
  .header-text h2 {
    font-size: 20px;
  }
  
  .section-header h3 {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-content {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 16px;
  }
  
  .header-content {
    gap: 12px;
  }
  
  .header-icon {
    width: 40px;
    height: 40px;
  }
  
  .header-text h2 {
    font-size: 18px;
  }
}
</style>
