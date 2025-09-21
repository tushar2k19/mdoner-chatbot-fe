<template>
  <div class="not-found-page">
    <!-- Background Animation Layer -->
    <div class="background-animation">
      <!-- Floating geometric shapes -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
      
      <!-- Gradient mesh background -->
      <div class="gradient-mesh">
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
        <div class="gradient-orb gradient-orb-3"></div>
      </div>
      
      <!-- Neural network pattern -->
      <div class="neural-network">
        <svg viewBox="0 0 1200 800" class="neural-svg">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#10a37f;stop-opacity:0.3" />
              <stop offset="50%" style="stop-color:#4d4d4f;stop-opacity:0.2" />
              <stop offset="100%" style="stop-color:#565869;stop-opacity:0.1" />
            </linearGradient>
          </defs>
          <g class="neural-nodes">
            <!-- Neural network nodes -->
            <circle cx="200" cy="150" r="4" fill="#10a37f" opacity="0.6" />
            <circle cx="400" cy="200" r="3" fill="#4d4d4f" opacity="0.5" />
            <circle cx="600" cy="180" r="5" fill="#565869" opacity="0.4" />
            <circle cx="800" cy="220" r="4" fill="#10a37f" opacity="0.5" />
            <circle cx="1000" cy="190" r="3" fill="#4d4d4f" opacity="0.6" />
            <circle cx="300" cy="350" r="4" fill="#565869" opacity="0.4" />
            <circle cx="500" cy="320" r="3" fill="#10a37f" opacity="0.5" />
            <circle cx="700" cy="380" r="5" fill="#4d4d4f" opacity="0.3" />
            <circle cx="900" cy="340" r="4" fill="#565869" opacity="0.4" />
            <circle cx="150" cy="500" r="3" fill="#10a37f" opacity="0.5" />
            <circle cx="350" cy="480" r="4" fill="#4d4d4f" opacity="0.4" />
            <circle cx="550" cy="520" r="3" fill="#565869" opacity="0.5" />
            <circle cx="750" cy="500" r="5" fill="#10a37f" opacity="0.3" />
            <circle cx="950" cy="480" r="4" fill="#4d4d4f" opacity="0.4" />
            <circle cx="250" cy="650" r="3" fill="#565869" opacity="0.5" />
            <circle cx="450" cy="680" r="4" fill="#10a37f" opacity="0.4" />
            <circle cx="650" cy="650" r="3" fill="#4d4d4f" opacity="0.5" />
            <circle cx="850" cy="680" r="5" fill="#565869" opacity="0.3" />
          </g>
          <g class="neural-connections">
            <!-- Neural network connections -->
            <line x1="200" y1="150" x2="400" y2="200" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="400" y1="200" x2="600" y2="180" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="600" y1="180" x2="800" y2="220" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="800" y1="220" x2="1000" y2="190" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="200" y1="150" x2="300" y2="350" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="400" y1="200" x2="500" y2="320" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="600" y1="180" x2="700" y2="380" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="800" y1="220" x2="900" y2="340" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="300" y1="350" x2="150" y2="500" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="500" y1="320" x2="350" y2="480" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="700" y1="380" x2="550" y2="520" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="900" y1="340" x2="750" y2="500" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="150" y1="500" x2="250" y2="650" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="350" y1="480" x2="450" y2="680" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
            <line x1="550" y1="520" x2="650" y2="650" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.2" />
            <line x1="750" y1="500" x2="850" y2="680" stroke="url(#neuralGradient)" stroke-width="1" opacity="0.3" />
          </g>
        </svg>
      </div>
    </div>

    <!-- Main Content -->
    <div class="content-container">
      <div class="error-content">
        <!-- 404 Number with 3D Effect -->
        <div class="error-number">
          <div class="number-3d">4</div>
          <div class="number-3d">0</div>
          <div class="number-3d">4</div>
        </div>

        <!-- Error Message -->
        <div class="error-message">
          <h1 class="error-title">Page Not Found</h1>
          <p class="error-description">
            Oops! The page you're looking for seems to have wandered off into the digital void.
            <br>
            Don't worry, even the best AI assistants sometimes take wrong turns!
          </p>
        </div>

        <!-- AI Assistant Icon -->
        <div class="ai-assistant">
          <div class="assistant-avatar">
            <div class="avatar-glow"></div>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="assistant-bubble">
            <p>"Let me help you find your way back!"</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button @click="goHome" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            {{ isAuthenticated ? 'Go to Dashboard' : 'Go to Login' }}
          </button>
          
          <button @click="goBack" class="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Go Back
          </button>
        </div>

        <!-- Additional Help -->
        <div class="help-section">
          <div class="help-card">
            <div class="help-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="help-content">
              <h3>Need Help?</h3>
              <p>If you believe this is an error, please check the URL or contact support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Theme Toggle -->
    <div class="theme-toggle-container">
      <button @click="toggleTheme" class="theme-toggle-btn" :class="{ dark: isDarkTheme }">
        <div class="toggle-slider">
          <svg v-if="!isDarkTheme" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
      isDarkTheme: false
    }
  },
  computed: {
    isAuthenticated() {
      const token = localStorage.getItem('jwt_access')
      return token && this.isTokenValid(token)
    }
  },
  mounted() {
    // Load theme preference
    const savedTheme = localStorage.getItem('dpr_theme')
    if (savedTheme === 'dark') {
      this.isDarkTheme = true
      document.documentElement.classList.add('dark-theme')
    }
  },
  methods: {
    isTokenValid(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Math.floor(Date.now() / 1000)
        
        if (payload.exp && payload.exp < currentTime + 300) {
          localStorage.removeItem('jwt_access')
          return false
        }
        
        return true
      } catch (error) {
        localStorage.removeItem('jwt_access')
        return false
      }
    },
    goHome() {
      if (this.isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.goHome()
      }
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark-theme')
        localStorage.setItem('dpr_theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark-theme')
        localStorage.setItem('dpr_theme', 'light')
      }
    }
  }
}
</script>

