<template>
  <div class="govt-dashboard">
    <!-- Government Header Bar -->
    <div class="govt-header">
      <div class="govt-emblem">
        <div class="emblem-circle">
          <span class="emblem-text">NE</span> 
      </div>
              </div>
      <div class="govt-title">
        <h1>Task Management Dashboard</h1>
        <p class="dept-subtitle">Ministry of Development of North Eastern Region</p>
                    </div>
      <div class="today-date">
        <div class="date-display">{{ getCurrentDate() }}</div>
                  </div>
                </div>

    <!-- Quick Statistics Panel -->
    <div class="stats-panel">
      <div class="stat-card primary">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-number">{{ totalTasks }}</div>
          <div class="stat-label">Total Tasks</div>
          <div class="stat-desc">Active approved tasks</div>
          </div>
        </div>

      <div class="stat-card secondary">
        <div class="stat-icon">📝</div>
        <div class="stat-content">
          <div class="stat-number">{{ totalSubtasks }}</div>
          <div class="stat-label">Action Items</div>
          <div class="stat-desc">Total sub-items</div>
      </div>
    </div>

      <div class="stat-card success">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <div class="stat-number">{{ overallProgress }}%</div>
                <div class="stat-label">Overall Progress</div>
          <div class="stat-desc">{{ totalCompletedSubtasks }}/{{ totalSubtasks }} completed</div>
              </div>
                    </div>
                    </div>

    <!-- Analytics Section -->
    <div class="analytics-grid">
      <!-- Task Progress Chart -->
      <div class="chart-container">
        <div class="chart-header">
          <h3>Task Completion Progress</h3>
          <div class="chart-info">Real-time progress tracking</div>
                    </div>
        <div class="progress-list">
          <div v-for="task in progressTasks" :key="task.id" class="progress-entry">
            <div class="progress-info">
              <div class="task-name">{{ task.description }}</div>
              <div class="task-sector">{{ task.sector_division }}</div>
                  </div>
            <div class="progress-track">
              <div class="progress-bar-bg">
                <div class="progress-bar-fill" :style="{ width: task.progress + '%' }"></div>
                </div>
              <span class="progress-percent">{{ task.progress }}%</span>
          </div>
        </div>
      </div>
    </div>

      <!-- Overall Completion -->
      <div class="completion-container">
        <div class="chart-header">
          <h3>Overall Completion</h3>
          <div class="chart-info">System-wide progress</div>
            </div>
        <div class="circular-progress">
          <div class="circle-chart" :style="getCircleStyle()">
            <div class="circle-inner">
              <div class="progress-text">{{ overallProgress }}%</div>
              <div class="progress-label">Complete</div>
            </div>
          </div>
        </div>
        <div class="completion-summary">
          <div class="summary-item">
            <span class="summary-number">{{ totalCompletedSubtasks }}</span>
            <span class="summary-label">Completed</span>
    </div>
          <div class="summary-item">
            <span class="summary-number">{{ totalSubtasks - totalCompletedSubtasks }}</span>
            <span class="summary-label">Remaining</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <div class="search-box">
        <div class="search-icon">🔍</div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search tasks by description, sector, or responsibility..."
          class="search-input"
        >
      </div>
    </div>

    <!-- Tasks Grid -->
    <div class="tasks-section">
      <div class="section-header">
        <h2>Approved Tasks</h2>
        <div class="task-count">{{ approvedTasks.length }} Active Tasks</div>
      </div>
      
      <div class="loading-state" v-if="loading">
        <div class="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>

      <div class="tasks-grid" v-else>
        <div 
          v-for="task in approvedTasks" 
          :key="task.id"
          @click="openTaskDetails(task)"
          class="task-card"
        >
          <!-- Task Header -->
          <div class="task-header">
            <div class="task-code">{{ generateTaskCode(task) }}</div>
            <div class="task-status">Approved</div>
          </div>

          <!-- Task Content -->
          <div class="task-content">
            <h4 class="task-title">{{ task.description }}</h4>
            
            <div class="task-details">
              <div class="detail-row">
                <span class="detail-label">Sector:</span>
                <span class="detail-value">{{ task.sector_division }}</span>
            </div>
              <div class="detail-row">
                <span class="detail-label">Review Date:</span>
                <span class="detail-value">{{ formatDate(task.review_date) }}</span>
            </div>
              <div class="detail-row">
                <span class="detail-label">Responsibility:</span>
                <span class="detail-value">{{ task.responsibility }}
                  <span v-if="task.reviewer_info" class="reviewer-info">
                    <br>
                    <span class="reviewer-badge">
                      👤 {{ task.reviewer_info }}
                    </span>
                  </span>
                </span>
            </div>
          </div>

            <!-- Progress Bar -->
            <div class="task-progress">
              <div class="progress-header">
                <span class="progress-label">Progress: {{ getTaskProgress(task) }}%</span>
                <span class="progress-count">({{ getCompletedSubtasks(task) }}/{{ getTotalSubtasks(task) }} items)</span>
            </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: getTaskProgress(task) + '%' }"></div>
            </div>
          </div>
        </div>

          <!-- Task Footer -->
          <div class="task-footer">
            <button @click.stop="viewTask(task)" class="action-btn view">
              <span class="btn-icon">👁️</span>
              View Details
            </button>
      </div>
    </div>
    </div>
    </div>

    <!-- Task Details Modal -->
    <div v-if="selectedTask" class="modal-overlay" @click="closeTaskDetails">
      <div class="task-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedTask.description }}</h3>
          <button @click="closeTaskDetails" class="close-btn">✕</button>
        </div>
        
        <div class="modal-content">
          <!-- Task Meta Information Grid -->
          <div class="task-meta-grid">
            <div class="meta-item">
              <span class="meta-label">Task ID:</span>
              <span class="meta-value">{{ generateTaskCode(selectedTask) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Sector:</span>
              <span class="meta-value">{{ selectedTask.sector_division }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Review Date:</span>
              <span class="meta-value">{{ formatDate(selectedTask.review_date) }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Responsibility:</span>
              <span class="meta-value">{{ selectedTask.responsibility }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Progress:</span>
              <span class="meta-value">{{ getTaskProgress(selectedTask) }}% ({{ getCompletedSubtasks(selectedTask) }}/{{ getTotalSubtasks(selectedTask) }} items)</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Reviewed By:</span>
              <div class="reviewers-list">
                <span v-if="selectedTaskReviewers.length === 0" class="meta-value">No reviewers yet</span>
                <div v-else class="reviewer-badges">
                  <span v-for="reviewer in selectedTaskReviewers" :key="reviewer.id" class="reviewer-badge">
                    {{ reviewer.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Items Section -->
          <div class="action-items-section">
            <h4>Action Items</h4>
            <div class="action-content-display" v-html="getFormattedActionItems(selectedTask)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  
  data() {
    return {
      tasks: [],
      loading: true,
      searchQuery: '',
      selectedTask: null,
      selectedTaskReviewers: []
    }
  },
  
  computed: {
    approvedTasks() {
      if (!this.searchQuery) {
        return this.tasks
      }
      return this.tasks.filter(task => 
        (task.description && task.description.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (task.sector_division && task.sector_division.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (task.responsibility && task.responsibility.toLowerCase().includes(this.searchQuery.toLowerCase()))
      )
    },

    totalTasks() {
      return this.tasks.length
    },

    totalSubtasks() {
      return this.approvedTasks.reduce((total, task) => {
        return total + this.getTotalSubtasks(task);
      }, 0);
    },

    totalCompletedSubtasks() {
      return this.approvedTasks.reduce((total, task) => {
        return total + this.getCompletedSubtasks(task);
      }, 0);
    },

    overallProgress() {
      if (this.totalSubtasks === 0) return 0;
      return Math.round((this.totalCompletedSubtasks / this.totalSubtasks) * 1000) / 10;
    },

    progressTasks() {
      return this.approvedTasks.map(task => ({
        ...task,
        progress: this.getTaskProgress(task)
      }))
    },

    recentTaskDescriptions() {
      return this.tasks.slice(0, 5).map(task => ({
          id: task.id,
        description: task.description.length > 40 ? 
          task.description.substring(0, 40) + '...' : 
          task.description
        }))
    },

    sampleSubtasks() {
      const allSubtasks = []
      this.tasks.forEach(task => {
        if (task.current_version && task.current_version.action_nodes) {
          const taskSubtasks = this.extractSubtasksRecursive(task.current_version.action_nodes)
          allSubtasks.push(...taskSubtasks)
        }
      })
      return allSubtasks.slice(0, 5).map(subtask => 
        subtask.length > 50 ? subtask.substring(0, 50) + '...' : subtask
      )
    }
  },

  async created() {
    await this.loadTasks()
  },

  methods: {
    getCurrentDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString('en-US', options);
    },

    async loadTasks() {
      try {
        this.loading = true
        const response = await this.$http.secured.get('/tasks/approved')
        
        if (response.data.tasks) {
          this.tasks = response.data.tasks.map(task => ({
            ...task,
            action_nodes: this.processActionNodes(task.action_nodes || []),
            total_subtasks: this.getTotalSubtasks(task),
            completed_subtasks: this.getCompletedSubtasks(task),
            progress_percentage: this.getTaskProgress(task)
          }))
        }
      } catch (error) {
        console.error('Error loading tasks:', error)
        this.$toast.error('Failed to load tasks')
      } finally {
        this.loading = false
      }
    },

    processActionNodes(nodes) {
      if (!nodes) return [];
      return nodes.map(node => ({
        ...node,
        content: this.stripHtmlTags(node.content || ''),
        children: node.children ? this.processActionNodes(node.children) : [],
        completed: node.completed || false
      }))
    },

    countNodesRecursive(nodes) {
      if (!nodes) return 0;
      let count = 0;
      nodes.forEach(node => {
        count += 1;
        if (node.children && node.children.length > 0) {
          count += this.countNodesRecursive(node.children);
        }
      });
      return count;
    },

    countCompletedNodesRecursive(nodes) {
      if (!nodes) return 0;
      let count = 0;
      nodes.forEach(node => {
        if (node.completed) count += 1;
        if (node.children && node.children.length > 0) {
          count += this.countCompletedNodesRecursive(node.children);
        }
      });
      return count;
    },

    getTotalSubtasks(task) {
      if (task.current_version && task.current_version.action_nodes) {
        return this.countNodesRecursive(task.current_version.action_nodes)
      }
      return 0
    },

    getCompletedSubtasks(task) {
      if (task.current_version && task.current_version.action_nodes) {
        return this.countCompletedNodesRecursive(task.current_version.action_nodes)
      }
      return 0
    },

    getTaskProgress(task) {
      if (!task.current_version || !task.current_version.action_nodes) return 0;
      const completed = this.getCompletedSubtasks(task);
      const total = this.getTotalSubtasks(task);
      if (total === 0) return 0;
      return Math.round((completed / total) * 1000) / 10;
    },

    extractSubtasksRecursive(nodes) {
      const subtasks = []
      nodes.forEach(node => {
        subtasks.push(node.content || 'Untitled item')
        if (node.children && node.children.length > 0) {
          subtasks.push(...this.extractSubtasksRecursive(node.children))
        }
      })
      return subtasks
    },

    stripHtmlTags(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html')
      return doc.body.textContent || ''
    },

    async openTaskDetails(task) {
      this.selectedTask = task
      this.selectedTaskReviewers = []
      
      // Fetch reviewers for this task
      try {
        await this.fetchTaskReviewers(task.id)
      } catch (error) {
        console.error('Error fetching reviewers:', error)
      }
    },

    closeTaskDetails() {
      this.selectedTask = null
      this.selectedTaskReviewers = []
    },

    async fetchTaskReviewers(taskId) {
      try {
        // Get all reviews for this task to find distinct reviewers
        const response = await this.$http.secured.get('/reviews')
        
        if (response.data && response.data.data) {
          const taskReviews = response.data.data.filter(review => 
            review.task && review.task.id === taskId
          )
          
          // Extract unique reviewers
          const reviewersMap = new Map()
          taskReviews.forEach(review => {
            if (review.reviewer) {
              reviewersMap.set(review.reviewer.id, {
                id: review.reviewer.id,
                name: review.reviewer.name,
                email: review.reviewer.email
              })
            }
          })
          
          this.selectedTaskReviewers = Array.from(reviewersMap.values())
        }
      } catch (error) {
        console.error('Error fetching task reviewers:', error)
        this.selectedTaskReviewers = []
      }
    },

    getTaskActionHTML(task) {
      return task.action_to_be_taken || 'No action items defined';
    },

    viewTask(task) {
      // Implement view task logic
      console.log('Viewing task:', task.id);
    },

    getCircleStyle() {
      // Convert percentage to degrees (360 * percentage/100)
      // Start from -90 degrees (top) and go clockwise
      const progress = (this.overallProgress || 0) * 3.6;
      return {
        '--progress': `${progress}deg`
      };
    },

    generateTaskCode(task) {
      return `TASK-${String(task.id).padStart(4, '0')}`;
    },

    formatDate(date) {
      if (!date) return 'Not set';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    getFormattedActionItems(task) {
      // Use the same action_to_be_taken HTML that TentativeDashboard uses
      // This already contains the properly formatted action nodes with indentation
      return task.action_to_be_taken || 'No action items defined';
    }
  }
}
</script>

<style scoped>
.govt-dashboard {
  width: 98%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 16px;
  background: #f8f9fa;
}

.govt-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
  color: white;
  margin-bottom: 24px;
  border-radius: 10px;
  overflow: hidden;
}

.govt-emblem {
  display: flex;
  align-items: center;
  padding: 0 24px;
}

.emblem-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.emblem-text {
  font-weight: 600;
  font-size: 1.2rem;
  color: white;
}

.govt-title h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.dept-subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.today-date {
  padding: 0 24px;
  font-size: 0.95rem;
  opacity: 0.9;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
  align-items: start;
}

/* Modern completion container styling */
.completion-container {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
  padding: 32px 28px;
  height: 420px; /* Fixed height to match chart container */
  max-height: 420px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Animated background for completion container */
.completion-container::before {
  content: '';
  position: absolute;
  top: -40px;
  right: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at 30% 70%, #22c55e33 0%, #16a34a33 60%, transparent 100%);
  opacity: 0.6;
  z-index: 0;
  animation: completionBgFloat 7s ease-in-out infinite alternate;
}

@keyframes completionBgFloat {
  0% { transform: translateY(0) scale(1) rotate(0deg); }
  100% { transform: translateY(-15px) scale(1.1) rotate(10deg); }
}

/* Modern Circular Progress Styles */
.circular-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  z-index: 2;
  position: relative;
}

.circle-chart {
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(
    #22c55e var(--progress),
    #e2e8f0 var(--progress)
  );
  transform: rotate(-90deg);
  filter: drop-shadow(0 8px 16px rgba(34, 197, 94, 0.2));
  transition: all 0.3s ease;
}

.circle-chart:hover {
  transform: rotate(-90deg) scale(1.05);
  filter: drop-shadow(0 12px 24px rgba(34, 197, 94, 0.3));
}

.circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  width: 170px;
  height: 170px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 
    inset 0 4px 8px rgba(0, 0, 0, 0.08),
    0 4px 16px rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.progress-text {
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
}

.progress-label {
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 600;
  letter-spacing: 0.01em;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
}

/* Completion stats below circle */
.completion-stats {
  margin-top: 20px;
  text-align: center;
  z-index: 2;
  position: relative;
}

.completion-stats p {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  margin: 4px 0;
  letter-spacing: 0.01em;
}

.tasks-section {
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

/* --- Modern Task Card Revamp --- */
.task-card {
  background: rgba(255,255,255,0.92);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13), 0 1.5px 8px 0 rgba(56,189,248,0.08);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1.5px solid rgba(56,189,248,0.18);
  padding: 28px 22px 22px 22px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.25s, transform 0.18s, border 0.18s;
  cursor: pointer;
  z-index: 1;
  animation: cardFadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
}
.task-card:hover {
  box-shadow: 0 12px 32px 0 rgba(56,189,248,0.18), 0 4px 16px 0 rgba(31,38,135,0.13);
  border: 2.5px solid #38bdf8;
  transform: translateY(-4px) scale(1.012);
}
@keyframes cardFadeIn {
  0% { opacity: 0; transform: translateY(20px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Animated border effect */
.task-card::before {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  border-radius: 22px;
  background: linear-gradient(120deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0.13;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  filter: blur(2px);
}
.task-card:hover::before {
  opacity: 0.22;
}

/* Floating action button (View Details) */
.task-footer {
  margin-top: 16px;
  text-align: right;
  position: relative;
  z-index: 2;
}
.action-btn.view {
  background: linear-gradient(90deg, #6366f1 0%, #38bdf8 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 28px;
  box-shadow: 0 2px 8px rgba(99,102,241,0.13);
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  position: relative;
  overflow: hidden;
}
.action-btn.view:hover {
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  box-shadow: 0 6px 18px rgba(56,189,248,0.18);
  transform: scale(1.04);
}

/* Modern Card Headings and Typography */
.task-title, .section-header h2, .govt-title h1, .chart-header h3 {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 0.01em;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
  font-size: 1.25rem;
  text-shadow: 0 2px 8px rgba(56,189,248,0.07);
}
.section-header h2 {
  font-size: 1.45rem;
  margin-bottom: 0;
}
.govt-title h1 {
  font-size: 2.1rem;
  margin-bottom: 0;
}

/* Card micro-interactions */
.task-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(56,189,248,0.10);
}

/* Card badge for status */
.task-status {
  font-size: 0.92rem;
  font-weight: 700;
  color: #38bdf8;
  background: rgba(56,189,248,0.09);
  border-radius: 8px;
  padding: 2px 12px;
  margin-left: 8px;
  letter-spacing: 0.03em;
  box-shadow: 0 1px 4px rgba(56,189,248,0.07);
}

/* Card code styling */
.task-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: #6366f1;
  letter-spacing: 0.04em;
  background: rgba(99,102,241,0.08);
  border-radius: 6px;
  padding: 2px 10px;
  margin-right: 8px;
  box-shadow: 0 1px 4px rgba(99,102,241,0.07);
}

/* Card content and details */
.task-content {
  margin-bottom: 16px;
  z-index: 2;
  position: relative;
}
.task-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 0;
}
.detail-row {
  width: 50%;
  margin-bottom: 8px;
}
.detail-label {
  font-size: 0.93rem;
  font-weight: 600;
  color: #64748b;
}
.detail-value {
  font-size: 1.01rem;
  font-weight: 400;
  color: #1e293b;
  margin-left: 8px;
}

/* Card progress bar */
.task-progress {
  margin-top: 16px;
}
.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.progress-label {
  font-size: 0.93rem;
  font-weight: 600;
  color: #64748b;
}
.progress-count {
  font-size: 0.85rem;
  font-weight: 400;
  color: #64748b;
}
.progress-bar {
  height: 16px;
  background: #e0e7ef;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 4px;
  box-shadow: 0 1px 4px rgba(56,189,248,0.08);
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
  border-radius: 8px;
  transition: width 0.7s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 2px 8px rgba(99,102,241,0.13);
}

/* Responsive for task-card */
@media (max-width: 768px) {
  .task-card {
    padding: 14px 8px 14px 8px;
  }
  .task-title, .section-header h2, .govt-title h1 {
  font-size: 1.1rem;
  }
  .section-header h2 {
    font-size: 1.2rem;
  }
  .govt-title h1 {
    font-size: 1.3rem;
  }
}

/* --- Modern Stat Cards with Glassmorphism --- */
.stat-card {
  background: rgba(255, 255, 255, 0.88);
  border-radius: 18px;
  padding: 28px 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: statCardFadeIn 0.6s ease-out;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--card-gradient-start), var(--card-gradient-end));
  z-index: 1;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 70% 30%, var(--card-bg-gradient) 0%, transparent 70%);
  opacity: 0.6;
  z-index: 0;
  animation: statCardBgFloat 8s ease-in-out infinite alternate;
}

@keyframes statCardFadeIn {
  0% { opacity: 0; transform: translateY(20px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes statCardBgFloat {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-10px) scale(1.05); }
}

.stat-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22), 0 4px 16px 0 rgba(0, 0, 0, 0.12);
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.4);
}

.stat-card.primary {
  --card-gradient-start: #3182ce;
  --card-gradient-end: #4299e1;
  --card-bg-gradient: rgba(49, 130, 206, 0.15);
}

.stat-card.secondary {
  --card-gradient-start: #805ad5;
  --card-gradient-end: #9f7aea;
  --card-bg-gradient: rgba(128, 90, 213, 0.15);
}

.stat-card.success {
  --card-gradient-start: #38a169;
  --card-gradient-end: #48bb78;
  --card-bg-gradient: rgba(56, 161, 105, 0.15);
}

.stat-icon {
  font-size: 2.5rem;
  margin-right: 20px;
  background: linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  z-index: 2;
  position: relative;
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.stat-content {
  flex: 1;
  z-index: 2;
  position: relative;
}

.stat-number {
  font-size: 2.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--card-gradient-start), var(--card-gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 6px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  letter-spacing: 0.01em;
}

.stat-desc {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.search-section {
  margin-bottom: 24px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-icon {
  font-size: 1.5rem;
  margin-right: 12px;
  opacity: 0.8;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* High z-index to ensure it's above all other content */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.task-modal {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 18px;
  padding: 32px;
  max-width: 90%;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  z-index: 10001; /* Even higher z-index for the modal content */
  position: relative;
  animation: modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes modalFadeIn {
  0% { opacity: 0; transform: scale(0.95) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(56, 189, 248, 0.15);
}

.modal-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  letter-spacing: 0.01em;
}

.close-btn {
  background: rgba(239, 68, 68, 0.1);
  border: none;
  font-size: 1.8rem;
  color: #ef4444;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-weight: 700;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.modal-content {
  margin-bottom: 24px;
}

.task-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.meta-item {
  background: rgba(248, 250, 252, 0.8);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.6);
  transition: all 0.2s ease;
}

.meta-item:hover {
  background: rgba(241, 245, 249, 0.9);
  border-color: rgba(56, 189, 248, 0.3);
  transform: translateY(-2px);
}

.meta-label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
}

.meta-value {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1e293b;
  line-height: 1.4;
}

.reviewers-list {
  margin-top: 4px;
}

.reviewer-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.reviewer-badge {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  transition: all 0.2s ease;
}

.reviewer-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.action-items-section {
  margin-top: 32px;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 16px;
  padding: 28px;
  border: 1.5px solid rgba(226, 232, 240, 0.8);
}

.action-items-section h4 {
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  letter-spacing: 0.01em;
}

.action-content-display {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  max-height: 400px;
  overflow-y: auto;
}

/* Custom scrollbar for action content */
.action-content-display::-webkit-scrollbar {
  width: 8px;
}

.action-content-display::-webkit-scrollbar-track {
  background: rgba(226, 232, 240, 0.3);
  border-radius: 4px;
}

.action-content-display::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  border-radius: 4px;
}

.action-content-display::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0ea5e9, #1d4ed8);
}

/* Style for action content HTML formatting */
.action-content-display ol,
.action-content-display ul {
  margin: 16px 0;
  padding-left: 24px;
}

.action-content-display li {
  margin: 8px 0;
  line-height: 1.5;
}

.action-content-display strong {
  color: #1e293b;
  font-weight: 600;
}

.action-content-display em {
  color: #475569;
  font-style: italic;
}

/* 🎯 UNIFIED: Clean Action Node Hierarchical Styling with DEEP SELECTORS */
.action-content-display /deep/ .action-node {
  display: flex !important;
  align-items: flex-start !important;
  margin: 4px 0 !important;
  padding: 2px 0 !important;
  line-height: 1.4 !important;
  font-size: inherit !important;
}

.action-content-display /deep/ .action-node .node-marker {
  flex-shrink: 0 !important;
  margin-right: 8px !important;
  font-weight: bold !important;
  min-width: 24px !important;
  text-align: left !important;
}

.action-content-display /deep/ .action-node .node-content {
  flex: 1 !important;
  word-break: break-word !important;
  color: #000 !important;
}

/* 📐 ENHANCED: Hierarchical indentation with DEEP SELECTORS - REDUCED SPACING! */
.action-content-display /deep/ .action-node.level-1 { 
  margin-left: 0px !important; 
  /* background-color: rgba(59, 130, 246, 0.02) !important; */
}
.action-content-display /deep/ .action-node.level-2 { 
  margin-left: 20px !important; 
  /* background-color: rgba(16, 185, 129, 0.02) !important; */
  border-left: 2px solid rgba(16, 185, 129, 0.3) !important;
  padding-left: 4px !important;
}
.action-content-display /deep/ .action-node.level-3 { 
  margin-left: 40px !important; 
  /* background-color: rgba(139, 92, 246, 0.02) !important; */
  border-left: 2px solid rgba(139, 92, 246, 0.3) !important;
  padding-left: 6px !important;
}
.action-content-display /deep/ .action-node.level-4 { 
  margin-left: 60px !important; 
  /* background-color: rgba(245, 158, 11, 0.02) !important; */
  border-left: 2px solid rgba(245, 158, 11, 0.3) !important;
  padding-left: 6px !important;
}
.action-content-display /deep/ .action-node.level-5 { 
  margin-left: 80px !important; 
  /* background-color: rgba(239, 68, 68, 0.02) !important; */
  border-left: 2px solid rgba(239, 68, 68, 0.3) !important;
  padding-left: 6px !important;
}

/* 🎨 UNIFIED: List style colors with DEEP SELECTORS */
.action-content-display /deep/ .action-node.style-decimal .node-marker { 
  /* color: #1e40af !important; */
  font-weight: bold !important; 
}
.action-content-display /deep/ .action-node.style-lower-alpha .node-marker { 
  /* color: #059669 !important; */
  font-weight: bold !important; 
}
.action-content-display /deep/ .action-node.style-lower-roman .node-marker { 
  /* color: #7C3AED !important; */
  font-weight: bold !important; 
}
.action-content-display /deep/ .action-node.style-bullet .node-marker { 
  /* color: #DC2626 !important; */
  font-weight: bold !important; 
}

/* 📅 Review date styling with DEEP SELECTORS - yellow highlight */
.action-content-display /deep/ .action-node .node-content .review-date {
  font-size: 0.85em !important;
  color: #333 !important;
  font-weight: 500 !important;
  margin-left: 8px !important;
  background-color: #ffeb3b !important;
  padding: 2px 6px !important;
  border-radius: 4px !important;
  display: inline-block !important;
  line-height: 1.2 !important;
}

.action-content-display /deep/ .action-node .node-content .review-date.today {
  color: #d32f2f !important; /* Red text for today */
  font-weight: 600 !important;
}

/* ✅ Completed nodes styling with DEEP SELECTORS - GREEN COLOR */
.action-content-display /deep/ .action-node.completed { 
  background-color: rgba(16, 185, 129, 0.1) !important; /* Light green background */
  border-left: 3px solid #10b981 !important; /* Green left border */
  border-radius: 4px !important;
  padding: 4px 8px !important;
}
.action-content-display /deep/ .action-node.completed .node-content { 
  color: #059669 !important; /* Green text color */
  font-weight: 500 !important; /* Slightly bold */
}
.action-content-display /deep/ .action-node.completed .node-marker { 
  color: #10b981 !important; /* Green marker color */
  font-weight: 600 !important;
}

/* 🔧 FALLBACK: Alternative deep selector syntaxes for maximum compatibility - REDUCED SPACING! */
.action-content-display >>> .action-node.level-2 { 
  margin-left: 20px !important; 
  /* background-color: rgba(16, 185, 129, 0.02) !important; */
  border-left: 2px solid rgba(16, 185, 129, 0.3) !important;
  padding-left: 4px !important;
}
.action-content-display >>> .action-node.level-3 { 
  margin-left: 40px !important; 
  /* background-color: rgba(139, 92, 246, 0.02) !important; */
  border-left: 2px solid rgba(139, 92, 246, 0.3) !important;
  padding-left: 6px !important;
}
.action-content-display >>> .action-node.level-4 { 
  margin-left: 60px !important; 
  /* background-color: rgba(245, 158, 11, 0.02) !important; */
  border-left: 2px solid rgba(245, 158, 11, 0.3) !important;
  padding-left: 6px !important;
}
.action-content-display >>> .action-node.level-5 { 
  margin-left: 80px !important; 
  /* background-color: rgba(239, 68, 68, 0.02) !important; */
  border-left: 2px solid rgba(239, 68, 68, 0.3) !important;
  padding-left: 6px !important;
}

/* 💪 NUCLEAR OPTION: Global styles that bypass scoping entirely - REDUCED SPACING! */
.task-modal .action-content-display .action-node.level-2 { 
  margin-left: 20px !important; 
  /* background-color: rgba(16, 185, 129, 0.02) !important; */
  border-left: 2px solid rgba(16, 185, 129, 0.3) !important;
  padding-left: 4px !important;
}
.task-modal .action-content-display .action-node.level-3 { 
  margin-left: 40px !important; 
  /* background-color: rgba(139, 92, 246, 0.02) !important; */
  border-left: 2px solid rgba(139, 92, 246, 0.3) !important;
  padding-left: 6px !important;
}
.task-modal .action-content-display .action-node.level-4 { 
  margin-left: 60px !important; 
  /* background-color: rgba(245, 158, 11, 0.02) !important; */
  border-left: 2px solid rgba(245, 158, 11, 0.3) !important;
  padding-left: 6px !important;
}
.task-modal .action-content-display .action-node.level-5 { 
  margin-left: 80px !important; 
  /* background-color: rgba(239, 68, 68, 0.02) !important; */
  border-left: 2px solid rgba(239, 68, 68, 0.3) !important;
  padding-left: 6px !important;
}

/* --- Modern Glassmorphism Card for .chart-container --- */
.chart-container {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  position: relative;
  overflow: hidden;
  padding: 32px 28px 20px 28px;
  height: 420px; /* Fixed height to match completion container */
  max-height: 420px;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

/* Animated SVG background (waves/particles) */
.chart-container::before {
  content: '';
  position: absolute;
  top: -60px;
  left: -60px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle at 60% 40%, #60a5fa55 0%, #818cf855 60%, transparent 100%);
  opacity: 0.5;
  z-index: 0;
  animation: floatWave 6s ease-in-out infinite alternate;
}
@keyframes floatWave {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(20px) scale(1.08); }
}

.chart-header h3 {
  font-family: 'Poppins', 'Inter', Arial, sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.01em;
  margin-bottom: 2px;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.chart-header .chart-info {
  font-size: 0.98rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 8px;
}

.progress-list {
  margin-top: 18px;
  z-index: 2;
  position: relative;
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
}

/* Custom scrollbar for progress list */
.progress-list::-webkit-scrollbar {
  width: 6px;
}

.progress-list::-webkit-scrollbar-track {
  background: rgba(226, 232, 240, 0.5);
  border-radius: 3px;
}

.progress-list::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #38bdf8, #2563eb);
  border-radius: 3px;
}

.progress-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0ea5e9, #1d4ed8);
}

.progress-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(236, 245, 255, 0.7);
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 14px 18px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.07);
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #e0e7ef;
}
.progress-entry:hover {
  box-shadow: 0 6px 18px rgba(59, 130, 246, 0.13);
  transform: translateY(-2px) scale(1.01);
}

.progress-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.task-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
}
.task-sector {
  font-size: 0.92rem;
  color: #64748b;
  font-weight: 500;
}

