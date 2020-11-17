<template>
  <add-update-file-sidebar
    :name="$t('Exercise._TestSet')"
    :existing="!!testset.id"
    :is-sidebar-active="isSidebarActive"
    @submit="$emit('submit', testset)"
    @close-sidebar="$emit('close-sidebar')"
  >
    <template v-slot:form>
      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="name"
            rules="required|max:100"
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('TestSetFile.Name')"
              :text="$t('TestSetFile.Hints.Name')"
              color="primary"
              position="left"
            >
              <vs-input
                name="name"
                v-model="testset.name"
                :label-placeholder="$t('TestSetFile.Name')"
                class="w-full"
              />
            </vs-tooltip>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <ValidationProvider
            name="weight"
            rules="required|max:100|min:0"
            v-slot="{ errors }"
            persist
          >
            <vs-tooltip
              :title="$t('TestSetFile.Weight')"
              :text="$t('TestSetFile.Hints.Weight')"
              color="primary"
              position="left"
            >
              <label class="fgpe-label">
                {{ $t("TestSetFile.Weight") }}
              </label>
              <vs-input-number
                name="weight"
                v-model.number="testset.weight"
                :step="1"
                min="0"
                max="100"
                size="medium"
                icon-pack="mi"
              />
            </vs-tooltip>
            <span v-show="errors[0]" class="text-danger text-sm">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col w-full mb-2">
          <vs-tooltip
            :title="$t('TestSetFile.Visible')"
            :text="$t('TestSetFile.Hints.Visible')"
            color="primary"
            position="left"
          >
            <vs-checkbox
              name="visible"
              v-model="testset.visible"
              class="mt-5 w-full"
              icon-pack="mi md-16"
            >
              {{ $t("TestSetFile.Visible") }}
            </vs-checkbox>
          </vs-tooltip>
        </div>
      </div>
    </template>
  </add-update-file-sidebar>
</template>

<script>
import { ValidationProvider } from "vee-validate";

import AddUpdateFileSidebar from "@/components/sidebar-form/AddUpdateFileSidebar";

export default {
  name: "testset-sidebar",
  components: {
    ValidationProvider,
    "add-update-file-sidebar": AddUpdateFileSidebar
  },
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    item: Object
  },
  created() {
    this.testset = Object.assign({}, this.empty);
  },
  data() {
    return {
      empty: {
        name: "",
        weight: 0,
        visible: false
      },
      testset: undefined
    };
  },
  watch: {
    item(val) {
      if (!val) {
        this.testset = Object.assign({}, this.empty);
      } else {
        this.testset = Object.assign({}, val);
      }
    }
  },
  computed: {},
  methods: {}
};
</script>
