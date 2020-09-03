import Vue from "vue";
import VueLogger from "vuejs-logger";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import App from "./components/App.vue";

// Make Buefy and Material Design Icons available to app
Vue.use(Buefy, {
  defaultIconPack: "mdi",
});

const isDevelopment = process.env.NODE_ENV === "development";

const loggingOptions = {
  isEnabled: isDevelopment,
  logLevel: isDevelopment ? "debug" : "error",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};

Vue.use(VueLogger, loggingOptions);

new Vue({
  render: (create) => create(App),
}).$mount("#app");
