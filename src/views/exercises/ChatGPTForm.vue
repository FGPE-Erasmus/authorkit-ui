<template>
  <fgpe-card id="chatgpt-form">
    <div class="form-container">
      <textarea v-model="text" placeholder="Write the excercise you want to generate." class="auto-resizable-textarea vs-inputx vs-input--input normal" style="border: 1px solid rgba(0, 0, 0, 0.2);"></textarea>
    </div>
    <div class="button-container">
      <button @click="submitForm" class="wizard-btn wizard-footer-right vs-button vs-button-primary vs-button-filled" style="background-color: rgba(var(--vs-primary), 1); border-color: rgba(var(--vs-primary), 1); color: white;">
        Send
      </button>
    </div>
  </fgpe-card>
</template>

<script>
import {
  MODULE_BASE,
  EXERCISE_GENERATE
} from "@/store/exercises/exercise.constants";

export default {
  data() {
    return {
      text: '',
      projectId: this.$route.params.project_id || this.$store.state.project.currentProjectId
    };
  },
  computed: {
    currentProjectId() {
      return this.$route.params.project_id || this.$store.state.project.currentProjectId;
    }
  },
  methods: {
    submitForm() {
      return new Promise((resolve, reject) => {
        this.$store
            .dispatch(
              `${MODULE_BASE}/${EXERCISE_GENERATE}`, {
                text: this.text, 
                project_id: this.projectId
              }
            )
            .then(res => {
              console.log(res);
              this.$vs.notify({
                title: "Exercises Generated",
                text: `Exercise has been generate successfully.`,
                iconPack: "mi",
                icon: "check_circle",
                color: "success"
              });
              this.$router.push(`/projects/${this.projectId}/gamification-layers/${res}`);

              resolve(res);
            })
            .catch(err => {
              this.$vs.notify({
                title: "Failed to Generate Exercise",
                text: err.message,
                iconPack: "mi",
                icon: "error",
                color: "danger"
              });
              reject(err);
            });
      });
    },
  },
};
</script>

<style scoped>
.form-container {
  margin-bottom: 20px;
}

.description {
  font-size: 14px;
  margin-bottom: 5px;
}

.auto-resizable-textarea {
  overflow-y: hidden;
  resize: none;
  height: 100px;
}

.auto-resizable-textarea {
  height: auto;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
