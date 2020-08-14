<template>
  <div
    id="page-reset-password"
    class="h-screen flex w-full"
    v-bind:class="{ 'theme-dark': !lights, 'theme-light': lights }"
  >
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <fgpe-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/reset-password.png"
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
                  <h4 class="mb-4">{{ $t("ResetPassword.Title") }}</h4>
                  <p>{{ $t("ResetPassword.Message") }}</p>
                </div>

                <div class="w-full">
                  <ValidationProvider
                    rules="required|min:8|max:100|strongPassword|password:confirmation"
                    name="password"
                    mode="eager"
                    :persist="true"
                    v-slot="{ errors }"
                  >
                    <vs-input
                      ref="password"
                      type="password"
                      name="password"
                      :label-placeholder="$t('ResetPassword.Password')"
                      v-model="password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{ errors[0] }}</span>
                  </ValidationProvider>

                  <ValidationProvider
                    rules="required"
                    vid="confirmation"
                    name="password_confirmation"
                    mode="eager"
                    :persist="true"
                    v-slot="{ errors }"
                  >
                    <vs-input
                      type="password"
                      name="password_confirmation"
                      :label-placeholder="$t('ResetPassword.ConfirmPassword')"
                      v-model="confirm_password"
                      class="w-full mt-6"
                    />
                    <span class="text-danger text-sm">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <div
                  class="flex flex-wrap justify-between flex-col-reverse sm:flex-row mt-6 "
                >
                  <vs-button
                    type="border"
                    to="/pages/login"
                    class="w-full md:w-auto mt-6"
                    >{{ $t("ResetPassword.BackToLogin") }}</vs-button
                  >
                  <vs-button
                    class="w-full md:w-auto mt-6"
                    @click="reset"
                    :disabled="invalid"
                    >{{ $t("ResetPassword.Reset") }}</vs-button
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

import { MODULE_BASE, AUTH_SET_PASSWORD } from "@/store/auth/auth.constants";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
    return {
      password: "",
      confirm_password: ""
    };
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

    reset() {
      if (this.isUserLoggedIn()) {
        this.notifyAlreadyLoggedIn();
        return false;
      }
      this.$store
        .dispatch(`${MODULE_BASE}/${AUTH_SET_PASSWORD}`, {
          reset_token: this.token,
          password: this.password
        })
        .then(() => {
          this.$vs.notify({
            title: "Reset Password Succeeded",
            text:
              "Your password has been reset, you may now access to your dashboard.",
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Reset Password Failed",
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
