import Vue from "vue";
import Buefy from "buefy";
import App from "./components/App.vue";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

new Vue({
  render: (create) => create(App),
}).$mount("#app");
