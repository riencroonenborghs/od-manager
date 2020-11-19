import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Downloads from '@/views/Downloads.vue'
import AddNewDownload from '@/views/AddNewDownload.vue'
import Auth from '@/views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/downloads/queued'
  },
  // extension specific
  {
    path: '/popup.html',
    redirect: '/downloads/queued'
  },
  {
    path: '/downloads',
    name: 'downloads',
    redirect: '/downloads/queued'
  },
  {
    path: '/downloads/new',
    name: 'new-download',
    component: AddNewDownload,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/downloads/:status',
    name: 'status-downloads',
    component: Downloads,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: {
      redirectIfAuth: true
    }
  }//,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.redirectIfAuth) {
    if (store.state.authService.authenticated) {
      return next({ name: 'downloads' })
    } else {
      return next()
    }
  } else if (to.meta.requiresAuth) {
    if (store.state.authService.authenticated) {
      next()
    } else {
      next({ name: 'auth' })
    }
  } else {
    next()
  }
})

export default router
