import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import App from "./components/App.vue";

// Make Buefy and Material Design Icons available to app
Vue.use(Buefy, {
  defaultIconPack: "mdi",
});


new Vue({
  render: (create) => create(App),
}).$mount("#app");
