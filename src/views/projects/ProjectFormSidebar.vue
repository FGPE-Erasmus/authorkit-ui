<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="project-form-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        {{
          isNew
            ? $t("Form.Title.Create", { type: $t("_Project") }).toUpperCase()
            : $t("Form.Title.Update", { type: $t("_Project") }).toUpperCase()
        }}
      </h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <ValidationObserver v-slot="{ invalid }">
      <VuePerfectScrollbar
        class="scroll-area--data-list-add-new pt-4 pb-6"
        :settings="settings"
      >
        <div class="p-6">
          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <ValidationProvider
                name="name"
                rules="required|max:50|min:2"
                v-slot="{ errors }"
                persist
              >
                <vs-input
                  :label-placeholder="$t('Project.Name')"
                  name="name"
                  v-model="project.name"
                  class="mt-5 w-full"
                />
                <span class="text-danger text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="vx-row">
            <div class="vx-col w-full mb-2">
              <ValidationProvider
                name="description"
                rules="max:250"
                v-slot="{ errors }"
                persist
              >
                <vs-textarea
                  :label="$t('Project.Description')"
                  name="description"
                  v-model="project.description"
                  :class="{
                    hasValue: !!project.description
                  }"
                  class="mt-5 w-full"
                />
                <span class="text-danger text-sm">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>

          <div class="vx-row" v-if="isNew || permissions[project.id] >= 4">
            <div class="vx-col w-full mb-2">
              <vs-checkbox
                name="public"
                v-model="project.is_public"
                class="mt-5 w-full"
                icon-pack="mi md-16"
              >
                {{ $t("Public") }}
              </vs-checkbox>
            </div>
          </div>

          <div class="vx-row" v-if="isNew || permissions[project.id] >= 3">
            <div class="vx-col w-full mb-2">
              <ValidationProvider
                name="status"
                rules="required"
                v-slot="{ errors }"
                persist
              >
                <fgpe-select
                  name="status"
                  v-model="project.status"
                  class="mt-5 w-full select-large"
                  :label-placeholder="$t('Project.Status')"
                  :options="status_choices"
                  :clearable="false"
                  :searchable="false"
                >
                  <template slot="option" slot-scope="option">
                    <div class="d-center">
                      {{ $t("Project.Statuses." + option.label.toUpperCase()) }}
                    </div>
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    <div class="selected d-center">
                      {{ $t("Project.Statuses." + option.label.toUpperCase()) }}
                    </div>
                  </template>
                </fgpe-select>
                <span v-show="errors[0]" class="text-danger text-sm">
                  {{ errors[0] }}
                </span>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>

      <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button
          @click="$emit('submit', project)"
          class="mr-6"
          :disabled="invalid"
        >
          {{ $t("Form.Save") }}
        </vs-button>
        <vs-button
          type="border"
          color="danger"
          @click="isSidebarActiveLocal = false"
          >{{ $t("Cancel") }}</vs-button
        >
      </div>
    </ValidationObserver>
  </vs-sidebar>
</template>

<script>
import { mapState } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import VuePerfectScrollbar from "vue-perfect-scrollbar";

import FgpeSelect from "@/components/FgpeSelect";

export default {
  name: "project-form-sidebar",
  components: {
    ValidationObserver,
    ValidationProvider,
    VuePerfectScrollbar,
    "fgpe-select": FgpeSelect
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      empty: {
        name: "",
        description: "",
        is_public: false,
        status: "draft"
      },
      status_choices: ["draft", "announced", "open", "closed"],
      project: undefined,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    ...mapState({
      permissions: state => state.permission.permissions
    }),

    isNew: {
      get() {
        return this.project.id === undefined;
      }
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
        }
      }
    }
  },
  watch: {
    data(val) {
      if (val) {
        this.project = Object.assign({}, val);
      } else {
        this.project = Object.assign({}, this.empty);
      }
    }
  },
  created() {
    this.project = Object.assign({}, this.empty);
  }
};
</script>

<style lang="scss" scoped>
.project-form-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(100% - 10rem);
}
</style>
