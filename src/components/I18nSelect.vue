<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex i18n-locale">
      <img
        class="h-5 w-7"
        :src="require(`@/assets/images/flags/${getCurrentLocaleData.flag}.svg`)"
        :alt="getCurrentLocaleData.flag"
      />
      <span class="hidden sm:block ml-2">
        {{ getCurrentLocaleData.lang }}
      </span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown">
      <vs-dropdown-item @click="updateLocale('en')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/uk.svg" alt="en" />
        &nbsp;English
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('fr')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/fr.svg" alt="fr" />
        &nbsp;French
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('pt')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/pt.svg" alt="pt" />
        &nbsp;Portuguese
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('it')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/it.svg" alt="it" />
        &nbsp;Italian
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('pl')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/pl.svg" alt="pl" />
        &nbsp;Polish
      </vs-dropdown-item>
      <vs-dropdown-item @click="updateLocale('dk')">
        <img class="h-4 w-5 mr-1" src="@/assets/images/flags/dk.svg" alt="dk" />
        &nbsp;Danish
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import { UPDATE_I18N_LOCALE } from "@/store/constants";

export default {
  name: "i18n-select",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    getCurrentLocaleData() {
      const locale = this.$store.getters.locale;
      if (locale === "en") return { flag: "uk", lang: "English (UK)" };
      else if (locale === "pt") return { flag: "pt", lang: "Portuguese" };
      else if (locale === "fr") return { flag: "fr", lang: "French" };
      else if (locale === "it") return { flag: "it", lang: "Italian" };
      else if (locale === "pl") return { flag: "pl", lang: "Polish" };
      else if (locale === "dk") return { flag: "dk", lang: "Danish" };
      return { flag: "uk", lang: "English (UK)" };
    }
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch(UPDATE_I18N_LOCALE, locale);
    }
  }
};
</script>
