<template>
  <div class="checklist-page">
    <!-- Header - Consistent with Dashboard -->
    <div class="main-header">
      <button class="back-btn" @click="$router.push('/dashboard')" title="Back to Dashboard">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>
      <h1>DPR Chatbot</h1>
      <div class="header-info">
        <span class="document-count">{{ documents.length }} DPR Documents</span>
        <span class="page-indicator">Checklist Analyzer</span>
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
      </div>
    </div>

    <!-- Show input panels only when not showing results -->
    <div v-if="!showResults" class="content-container">
      <div class="content-grid">
        <!-- Left: document selection (only allow one selection) -->
        <div class="panel document-panel">
          <div class="panel-header">
            <div class="panel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h3>Document Selection</h3>
          </div>
          <p class="instruction">Select ONE document to analyze:</p>
          <div v-if="documents.length === 0" class="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
            <p>No documents found.</p>
          </div>
          <div class="doc-list">
            <label v-for="doc in documents" :key="doc.id || doc.name" class="doc-item" :class="{ 'selected': selectedDocument === doc.name }">
              <input type="radio" :value="doc.name" v-model="selectedDocument" />
              <div class="doc-content">
                <div class="doc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <span class="doc-name">{{ doc.displayName || doc.name }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Right: checklist items -->
        <div class="panel checklist-panel">
          <div class="panel-header">
            <div class="panel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3l8-8"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
              </svg>
            </div>
            <h3>Checklist Items</h3>
          </div>
          <div class="items-container">
            <div v-for="(item, index) in checklistItems" :key="index" class="item-row">
              <div class="item-number">{{ index + 1 }}</div>
              <input
                class="item-input"
                type="text"
                v-model="checklistItems[index]"
                :placeholder="`Checklist item ${index + 1}`"
              />
              <button class="btn-remove" @click="removeItem(index)" title="Remove item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="panel-actions">
            <button class="btn btn-secondary" @click="addItem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Item
            </button>
            <button class="btn btn-primary" :disabled="!canAnalyze || loading" @click="analyze">
              <svg v-if="!loading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <div v-else class="loading-spinner-small"></div>
              {{ loading ? 'Analyzing…' : 'Process Analysis' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading && !showResults" class="loading-container">
      <div class="loading-content">
        <div class="loading-spinner-large"></div>
        <h3>Analyzing Document</h3>
        <p>Processing checklist items against the selected document...</p>
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <p class="loading-note">This may take 30-60 seconds for comprehensive analysis.</p>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="showResults && results && results.length" class="results-container">
      <div class="results-header">
        <div class="results-title">
          <div class="results-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3l8-8"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
            </svg>
          </div>
          <div>
            <h3>Analysis Results</h3>
            <p class="results-subtitle">Document: {{ getDisplayName(selectedDocument) }}</p>
          </div>
        </div>
        <button class="btn btn-secondary" @click="startNewAnalysis">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 4v6h6"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          New Analysis
        </button>
      </div>
      
      <div class="results-summary">
        <div class="summary-card">
          <div class="summary-icon yes">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3l8-8"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-count">{{ getStatusCount('yes') }}</span>
            <span class="summary-label">Found</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon partial">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-count">{{ getStatusCount('partial') }}</span>
            <span class="summary-label">Partial</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon no">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
          <div class="summary-content">
            <span class="summary-count">{{ getStatusCount('no') }}</span>
            <span class="summary-label">Not Found</span>
          </div>
        </div>
      </div>

      <div class="table-container">
        <div class="table-wrapper">
          <table class="result-table">
            <thead>
              <tr>
                <th class="item-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3l8-8"/>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
                  </svg>
                  Checklist Item
                </th>
                <th class="status-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Status
                </th>
                <th class="remarks-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in results" :key="idx" class="result-row" :class="getStatusClass(row.status)">
                <td class="item-cell">
                  <div class="item-content">
                    <div class="item-number">{{ idx + 1 }}</div>
                    <span class="item-text">{{ row.item }}</span>
                  </div>
                </td>
                <td class="status-cell">
                  <div :class="['status-badge', getStatusClass(row.status)]">
                    <div class="status-icon">
                      <svg v-if="getStatusClass(row.status) === 'yes'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3l8-8"/>
                        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9s9 4.03 9 9z"/>
                      </svg>
                      <svg v-else-if="getStatusClass(row.status) === 'partial'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                    </div>
                    <span class="status-text">{{ row.status }}</span>
                  </div>
                </td>
                <td class="remarks-cell">
                  <div class="remarks-content">
                    <p class="remarks-text">{{ row.remarks }}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChecklistAnalyzer',
  data() {
    return {
      documents: [],
      selectedDocument: '', // Single document selection
      checklistItems: [],
      loading: false,
      results: [],
      showResults: false,
      isDarkTheme: false
    }
  },
  computed: {
    canAnalyze() {
      const nonEmpty = this.checklistItems.filter(i => (i || '').trim().length > 0)
      return this.selectedDocument.length > 0 && nonEmpty.length > 0
    }
  },
  async created() {
    // Load theme preference
    const savedTheme = localStorage.getItem('dpr_theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.documentElement.classList.add('dark-theme');
    }

    // Load documents from localStorage (fallback to hardcoded like Dashboard)
    const storedDocs = localStorage.getItem('dpr_documents')
    if (storedDocs) {
      this.documents = JSON.parse(storedDocs)
    } else {
      // Currently using 4 documents with normalized names for backend consistency
      this.documents = [
        // { id: 1, name: 'Meghalaya_Skywalk.pdf', displayName: 'Meghalaya Skywalk.pdf' }, // COMMENTED OUT - not currently used
        // { id: 2, name: 'Tripura_Zoological_Park.pdf', displayName: 'Tripura Zoological Park.pdf' }, // COMMENTED OUT - not currently used
        // { id: 3, name: 'Kohima_Football_Ground.pdf', displayName: 'Kohima Football Ground.pdf' }, // COMMENTED OUT - not currently used
        { id: 4, name: 'Nagaland_Innovation_Hub.pdf', displayName: 'Nagaland Innovation Hub.pdf' },
        { id: 5, name: 'Mizoram_Development_of_Helipads.pdf', displayName: 'Mizoram Development of Helipads.pdf' },
        { id: 6, name: 'Assam_Road_Project.pdf', displayName: 'Assam Road Project.pdf' },
        { id: 7, name: 'Khankawn_Rongura_Road_Project.pdf', displayName: 'Khankawn Rongura Road Project.pdf' }
      ]
    }
    // Default select first document
    if (this.documents.length > 0) {
      this.selectedDocument = this.documents[0].name
    }

    // Fetch default checklist items
    try {
      const res = await this.$http.secured.get('/api/checklist/defaults')
      const apiData = res && res.data && res.data.data ? res.data.data : res.data
      this.checklistItems = (apiData && apiData.checklist_items) ? apiData.checklist_items : this.defaultItems()
    } catch (e) {
      // Fallback defaults
      this.checklistItems = this.defaultItems()
    }
  },
  methods: {
    defaultItems() {
      return [
        'Project rationale and intended beneficiaries',
        'Socio-economic benefits of the project',
        'Alignment with scheme guidelines and focus areas',
        'Output Outcome framework with KPIs for monitoring',
        'SDG or other indices that the KPIs will impact and how',
        'Exact population of the State mentioned in DPR',
        'Total Project Cost for the Project',
        'Convergence plan with other ongoing government interventions',
        'Prioritized list of projects',
        'Alignment with Gati Shakti Master Plan',
        'Satellite imagery/photographs of project sites with location details',
        'Statutory clearances for Forest and Environment aspects',
        'Sustainability plan and environmental considerations',
        'Implementation timelines and project milestones'
      ]
    },
    getDisplayName(documentName) {
      const doc = this.documents.find(d => d.name === documentName)
      return doc ? (doc.displayName || doc.name) : documentName
    },
    startNewAnalysis() {
      this.showResults = false
      this.results = []
    },
    addItem() {
      this.checklistItems.push('')
    },
    removeItem(index) {
      this.checklistItems.splice(index, 1)
    },
    async analyze() {
      if (!this.canAnalyze) return
      this.loading = true
      this.results = []
      this.showResults = false
      
      try {
        const payload = {
          document_names: [this.selectedDocument], // Only send one document
          checklist_items: this.checklistItems.filter(i => (i || '').trim().length > 0)
        }
        const response = await this.$http.secured.post('/api/checklist/analyze', payload, { timeout: 120000 })
        const apiData = response && response.data && response.data.data ? response.data.data : response.data
        this.results = (apiData && apiData.checklist_results) ? apiData.checklist_results : []
        
        // Show results and hide input panels
        this.showResults = true
        this.$toast.success('Checklist analysis completed')
      } catch (error) {
        console.error('Checklist analyze error:', error)
        const msg = (error.response && (error.response.data && (error.response.data.error && (error.response.data.error.message || error.response.data.error)))) || error.message || 'Analysis failed'
        this.$toast.error(msg)
      } finally {
        this.loading = false
      }
    },
    
    getStatusClass(status) {
      if (!status) return 'unknown'
      const normalized = status.toLowerCase().replace(/\s+/g, '-')
      if (normalized.includes('yes') || normalized.includes('found') || normalized.includes('covered')) {
        return 'yes'
      } else if (normalized.includes('no') || normalized.includes('not-found') || normalized.includes('not-covered')) {
        return 'no'
      } else if (normalized.includes('partial')) {
        return 'partial'
      }
      return 'unknown'
    },

    getStatusCount(statusType) {
      if (!this.results || this.results.length === 0) return 0
      return this.results.filter(row => this.getStatusClass(row.status) === statusType).length
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
    }
  }
}
</script>

<style scoped>
/* ===== ROOT STYLES ===== */
.checklist-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f7f7f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  transition: all 0.3s ease;
}

