<template>
  <div
    class="h-screen flex w-full"
    v-bind:class="{ 'theme-dark': !lights, 'theme-light': lights }"
    id="page-forgot-password"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <fgpe-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/forgot-password.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col flex sm:w-full md:w-full lg:w-1/2 mx-auto d-theme-dark-bg"
            >
              <div class="flex flex-col mt-auto content-between h-full p-8">
                <div class="fgpe-card__title mb-8">
                  <h4 class="mb-4">{{ $t("ForgotPassword.Title") }}</h4>
                  <p>
                    {{ $t("ForgotPassword.Message") }}
                  </p>
                </div>

                <!-- input -->

                <div
                  class="fgpe-card__actions md:flex md:justify-between mt-auto"
                >
                  <vs-button
                    type="border"
                    to="/pages/login"
                    class="px-4 w-full md:w-auto mt-auto mb-3 md:mb-0"
                  >
                    {{ $t("ForgotPassword.BackToLogin") }}
                  </vs-button>
                  <vs-button class="px-4 w-full md:w-auto mt-auto md:mt-0">
                    {{ $t("ForgotPassword.RecoverPassword") }}
                  </vs-button>
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
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights
    })
  }
};
</script>
