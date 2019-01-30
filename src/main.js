import Vue from "vue";

// Call index to load all plugins
import "./plugins/";

// Call index to execute autoload components
import "./components";

import App from "./App.vue";
import router from "./router";
import store from "./store/";
import i18n from "./plugins/i18n";

import "./registerServiceWorker";

Vue.config.productionTip = false;

const token = localStorage.getItem("token");

if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount("#app");
