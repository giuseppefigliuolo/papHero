<template>
  <div>
    <v-col cols="10">
      <v-select
        v-model="existingExerciseSelected"
        label="Add existing exercise"
        clearable
        class="mb-n4"
        :items="allExercises"
      ></v-select>
    </v-col>
    <v-col cols="10">
      <v-text-field
        label="Exercise Name"
        color="grey darken-3"
        outlined
        :rules="[rules.required]"
        v-model="newExName"
        dense
        autofocus
        :disabled="!!existingExerciseSelected"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="mt-n5">
      <v-textarea
        label="Description"
        color="grey darken-3"
        v-model="newExDescription"
        counter
        maxlength="120"
        full-width
        outlined
        dense
        :disabled="!!existingExerciseSelected"
      ></v-textarea>
    </v-col>
    <v-file-input
      class="mt-n5"
      :rules="[rules.image]"
      accept="image/png, image/jpeg, image/webp"
      placeholder="Pick an exercise preview"
      prepend-icon="mdi-image"
      label="Image"
      v-model="coverImg"
      @change="handleChange"
      :disabled="!!existingExerciseSelected"
    ></v-file-input>
    <v-col class="d-flex justify-end mb-n3 mt-2">
      <v-btn outlined plain class="mr-4" @click="cancelBtnClicked"
        >Cancel</v-btn
      >
      <v-btn
        elevation="2"
        color="accent"
        class="mr-n2"
        @click="savingUpdates"
        :loading="isPending"
        >Done</v-btn
      >
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    formForUpdate: { type: Boolean, default: false }
  },
  data() {
    return {
      newExName: '',
      newExDescription: '',
      coverImg: null,
      coverImgError: null,
      isPending: false,
      existingExerciseSelected: null,
      allExercises: [],
      rules: {
        image: (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!',
        required: (value) => !!value || 'Give a name to this exercise!'
      }
    }
  },
  computed: {
    allExercisesName() {
      return this.allExercises.filter((ex) => ex.name)
    }
  },
  created() {
    this.fetchAllExercise()
  },
  methods: {
    async savingUpdates() {
      this.isPending = false
      if (this.formForUpdate) {
        console.log('Exercise updated')
      } else {
        const programId = this.$route.params.day

        if (this.existingExerciseSelected) {
          try {
            const existingInOldRef = await this.$root.userDoc
              .collection('exercises')
              .doc(this.existingExerciseSelected)
              .get()
              .then((val) => val.data().existingIn)

            await this.$root.userDoc
              .collection('exercises')
              .doc(this.existingExerciseSelected)
              .set(
                {
                  existingIn: [...existingInOldRef, programId]
                },
                { merge: true }
              )
          } catch (err) {
            console.log(err)
          }
        } else {
          /* ADDING NEW EX */
          // salviamo l'esercizio dentro la collezione di esercizi
          this.$root.userDoc
            .collection('exercises')
            .doc()
            .set(
              {
                name: this.newExName,
                description: this.newExDescription,
                existingIn: [programId]
              },
              { merge: true }
            )
            .then((exerciseRef) => {
              console.log('exercise added')
              /* this.$root.userDoc
              .collection('programs')
              .doc(this.$route.params.day)
              .set({
                exercises: [exerciseRef.id]
              })
              .then(() => {
                this.isPending = false
                console.log('exercise added!')
                this.cancelBtnClicked()
              })
              .catch((err) => console.log(err)) */
            })
            .catch((err) => console.log(err))
          // salviamo dentro il programma un array con tutti gli esercizi
          // this.$root.userDoc.collection('programs').doc(programId).set({

          // })
        }

        // for adding new exercise
      }
    },
    cancelBtnClicked() {
      this.$events.emit('closeFormEx')
    },
    handleChange(evt) {
      console.log(this.coverImg)
    },
    fetchAllExercise() {
      this.$root.userDoc
        .collection('exercises')
        .get()
        .then((exs) =>
          exs.forEach((ex) => {
            const extractedData = ex.data()
            debugger
            const exData = {
              text: extractedData.name,
              value: ex.id,
              disabled: false
            }
            this.allExercises.push(exData)
          })
        )
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style></style>
