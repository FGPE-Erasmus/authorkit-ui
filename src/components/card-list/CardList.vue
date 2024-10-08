<template>
  <div class="card-list">
    <div class="card-list__header">
      <slot name="header">
        <card-list-header
          :sorting-options="sortingOptions"
          :size="total"
          :current-page="currentPage"
          :items-per-page="itemsPerPage"
          :sorting-order="sortingOrder"
          :table-view="tableView"
          :allow-create="allowCreate"
          :allow-import="allowImport"
          :allow-generate="allowGenerate"
          :allow-import-template="allowImportTemplate"
          :allow-upload="allowUpload"
          :allow-template="allowTemplate"
          @generate="$emit('generate')"
          @create="$emit('create')"
          @import="$emit('import', $event)"
          @templateimport="$emit('templateimport', $event)"
          @template="$emit('template')"
          @itemsperpagechange="$emit('itemsperpagechange', $event)"
          @sortchange="$emit('sortchange', $event)"
          @viewchange="$emit('viewchange', $event)"
          @upload="$emit('upload', $event)"
        />
      </slot>
    </div>
    <div class="card-list__content">
      <div v-if="items.length > 0">
        <vs-table
          v-if="tableView"
          ref="table"
          :max-items="itemsPerPage"
          :data="items"
        >
          <template slot="thead">
            <vs-th v-for="(column, index) in columns" :key="index">
              {{ $t(column) }}
            </vs-th>
            <vs-th>
              {{ $t("Table.Actions") }}
            </vs-th>
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <template v-for="tr in data" :data="tr">
                <slot name="row" v-bind:item="tr"></slot>
              </template>
            </tbody>
          </template>
        </vs-table>
        <template v-else>
          <div class="vx-row">
            <div
              class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
              v-for="item in items"
              :key="item.id"
            >
              <slot name="card" v-bind:item="item"></slot>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="w-full flex flex-col align-center justify-center p-24">
        <feather-icon
          class="flex p-8 align-center justify-center"
          icon="EyeOffIcon"
          svgClasses="h-48 w-48"
        />
        <span class="w-full text-lg text-center">{{
          $t("CardList.NoData")
        }}</span>
      </div>
    </div>
    <div class="card-list__footer">
      <slot name="footer">
        <vs-pagination
          v-if="items.length > 0"
          :total="nrOfPages"
          :value="currentPage"
          @change="$emit('currentpagechange', $event)"
          icon-pack="mi"
          class="my-2"
        ></vs-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
import CardListHeader from "@/components/card-list/CardListHeader";

export default {
  components: {
    CardListHeader
  },
  props: {
    pageSizes: {
      type: Array,
      default: () => [6, 12, 18, 24]
    },
    sortingOptions: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 6
    },
    currentPage: {
      type: Number,
      default: 1
    },
    sortingOrder: Object,
    total: {
      type: Number,
      default: 0
    },
    tableView: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    allowImport: {
      type: Boolean,
      default: false
    },
    allowGenerate: {
      type: Boolean,
      default: false
    },
    allowImportTemplate: {
      type: Boolean,
      default: false
    },
    allowTemplate: {
      type: Boolean,
      default: false
    },
    allowUpload: {
      type: Boolean,
      default: false
    },
    columns: Array
  },
  data: () => ({
    visible: 0
  }),
  watch: {},
  computed: {
    nrOfPages() {
      return Math.ceil(this.total / this.itemsPerPage);
    }
  },
  methods: {}
};
</script>

