<template>
  <div
    class="h-screen flex w-full"
    v-bind:class="{ 'theme-dark': !lights, 'theme-light': lights }"
    id="page-verify-email"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <fgpe-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/verify-email.png"
                alt="verify-email"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col flex sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
            >
              <div class="vx-col flex flex-col w-full content-between p-8">
                <div class="fgpe-card__title w-full mb-8">
                  <h4 class="mb-4">{{ $t("VerifyEmail.Title") }}</h4>
                  <p>{{ $t("VerifyEmail.Message") }}</p>
                </div>
                <vs-button class="ml-auto mr-0 mt-auto" @click="verify">
                  {{ $t("VerifyEmail.Verify") }}
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </fgpe-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { MODULE_BASE, AUTH_VERIFY_EMAIL } from "@/store/auth/auth.constants";

export default {
  props: {
    token: {
      type: String
    }
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights
    })
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.token) {
      this.$router.push({ path: "/500" });
    }
  },
  methods: {
    ...mapGetters({
      isUserLoggedIn: "auth/isUserLoggedIn"
    }),

    verify() {
      if (this.isUserLoggedIn()) {
        this.notifyAlreadyLoggedIn();
        return false;
      }
      this.$store
        .dispatch(`${MODULE_BASE}/${AUTH_VERIFY_EMAIL}`, this.token)
        .then(() => {
          this.$vs.notify({
            title: "Email Verified",
            text: "You will be automatically redirected to your dashboard.",
            iconPack: "feather",
            icon: "icon-check-circle",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Email Verification Failed",
            text: err.message,
            iconPack: "feather",
            icon: "icon-x-circle",
            color: "danger"
          });
        });
    },

    notifyAlreadyLoggedIn() {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
    }
  }
};
</script>