/* ===== HEADER STYLES ===== */
.main-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 60px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid #e5e5e5;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #565869;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #f1f1f1;
  border-color: #d1d5db;
  color: #2d333a;
  transform: translateX(-2px);
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
  gap: 16px;
}

.document-count {
  font-size: 14px;
  color: #565869;
  background: #f1f1f1;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.page-indicator {
  font-size: 14px;
  color: #10a37f;
  background: #f0fdf4;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 600;
  border: 1px solid #dcfce7;
}

/* Theme Toggle */
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

/* ===== CONTENT CONTAINER ===== */
.content-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ===== PANEL STYLES ===== */
.panel {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10a37f, #0d8f68);
  border-radius: 12px 12px 0 0;
}

.panel:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.panel-icon {
  width: 40px;
  height: 40px;
  background: #f0fdf4;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10a37f;
  border: 1px solid #dcfce7;
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d333a;
}

.instruction {
  font-size: 14px;
  color: #565869;
  margin-bottom: 16px;
  line-height: 1.5;
}

/* ===== DOCUMENT SELECTION ===== */
.doc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

.doc-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #f1f1f1;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #fafafa;
}

.doc-item:hover {
  border-color: #e5e5e5;
  background: #f8f9fa;
  transform: translateY(-1px);
}

.doc-item.selected {
  border-color: #10a37f;
  background: #f0fdf4;
  box-shadow: 0 2px 8px rgba(16, 163, 127, 0.15);
}

