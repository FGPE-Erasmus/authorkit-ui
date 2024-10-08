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
  GENERATE
} from "@/store/generate/generate.constants";

export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    submitForm() {
      console.log('Testo inviato:', this.text);
      this.generate();
    },
    generate() {
      this.$store
        .dispatch(`${GENERATE}`)
        .then(() => {
          console.log("***QUI RITORNA LA RISPOSTA DAL BACKEND!");
        })
        .catch(err => {
          console.log("***ERRORE!");
          console.log(err);
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
