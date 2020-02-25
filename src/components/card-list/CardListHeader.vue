<template>
  <div
    id="card-list-header"
    class="flex flex-wrap-reverse items-center flex-grow justify-between"
  >
    <div class="flex flex-wrap-reverse items-center">
      <div
        v-if="allowCreate"
        class="py-2 px-6 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg text-base text-white bg-primary"
        @click="$emit('create')"
      >
        <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
        <span class="ml-2 text-base">{{ $t("CardList.Header.Create") }}</span>
      </div>
      <div
        v-if="allowImport"
        class="py-2 px-6 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg text-base text-primary border border-solid border-primary"
        @click="chooseArchive"
      >
        <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-4 w-4" />
        <span class="ml-2 text-base text-primary">{{
          $t("CardList.Header.Import")
        }}</span>
      </div>
    </div>

    <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 ml-4">
      <div
        class="px-6 py-2 border border-solid border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between"
      >
        <span class="mr-2">
          {{
            $t("CardList.Header.ItemsPerPage", {
              start,
              end,
              size
            })
          }}
        </span>
        <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
      </div>

      <vs-dropdown-menu class="w-16">
        <vs-dropdown-item
          v-for="size in pageSizes"
          :key="size"
          @click="$emit('itemsperpagechange', size)"
        >
          <span>{{ size }}</span>
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
    <input
      v-if="allowImport"
      id="archiveImport"
      type="file"
      hidden
      style="display:none"
      accept="application/zip,application/octet-stream,application/x-zip-compressed,multipart/x-zip"
      @change="importArchive($event.target.files[0])"
    />
  </div>
</template>

<script>
export default {
  name: "card-list-header",
  props: {
    size: Number,
    currentPage: Number,
    itemsPerPage: Number,
    pageSizes: {
      type: Array,
      default: () => [6, 12, 18, 24]
    },
    allowCreate: {
      type: Boolean,
      default: true
    },
    allowImport: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    start() {
      return this.currentPage * this.itemsPerPage - (this.itemsPerPage - 1);
    },
    end() {
      return this.size - this.currentPage * this.itemsPerPage > 0
        ? this.currentPage * this.itemsPerPage
        : this.size;
    }
  },
  methods: {
    chooseArchive() {
      document.getElementById("archiveImport").click();
    },
    importArchive(file) {
      if (file) {
        this.$emit("import", file);
      }
      document.getElementById("archiveImport").value = "";
    }
  }
};
</script>
