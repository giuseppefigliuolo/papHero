import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueEvents from 'vue-event-handler'
import vuetify from './plugins/vuetify'
import { projectAuth, projectFirestore } from './firebase/config'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueEvents)

let app

projectAuth.onAuthStateChanged((_user) => {
  if (!app) {
    app = new Vue({
      data: {
        user: _user,
        userDoc: projectFirestore.collection('accounts').doc(_user?.uid),
        allExercises: []
      },
      router,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
