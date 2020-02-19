<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-update-file-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>
        {{
          existing
            ? $t("Form.Title.Update", { type: name }).toUpperCase()
            : $t("Form.Title.Create", { type: name }).toUpperCase()
        }}
      </h4>
      <feather-icon
        icon="XIcon"
        @click.stop="isSidebarActiveLocal = false"
        class="cursor-pointer"
      ></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <ValidationObserver
      ref="form-file-observer"
      @submit.prevent="submit"
      v-slot="{ invalid }"
    >
      <VuePerfectScrollbar
        class="scroll-area--data-list-add-update pt-4 pb-6"
        :settings="settings"
      >
        <div class="p-6">
          <slot name="form" />
        </div>
      </VuePerfectScrollbar>

      <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
        <vs-button class="mr-6" @click="submit" :disabled="invalid">
          {{ $t("Form.Save") }}
        </vs-button>
        <vs-button
          type="border"
          color="danger"
          @click="isSidebarActiveLocal = false"
          >{{ $t("Form.Cancel") }}</vs-button
        >
      </div>
    </ValidationObserver>
  </vs-sidebar>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "add-update-file-sidebar",
  components: {
    ValidationObserver,
    VuePerfectScrollbar
  },
  props: {
    name: String,
    existing: {
      type: Boolean,
      default: false
    },
    isSidebarActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("close-sidebar");
        }
        this.$refs["form-file-observer"].reset();
      }
    }
  },
  methods: {
    async submit() {
      const isValid = await this.$refs["form-file-observer"].validate();
      if (isValid) {
        this.$emit("submit");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-update-file-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .file-upload {
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

.scroll-area--data-list-add-update {
  height: calc(100% - 10rem);
}
</style>
