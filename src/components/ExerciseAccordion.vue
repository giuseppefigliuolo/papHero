<template>
  <v-expansion-panels v-if="exercises">
    <v-expansion-panel v-for="(exercise, i) in exercises" :key="i">
      <v-expansion-panel-header>
        <div class="accordion-header">
          <v-icon> mdi-drag </v-icon><span>{{ exercise.text }}</span
          ><v-icon @click="showExInfo = !showExInfo">
            mdi-information-outline </v-icon
          ><v-icon @click="showHistory = !showHistory"> mdi-history</v-icon>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p v-html="currentRecord"></p>
        <v-card
          class="mx-auto pa-4 pb-0 d-flex justify-space-between flex-wrap"
          max-width="400px"
        >
          <v-col cols="4">
            <v-text-field
              label="Reps"
              value="7"
              type="number"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Weight"
              value="10"
              outlined
              type="number"
              prefix="Kg"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="d-flex justify-center mt-n5">
            <v-btn block dark elevation="2"
              >Aggiungi serie<v-icon dark class="pl-4"
                >mdi-plus-circle-outline</v-icon
              ></v-btn
            >
          </v-col>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