.progress-track {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 180px;
}
.progress-bar-bg {
  width: 120px;
  height: 12px;
  background: #e0e7ef;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.08);
}
.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #38bdf8 0%, #2563eb 100%);
  border-radius: 8px;
  transition: width 0.7s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.13);
}
.progress-percent {
  font-size: 0.98rem;
  font-weight: 600;
  color: #2563eb;
  min-width: 38px;
  text-align: right;
  letter-spacing: 0.01em;
}

/* Responsive for chart-container */
@media (max-width: 768px) {
  .chart-container {
    padding: 18px 8px;
    min-height: 220px;
  }
  .progress-bar-bg {
    width: 80px;
  }
  .progress-track {
    min-width: 110px;
  }
}

.action-content-display >>> .action-node.has-reviewer {
  background-color: rgba(59, 130, 246, 0.05);
  border-color: rgba(59, 130, 246, 0.3);
}

.action-content-display >>> .action-node .node-marker {
  display: flex;
  align-items: center;
  min-width: 32px;
  font-weight: 600;
  color: #6b7280;
  font-size: 0.875rem;
}

.action-content-display >>> .action-node .node-content {
  flex: 1;
  min-width: 0;
  max-width: calc(100% - 200px);
}

.action-content-display >>> .action-node .reviewer-badge {
  margin-left: auto;
  white-space: nowrap;
}

