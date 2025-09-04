import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Signin from '../components/Signin.vue'
import Dashboard from '../components/Dashboard.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    // {
    //   path: '/final',
    //   name: 'FinalDashboard',
    //   component: FinalDashboard,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/completed-tasks',
    //   name: 'CompletedTasks',
    //   component: UnderDevelopment,
    //   props: {
    //     pageTitle: 'Completed Tasks',
    //     progressPercentage: 40,
    //     upcomingFeatures: [
    //       'Historical task completion data',
    //       'Performance analytics',
    //       'Completion time tracking',
    //       'Team productivity insights',
    //       'Advanced filtering options'
    //     ]
    //   },
    //   meta: { requiresAuth: true }
    // },
    //
   
  ]
})

router.beforeEach((to, from, next) => {
  const access = localStorage.getItem('jwt_access')
  const isAuthenticated = access && isTokenValid(access)

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Signin' })
    } else {
      next()
    }
  } else if (to.name === 'Signin') {
    if (isAuthenticated) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

function isTokenValid(token) {
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
}

// router.beforeEach((to, from, next) => {
//   const isSignedIn = localStorage.signedIn

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isSignedIn) {
//       next({ name: 'Signin' })
//     } else {
//       next()
//     }
//   } else if (to.name === 'Signin' || to.name === 'LandingPage') {
//     if (isSignedIn) {
//       next({ name: 'Dashboard' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
