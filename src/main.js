import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; // Vuesax

Vue.use(Vuesax);

// axios
import axios from "axios";
Vue.prototype.$http = axios;

// Theme Configurations
import "../theme.config.js";

// Algolia - Instant Search
import InstantSearch from "vue-instantsearch";
Vue.use(InstantSearch);

// ACL
import acl from "./acl/acl";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./router";

// Vuex Store
import store from "./store/store";

// i18n
import i18n from "./i18n/i18n";

// FGPE AuthorKit Filters
import "./filters/filters";

// Clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// Tour
import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

// VeeValidate
import "./validation-rules";

// register service worker
import "./registerServiceWorker";

// Feather font icon
require("./assets/css/iconfont.css");

// Material font icon
require("./assets/css/mi-iconfont.css");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  acl,
  render: h => h(App)
}).$mount("#app");
