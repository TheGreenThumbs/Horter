import Vue from "vue";
import VueLogger from "vuejs-logger";
import Vue2TouchEvents from "vue2-touch-events";
import Buefy from "buefy";
import * as GmapVue from "gmap-vue";
import "buefy/dist/buefy.css";
import App from "./components/App.vue";

// Make Buefy and Material Design Icons available to app
Vue.use(Buefy, {
  defaultIconPack: "mdi",
});

const key = process.env.GOOGLE_API_KEY;

Vue.use(GmapVue, {
  load: {
    key,
  },
  installComponents: true,
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered:", registration);
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
}

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

Vue.use(Vue2TouchEvents);

Vue.config.ignoredElements = [
  "a-scene",
  "a-box",
  "a-cone",
  "a-camera",
  "a-entity",
];

new Vue({
  render: (create) => create(App),
}).$mount("#app");
