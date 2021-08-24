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
        <div v-else>
          <p
            v-for="(ex, index) in historyArray"
            :key="ex.date + index"
            v-html="ex.status"
          ></p>
        </div>
      </v-card-text>
    </Modal>
    <Modal v-if="showExInfo && !showHistory">
      <v-card-text class="py-6 card-text">
        <v-btn @click="showExInfo = false" x-large icon class="close-btn"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <h2 class="fz--3 accent-clr mb-3">Panca Piana</h2>
        <p class="primary--text fw--normal fz--1 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          pariatur corporis facilis ut doloribus hic quam. Suscipit atque
          reiciendis nemo?
        </p>
        <v-img
          max-height="140"
          lazy-src="https://media.istockphoto.com/vectors/man-working-out-with-barbell-lying-on-a-bench-bench-press-colorful-vector-id1028234906?k=6&m=1028234906&s=612x612&w=0&h=9bQsWLMYx2HudQ5ar3ZJmt4s4VqA_Kd1Gg6yp-rG-0g="
          src="https://media.istockphoto.com/vectors/man-working-out-with-barbell-lying-on-a-bench-bench-press-colorful-vector-id1028234906?k=6&m=1028234906&s=612x612&w=0&h=9bQsWLMYx2HudQ5ar3ZJmt4s4VqA_Kd1Gg6yp-rG-0g="
        ></v-img>
        <v-col class="d-flex justify-end mb-n3 mt-5">
          <v-btn outlined plain class="mr-4" @click="showExInfo = false"
            >Cancel</v-btn
          >
          <v-btn elevation="2" color="accent" class="mr-n2">Modify</v-btn>
        </v-col>
      </v-card-text>
    </Modal>
    <Modal v-if="showExInfo && !showHistory">
      <v-card-text class="py-6 card-text">
        <v-btn @click="showExInfo = false" x-large icon class="close-btn"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <div v-if="!modifyExercise">
          <h2 class="fz--3 accent-clr mb-3">Panca Piana</h2>
          <p class="primary--text fw--normal fz--1 my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            pariatur corporis facilis ut doloribus hic quam. Suscipit atque
            reiciendis nemo?
          </p>
          <v-img
            max-height="140"
            src="https://media.istockphoto.com/vectors/man-working-out-with-barbell-lying-on-a-bench-bench-press-colorful-vector-id1028234906?k=6&m=1028234906&s=612x612&w=0&h=9bQsWLMYx2HudQ5ar3ZJmt4s4VqA_Kd1Gg6yp-rG-0g="
          ></v-img>
          <v-col class="d-flex justify-end mb-n3 mt-5">
            <v-btn
              plain
              color="error"
              class="mr-4"
              outlined
              dark
              icon
              @click="deleteCheck = true"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn
              outlined
              plain
              class="mr-4"
              @click="
                showExInfo = false
                modifyExercise = false
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
                <v-col class="grow">
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
          v-else
        />
      </v-card-text>
    </Modal>
    <modal v-if="addingNewExercise"
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
    /></modal>
    <v-btn
      fixed
      bottom
      right
      color="accent"
      class="mb-3 mr-3"
      ghost-class="ghost"
      elevation="3"
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
      isPending: false
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
    })
    this.$root.userDoc
      .collection('programs')
      .doc(this.$route.params.day)
      .onSnapshot((doc) => {
        this.program = doc.data()
      })
  },
  methods: {
    deleteExercise() {
      console.log('deleteExercise')
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
</style>
