// API Service for Rails Backend Integration
// Handles all communication with the backend API

class ApiService {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://mdoner-production.up.railway.app';
    
    this.token = localStorage.getItem('jwt_access') || null;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('jwt_access', token);
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('jwt_access');
  }

  // Get headers for API requests
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Make API request with error handling
  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: this.getHeaders(options.includeAuth !== false),
      });

      // Handle 401 Unauthorized (token expired)
      if (response.status === 401) {
        this.clearToken();
        // You can emit an event here to redirect to login
        throw new Error('Authentication required. Please login again.');
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // ===== AUTHENTICATION ENDPOINTS =====

  // User login
  async login(email, password) {
    const data = await this.makeRequest('/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false, // Don't include auth header for login
    });

    if (data.success && data.access) {
      this.setToken(data.access);
    }

    return data;
  }

  // User logout
  async logout() {
    try {
      await this.makeRequest('/signout', {
        method: 'DELETE',
      });
    } finally {
      this.clearToken();
    }
  }

  // ===== CONVERSATION ENDPOINTS =====

  // Create new conversation
  async createConversation(title = null) {
    const payload = {};
    if (title) payload.title = title;

    return await this.makeRequest('/api/conversations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // List user conversations
  async listConversations(limit = 20, beforeId = null) {
    let url = `/api/conversations?limit=${limit}`;
    if (beforeId) url += `&before_id=${beforeId}`;

    return await this.makeRequest(url);
  }

  // Delete conversation
  async deleteConversation(conversationId) {
    return await this.makeRequest(`/api/conversations/${conversationId}`, {
      method: 'DELETE',
    });
  }

  // ===== MESSAGE ENDPOINTS =====

  // Get conversation messages
  async getMessages(conversationId) {
    return await this.makeRequest(`/api/conversations/${conversationId}/messages`);
  }

  // Send message to AI
  async sendMessage(conversationId, content) {
    return await this.makeRequest(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // ===== HEALTH CHECK =====

  // Check backend health
  async checkHealth() {
    try {
      const data = await this.makeRequest('/api/health', { includeAuth: false });
      return { healthy: true, data };
    } catch (error) {
      return { healthy: false, error: error.message };
    }
  }

  // ===== UTILITY METHODS =====

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get current user info from token (basic implementation)
  getCurrentUser() {
    if (!this.token) return null;
    
    try {
      // This is a basic implementation - in production you might want to decode JWT properly
      // or make a request to get user info
      return {
        token: this.token,
        // Add more user info as needed
      };
    } catch (error) {
      console.error('Error parsing user info:', error);
      return null;
    }
  }

  // Refresh token if needed (implement based on your JWT strategy)
  async refreshToken() {
    // Implement token refresh logic if needed
    // This depends on your JWT configuration
    console.log('Token refresh not implemented');
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export for use in Vue components
export default apiService;

// Also export the class for testing or multiple instances
export { ApiService };
