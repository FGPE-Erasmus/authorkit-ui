<template>
  <div id="faq-page">
    <div class="vx-row">
      <div class="vx-col w-full md:w-2/5 lg:w-1/4 rounded-lg">
        <fgpe-card>
          <h4>{{ $t("Documentation.Topics.Title") }}</h4>
          <ul class="faq-topics mt-4">
            <template v-for="(category, id) in categories">
              <li
                :key="id"
                class="p-2 flex items-center"
                :class="faqFilter === +id ? 'text-bold' : ''"
                @click="faqFilter = +id"
              >
                <div
                  class="h-3 w-3 rounded-full mr-2"
                  :class="'bg-' + category.color"
                ></div>
                <span class="cursor-pointer">{{ $t(category.i18n) }}</span>
              </li>
            </template>
          </ul>
        </fgpe-card>
      </div>

      <!-- FAQ COL -->
      <div class="vx-col w-full md:w-3/5 lg:w-3/4 mt-12 md:mt-0">
        <vs-collapse accordion type="margin" class="p-0">
          <vs-collapse-item
            v-for="(que, index) in filteredFaq"
            class="faq-bg rounded-lg"
            icon-pack="mi md-32"
            icon-arrow="keyboard_arrow_down"
            :class="{ 'mt-0': !index }"
            :key="que.id"
          >
            <div slot="header">
              <h5>
                {{ $t(`Documentation.Questions.Q${que.id}`) }}
              </h5>
            </div>
            <div v-html="$t(`Documentation.Questions.A${que.id}`, que.args)"></div>
          </vs-collapse-item>
        </vs-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqSearchQuery: "",
      faqFilter: 1,
      categories: {
        1: {
          i18n: "Documentation.Topics.All",
          color: "grey"
        },
        2: {
          i18n: "Documentation.Topics.General",
          color: "primary"
        },
        3: {
          i18n: "Documentation.Topics.Project",
          color: "success"
        },
        4: {
          i18n: "Documentation.Topics.Exercise",
          color: "warning"
        },
        5: {
          i18n: "Documentation.Topics.GamificationLayer",
          color: "danger"
        }
      },
      faqs: [
        {
          id: 1,
          categoryId: 2
        },
        {
          id: 2,
          categoryId: 2
        },
        /*{
          id: 3,
          categoryId: 2
        },
        {
          id: 4,
          categoryId: 2
        },*/
        {
          id: 5,
          categoryId: 3,
          args: {
            src: require("@/assets/videos/projects-tutorial.mp4")
          }
        },
        /*{
          id: 6,
          categoryId: 3
        },
        {
          id: 7,
          categoryId: 3
        },
        {
          id: 8,
          categoryId: 3
        },*/
        {
          id: 9,
          categoryId: 4,
          args: {
            src: require("@/assets/videos/exercise-create-tutorial.mp4")
          }
        },
        {
          id: 10,
          categoryId: 4
        },
        {
          id: 11,
          categoryId: 4
        },
        /*{
          id: 12,
          categoryId: 4
        },*/
        {
          id: 13,
          categoryId: 5,
          args: {
            src: require("@/assets/videos/gl-create-tutorial.mp4")
          }
        },
        /*{
          id: 14,
          categoryId: 5
        },*/
        {
          id: 15,
          categoryId: 5
        },
        {
          id: 16,
          categoryId: 5
        }
      ]
    };
  },
  computed: {
    filteredFaq() {
      return this.faqs.filter(faq => {
        if (this.faqFilter === 1) {
          return true;
        } else {
          return faq.categoryId === this.faqFilter;
        }
      });
    }
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
#faq-page {
  .faq-jumbotron-content {
    background-size: cover;
  }

  .faq-topics {
    line-height: 1.6;
  }

  .con-content--item {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1rem 0 0.8rem 0;
    }
  }
}
</style>
