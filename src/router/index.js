import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import TentativeDashboard from '../components/TentativeDashboard.vue'
import FinalDashboard from '../components/FinalDashboard.vue'
import CompletedTasks from '../components/CompletedTasks.vue'
import Home from '../components/Home.vue'
import ReviewInterface from '../components/ReviewInterface.vue'
import ReviewDashboard from '../components/ReviewDashboard.vue'
import UnderDevelopment from '../components/UnderDevelopment.vue'

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
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/daily-dashboard',
      name: 'DailyDashboard',
      component: UnderDevelopment,
      props: {
        pageTitle: 'Daily Dashboard',
        progressPercentage: 15,
        upcomingFeatures: [
          'Real-time task status updates',
          'Daily performance metrics',
          'Interactive charts and graphs',
          'Task completion trends',
          'Priority-based task sorting'
        ]
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/tentative',
      name: 'TentativeDashboard',
      component: TentativeDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/final',
      name: 'FinalDashboard',
      component: FinalDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/completed-tasks',
      name: 'CompletedTasks',
      component: UnderDevelopment,
      props: {
        pageTitle: 'Completed Tasks',
        progressPercentage: 40,
        upcomingFeatures: [
          'Historical task completion data',
          'Performance analytics',
          'Completion time tracking',
          'Team productivity insights',
          'Advanced filtering options'
        ]
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/review-tasks',
      name: 'ReviewTasks',
      component: ReviewDashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/system-logs',
      name: 'SystemLogs',
      component: UnderDevelopment,
      props: {
        pageTitle: 'System Logs',
        progressPercentage: 20,
        upcomingFeatures: [
          'Real-time system monitoring',
          'Error tracking and alerts',
          'User activity logs',
          'Performance metrics',
          'Audit trail functionality'
        ]
      }
    },
    {
      path: '/completed',
      name: 'CompletedTasksOld',
      component: CompletedTasks,
      meta: { requiresAuth: true }
    },
    {
      path: '/review/:id',
      name: 'ReviewInterface',
      component: ReviewInterface,
      props: route => ({ reviewId: route.params.id }),
      meta: { requiresAuth: true }
    }
    
    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard,
    //   meta: { requiresAuth: true }
    // },
  ]
})

router.beforeEach((to, from, next) => {
  const isSignedIn = localStorage.signedIn

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isSignedIn) {
      next({ name: 'Signin' })
    } else {
      next()
    }
  } else if (to.name === 'Signin' || to.name === 'LandingPage') {
    if (isSignedIn) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
