<template>
  <fgpe-card :title="name" ref="card">
    <template slot="actions">
      <vs-dropdown
        v-if="permissions[id] >= 2"
        class="cursor-pointer"
        vs-trigger-click
      >
        <feather-icon
          icon="MoreVerticalIcon"
          svgClasses="w-6 h-6 text-grey"
        ></feather-icon>

        <vs-dropdown-menu class="w-32">
          <vs-dropdown-item v-if="permissions[id] >= 2" @click="editProject()">
            <div class="flex flex-row">
              <feather-icon
                icon="EditIcon"
                class="flex items-center mr-2"
                svgClasses="w-4 h-4"
              /><span>{{ $t("Card.Actions.Edit") }}</span>
            </div>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="permissions[id] >= 3"
            @click="$emit('share', id)"
          >
            <div class="flex flex-row">
              <feather-icon
                icon="Share2Icon"
                class="flex items-center mr-2"
                svgClasses="w-4 h-4"
              /><span>{{ $t("Share") }}</span>
            </div>
          </vs-dropdown-item>
          <vs-dropdown-item
            v-if="permissions[id] >= 1"
            @click="$emit('export', id)"
          >
            <div class="flex flex-row">
              <feather-icon
                icon="ArrowDownCircleIcon"
                class="flex items-center mr-2"
                svgClasses="w-4 h-4"
              /><span>{{ $t("Card.Actions.Export") }}</span>
            </div>
          </vs-dropdown-item>
          <vs-divider v-if="permissions[id] >= 4" class="my-1 p-1"></vs-divider>
          <vs-dropdown-item
            v-if="permissions[id] >= 4"
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
      <span
        v-if="gamificationLayers !== undefined"
        :title="$t('GamificationLayers')"
        class="flex mr-6"
        ><feather-icon
          class="cursor-pointer"
          icon="LayersIcon"
          svgClasses="text-primary stroke-current h-6 w-6"
        ></feather-icon
        ><span class="ml-2">{{ gamificationLayers }}</span></span
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
import { mapState } from "vuex";

import FgpeCard from "@/components/fgpe-card/FgpeCard.vue";

export default {
  name: "project-card",
  components: {
    FgpeCard
  },
  props: {
    id: String,
    name: String,
    description: String,
    status: String,
    contributors: Number,
    exercises: Number,
    gamificationLayers: Number
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    ...mapState({
      permissions: state => state.permission.permissions
    })
  },
  methods: {
    enterProject() {
      this.$emit("open", this.id);
    },
    editProject() {
      this.$emit("edit", this.id);
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
  }
};
</script>
