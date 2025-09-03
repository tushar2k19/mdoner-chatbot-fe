import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Signin from "../components/Signin.vue";
import TestServices from "@/components/TestServices.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "Signin",
      component: Signin
    },
    {
      path: "/test-services",
      name: "TestServices",
      component: TestServices
    }
    // {
    //   path: '/signup',
    //   name: 'Signup',
    //   component: Signup
    // },
    // {
    //   path: '/daily-dashboard',
    //   name: 'DailyDashboard',
    //   component: UnderDevelopment,
    //   props: {
    //     pageTitle: 'Daily Dashboard',
    //     progressPercentage: 15,
    //     upcomingFeatures: [
    //       'Real-time task status updates',
    //       'Daily performance metrics',
    //       'Interactive charts and graphs',
    //       'Task completion trends',
    //       'Priority-based task sorting'
    //     ]
    //   },
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/tentative',
    //   name: 'TentativeDashboard',
    //   component: TentativeDashboard,
    //   meta: { requiresAuth: true }
    // },
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
    // {
    //   path: '/review-tasks',
    //   name: 'ReviewTasks',
    //   component: ReviewDashboard,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/system-logs',
    //   name: 'SystemLogs',
    //   component: UnderDevelopment,
    //   props: {
    //     pageTitle: 'System Logs',
    //     progressPercentage: 20,
    //     upcomingFeatures: [
    //       'Real-time system monitoring',
    //       'Error tracking and alerts',
    //       'User activity logs',
    //       'Performance metrics',
    //       'Audit trail functionality'
    //     ]
    //   }
    // },
    // {
    //   path: '/completed',
    //   name: 'CompletedTasksOld',
    //   component: CompletedTasks,
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/review/:id',
    //   name: 'ReviewInterface',
    //   component: ReviewInterface,
    //   props: route => ({ reviewId: route.params.id }),
    //   meta: { requiresAuth: true }
    // }

    // {
    //   path: '/dashboard',
    //   name: 'Dashboard',
    //   component: Dashboard,
    //   meta: { requiresAuth: true }
    // },
  ]
});

router.beforeEach((to, from, next) => {
  const access = localStorage.getItem("jwt_access");
  const isAuthenticated = access && isTokenValid(access);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: "Signin" });
    } else {
      next();
    }
  } else if (to.name === "Signin") {
    if (isAuthenticated) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

function isTokenValid(token) {
  try {
    // Decode JWT token to check expiration
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired (with 5 minute buffer)
    if (payload.exp && payload.exp < currentTime + 300) {
      // Token is expired or will expire soon, remove it
      localStorage.removeItem("jwt_access");
      return false;
    }

    return true;
  } catch (error) {
    // Invalid token format, remove it
    console.error("Invalid token format:", error);
    localStorage.removeItem("jwt_access");
    return false;
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

export default router;
