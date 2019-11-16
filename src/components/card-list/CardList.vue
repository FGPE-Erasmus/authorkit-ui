<template>
  <div class="card-list">
    <div class="card-list__header">
      <slot name="header">
        <card-list-header
          :size="total"
          :current-page="currentPage"
          :items-per-page="itemsPerPage"
          @create="$emit('create')"
          @itemsperpagechange="$emit('itemsperpagechange', $event)"
        />
      </slot>
    </div>
    <div class="card-list__content">
      <div class="vx-row">
        <div
          class="vx-col w-full md:w-1/3 sm:w-1/2 mb-base"
          v-for="item in items"
          :key="item.id"
        >
          <slot name="card" v-bind:item="item"></slot>
        </div>
      </div>
    </div>
    <div class="card-list__footer">
      <slot name="footer">
        <vs-pagination
          :total="nrOfPages"
          :value="currentPage"
          @change="$emit('currentpagechange', $event)"
          icon-pack="mi"
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
    total: {
      type: Number,
      default: 0
    }
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
