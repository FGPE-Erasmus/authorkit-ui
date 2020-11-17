<template>
  <fgpe-card
    :title="truncateWithEllipses(project.name, 20)"
    ref="card"
    :allow-view="allowView"
    :allow-export="allowExport"
    :allow-edit="allowEdit"
    :allow-share="allowShare"
    :allow-remove="allowRemove"
    @view="$emit('view')"
    @edit="$emit('edit')"
    @export="$emit('export')"
    @share="$emit('share')"
    @remove="$emit('remove')"
    class="flex flex-col"
  >
    <p>{{ truncateWithEllipses(project.description, 40) }}</p>

    <div class="flex mt-6 flex-wrap items-end">
      <span
        v-if="project.countContributors !== undefined"
        :title="$t('Projects.Card.Contributors')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="UsersIcon"
          svgClasses="text-primary stroke-current h-4 w-4 lg:h-6 lg:w-6"
        ></feather-icon
        ><span class="ml-2">{{ project.countContributors }}</span></span
      >
      <span
        v-if="project.countExercises !== undefined"
        :title="$t('Projects.Card.Exercises')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="FileTextIcon"
          svgClasses="text-primary stroke-current h-4 w-4 lg:h-6 lg:w-6"
        ></feather-icon
        ><span class="ml-2">{{ project.countExercises }}</span></span
      >
      <span
        v-if="project.countGamificationLayers !== undefined"
        :title="$t('Projects.Card.GamificationLayers')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="LayersIcon"
          svgClasses="text-primary stroke-current h-4 w-4 lg:h-6 lg:w-6"
        ></feather-icon
        ><span class="ml-2">{{ project.countGamificationLayers }}</span></span
      >
      <div class="vs-spacer"></div>
      <span
        :title="$t('Projects.Card.Open')"
        class="cursor-ponter flex"
        @click="enterProject()"
        ><feather-icon
          class="cursor-pointer"
          icon="ArrowRightCircleIcon"
          svgClasses="text-primary stroke-current h-6 w-6 lg:h-8 lg:w-8"
        ></feather-icon
      ></span>
    </div>
  </fgpe-card>
</template>

<script>
import { truncateWithEllipses } from "@/assets/utils/strings";
import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "project-card",
  components: {
    FgpeCard
  },
  props: {
    project: Object,
    allowView: {
      type: Boolean,
      default: true
    },
    allowExport: {
      type: Boolean,
      default: true
    },
    allowShare: {
      type: Boolean,
      default: true
    },
    allowEdit: {
      type: Boolean,
      default: true
    },
    allowRemove: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {
    truncateWithEllipses,
    enterProject() {
      this.$emit("view", this.project);
    }
  }
};
</script>
