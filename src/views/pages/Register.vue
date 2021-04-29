<template>
  <div
    class="h-screen flex w-full"
    v-bind:class="{ 'theme-dark': !lights, 'theme-light': lights }"
    id="page-register"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <div class="back-home" v-on:click="$router.push('/home')">
        <vs-icon size="large" icon="chevron_left" icon-pack="mi"></vs-icon>
      </div>
      <fgpe-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/register.jpg"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="p-8">
                <div class="fgpe-card__title">
                  <h4 class="mb-4">{{ $t("Register.Title") }}</h4>
                  <p>{{ $t("Register.Message") }}</p>
                </div>

                <ValidationObserver v-slot="{ invalid }">
                  <div class="clearfix">
                    <div class="vx-row">
                      <div
                        class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto"
                      >
                        <ValidationProvider
                          rules="required"
                          name="firstname"
                          mode="eager"
                          :persist="true"
                          v-slot="{ errors }"
                        >
                          <vs-input
                            :label-placeholder="$t('Register.FirstName')"
                            name="firstname"
                            v-model="firstname"
                            class="w-full"
                          />
                          <span class="text-danger text-sm">{{
                            errors[0]
                          }}</span>
                        </ValidationProvider>
                      </div>
                      <div
                        class="vx-col w-full sm:w-full md:w-full lg:w-1/2 mx-auto"
                      >
                        <ValidationProvider
                          rules="required"
                          name="lastname"
                          mode="eager"
                          :persist="true"
                          v-slot="{ errors }"
                        >
                          <vs-input
                            :label-placeholder="$t('Register.LastName')"
                            name="lastname"
                            v-model="lastname"
                            class="w-full"
                          />
                          <span class="text-danger text-sm">{{
                            errors[0]
                          }}</span>
                        </ValidationProvider>
                      </div>
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
                        :label-placeholder="$t('Register.Email')"
                        v-model="email"
                        class="w-full mt-6"
                      />
                      <span class="text-danger text-sm">{{ errors[0] }}</span>
                    </ValidationProvider>

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
                        :label-placeholder="$t('Register.Password')"
                        v-model="password"
                        class="w-full mt-6"
                      />
                      <span class="text-danger text-sm">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                      rules="required"
                      name="password_confirmation"
                      vid="confirmation"
                      mode="eager"
                      :persist="true"
                      v-slot="{ errors }"
                    >
                      <vs-input
                        type="password"
                        name="password_confirmation"
                        :label-placeholder="$t('Register.ConfirmPassword')"
                        v-model="confirm_password"
                        class="w-full mt-6"
                      />
                      <span class="text-danger text-sm">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                      name="terms"
                      :rules="{ required: { allowFalse: false } }"
                      v-slot="{ errors }"
                    >
                      <div>
                        <div class="vx-row align-center w-full mt-6">
                          <vs-checkbox
                            v-model="isTermsConditionAccepted"
                            name="terms"
                            class="vx-col pr-0 mr-0"
                            icon-pack="mi md-16"
                          >
                            {{ $t("Register.TermsConditions") }}
                          </vs-checkbox>
                          <a
                            class="cursor-pointer vx-col px-2"
                            @click="termsConditionsPopupActive = true"
                          >
                            {{ $t("Register.ReadTermsConditions") }}
                          </a>
                        </div>
                        <span class="text-danger text-sm">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>

                    <vs-button type="border" to="/pages/login" class="mt-6">
                      {{ $t("Register.Login") }}
                    </vs-button>
                    <vs-button
                      class="float-right mt-6"
                      @click="registerUser"
                      :disabled="invalid"
                      >{{ $t("Register.Register") }}</vs-button
                    >
                  </div>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </fgpe-card>
    </div>
    <terms-conditions-popup
      :active="termsConditionsPopupActive"
      @close-popup="termsConditionsPopupActive = false"
    ></terms-conditions-popup>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import { MODULE_BASE, AUTH_REGISTER } from "@/store/auth/auth.constants";
import TermsConditionsPopup from "@/components/TermsConditionsPopup";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    TermsConditionsPopup
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
      termsConditionsPopupActive: false,
      isTermsConditionAccepted: false
    };
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights
    })
  },
  methods: {
    ...mapGetters({
      isUserLoggedIn: "auth/isUserLoggedIn"
    }),

    registerUser() {
      if (this.isUserLoggedIn()) {
        this.notifyAlreadyLoggedIn();
        return;
      }

      // Register user
      this.$store
        .dispatch(`${MODULE_BASE}/${AUTH_REGISTER}`, {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$vs.notify({
            title: "Account Created",
            text: "You are successfully registered!",
            iconPack: "mi",
            icon: "check_circle",
            color: "success"
          });
          this.$router.push(
            this.$router.currentRoute.query.to || "/pages/login"
          );
        })
        .catch(error => {
          this.$vs.notify({
            title: "Registration Failed",
            text: error.message,
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
