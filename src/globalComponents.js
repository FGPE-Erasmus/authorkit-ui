import Vue from "vue";

import FgpeCard from "./components/fgpe-card/FgpeCard.vue";
import vSelect from "vue-select";
import FgpeTooltip from "./layouts/components/FgpeTooltip.vue";
import FgpeBreadcrumb from "./layouts/components/FgpeBreadcrumb.vue";
import FeatherIcon from "./components/FeatherIcon.vue";
import vueFilePond, { setOptions } from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "vue-select/dist/vue-select.css";

import "filepond/dist/filepond.min.css";

Vue.component(FgpeCard.name, FgpeCard);
Vue.component("v-select", vSelect);
Vue.component(FgpeTooltip.name, FgpeTooltip);
Vue.component(FgpeBreadcrumb.name, FgpeBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);

// file upload
setOptions({
  instantUpload: false
});
Vue.component(
  "file-pond",
  vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileValidateSize)
);