.doc-item input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.doc-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.doc-icon {
  width: 32px;
  height: 32px;
  background: #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #565869;
  transition: all 0.2s ease;
}

.doc-item.selected .doc-icon {
  background: #10a37f;
  color: white;
}

.doc-name {
  font-size: 14px;
  font-weight: 500;
  color: #2d333a;
  flex: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #8e8ea0;
  text-align: center;
}

.empty-state svg {
  margin-bottom: 12px;
  opacity: 0.5;
}

/* ===== CHECKLIST ITEMS ===== */
.items-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 12px;
  background: #fafafa;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.item-row:hover {
  background: #f8f9fa;
  border-color: #e5e5e5;
}

.item-number {
  width: 24px;
  height: 24px;
  background: #10a37f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.item-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  background: white;
  transition: all 0.2s ease;
}

.item-input:focus {
  outline: none;
  border-color: #10a37f;
  box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.1);
}

.btn-remove {
  width: 32px;
  height: 32px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #fecaca;
  transform: scale(1.05);
}

/* ===== PANEL ACTIONS ===== */
.panel-actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #e5e5e5;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  color: #565869;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background: #f8f9fa;
  border-color: #9ca3af;
}

.btn-primary {
  background: #10a37f;
  color: white;
  border-color: #10a37f;
}