.action-content-display >>> .action-node.level-2 { 
  margin-left: 20px !important; 
  border-left: 2px solid rgba(16, 185, 129, 0.3) !important;
  padding-left: 4px !important;
}

.action-content-display >>> .action-node.level-3 { 
  margin-left: 40px !important; 
  border-left: 2px solid rgba(139, 92, 246, 0.3) !important;
  padding-left: 6px !important;
}

.action-content-display >>> .action-node.level-4 { 
  margin-left: 60px !important; 
  border-left: 2px solid rgba(245, 158, 11, 0.3) !important;
  padding-left: 6px !important;
}

.action-content-display >>> .action-node.level-5 { 
  margin-left: 80px !important; 
  border-left: 2px solid rgba(239, 68, 68, 0.3) !important;
  padding-left: 6px !important;
}

.reviewer-info {
  display: block;
  margin-top: 4px;
}
/* 
.reviewer-badge {
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  margin-top: 4px;
} */

/* Reviewer Badge Styles */
.action-content-display /deep/ .reviewer-badge-parallel {
  display: inline-block !important;
  background-color: #ffeb3b !important;
  color: black !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  margin-left: 8px !important;
  position: absolute !important;
  right: 16px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  opacity: 0.9 !important;
  transition: opacity 0.2s ease !important;
}

