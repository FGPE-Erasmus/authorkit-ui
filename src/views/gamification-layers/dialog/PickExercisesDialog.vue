<template>
  <vs-prompt
    class="pick-exercises-dialog"
    @accept="$emit('pick', selection)"
    @cancel="$emit('cancel')"
    @close="$emit('cancel')"
    :active.sync="dialogActive"
    icon-pack="mi"
    style="z-index: 55000"
  >
    <div class="title">
      <h4 class="mb-4">
        {{ $t("GamificationLayer.PickExercisesDialog.Title") }}
      </h4>
    </div>

    <div class="body w-full">
      <vs-checkbox
        :value="all"
        @change="toggleSelectAll"
        icon-pack="mi md-16"
        class="mb-4"
      >
        {{ $t("GamificationLayer.PickExercisesDialog.SelectAll") }}
      </vs-checkbox>
      <ul class="centerx">
        <li v-for="exercise in exercises" :key="exercise.id" class="mb-2">
          <vs-checkbox
            v-model="selection"
            :vs-value="exercise.id"
            icon-pack="mi md-16"
          >
            {{ exercise.label }}
          </vs-checkbox>
        </li>
      </ul>
    </div>
  </vs-prompt>
</template>

<script>
import {
  MODULE_BASE as EXERCISE_MODULE_BASE,
  EXERCISE_LIST
} from "@/store/exercises/exercise.constants";

export default {
  name: "pick-exercises-dialog",
  props: {
    active: {
      type: Boolean,
      required: true
    },
    projectId: String,
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogActive: this.active,
      exercises: [],
      selection: []
    };
  },
  watch: {
    active(val) {
      this.dialogActive = val;
      this.getExercises();
      this.selection = this.selected;
    },
    selected(val) {
      this.selection = val;
    }
  },
  computed: {
    all() {
      return this.selection.length === this.exercises.length;
    }
  },

  methods: {
    getExercises() {
      this.$store
        .dispatch(`${EXERCISE_MODULE_BASE}/${EXERCISE_LIST}`, {
          filter: [`project_id||eq||${this.projectId}`],
          select: ["id", "title"]
        })
        .then(res => {
          this.exercises = res.map(exercise => ({
            id: exercise.id,
            label: exercise.title
          }));
        })
        .catch(err => {
          this.$vs.notify({
            title: "Failed to get exercises",
            text: err.message,
            iconPack: "mi",
            icon: "error",
            color: "danger"
          });
        });
    },

    toggleSelectAll() {
      if (this.all) {
        this.selection = [];
      } else {
        this.selection = this.exercises.map(exercise => exercise.id);
      }
    }
  }
};
</script>

<style lang="scss">
.pick-exercises-dialog.con-vs-dialog .vs-dialog .vs-dialog-text {
  padding: 1rem;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  overflow: hidden;

  .title {
    flex: 0;
  }

  .body {
    flex: 1;
    overflow: auto;
  }
}
</style>