.btn-primary:hover:not(:disabled) {
  background: #0d8f68;
  border-color: #0d8f68;
}

.loading-spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* ===== LOADING STATE ===== */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: white;
  border-radius: 12px;
  margin: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading-content {
  max-width: 400px;
}

.loading-spinner-large {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #10a37f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
}

.loading-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2d333a;
  margin: 0 0 12px 0;
}

.loading-content p {
  font-size: 16px;
  color: #565869;
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.loading-progress {
  width: 100%;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #f1f1f1;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10a37f, #0d8f68);
  border-radius: 3px;
  animation: progress 2s ease-in-out infinite;
}

.loading-note {
  font-size: 14px;
  color: #8e8ea0;
  font-style: italic;
}

/* ===== RESULTS CONTAINER ===== */
.results-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.results-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.results-icon {
  width: 48px;
  height: 48px;
  background: #f0fdf4;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #10a37f;
  border: 1px solid #dcfce7;
}

.results-title h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2d333a;
  margin: 0;
}

.results-subtitle {
  font-size: 14px;
  color: #565869;
  margin: 4px 0 0 0;
}

/* ===== RESULTS SUMMARY ===== */
.results-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.summary-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-icon.yes {
  background: linear-gradient(135deg, #10b981, #059669);
}

.summary-icon.partial {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.summary-icon.no {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-count {
  font-size: 24px;
  font-weight: 700;
  color: #2d333a;
  line-height: 1;
}

.summary-label {
  font-size: 14px;
  color: #565869;
  font-weight: 500;
}

/* ===== TABLE CONTAINER ===== */
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.result-table thead {
  background: #f8f9fa;
}

.result-table th {
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  color: #2d333a;
  border-bottom: 2px solid #e5e5e5;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-table th svg {
  margin-right: 8px;
  opacity: 0.7;
}

.result-table td {
  padding: 20px;
  border-bottom: 1px solid #f1f1f1;
  vertical-align: top;
}

.result-row {
  transition: all 0.2s ease;
}

.result-row:hover {
  background: #f8f9fa;
}

.result-row:last-child td {
  border-bottom: none;
}

/* ===== TABLE CELLS ===== */
.item-cell {
  font-weight: 500;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-number {
  width: 24px;
  height: 24px;
  background: #10a37f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.item-text {
  color: #2d333a;
  font-weight: 500;
}

/* ===== STATUS BADGES ===== */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.status-badge.yes {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
  border: 1px solid #bbf7d0;
}

.status-badge.partial {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  border: 1px solid #fde68a;
}

.status-badge.no {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.status-badge.unknown {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  color: #475569;
  border: 1px solid #e2e8f0;
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-text {
  font-weight: 600;
}

/* ===== REMARKS ===== */
.remarks-content {
  max-width: 100%;
}

.remarks-text {
  color: #2d333a;
  line-height: 1.6;
  margin: 0;
  font-size: 14px;
}

/* ===== ANIMATIONS ===== */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ===== DARK THEME ===== */
.dark-theme .checklist-page {
  background: #2d2d30;
}

.dark-theme .main-header {
  background: #2d2d30;
  border-bottom-color: #4d4d4f;
}

.dark-theme .main-header h1 {
  color: white;
}

.dark-theme .back-btn {
  background: #3a3a3f;
  border-color: #4d4d4f;
  color: #d1d5db;
}

.dark-theme .back-btn:hover {
  background: #4d4d4f;
  color: white;
}

.dark-theme .document-count {
  background: #4d4d4f;
  color: #d1d5db;
}

.dark-theme .page-indicator {
  background: #1f2937;
  color: #10b981;
  border-color: #374151;
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

.dark-theme .toggle-slider {
  background: #2d2d30;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.dark-theme .panel {
  background: #2d2d30;
  border-color: #4d4d4f;
}

.dark-theme .panel-header h3 {
  color: white;
}

.dark-theme .instruction {
  color: #d1d5db;
}

.dark-theme .doc-item {
  background: #3a3a3f;
  border-color: #4d4d4f;
}

.dark-theme .doc-item:hover {
  background: #4d4d4f;
  border-color: #565869;
}

.dark-theme .doc-item.selected {
  background: #1f2937;
  border-color: #10a37f;
}

.dark-theme .doc-icon {
  background: #4d4d4f;
  color: #d1d5db;
}

.dark-theme .doc-item.selected .doc-icon {
  background: #10a37f;
  color: white;
}

.dark-theme .doc-name {
  color: #d1d5db;
}

.dark-theme .empty-state {
  color: #8e8ea0;
}

.dark-theme .item-row {
  background: #3a3a3f;
  border-color: #4d4d4f;
}

.dark-theme .item-row:hover {
  background: #4d4d4f;
  border-color: #565869;
}

.dark-theme .item-input {
  background: #2d2d30;
  border-color: #4d4d4f;
  color: white;
}

.dark-theme .item-input:focus {
  border-color: #10a37f;
  box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.2);
}

.dark-theme .btn {
  background: #3a3a3f;
  border-color: #4d4d4f;
  color: #d1d5db;
}

.dark-theme .btn:hover {
  background: #4d4d4f;
  border-color: #565869;
}

.dark-theme .btn-secondary {
  color: #d1d5db;
}

.dark-theme .btn-primary {
  background: #10a37f;
  border-color: #10a37f;
  color: white;
}

.dark-theme .loading-container {
  background: #2d2d30;
}

.dark-theme .loading-content h3 {
  color: white;
}

.dark-theme .loading-content p {
  color: #d1d5db;
}

.dark-theme .loading-note {
  color: #8e8ea0;
}

.dark-theme .results-header {
  background: #2d2d30;
}

.dark-theme .results-title h3 {
  color: white;
}

.dark-theme .results-subtitle {
  color: #d1d5db;
}

.dark-theme .summary-card {
  background: #2d2d30;
}

.dark-theme .summary-count {
  color: white;
}

.dark-theme .summary-label {
  color: #d1d5db;
}

.dark-theme .table-container {
  background: #2d2d30;
}

.dark-theme .result-table thead {
  background: #3a3a3f;
}

.dark-theme .result-table th {
  color: #d1d5db;
  border-bottom-color: #4d4d4f;
}

.dark-theme .result-table td {
  border-bottom-color: #4d4d4f;
}

.dark-theme .result-row:hover {
  background: #3a3a3f;
}

.dark-theme .item-text {
  color: #d1d5db;
}

.dark-theme .remarks-text {
  color: #d1d5db;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .results-summary {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .main-header {
    padding: 12px 16px;
    flex-wrap: wrap;
    height: auto;
    min-height: 60px;
  }
  
  .header-info {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .content-container {
    padding: 16px;
  }
  
  .panel {
    padding: 20px;
  }
  
  .results-container {
    padding: 16px;
  }
  
  .results-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .table-wrapper {
    font-size: 13px;
  }
  
  .result-table th,
  .result-table td {
    padding: 12px 16px;
  }
  
  .status-badge {
    padding: 6px 12px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .main-header h1 {
    font-size: 18px;
  }
  
  .panel-header h3 {
    font-size: 16px;
  }
  
  .results-title h3 {
    font-size: 18px;
  }
  
  .summary-count {
    font-size: 20px;
  }
  
  .result-table {
    font-size: 12px;
  }
  
  .result-table th,
  .result-table td {
    padding: 10px 12px;
  }
}

/* ===== SCROLLBAR STYLING ===== */
.doc-list::-webkit-scrollbar,
.items-container::-webkit-scrollbar,
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.doc-list::-webkit-scrollbar-track,
.items-container::-webkit-scrollbar-track,
.table-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.doc-list::-webkit-scrollbar-thumb,
.items-container::-webkit-scrollbar-thumb,
.table-wrapper::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark-theme .doc-list::-webkit-scrollbar-thumb,
.dark-theme .items-container::-webkit-scrollbar-thumb,
.dark-theme .table-wrapper::-webkit-scrollbar-thumb {
  background: #4d4d4f;
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus styles for keyboard navigation */
.btn:focus,
.back-btn:focus,
.theme-toggle-btn:focus,
.doc-item:focus,
.item-input:focus {
  outline: 2px solid #10a37f;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .panel {
    border-width: 2px;
  }
  
  .status-badge {
    border-width: 2px;
  }
  
  .btn {
    border-width: 2px;
  }
}
</style>


