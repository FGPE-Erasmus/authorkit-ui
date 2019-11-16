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
                src="@/assets/images/pages/reset-password.png"
                alt="reset-password"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col flex sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
            >
              <div class="vx-col flex flex-col w-full content-between p-8">
                <div class="fgpe-card__title mb-8">
                  <h4 class="mb-4">{{ $t("ResetPassword.Title") }}</h4>
                  <p>{{ $t("ResetPassword.Message") }}</p>
                </div>

                <ValidationProvider
                  rules="required|min:8|max:100|password:confirmation"
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

                <div
                  class="flex flex-wrap justify-between flex-col-reverse sm:flex-row"
                >
                  <vs-button
                    type="border"
                    to="/pages/login"
                    class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                    >{{ $t("Password.BackToLogin")}}</vs-button
                  >
                  <vs-button class="w-full sm:w-auto">{{ $t("Password.Reset") }}</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </fgpe-card>
    </div>
  </div>
</template>

<script>
/* import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import { MODULE_BASE, AUTH_SET_PASSWORD } from "@/store/auth/auth.constants";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      email: "",
      password: "",
      confirm_password: ""
    };
  },
  methods: {
    resetPassword() {
      if (this.isUserLoggedIn()) {
        this.notifyAlreadyLoggedIn();
        return;
      }

      this.$store
        .dispatch(`${MODULE_BASE}/${AUTH_SET_PASSWORD}`, {
          resetToken: this.email,
          password: this.password
        })
        .then(() => {
          this.$vs.notify({
            title: "Account Password Reset",
            text: "You have successfully reset your password!",
            iconPack: "feather",
            icon: "icon-check",
            color: "success"
          });
          this.$router.push(
            this.$router.currentRoute.query.to || "/pages/login"
          );
        })
        .catch(error => {
          this.$vs.notify({
            title: "Account Password Reset Failed",
            text: error.message,
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
  
}; */
</script>
