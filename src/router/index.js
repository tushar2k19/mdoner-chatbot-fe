import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      redirect: '/dashboard'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_access')
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Route requires authentication
    if (!token) {
      next({ name: 'Signin' })
    } else {
      next()
    }
  } else if (to.name === 'Signin') {
    // User is trying to access signin page
    if (token) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
