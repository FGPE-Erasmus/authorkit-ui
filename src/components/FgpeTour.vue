<template>
  <v-tour
    id="fgpeTour"
    name="fgpeTour"
    :steps="steps"
    :callbacks="{
      onStop: onStopTour,
      onSkip: onSkipTour,
      onFinish: onFinishTour
    }"
    :options="{
      highlight: false
    }"
  >
    <template slot-scope="tour">
      <transition name="fade">
        <template v-for="(step, index) of tour.steps">
          <v-step
            id="fgpeTourStep"
            v-if="tour.currentStep === index"
            :key="index"
            :step="step"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <div slot="actions" class="flex justify-center">
              <vs-button
                size="small"
                class="mr-3"
                @click="tour.stop"
                icon-pack="feather"
                icon="icon-x"
                icon-after
                color="#fff"
                type="border"
                v-if="tour.currentStep != tour.steps.length - 1"
              >
                {{ $t("Tour.Skip") }}
              </vs-button>

              <vs-button
                size="small"
                @click="tour.previousStep"
                icon-pack="feather"
                icon="icon-chevrons-left"
                color="#fff"
                type="border"
                class="mr-3"
                v-if="tour.currentStep"
              >
                {{ $t("Tour.Previous") }}
              </vs-button>

              <vs-button
                size="small"
                @click="tour.nextStep"
                icon-pack="feather"
                icon="icon-chevrons-right"
                icon-after
                color="#fff"
                type="border"
                class="btn-tour-next"
                v-if="tour.currentStep != tour.steps.length - 1"
              >
                {{ $t("Tour.Next") }}
              </vs-button>

              <vs-button
                size="small"
                @click="tour.stop"
                icon-pack="feather"
                icon="icon-check-circle"
                icon-after
                color="#fff"
                type="border"
                class="btn-tour-finish"
                v-if="tour.currentStep === tour.steps.length - 1"
              >
                {{ $t("Tour.Finish") }}
              </vs-button>
            </div>
          </v-step>
        </template>
      </transition>
    </template>
  </v-tour>
</template>

<script>
export default {
  name: "fgpe-tour",
  props: {
    active: {
      required: true,
      type: Boolean,
      default: () => false
    },
    steps: {
      required: true,
      type: Array
    }
  },
  watch: {
    active(v) {
      if (v) {
        this.$tours["fgpeTour"].start("0");
        document.body.classList.add("v-tour--active");
      } else this.$tours["fgpeTour"].stop();
    },
    steps(/*steps, oldSteps*/) {
      if (!this.active) return;
      /*const idx = this.$tours["fgpeTour"].currentStep;
      this.$tours["fgpeTour"].stop();
      setTimeout(() => {
        this.$tours["fgpeTour"].start(
          Math.max(steps.indexOf(oldSteps[idx]), 0) + ""
        );
        document.body.classList.add("v-tour--active");
      }, 500);*/
    }
  },
  methods: {
    currentSteps(tour) {
      return tour.steps.filter((step, index) => {
        return tour.currentStep === index;
      });
    },
    onStopTour() {
      this.$emit("stop");
    },
    onSkipTour() {
      this.$emit("skip");
    },
    onFinishTour() {
      this.$emit("finish");
    }
  }
};
</script>

<style lang="scss">
#fgpeTourStep.v-step {
  z-index: 55000 !important;
  background-color: rgba(var(--vs-primary), 1) !important;
  border-radius: 0.5rem !important;
  padding: 1.5rem !important;
  filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.5)) !important;

  > .v-step__arrow {
    border-color: rgba(var(--vs-primary), 1);
  }

  .vs-button-border:not(.btn-tour-next):not(.btn-tour-finish) {
    border-color: rgba(255, 255, 255, 0.5) !important;
  }

  &.v-step--sticky {
    max-width: 640px !important;
  }
}

.v-step {
  &.v-step--sticky {
    max-width: 640px !important;
  }
}

#fgpeTourStep.v-step[x-placement^="top"] {
  margin-bottom: 0.5rem;
}

#fgpeTourStep.v-step[x-placement^="top"] .v-step__arrow {
  border-width: 0.5rem 0.5rem 0 0.5rem;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  bottom: -0.5rem;
  left: calc(50% - 1rem);
  margin-top: 0;
  margin-bottom: 0;
}

#fgpeTourStep.v-step[x-placement^="bottom"] {
  margin-top: 0.5rem;
}

#fgpeTourStep.v-step[x-placement^="bottom"] .v-step__arrow {
  border-width: 0 0.5rem 0.5rem 0.5rem;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  top: -0.5rem;
  left: calc(50% - 1rem);
  margin-top: 0;
  margin-bottom: 0;
}

#fgpeTourStep.v-step[x-placement^="right"] {
  margin-left: 0.5rem;
}

#fgpeTourStep.v-step[x-placement^="right"] .v-step__arrow {
  border-width: 0.5rem 0.5rem 0.5rem 0;
  border-left-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  left: -0.5rem;
  top: calc(50% - 1rem);
  margin-left: 0;
  margin-right: 0;
}

#fgpeTourStep.v-step[x-placement^="left"] {
  margin-right: 0.5rem;
}

#fgpeTourStep.v-step[x-placement^="left"] .v-step__arrow {
  border-width: 0.5rem 0 0.5rem 0.5rem;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  right: -0.5rem;
  top: calc(50% - 1rem);
  margin-left: 0;
  margin-right: 0;
}
</style>
