<template>
  <div class="login-page">
    <div class="login-container">
      <h2>DPR Chatbot Login</h2>
      
      <form @submit.prevent="login">
        <div class="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            placeholder="Enter your email"
          >
        </div>
        
        <div class="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            placeholder="Enter your password"
          >
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        
        <div class="demo-note">
          <strong>Demo Mode:</strong> Any email/password will work for testing
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/chatServices.js'

export default {
  name: 'Login',
  data() {
    return {
      email: 'demo@example.com',
      password: 'password123',
      loading: false,
      error: null
    }
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;
      
      try {
        // Use mock auth service
        const response = await authService.login({
          email: this.email,
          password: this.password
        });
        
        // Save token and user data
        localStorage.setItem('authToken', response.access);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        this.$toast.success('Login successful!');
        
        // Redirect to dashboard
        this.$router.push('/dashboard');
      } catch (err) {
        this.error = err.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
        this.$toast.error('Login failed');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background: #0056b3;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.demo-note {
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
}

.error {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
  padding: 0.5rem;
  background: #f8d7da;
  border-radius: 4px;
}
</style>
