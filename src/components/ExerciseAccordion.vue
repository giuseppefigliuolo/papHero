<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div class="accordion-header">
        <v-icon> mdi-drag </v-icon><span>{{ exercise.text }}</span>
        <v-icon @click="infoBtnHandler">mdi-information-outline</v-icon>
        <v-icon @click="historyBtnHandler"> mdi-history</v-icon>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p v-html="currentRecord.status"></p>
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
import moment from 'moment'

export default {
  name: 'ExerciseAccordion',
  props: {
    exercise: { type: Object, required: true }
  },
  data() {
    return {
      showExInfo: false,
      reps: '',
      weight: '',
      currentRecord: {
        date: '',
        status: ''
      },
      todayRecordRef: null
    }
  },
  created() {
    // lets find today's doc in history
    this.today = moment().format('DD-MM-YY')

    this.checkTodaysRecordRef()
  },
  methods: {
    updateCurrentRecord() {
      const oldCurrentRecord = this.currentRecord.status
      this.currentRecord.status = `${oldCurrentRecord} ${
        oldCurrentRecord.length ? '-' : ''
      } <b>${this.reps}</b>(${this.weight})`

      const history = this.$root.userDoc
        .collection('exercises')
        .doc(this.exercise.value)
        .collection('history')
      if (this.todayRecordRef) {
        console.log(this.todayRecordRef.id)
        history.doc(this.todayRecordRef.id).set({
          status: this.currentRecord.status,
          date: this.today
        })
      } else {
        history
          .doc()
          .set({
            status: this.currentRecord.status,
            date: this.today
          })
          .then(() => {
            console.log('Document successfully written!')

            this.checkTodaysRecordRef()
          })
          .catch((error) => {
            console.error('Error writing document: ', error)
          })
      }
    },
    checkTodaysRecordRef() {
      this.$root.userDoc
        .collection('exercises')
        .doc(this.exercise.value)
        .collection('history')
        .get()
        .then((ref) => {
          this.todayRecordRef =
            ref.docs.find((doc) => {
              const data = doc.data()

              return data.date === this.today
            }) || ''

          if (this.todayRecordRef) {
            const data = this.todayRecordRef.data()

            this.currentRecord = {
              date: data.date,
              status: data.status
            }
          }
        })
    },
    historyBtnHandler() {
      this.$events.emit('history-btn-clicked', this.exercise.value)
    },
    infoBtnHandler() {
      this.$events.emit('info-btn-clicked', this.exercise)
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
