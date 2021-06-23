import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueEvents from "vue-event-handler";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VueEvents);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
