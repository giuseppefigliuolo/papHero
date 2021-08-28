import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignIn from '@/views/SignIn.vue'

// Route guard
import { projectAuth, projectFirestore } from '../firebase/config'

const requireAuth = async (to, from, next) => {
  let user = projectAuth.currentUser

  if (!user) {
    next({ name: 'Login' })
  } else {
    // se lo user esiste lo facciamo procedere
    router.app.$root.userDoc = await projectFirestore
      .collection('accounts')
      .doc(user.uid)

    router.app.$root.userDoc.collection('exercises').onSnapshot((ref) => {
      router.app.$root.allExercises = ref.docs.map((doc) => {
        const extractedData = doc.data()
        return {
          text: extractedData.name,
          description: extractedData.description,
          imgUrl: extractedData.imgUrl,
          value: doc.id,
          disabled: false,
          existingIn: extractedData.existingIn
        }
      })
    })
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
    path: '/program/:day',
    name: 'SingleProgram',
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
