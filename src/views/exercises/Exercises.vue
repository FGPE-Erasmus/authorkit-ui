<template>
  <card-list
    :currentPage="currentPage"
    :itemsPerPage="itemsPerPage"
    :total="totalItems"
    :items="exercises"
    @itemsperpagechange="itemsPerPage = $event"
    @currentpagechange="currentPage = $event"
    @create="create"
  >
    <template v-slot:card="{ item }">
      <exercise-card
        :id="item.id"
        :title="item.title"
        :module="item.module"
        :owner_id="item.owner_id"
        :keywords="item.keywords"
        :type="item.type"
        :event="item.event"
        :platform="item.platform"
        :difficulty="item.difficulty"
        :status="item.status"
        :role="'owner'"
        @edit="update(item)"
        @delete="remove"
      />
    </template>
  </card-list>
</template>

<script>
import { mapState } from "vuex";

import {
  MODULE_BASE,
  EXERCISE_LIST,
  EXERCISE_DELETE
} from "@/store/exercises/exercise.constants";

import CardList from "@/components/card-list/CardList";
import ExerciseCard from "@/views/exercises/ExerciseCard";

export default {
  components: {
    CardList,
    ExerciseCard
  },
  data: () => ({
    exercises: [],
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0
  }),
  watch: {
    itemsPerPage: function() {
      this.fetchExercises();
    },
    currentPage: function() {
      this.fetchExercises();
    }
  },
  computed: {
    projectId() {
      return this.$route.params.project_id;
    },
    ...mapState("project", {
      project: "activeProject"
    })
  },
  created() {
    this.fetchExercises();
  },
  mounted() {},
  methods: {
    setItemsPerPage(itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
    },
    setCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    fetchExercises() {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_LIST}`, {
          page: this.currentPage,
          limit: this.itemsPerPage,
          filter: [`project_id||eq||${this.projectId}`]
        })
        .then(res => {
          this.exercises = res.data;
          this.totalItems = res.total;
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to List Exercises",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },
    create() {
      this.$router.push(`/projects/${this.projectId}/exercises/new`);
    },
    update(exercise) {
      this.$router.push(`/projects/${this.projectId}/exercises/${exercise.id}`);
    },
    remove(id) {
      this.$store
        .dispatch(`${MODULE_BASE}/${EXERCISE_DELETE}`, id)
        .then(() => {
          this.fetchExercises();
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to Delete Exercise",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    }
  }
};
</script>
