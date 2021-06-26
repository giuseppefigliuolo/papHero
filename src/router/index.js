import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignIn from '@/views/SignIn.vue'

// Route guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    // se lo user esiste lo facciamo procedere
    next()
  }
}

const requireLogout = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: 'Home' })
  } else {
    // se lo user esiste lo facciamo procedere
    next()
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireLogout
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: requireLogout
  },
  {
    path: '/:day',
    name: 'single-day',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SingleDay.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
