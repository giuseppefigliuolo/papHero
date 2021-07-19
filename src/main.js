import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueEvents from 'vue-event-handler'
import vuetify from './plugins/vuetify'
import { projectAuth } from './firebase/config'

Vue.config.productionTip = false

Vue.use(VueEvents)

let app

projectAuth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      data: {
        user,
        userDoc: null,
        allExercises: []
      },
      router,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
