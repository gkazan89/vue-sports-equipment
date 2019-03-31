import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import axios from "axios";

import VueCurrencyFilter from "vue-currency-filter";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

Vue.use(VueCurrencyFilter, {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "front",
  symbolSpacing: true
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
