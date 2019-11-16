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
                src="@/assets/images/pages/lock-screen.png"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="p-8">
                <div class="fgpe-card__title mb-8">
                  <h4 class="mb-4">{{ $t("LockScreen.Title") }}</h4>
                  <p>{{ $t("LockScreen.Message") }}</p>
                </div>

                <!-- inputs -->

                <div class="mb-4">
                  <router-link to="/pages/login"
                    >{{ $t("LockScreen.NotUser", {
                      name: this.name
                    }) }}</router-link
                  >
                  <vs-button class="float-right">{{ $t("LockScreen.Unlock") }}</vs-button>
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
      user: state => state.auth.profile
    }),

    name() {
      return this.user.first_name + " " + this.user.last_name;
    }
  }
};
</script>
