import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueEvents from 'vue-event-handler'
import vuetify from './plugins/vuetify'
import { projectAuth } from './firebase/config'

Vue.config.productionTip = false

Vue.use(VueEvents)

// siccome se refreshiamo la pagina durante il check autenticazione il risultato sarà nullo qui ogni volta che lo user check cambia valore gli facciamo fare questo
let app

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app')
  }
})
