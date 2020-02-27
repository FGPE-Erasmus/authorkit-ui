<template>
  <fgpe-card
    :title="name"
    :subtitle="description"
    ref="card"
    @cardselected="onGamificationLayerSelect()"
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
            v-if="permissions[project.id] >= 2"
            @click="$emit('edit')"
          >
            <feather-icon
              icon="EditIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Edit") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item @click="$emit('export', id)">
            <feather-icon
              icon="ArrowDownCircleIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Export") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="permissions[project.id] >= 3"
            @click="confirmDelete()"
          >
            <feather-icon
              icon="TrashIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Delete") }}</span>
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
    </template>

    <div class="flex mt-6 flex-wrap" vs-align="end">
      <!-- <span
        v-if="difficulty"
        :title="$t('Exercise.Difficulty')"
        class="flex mr-6"
      >
        <feather-icon
          class="cursor-pointer"
          icon="ShieldIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon>
        <span class="ml-2">{{ difficulty }}</span>
      </span> -->
    </div>
  </fgpe-card>
</template>

<script>
import { mapState } from "vuex";

import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "gamification-layer-card",
  props: {
    id: String,
    name: String,
    description: String,
    ownerId: String,
    keywords: Array,
    role: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("project", {
      project: "activeProject"
    }),
    ...mapState("permission", {
      permissions: "permissions"
    })
  },
  methods: {
    onGamificationLayerSelect() {
      this.$emit("select");
    },
    confirmDelete() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: this.name
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: this.name
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
