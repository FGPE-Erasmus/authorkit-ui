<template>
  <div
    class="h-screen flex w-full"
    v-bind:class="{ 'theme-dark': !lights, 'theme-light': lights }"
    id="page-login"
  >
    <div
      class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <img
        src="../../assets/images/pages/maintenance.png"
        alt="maintenance"
        class="mx-auto mb-4"
      />
      <h1 class="mb-6 text-5xl d-theme-heading-color">
        {{ $t("Maintenance.Title") }}
      </h1>
      <p class="mb-6 d-theme-text-inverse">
        {{ $t("Maintenance.Message") }}
      </p>
      <vs-button size="large" to="/">{{ $t("ReturnHome") }}</vs-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {},
  computed: {
    ...mapState({
      lights: state => state.theme_settings.lights
    })
  }
};
</script>