<style scoped>
/* ===== ROOT STYLES ===== */
.not-found-page {
  position: relative;
  min-height: 100vh;
  background: #f7f7f8;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* ===== BACKGROUND ANIMATION ===== */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(45, 45, 48, 0.1), rgba(74, 74, 79, 0.1));
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation-delay: 1s;
}

.shape-5 {
  width: 70px;
  height: 70px;
  top: 70%;
  left: 60%;
  animation-delay: 3s;
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 10%;
  left: 70%;
  animation-delay: 5s;
}

.gradient-mesh {
  position: absolute;
  width: 100%;
  height: 100%;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: pulse 4s ease-in-out infinite;
}

.gradient-orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(45, 45, 48, 0.3) 0%, transparent 70%);
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.gradient-orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(74, 74, 79, 0.2) 0%, transparent 70%);
  bottom: -200px;
  right: -200px;
  animation-delay: 2s;
}

.gradient-orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(86, 86, 105, 0.25) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1s;
}

.neural-network {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.neural-svg {
  width: 100%;
  height: 100%;
  animation: neuralPulse 8s ease-in-out infinite;
}

/* ===== MAIN CONTENT ===== */
.content-container {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
}

.error-content {
  text-align: center;
  max-width: 600px;
  animation: slideInUp 1s ease-out;
}

/* ===== ERROR NUMBER ===== */
.error-number {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  perspective: 1000px;
}

.number-3d {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, #10a37f, #4d4d4f, #565869);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite, numberFloat 2s ease-in-out infinite;
  transform-style: preserve-3d;
  text-shadow: 0 0 30px rgba(16, 163, 127, 0.3);
}

.number-3d:nth-child(2) {
  animation-delay: 0.2s;
}

.number-3d:nth-child(3) {
  animation-delay: 0.4s;
}

/* ===== ERROR MESSAGE ===== */
.error-message {
  margin-bottom: 50px;
}

.error-title {
  font-size: 48px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.error-description {
  font-size: 18px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  animation: fadeInUp 1s ease-out 0.5s both;
}

/* ===== AI ASSISTANT ===== */
.ai-assistant {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  animation: fadeInUp 1s ease-out 0.7s both;
}

.assistant-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10a37f, #0d8f68);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(16, 163, 127, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

.avatar-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #10a37f, #0d8f68);
  filter: blur(20px);
  opacity: 0.5;
  animation: glow 2s ease-in-out infinite;
}

.assistant-bubble {
  background: white;
  padding: 16px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 300px;
}

.assistant-bubble::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
}

