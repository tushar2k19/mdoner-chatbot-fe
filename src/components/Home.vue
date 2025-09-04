<template>
  <div class="home-container">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Redirecting to Dashboard...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    // Redirect to dashboard if user is authenticated
    const token = localStorage.getItem('jwt_access');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.$router.replace('/dashboard');
    } else {
      this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f7f7f8;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e5e5;
  border-top: 4px solid #10a37f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

p {
  color: #565869;
  font-size: 16px;
  margin: 0;
}
</style>