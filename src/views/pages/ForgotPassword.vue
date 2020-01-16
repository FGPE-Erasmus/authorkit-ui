<template>
  <div class="h-screen flex w-full">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <fgpe-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/forgot-password.png"
                alt="reset-password"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col flex sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
            >
              <ValidationObserver
                v-slot="{ invalid }"
                tag="form"
                class="vx-col flex flex-col w-full justify-between p-8"
              >
                <div class="fgpe-card__title mb-8">
                  <h4 class="mb-4">{{ $t("ForgotPassword.Title") }}</h4>
                  <p>{{ $t("ForgotPassword.Message") }}</p>
                </div>

                <ValidationProvider
                  rules="required|email|min:3"
                  name="email"
                  mode="eager"
                  :persist="true"
                  v-slot="{ errors }"
                >
                  <vs-input
                    name="email"
                    type="email"
                    :label-placeholder="$t('ForgotPassword.Email')"
                    v-model="email"
                    class="w-full mt-6"
                  />
                  <span class="text-danger text-sm">{{ errors[0] }}</span>
                </ValidationProvider>

                <div
                  class="flex flex-wrap justify-between flex-col-reverse sm:flex-row mt-6 "
                >
                  <vs-button
                    type="border"
                    to="/pages/login"
                    class="w-full md:w-auto mt-6"
                    >{{ $t("ForgotPassword.BackToLogin") }}</vs-button
                  >
                  <vs-button
                    class="w-full md:w-auto mt-6"
                    @click="recover"
                    :disabled="invalid"
                    >{{ $t("ForgotPassword.Recover") }}</vs-button
                  >
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </fgpe-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import { MODULE_BASE, AUTH_RESET_PASSWORD } from "@/store/auth/auth.constants";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights
    })
  },
  data() {
    return {
      email: ""
    };
  },
  mounted() {},
  methods: {
    ...mapGetters({
      isUserLoggedIn: "auth/isUserLoggedIn"
    }),

    recover() {
      if (this.isUserLoggedIn()) {
        this.notifyAlreadyLoggedIn();
        return false;
      }
      this.$store
        .dispatch(`${MODULE_BASE}/${AUTH_RESET_PASSWORD}`, this.email)
        .then(() => {
          this.$vs.notify({
            title: "Password Reset Email Sent",
            text: "A reset password email has been sent to you.",
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Password Reset Failed",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    notifyAlreadyLoggedIn() {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "mi",
        icon: "warning",
        color: "warning"
      });
    }
  }
};
</script>
