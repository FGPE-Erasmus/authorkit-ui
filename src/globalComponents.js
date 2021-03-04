import Vue from "vue";
import vSelect from "vue-select";

import FgpeCard from "./components/fgpe-card/FgpeCard.vue";
import FgpeTooltip from "./layouts/components/FgpeTooltip.vue";
import FgpeBreadcrumb from "./layouts/components/FgpeBreadcrumb.vue";
import FeatherIcon from "./components/FeatherIcon.vue";
import vueFilePond, { setOptions } from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Autocomplete from "@trevoreyre/autocomplete-vue";

import "vue-select/dist/vue-select.css";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

import "@trevoreyre/autocomplete-vue/dist/style.css";

Vue.component(FgpeCard.name, FgpeCard);
Vue.component("v-select", vSelect);
Vue.component(FgpeTooltip.name, FgpeTooltip);
Vue.component(FgpeBreadcrumb.name, FgpeBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);

Vue.use(Autocomplete);

// file upload
setOptions({
  instantUpload: false
});
Vue.component(
  "file-pond",
  vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview
  )
);
