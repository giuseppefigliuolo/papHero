import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#6A6A6A",
        secondary: "#b0bec5",
        accent: "#ff8577",
        error: "#b71c1c",
      },
    },
  },
});