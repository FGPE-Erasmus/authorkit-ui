import Vue from "vue";
import VueI18n from "vue-i18n";

import enData from "./en.i18n";
import ptData from "./pt.i18n";
import frData from "./fr.i18n";
import itData from "./it.i18n";
import plData from "./pl.i18n";
import dkData from "./dk.i18n";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "en", // set default locale
  messages: {
    en: enData,
    pt: ptData,
    fr: frData,
    it: itData,
    pl: plData,
    dk: dkData
  }
});
