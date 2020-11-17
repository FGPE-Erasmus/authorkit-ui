<template>
  <div class="fgpe-breadcrumb">
    <ul class="flex flex-wrap items-center">
      <li class="inline-flex items-center">
        <router-link to="/" class="flex items-center">
          <feather-icon
            icon="HomeIcon"
            svgClasses="h-5 w-5 stroke-current text-primary"
          ></feather-icon>
        </router-link>
        <feather-icon
          icon="ChevronsRightIcon"
          svgClasses="w-4 h-4"
          class="breadcrumb-separator mx-2"
        />
      </li>
      <li
        v-for="(link, index) in $route.meta.breadcrumb.slice(1, -1)"
        :key="index"
        class="inline-flex items-center"
      >
        <router-link :to="replacePathParams(link.url)" v-if="link.url">{{
          $t(link.i18n)
        }}</router-link>
        <span class="text-primary cursor-default" v-else>{{
          $t(link.i18n)
        }}</span>
        <span class="breadcrumb-separator mx-2 flex items-start"
          ><feather-icon icon="ChevronsRightIcon" svgClasses="w-4 h-4"
        /></span>
      </li>
      <li class="inline-flex">
        <span
          v-if="$route.meta.breadcrumb.slice(-1)[0].active"
          class="cursor-default"
          >{{ $t($route.meta.breadcrumb.slice(-1)[0].i18n) }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "fgpe-breadcrumb",
  methods: {
    replacePathParams(url) {
      let parts = url.split("/");
      parts = parts.map(part => {
        if (part.startsWith(":")) {
          return this.$route.params[part.substring(1)];
        }
        return part;
      });
      return parts.join("/");
    }
  }
};
</script>
