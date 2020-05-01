<template>
  <fgpe-card
    :title="title"
    :subtitle="module"
    ref="card"
    @cardselected="onExerciseSelect()"
    class="cursor-pointer"
  >
    <template slot="actions">
      <vs-dropdown class="cursor-pointer" vs-custom-content vs-trigger-click>
        <feather-icon
          icon="MoreVerticalIcon"
          svgClasses="w-6 h-6 text-grey"
        ></feather-icon>

        <vs-dropdown-menu class="w-32">
          <vs-dropdown-item
            v-if="permissions[projectId] >= 2"
            @click="$emit('edit')"
          >
            <feather-icon
              icon="EditIcon"
              class="flex items-center mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Edit") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-else-if="permissions[projectId] >= 1"
            @click="$emit('edit')"
          >
            <feather-icon
              icon="EyeIcon"
              class="flex items-center mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.View") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item @click="$emit('export', id)">
            <div class="flex flex-row">
              <feather-icon
                icon="ArrowDownCircleIcon"
                class="flex items-center mr-2"
                svgClasses="w-4 h-4"
              /><span>{{ $t("Card.Actions.Export") }}</span>
            </div>
          </vs-dropdown-item>
          <vs-divider
            v-if="permissions[projectId] >= 3"
            class="my-1 p-1"
          ></vs-divider>
          <vs-dropdown-item
            v-if="permissions[projectId] >= 3"
            @click="confirmDelete()"
          >
            <div class="flex flex-row">
              <feather-icon
                icon="TrashIcon"
                class="flex items-center mr-2"
                svgClasses="w-4 h-4"
              /><span>{{ $t("Card.Actions.Delete") }}</span>
            </div>
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </template>

    <div class="flex mt-6 flex-wrap">
      <span
        v-if="difficulty"
        :title="$t('Exercise.Difficulty')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="ShieldIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon
        ><span class="ml-2">{{ difficulty }}</span></span
      >
    </div>
  </fgpe-card>
</template>

<script>
import { mapState } from "vuex";

import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "exercise-card",
  props: {
    id: String,
    title: String,
    module: String,
    ownerId: String,
    keywords: Array,
    type: String,
    event: String,
    platform: String,
    difficulty: String,
    status: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("permission", {
      permissions: "permissions"
    }),
    projectId() {
      return this.$route.params.project_id;
    }
  },
  methods: {
    onExerciseSelect() {
      this.$emit("select");
    },
    confirmDelete() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.title
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: this.title
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: () => this.$emit("delete", this.id)
      });
    }
  },
  components: {
    FgpeCard
  }
};
</script>