.action-content-display /deep/ .action-node {
  position: relative !important;
  padding-right: 120px !important; /* Make space for reviewer badge */
}

.action-content-display /deep/ .reviewer-badge-parallel:hover {
  opacity: 1 !important;
}

/* Alternative deep selector syntax for maximum compatibility */
.action-content-display >>> .reviewer-badge-parallel {
  display: inline-block !important;
  background-color: #ffeb3b !important;
  color: black !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  margin-left: 8px !important;
  position: absolute !important;
  right: 16px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  opacity: 0.9 !important;
  transition: opacity 0.2s ease !important;
}

.action-content-display >>> .action-node {
  position: relative !important;
  padding-right: 120px !important; /* Make space for reviewer badge */
}

.action-content-display >>> .reviewer-badge-parallel:hover {
  opacity: 1 !important;
}

/* Nuclear option: Global styles that bypass scoping entirely */
.task-modal .action-content-display .reviewer-badge-parallel {
  display: inline-block !important;
  background-color: #2563eb !important;
  color: white !important;
  padding: 2px 8px !important;
  border-radius: 4px !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  margin-left: 8px !important;
  position: absolute !important;
  right: 16px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  opacity: 0.9 !important;
  transition: opacity 0.2s ease !important;
}

.task-modal .action-content-display .action-node {
  position: relative !important;
  padding-right: 120px !important; /* Make space for reviewer badge */
}

.task-modal .action-content-display .reviewer-badge-parallel:hover {
  opacity: 1 !important;
}
</style>
