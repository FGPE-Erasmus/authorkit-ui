<template>
  <fgpe-list class="fgpe-file-list">
    <template v-for="item in normalizedItems">
      <fgpe-list-header
        v-if="item.header"
        :key="item[categoryIdProp]"
        :title="titleForCategory(item)"
        :class="{
          'text-primary': item.is_default
        }"
      >
        <slot
          name="category-actions"
          v-bind:category="item"
          v-bind:confirm="confirmDelete"
        >
          <div
            v-if="allowCreate"
            class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
            :class="{
              'text-primary': item.is_default
            }"
            @click="$emit('create')"
          >
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
          </div>
        </slot>
      </fgpe-list-header>
      <fgpe-list-item
        v-else
        :key="item[itemIdProp]"
        :title="titleForItem(item)"
        :subtitle="subtitleForItem(item)"
      >
        <div
          v-if="allowUpdate"
          class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
          @click="$emit('edit', item)"
        >
          <feather-icon icon="EditIcon" svgClasses="h-4 w-4" />
        </div>
        <div
          v-if="allowDelete"
          class="py-2 px-2 cursor-pointer flex items-center justify-between text-base"
          @click="confirmDelete(item)"
        >
          <feather-icon icon="Trash2Icon" svgClasses="h-4 w-4" />
        </div>
      </fgpe-list-item>
    </template>
  </fgpe-list>
</template>

<script>
import { truncateWithEllipses } from "@/assets/utils/strings";

import FgpeList from "@/components/fgpe-list/FgpeList";
import FgpeListHeader from "@/components/fgpe-list/FgpeListHeader";
import FgpeListItem from "@/components/fgpe-list/FgpeListItem";

export default {
  components: {
    "fgpe-list": FgpeList,
    "fgpe-list-header": FgpeListHeader,
    "fgpe-list-item": FgpeListItem
  },
  props: {
    defaultCategory: String,
    categories: {
      type: Array,
      default: () => []
    },
    categoryIdProp: {
      type: String,
      default: "id"
    },
    categoryTitleProp: String,
    items: {
      type: Array,
      default: () => []
    },
    itemCategoryProp: String,
    itemIdProp: {
      type: String,
      default: "id"
    },
    itemTitleProp: String,
    itemSubtitleProp: String,
    allowCreate: {
      type: Boolean,
      default: true
    },
    allowUpdate: {
      type: Boolean,
      default: true
    },
    allowDelete: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    categoriesById() {
      return this.categories.reduce((map, cat) => {
        map[cat[this.categoryIdProp]] = cat;
        return map;
      }, {});
    },
    itemsByCategory() {
      if (this.itemCategoryProp) {
        return this.items.reduce(
          (rv, x) => {
            if (!x[this.itemCategoryProp]) {
              (rv[this.defaultCategory] = rv[this.defaultCategory] || []).push(
                x
              );
            } else {
              (rv[x[this.itemCategoryProp]] =
                rv[x[this.itemCategoryProp]] || []).push(x);
            }
            return rv;
          },
          this.categories.reduce(
            (cats, x) => {
              cats[x[this.categoryIdProp]] = [];
              return cats;
            },
            {
              [this.defaultCategory]: []
            }
          )
        );
      } else {
        return {
          [this.defaultCategory]: this.items.slice()
        };
      }
    },
    normalizedItems() {
      const items = [];
      for (const key in this.itemsByCategory) {
        if (this.itemsByCategory.hasOwnProperty(key)) {
          // category
          let category;
          if (this.defaultCategory === key) {
            category = {
              [this.categoryIdProp]: key,
              [this.categoryTitleProp]: key,
              is_default: true
            };
            category.header = true;
            items.unshift(category);
          } else {
            category = this.categoriesById[key];
            category.header = true;
            items.push(category);
          }
          // items of category
          const children = this.itemsByCategory[key];
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.header = false;
            if (category.is_default) {
              items.splice(1, 0, child);
            } else {
              items.push(child);
            }
          }
        }
      }
      return items;
    }
  },
  methods: {
    titleForCategory(cat) {
      if (this.categoryTitleProp && cat[this.categoryTitleProp]) {
        return truncateWithEllipses(cat[this.categoryTitleProp], 35);
      } else if (this.categoryIdProp && cat[this.categoryIdProp]) {
        return truncateWithEllipses(cat[this.categoryIdProp], 25);
      }
      return "";
    },
    titleForItem(item) {
      if (this.itemTitleProp && item[this.itemTitleProp]) {
        return truncateWithEllipses(item[this.itemTitleProp], 35);
      }
      return "";
    },
    subtitleForItem(item) {
      if (this.itemSubtitleProp && item[this.itemSubtitleProp]) {
        return truncateWithEllipses(item[this.itemSubtitleProp], 70);
      }
      return "";
    },
    confirmDelete(item) {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("Dialogs.ConfirmDelete.Title", {
          item: item.header
            ? this.titleForCategory(item)
            : this.titleForItem(item)
        }),
        text: this.$t("Dialogs.ConfirmDelete.Message", {
          item: item.header
            ? this.titleForCategory(item)
            : this.titleForItem(item)
        }),
        "accept-text": this.$t("Form.Delete"),
        "cancel-text": this.$t("Form.Cancel"),
        accept: () => this.$emit("delete", item)
      });
    }
  }
};
</script>
