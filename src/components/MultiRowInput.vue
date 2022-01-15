<template>
  <div>
    <label v-if="label" class="fgpe-label">
      {{ label }}
    </label>
    <div v-if="lines.length > 0" class="w-full">
      <div
        v-for="(line, index) in lines"
        v-bind:key="index"
        class="flex items-center mb-2"
      >
        <div class="w-3/4 items-center">
          <slot v-bind:line="line" v-bind:index="index" />
        </div>
        <div class="w-1/4 items-center">
          <div class="flex justify-end">
            <vs-button
              v-if="index + 1 === lines.length"
              @click.native="addLine"
              color="primary"
              type="filled"
              icon="playlist_add"
              icon-pack="mi md-16"
              class="ml-1"
            />
            <vs-button
              @click="removeLine(index)"
              color="danger"
              type="filled"
              icon="delete"
              icon-pack="mi md-16"
              class="ml-1"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center">
      <vs-button
        @click.native="addLine"
        color="primary"
        type="filled"
        icon="playlist_add"
        icon-pack="mi md-16"
        class="ml-1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "multi-row-input",
  props: {
    value: {
      type: Array
    },
    label: {
      default: null,
      type: [String, Number]
    },
    emptyLine: {
      type: [String, Number, Object],
      default: () => ({})
    },
    emptyCheck: {
      type: Function,
      default: v =>
        !v ||
        (v instanceof Object && Object.keys(v).filter(k => !!v[k]).length === 0)
    },
    transform: {
      type: Function,
      default: v => v
    },
    inverseTransform: {
      type: Function,
      default: v => v
    }
  },
  data() {
    return {
      lines: [],
      loopShield: false
    };
  },
  mounted() {
    this.lines = JSON.parse(
      JSON.stringify(this.value.map(this.inverseTransform))
    );
  },
  watch: {
    value: {
      handler: function(newValue, oldValue) {
        console.log(`${oldValue} -> ${newValue}`)

        // ugly loop protection - FIX with better alternative
        this.loopShield = true;
        console.log(newValue)
        this.lines = JSON.parse(JSON.stringify(newValue.map(this.inverseTransform)));
        console.log(this.lines)
        this.$nextTick(() => {
          this.loopShield = false;
        });
      },
      deep: true
    },
    lines: {
      handler: function() {
        if (!this.loopShield) {
          this.$emit("input", this.lines.map(this.transform));
        }
      },
      deep: true
    }
  },
  methods: {
    addLine() {
      let checkEmptyLines = this.lines.filter(l => this.emptyCheck(l));
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      this.lines.push(JSON.parse(JSON.stringify(this.emptyLine)));
    },
    removeLine(lineId) {
      this.lines.splice(lineId, 1);
    }
  }
};
</script>
