<template>
  <fgpe-card :title="name" ref="card">
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
            @click="editProject()"
          >
            <feather-icon
              icon="EditIcon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Card.Actions.Edit") }}</span>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="role === 'admin' || role === 'owner'"
            @click="shareProject()"
          >
            <feather-icon
              icon="Share2Icon"
              class="inline-block mr-2"
              svgClasses="w-4 h-4"
            /><span>{{ $t("Share") }}</span>
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
          <vs-divider class="m-1"></vs-divider>
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

    <!-- <img
      :src="require(`@/assets/images/pages/${project.img}`)"
      alt="content-img"
      class="responsive rounded-lg"
    /> -->
    <p>{{ description }}</p>

    <div class="flex mt-6 flex-wrap items-end" vs-align="end">
      <span
        v-if="contributors !== undefined"
        :title="$t('Contributors')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="UsersIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon
        ><span class="ml-2">{{ contributors }}</span></span
      >
      <span
        v-if="exercises !== undefined"
        :title="$t('Exercises')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="FileTextIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon
        ><span class="ml-2">{{ exercises }}</span></span
      >
      <div class="vs-spacer"></div>
      <span
        :title="$t('Enter')"
        class="cursor-ponter flex"
        @click="enterProject()"
        ><feather-icon
          class="cursor-pointer"
          icon="ArrowRightCircleIcon"
          svgClasses="text-primary stroke-current h-8 w-8"
        ></feather-icon
      ></span>
    </div>
  </fgpe-card>
</template>

<script>
import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "project-card",
  props: {
    id: String,
    name: String,
    description: String,
    status: String,
    role: String,
    contributors: Number,
    exercises: Number
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    enterProject() {
      this.$emit("open", this.id);
    },
    editProject() {
      this.$emit("edit", this.id);
    },
    shareProject() {
      this.$emit("share", this.id);
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
