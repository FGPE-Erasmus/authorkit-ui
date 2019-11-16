import Vue from "vue";
import Vuesax from "vuesax";

import colors from "./colors.config.json";

Vue.use(Vuesax, { theme: { colors } });

const themeConfig = {
  lights: false,
  routerTransition: "zoom-fade",
  disableThemeTour: false
};

export default themeConfig;
