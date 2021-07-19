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
          <v-expansion-panels>
            <!-- <v-expansion-panel v-for="(item, i) in 5" :key="i">
              <v-expansion-panel-header>
                <div class="accordion-header">
                  <v-icon> mdi-drag </v-icon><span>Item</span
                  ><v-icon @click="showExInfo = !showExInfo">
                    mdi-information-outline </v-icon
                  ><v-icon @click="showHistory = !showHistory">
                    mdi-history</v-icon
                  >
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
            </v-expansion-panel> -->
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
        <h2 class="fz--3 accent-clr mb-4">Cronologia</h2>
        <h6 class="primary--text fw--light fz--2 mb-5">Petto e tricipiti</h6>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
        <div><p v-html="currentRecord"></p></div>
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
import FormExercise from '../components/FormExercise.vue'

export default {
  components: {
    draggable,
    Modal,
    FormExercise
  },
  data() {
    return {
      showHistory: false,
      showExInfo: false,
      modifyExercise: false,
      deleteCheck: false,
      addingNewExercise: false,
      program: {},
      exercises: []
    }
  },
  computed: {
    currentRecord() {
      const currRecord = `<b>5</b>(50) - <b>5</b>(55) - <b>4</b>(60) - <b>5</b>(60) - <b>4</b>(70)`
      return currRecord
    }
  },
  async created() {
    this.$events.on('closeFormEx', () => {
      this.addingNewExercise = false
      this.modifyExercise = false
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

.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
}

.card-text {
  position: relative;
}
</style>
