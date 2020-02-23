<template>
  <fgpe-card
    :title="title"
    :subtitle="module"
    ref="card"
    @cardselected="onExerciseSelect()"
    class="cursor-pointer"
  >
    <template slot="actions">
      <vs-dropdown
        v-if="role === 'admin' || role === 'owner' || role === 'manager'"
        class="cursor-pointer"
        vs-trigger-click
      >
        <feather-icon
          icon="MoreVerticalIcon"
          svgClasses="w-6 h-6 text-grey"
        ></feather-icon>

        <vs-dropdown-menu class="w-32">
          <vs-dropdown-item
            v-if="role === 'admin' || role === 'owner' || role === 'manager'"
            @click="$emit('edit')"
          >
            <feather-icon
              icon="EditIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Edit") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="role === 'admin' || role === 'owner' || role === 'manager'"
            @click="$emit('export', id)"
          >
            <feather-icon
              icon="ArrowDownCircleIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Export") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="role === 'admin' || role === 'owner'"
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
import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "exercise-card",
  props: {
    id: String,
    title: String,
    module: String,
    owner_id: String,
    keywords: Array,
    type: String,
    event: String,
    platform: String,
    difficulty: String,
    status: String,
    role: String
  },
  data() {
    return {};
  },
  computed: {},
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
