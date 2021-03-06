import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6A6A6A',
        secondary: '#b0bec5',
        accent: '#DB4C3F',
        error: '#b71c1c'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
