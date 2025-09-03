
<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      showPassword: false
    }
  },
  created: function () {
    this.checkSignedin()
  },
  updated () {
    this.checkSignedin()
  },
  methods: {
    clearError () {
      this.error = ''
    },
    checkSignedin: function () {
      const token = localStorage.getItem('jwt_access')
      if (token && this.isTokenValid(token)) {
        this.$router.replace('/dashboard')
      }
    },
    isTokenValid(token) {
      try {
        // Decode JWT token to check expiration
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Math.floor(Date.now() / 1000)
        
        // Check if token is expired (with 5 minute buffer)
        if (payload.exp && payload.exp < currentTime + 300) {
          // Token is expired or will expire soon, remove it
          localStorage.removeItem('jwt_access')
          return false
        }
        
        return true
      } catch (error) {
        // Invalid token format, remove it
        console.error('Invalid token format:', error)
        localStorage.removeItem('jwt_access')
        return false
      }
    },
    signin () {
      this.$http.plain.post('/signin', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          this.signinSuccessful(response)
        })
        .catch(error => {
          console.error('Login failed:', error)
          this.signinFailed(error)
        })
    },

    signinSuccessful (response) {
      if (!response || !response.data || !response.data.access) {
        this.signinFailed(response)
        return
      }
      
      // Store the JWT token
      localStorage.setItem('jwt_access', response.data.access)
      
      // Store user data in Vuex store
      if (response.data.user) {
        this.$store.dispatch('login', response.data.user)
      }
      
      this.error = ''
      this.$router.replace('/dashboard')
    },
    signinFailed: function (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Login failed. Please try again.'
      this.password = ''
      localStorage.removeItem('jwt_access')
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left Panel -->
      <div class="login-box">
        <!-- Logo Section -->
        <div class="logo-section">
          <p class="welcome-text">Welcome to</p>
          <h1 class="logo">
            <span class="ne">NE</span><span class="volve">volve</span>
          </h1>
          <p class="tagline">
            A Smart task management tool prioritizing progress<br>
            for effective governance
          </p>
        </div>

        <!-- Login Form Section -->
        <div class="login-form">
          <h2 class="login-title">Log in to your Account</h2>
          <p class="login-subtitle">Enter your credential to proceed</p>

          <form @submit.prevent="signin">
            <div class="error-message" v-if="error">
              {{ error }}
            </div>

            <div class="form-group">
              <div class="input-wrapper modern-input">
                <span class="input-icon">✉</span>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="Email"
                  @input="clearError"
                  required
                  autocomplete="username"
                >
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper modern-input">
                <span class="input-icon">🔒</span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  placeholder="Password"
                  @input="clearError"
                  required
                  autocomplete="current-password"
                >
                <span class="password-toggle" @click="togglePassword" :title="showPassword ? 'Hide' : 'Show'">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#666" stroke-width="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3.5" stroke="#666" stroke-width="2"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#666" stroke-width="2" d="M17.94 17.94A10.97 10.97 0 0 1 12 19c-7 0-11-7-11-7a21.8 21.8 0 0 1 5.06-6.06M9.88 9.88A3.5 3.5 0 0 1 12 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .7-.21 1.36-.57 1.9M1 1l22 22"/></svg>
                </span>
              </div>
            </div>

            <div class="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" class="login-button">
              Log In
            </button>

            <!-- <div class="signup-link">
              Don't have an account? 
              <router-link to="/signup" class="link">Sign up here</router-link>
            </div> -->

            <p class="disclaimer">For illustration purpose only</p>
          </form>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="illustration-panel">
        <div class="task-diagram">
          <div class="task-nodes">
            <div class="task-node task-1">
              <span class="task-label">Task 1</span>
            </div>
            <div class="task-node task-2">
              <span class="task-label">Task 2</span>
            </div>
            <div class="task-node task-3">
              <span class="task-label">Task 3</span>
            </div>
          </div>

          <div class="preview-card">
            <div class="card-header"> </div>
            <div class="card-header"> </div><div class="card-header" style="margin-top: 5px"> </div>
            <div class="card-content">
              <div class="preview-line"></div>
              <div class="preview-line"></div>
              <div class="preview-line"></div>
              <div class="preview-line"></div>
              <div class="preview-line"></div>
            </div>
          </div>
        </div>

        <div class="illustration-text">
          <h3>Stay on top of what matters most</h3>
          <p>Our platform smartly prioritizes tasks to boost efficiency and drive impactful decision.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;  /* Changed from height to min-height for better responsiveness */
  min-width: 100vw;       /* Using viewport width unit */
  display: flex;
  align-items: stretch;  /* Changed from center to stretch */
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;   /* Prevent horizontal scrollbar */
}