.assistant-bubble p {
  margin: 0;
  font-size: 16px;
  color: #374151;
  font-weight: 500;
}

/* ===== ACTION BUTTONS ===== */
.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out 0.9s both;
}

.btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #10a37f, #0d8f68);
  color: white;
  box-shadow: 0 8px 25px rgba(16, 163, 127, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(16, 163, 127, 0.4);
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: #d1d5db;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
}

/* ===== HELP SECTION ===== */
.help-section {
  animation: fadeInUp 1s ease-out 1.1s both;
}

.help-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.help-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  flex-shrink: 0;
}

.help-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.help-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* ===== THEME TOGGLE ===== */
.theme-toggle-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
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

/* ===== ANIMATIONS ===== */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
  }
}

@keyframes neuralPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes numberFloat {
  0%, 100% {
    transform: translateY(0px) rotateX(0deg);
  }
  50% {
    transform: translateY(-10px) rotateX(10deg);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* ===== DARK THEME ===== */
.dark-theme .not-found-page {
  background: #2d2d30;
}

.dark-theme .error-title {
  color: white;
}

.dark-theme .error-description {
  color: #d1d5db;
}

.dark-theme .assistant-bubble {
  background: #2d2d30;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid #4d4d4f;
}

.dark-theme .assistant-bubble::before {
  border-right-color: #2d2d30;
}

.dark-theme .assistant-bubble p {
  color: white;
}

.dark-theme .btn-secondary {
  background: #2d2d30;
  color: white;
  border-color: #4d4d4f;
}

.dark-theme .btn-secondary:hover {
  border-color: #565869;
  background: #3a3a3f;
}

.dark-theme .help-card {
  background: #2d2d30;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid #4d4d4f;
}

.dark-theme .help-icon {
  background: #3a3a3f;
  color: #d1d5db;
}

.dark-theme .help-content h3 {
  color: white;
}

.dark-theme .help-content p {
  color: #d1d5db;
}

.dark-theme .shape {
  background: linear-gradient(135deg, rgba(45, 45, 48, 0.2), rgba(74, 74, 79, 0.15));
}

.dark-theme .gradient-orb-1 {
  background: radial-gradient(circle, rgba(45, 45, 48, 0.4) 0%, transparent 70%);
}

.dark-theme .gradient-orb-2 {
  background: radial-gradient(circle, rgba(74, 74, 79, 0.3) 0%, transparent 70%);
}

.dark-theme .gradient-orb-3 {
  background: radial-gradient(circle, rgba(86, 86, 105, 0.35) 0%, transparent 70%);
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .error-number {
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .number-3d {
    font-size: 80px;
  }
  
  .error-title {
    font-size: 36px;
  }
  
  .error-description {
    font-size: 16px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .ai-assistant {
    flex-direction: column;
    gap: 15px;
  }
  
  .assistant-bubble::before {
    left: 50%;
    top: -10px;
    transform: translateX(-50%);
    border-top: none;
    border-bottom: 10px solid white;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
  }
  
  .dark-theme .assistant-bubble::before {
    border-bottom-color: #374151;
    border-right-color: transparent;
    border-left-color: transparent;
  }
  
  .help-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding: 20px 16px;
  }
  
  .number-3d {
    font-size: 60px;
  }
  
  .error-title {
    font-size: 28px;
  }
  
  .assistant-avatar {
    width: 60px;
    height: 60px;
  }
  
  .assistant-bubble {
    padding: 12px 20px;
  }
}

/* ===== ACCESSIBILITY ===== */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.btn:focus,
.theme-toggle-btn:focus {
  outline: 2px solid #10a37f;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn {
    border-width: 2px;
  }
  
  .assistant-avatar {
    border: 2px solid #10a37f;
  }
}
</style>
