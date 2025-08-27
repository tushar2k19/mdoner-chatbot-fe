// Backend Health Monitoring Service
// Implements circuit breaker pattern and health checks

class BackendHealthService {
  constructor() {
    this.isBackendHealthy = true
    this.failureCount = 0
    this.lastFailureTime = null
    this.circuitBreakerThreshold = 2 // Number of failures before opening circuit
    this.circuitBreakerTimeout = 120000 // 2 minutes to try again
    this.healthCheckInterval = null
    this.API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mdoner-production.up.railway.app'
  }

  // Start periodic health checks
  startHealthMonitoring() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
    
    // Check health every 30 seconds
    this.healthCheckInterval = setInterval(() => {
      this.checkBackendHealth()
    }, 30000)
    
    // Initial health check
    this.checkBackendHealth()
  }

  // Stop health monitoring
  stopHealthMonitoring() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
      this.healthCheckInterval = null
    }
  }

  // Check if backend is healthy
  async checkBackendHealth() {
    try {
      const response = await fetch(`${this.API_URL}/up`, {
        method: 'GET',
        timeout: 5000, // 5 second timeout
        signal: AbortSignal.timeout(5000)
      })
      
      if (response.ok) {
        this.markBackendHealthy()
        return true
      } else {
        this.markBackendUnhealthy()
        return false
      }
    } catch (error) {
      console.warn('Backend health check failed:', error.message)
      this.markBackendUnhealthy()
      return false
    }
  }

  // Mark backend as healthy and reset circuit breaker
  markBackendHealthy() {
    if (!this.isBackendHealthy) {
      console.log('Backend is back online!')
    }
    this.isBackendHealthy = true
    this.failureCount = 0
    this.lastFailureTime = null
    this.notifyHealthChange(true)
  }

  // Mark backend as unhealthy and potentially open circuit breaker
  markBackendUnhealthy() {
    this.failureCount++
    this.lastFailureTime = Date.now()
    
    if (this.failureCount >= this.circuitBreakerThreshold) {
      if (this.isBackendHealthy) {
        console.warn('Circuit breaker opened - backend appears to be down')
        this.isBackendHealthy = false
        this.notifyHealthChange(false)
      }
    }
  }

  // Check if circuit breaker should be reset (timeout period)
  shouldResetCircuitBreaker() {
    if (!this.lastFailureTime) return false
    
    const timeSinceLastFailure = Date.now() - this.lastFailureTime
    return timeSinceLastFailure > this.circuitBreakerTimeout
  }

  // Get current backend status
  getBackendStatus() {
    return {
      isHealthy: this.isBackendHealthy,
      failureCount: this.failureCount,
      lastFailureTime: this.lastFailureTime,
      shouldReset: this.shouldResetCircuitBreaker()
    }
  }

  // Check if requests should be allowed
  canMakeRequest() {
    if (this.isBackendHealthy) {
      return true
    }
    
    // Check if circuit breaker should be reset
    if (this.shouldResetCircuitBreaker()) {
      console.log('Attempting to reset circuit breaker...')
      this.isBackendHealthy = true
      this.failureCount = 0
      return true
    }
    
    return false
  }

  // Notify components about health status change
  notifyHealthChange(isHealthy) {
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('backendHealthChange', {
      detail: { isHealthy, timestamp: Date.now() }
    }))
  }

  // Enhanced request wrapper with health checking
  async makeRequest(requestFn, options = {}) {
    const { 
      timeout = 10000, 
      retries = 1, 
      retryDelay = 1000,
      showLoading = true 
    } = options

    // Check circuit breaker first
    if (!this.canMakeRequest()) {
      throw new Error('Backend service is currently unavailable. Please try again later.')
    }

    let lastError = null
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Show loading if requested
        if (showLoading && window.showGlobalLoading) {
          window.showGlobalLoading()
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const result = await requestFn(controller.signal)
        
        clearTimeout(timeoutId)
        
        // Hide loading
        if (showLoading && window.hideGlobalLoading) {
          window.hideGlobalLoading()
        }

        // Mark as healthy on success
        this.markBackendHealthy()
        return result

      } catch (error) {
        lastError = error
        
        // Hide loading on error
        if (showLoading && window.hideGlobalLoading) {
          window.hideGlobalLoading()
        }

        // Mark as unhealthy
        this.markBackendUnhealthy()

        // If this was the last attempt, throw the error
        if (attempt === retries) {
          break
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)))
      }
    }

    throw lastError
  }

  // Force an immediate health check and update modal
  async forceHealthCheck() {
    await this.checkBackendHealth();
  }
}

// Create singleton instance
const backendHealthService = new BackendHealthService()

export default backendHealthService 