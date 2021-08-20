<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div class="accordion-header">
        <v-icon> mdi-drag </v-icon><span>{{ title }}</span
        ><v-icon @click="showExInfo = !showExInfo">
          mdi-information-outline </v-icon
        ><v-icon @click="showHistory = !showHistory"> mdi-history</v-icon>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p v-html="wpCurrentRecord"></p>
      <v-card
        class="mx-auto pa-4 pb-0 d-flex justify-space-between flex-wrap"
        max-width="400px"
      >
        <v-col cols="4">
          <v-text-field
            label="Reps"
            :value="reps"
            v-model="reps"
            type="number"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Weight"
            v-model="weight"
            outlined
            type="number"
            prefix="Kg"
            :value="weight"
            @keypress.enter="updateCurrentRecord"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center mt-n5">
          <v-btn block dark elevation="2" @click="updateCurrentRecord"
            >Aggiungi serie<v-icon dark class="pl-4"
              >mdi-plus-circle-outline</v-icon
            ></v-btn
          >
        </v-col>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'ExerciseAccordion',
  props: {
    title: { type: String, required: true },
    currentRecord: { type: String }
  },
  data() {
    return {
      showHistory: false,
      showExInfo: false,
      reps: '',
      weight: '',
      wpCurrentRecord: ''
    }
  },
  methods: {
    updateCurrentRecord() {
      const oldCurrentRecord = this.wpCurrentRecord
      this.wpCurrentRecord = `${oldCurrentRecord} ${
        oldCurrentRecord.length ? '-' : ''
      } <b>${this.reps}</b>(${this.weight})`
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr 1fr;

  span {
    align-self: center;
  }
}

.v-expansion-panel-header {
  padding-left: 0rem !important;
}
</style>
