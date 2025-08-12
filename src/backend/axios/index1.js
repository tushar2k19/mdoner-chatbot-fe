import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mdoner-production.up.railway.app'
// const API_URL = 'https://wadibackend.com'
function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    let encodedValue = parts.pop().split(';').shift()
    return decodeURIComponent(encodedValue)
  }
}
const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // Add timeout and debug interceptors
  timeout: 10000
})

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    const csrfToken = getCookie('csrf_token')
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }
  }
  const token = localStorage.getItem('jwt_access')
  // alert (token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

securedAxiosInstance.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': getCookie('csrf_token') } })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true

        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = getCookie('csrf_token')
        return plainAxiosInstance.request(retryConfig)
      }).catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn
        location.replace('/login')
        return Promise.reject(error)
      })
  } else {
    return Promise.reject(error)
  }
})

export {securedAxiosInstance, plainAxiosInstance}