.login-container {
  display: flex;
  width: 100%;
  min-width: 100vw;
  min-height: 600px;
  height: 100vh;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  margin: 0;           /* Remove any margin */
  border-radius: 0;
}

/* Left Panel Styles */
.login-box {
  flex: 1;
  padding: 40px 80px;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;  /* Vertical centering */
  justify-content: center;
}

.logo-section {
  text-align: center;
  margin-bottom: 48px;
}

.welcome-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.logo {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.ne {
  color: #0066FF;
}

.volve {
  color: #009951;
}

.tagline {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

/* Login Form Styles */
.login-form {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.login-title {
  color: #0066FF;
  font-size: 24px;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.login-subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper.modern-input {
  background: #f4f8fb;
  border-radius: 10px;
  border: 1.5px solid #e0e7ef;
  box-shadow: 0 2px 8px rgba(30,64,175,0.04);
  transition: border 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 0;
}
.input-wrapper.modern-input:focus-within {
  border: 1.5px solid #1e3a8a;
  box-shadow: 0 0 0 2px #1e3a8a22;
  background: #fff;
}
.input-wrapper.modern-input input {
  background: transparent;
  border: none;
  box-shadow: none;
  padding-left: 2.5em;
  padding-right: 2.5em;
  font-size: 1.05em;
  color: #1e293b;
  font-weight: 500;
  height: 48px;
  border-radius: 10px;
  outline: none;
  transition: background 0.2s;
}
.input-wrapper.modern-input input:focus {
  background: #fff;
}
.input-wrapper .input-icon {
  left: 1em;
  color: #1e3a8a;
  font-size: 1.2em;
}
.input-wrapper .password-toggle {
  right: 1em;
  color: #1e3a8a;
  font-size: 1.2em;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}
.input-wrapper .password-toggle svg {
  display: block;
}
.input-wrapper .password-toggle:active {
  color: #fbbf24;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  font-size: 16px;
}

input {
  width: 100%;
  padding: 12px 40px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 14px;
  background: #FAFAFA;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #0066FF;
  background: white;
}

.forgot-password {
  text-align: right;
  margin: 16px 0 24px;
}

.forgot-password a {
  color: #0066FF;
  text-decoration: none;
  font-size: 14px;
}

.signup-link {
  text-align: center;
  margin: 24px 0;
  color: #666;
  font-size: 14px;
}

.signup-link .link {
  color: #0066FF;
  text-decoration: none;
  font-weight: 500;
}

.signup-link .link:hover {
  text-decoration: underline;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-button:hover {
  background: #0052CC;
}

.disclaimer {
  text-align: center;
  color: #999;
  font-size: 12px;
  margin-top: 24px;
}

/* Right Panel Styles */
.illustration-panel {
  height: 100%;
  flex: 1;
  background: #0066FF;
  padding: 48px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.task-diagram {
  position: relative;
  height: 300px;
  margin-bottom: 48px;
}

.task-nodes {
  position: relative;
  height: 100%;
}

.task-node {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.task-label {
  position: absolute;
  color: white;
  font-size: 12px;
  top: -24px;
  white-space: nowrap;
}

.task-1 { top: 20%; left: 50%; transform: translateX(-50%); }
.task-2 { bottom: 30%; left: 30%; }
.task-3 { bottom: 30%; right: 30%; }

.task-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 160px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  border-right: 2px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.preview-card {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.card-header {
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  font-weight: 500;
}

.card-content {
  padding: 16px;
}

.preview-line {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin-bottom: 8px;
}

.illustration-text {
  text-align: center;
}

.illustration-text h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.illustration-text p {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
}

.error-message {
  background: #FEE2E2;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
}

@media (max-width: 1024px) {
  .login-container {
    margin: 24px;
    flex-direction: column;
  }

  .login-box {
    padding: 40px;
  }

  .illustration-panel {
    padding: 40px 24px;
  }
}

@media (max-width: 640px) {
  .login-box {
    padding: 24px;
  }

  .illustration-panel {
    display: none;
  }
}
</style>
