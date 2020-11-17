<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import colors from "@/../colors.config.json";

import { AUTH_LOGOUT } from "@/store/auth/auth.constants";

export default {
  watch: {
    "$store.getters.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$store.getters.loading"(val) {
      this.toggleLoading(val);
    }
  },
  async created() {
    // proceed with logout (401 returned)
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(AUTH_LOGOUT);
        }
        throw err;
      });
    });
    this.toggleLoading(this.$store.getters.loading);
  },
  methods: {
    ...mapGetters({
      theme: "theme"
    }),
    toggleClassInBody(className) {
      if (className === "dark") {
        document.body.classList.add("theme-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
      }
    },
    toggleLoading(val) {
      if (val) {
        this.$vs.loading({
          background: this.theme() === "dark" ? "#102b3a" : "#eff2f5",
          color: colors.primary
        });
      } else {
        this.$vs.loading.close();
      }
    }
  },
  mounted() {
    this.toggleClassInBody(this.theme());
  }
};
</script>
