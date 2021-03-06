<template>
  <div>
    <v-container class="mt-2">
      <div class="fz--3">
        <h2 class="pl-5 accent--text fw--semi-bold text-capitalize">
          {{ program.day }}
        </h2>
        <h6 class="pl-5 primary--text fw--light fz--2 text-capitalize">
          {{ program.name }}
        </h6>
      </div>
      <v-row class="my-4">
        <v-col>
          <v-expansion-panels v-if="exercises">
            <ExerciseAccordion
              v-for="(exercise, index) in exercises"
              :key="exercise.value + index"
              :exercise="exercise"
            />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
    <!-- HISTORY MODAL -->
    <Modal v-if="showHistory && !showExInfo">
      <v-card-text class="py-6 card-text">
        <v-btn @click="showHistory = false" x-large icon class="close-btn"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <h2 class="fz--3 accent-clr mb-4">History</h2>
        <h6 class="primary--text fw--light fz--2 mb-5">Petto e tricipiti</h6>
        <div v-if="isPending" class="pa-12 d-flex justify-center align-center">
          <v-progress-circular
            indeterminate
            color="amber"
          ></v-progress-circular>
        </div>
        <div class="history-container" v-else>
          <div v-for="(ex, index) in historyArray" :key="ex.date + index">
            <p class="ex-data">{{ ex.date }}</p>
            <p v-html="ex.status"></p>
          </div>
        </div>
      </v-card-text>
    </Modal>
    <Modal v-if="showExInfo && !showHistory">
      <v-card-text class="py-6 card-text">
        <v-btn
          @click="
            showExInfo = false
            deleteCheck = false
            modifyExercise = false
          "
          x-large
          icon
          class="close-btn"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <div v-if="!modifyExercise">
          <h2 class="fz--3 accent-clr mb-3">{{ exerciseInfo.text }}</h2>
          <p class="primary--text fw--normal fz--1 my-4">
            {{ exerciseInfo.description }}
          </p>
          <v-img
            min-height="140"
            max-height="160"
            :lazy-src="exerciseInfo.imgUrl"
            :src="exerciseInfo.imgUrl"
            ><template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row> </template
          ></v-img>
          <v-col class="d-flex justify-end mb-n3 mt-5">
            <v-btn
              plain
              color="error"
              class="mr-4"
              outlined
              dark
              icon
              @click="deleteCheck = !deleteCheck"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn
              outlined
              plain
              class="mr-4"
              @click="
                showExInfo = false
                modifyExercise = false
                deleteCheck = false
              "
              >Cancel</v-btn
            >
            <v-btn
              elevation="2"
              color="accent"
              class="mr-n2"
              @click="modifyExercise = true"
              >Modify</v-btn
            >
          </v-col>
          <v-col v-if="deleteCheck" class="pa-0 mt-4 mb-n5">
            <v-alert dark color="deep-orange">
              <v-row align="center">
                <v-col class="grow text-center">
                  Are you sure you want to delete?
                </v-col>
                <v-col cols="12" class="d-flex justify-center mt-n5 mb-n2">
                  <v-btn icon x-large @click="deleteExercise"
                    ><v-icon>mdi-checkbox-marked-circle</v-icon></v-btn
                  >
                  <v-btn icon x-large @click="deleteCheck = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </div>
        <form-exercise
          :formForUpdate="modifyExercise && !addingNewExercise"
          :exercises="program.exercises"
          :exerciseId="exerciseInfo.value"
          :name="exerciseInfo.text"
          :description="exerciseInfo.description"
          v-else
        />
      </v-card-text>
    </Modal>
    <Modal v-if="addingNewExercise"
      ><v-card-text class="py-2 card-text"
        ><v-btn
          @click="addingNewExercise = false"
          x-large
          icon
          class="close-btn"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-card-text
      ><form-exercise
        :formForUpdate="!addingNewExercise && modifyExercise"
        :exercises="program.exercises"
    /></Modal>
    <v-btn
      fixed
      bottom
      right
      color="accent"
      class="mb-3 mr-3"
      elevation="3"
      aria-label="fab button for adding new program"
      fab
      @click="addingNewExercise = true"
    >
      <v-icon class="mx-auto c-pointer" large left>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Modal from '../components/Modal.vue'
import ExerciseAccordion from '../components/ExerciseAccordion.vue'
import FormExercise from '../components/FormExercise.vue'
import { projectStorage } from '../firebase/config'

export default {
  name: 'SingleDay',
  components: {
    draggable,
    Modal,
    ExerciseAccordion,
    FormExercise
  },
  data() {
    return {
      showHistory: false,
      showExInfo: false,
      historyArray: [],
      modifyExercise: false,
      deleteCheck: false,
      addingNewExercise: false,
      program: {},
      isPending: false,
      exerciseInfo: {},
      img: null
    }
  },
  computed: {
    currentRecord() {
      const currRecord = `<b>5</b>(50) - <b>5</b>(55) - <b>4</b>(60) - <b>5</b>(60) - <b>4</b>(70)`
      return currRecord
    },
    exercises() {
      if (!this.program.exercises) return
      return this.program.exercises
        .map((ex) => {
          const matchingEx = this.$root.allExercises.find(
            (el) => el.value === ex
          )
          return matchingEx
        })
        .filter((el) => el !== undefined)
    }
  },
  created() {
    this.$events.on('closeFormEx', () => {
      this.addingNewExercise = false
      this.modifyExercise = false
      this.showExInfo = false
    })

    this.$events.on('history-btn-clicked', (exerciseId) => {
      this.showHistory = true
      this.isPending = true

      this.$root.userDoc
        .collection('exercises')
        .doc(exerciseId)
        .collection('history')
        .get()
        .then((ref) => {
          this.isPending = false
          if (ref.docs.length) {
            this.historyArray = ref.docs.map((doc) => doc.data())
          } else {
            this.historyArray = [{ date: '', status: 'Not tracked yet' }]
          }
        })
        .catch((err) => console.log(err))
    })

    this.$events.on('info-btn-clicked', (exercise) => {
      this.showExInfo = true
      this.exerciseInfo = exercise
    })

    this.$root.userDoc
      .collection('programs')
      .doc(this.$route.params.day)
      .onSnapshot((doc) => {
        this.program = doc.data()
      })
  },
  methods: {
    async deleteExercise() {
      try {
        const imgUrl = this.exerciseInfo.imgUrl

        await this.$root.userDoc
          .collection('exercises')
          .doc(this.exerciseInfo.value)
          .delete()
          .then(() => {
            console.log('Document successfully deleted!')

            this.deleteCheck = false
            this.showExInfo = false
          })

        const imgRef = await projectStorage.refFromURL(imgUrl)

        imgRef.delete().then(() => console.log('Img deleted in storage'))
      } catch (err) {
        console.error('Error removing document: ', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
}

.card-text {
  position: relative;
}

.ex-data {
  color: $accent-clr;
  font-size: 0.65rem;
  font-weight: bold;
  margin-bottom: -4px;
}

.history-container {
  max-height: 45vh;
  overflow-y: auto;
}
</style>
