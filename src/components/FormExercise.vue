<template>
  <div>
    <v-col cols="10">
      <v-select
        v-if="!exerciseId"
        v-model="existingExerciseSelected"
        label="Add existing exercise"
        clearable
        class="mb-n4"
        :items="this.$root.allExercises"
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
        :disabled="
          !existingExerciseSelected && (newExName.length < 3 || coverImgError)
        "
        >Done</v-btn
      >
    </v-col>
  </div>
</template>

<script>
import { timestamp, projectStorage } from '../firebase/config'

export default {
  name: 'FormExercise',
  props: {
    formForUpdate: { type: Boolean, default: false },
    exercises: {
      type: Array,
      default() {
        return []
      }
    },
    exerciseId: { type: String },
    name: { type: String },
    description: { type: String }
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
        image: (value) => {
          if (value?.size > 1000000) {
            this.coverImgError = true
            return 'Image size should be less than 1 MB!'
          } else {
            return true
          }
        },
        required: (value) => !!value || 'Give a name to this exercise!'
      }
    }
  },
  created() {
    if (this.name && this.description) {
      this.newExName = this.name
      this.newExDescription = this.description
    }
  },
  methods: {
    async savingUpdates() {
      this.isPending = true
      if (this.formForUpdate) {
        try {
          if (this.coverImg) {
            await this.handleImg()

            this.$root.userDoc
              .collection('exercises')
              .doc(this.exerciseId)
              .set(
                {
                  name: this.newExName,
                  description: this.newExDescription,
                  imgUrl: this.url
                },
                { merge: true }
              )
          } else {
            this.$root.userDoc
              .collection('exercises')
              .doc(this.exerciseId)
              .set(
                {
                  name: this.newExName,
                  description: this.newExDescription
                },
                { merge: true }
              )
          }
        } catch (err) {
          console.log(err)
        }
        this.isPending = false
      } else {
        this.programId = this.$route.params.day

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
                  existingIn: [...existingInOldRef, this.programId]
                },
                { merge: true }
              )
          } catch (err) {
            console.log(err)
          }
        } else {
          /* ADDING NEW EX */
          try {
            if (this.coverImg) await this.handleImg()

            await this.$root.userDoc
              .collection('exercises')
              .add({
                name: this.newExName,
                description: this.newExDescription,
                existingIn: [this.programId],
                imgUrl: this.url || '',
                createdAt: timestamp()
              })
              .then((ref) => {
                this.newExerciseId = ref.id
              })
          } catch (err) {
            console.log(err)
          }

          this.isPending = false
        }

        await this.$root.userDoc
          .collection('programs')
          .doc(this.programId)
          .set(
            {
              exercises: [
                ...this.exercises,
                this.existingExerciseSelected || this.newExerciseId
              ]
            },
            { merge: true }
          )
          .then(() => console.log('added in ex array'))
      }
      this.coverImg = null
      this.cancelBtnClicked()
    },
    cancelBtnClicked() {
      this.$events.emit('closeFormEx')
    },
    async handleImg() {
      // creiamo l'url
      this.filePath = `exerciseCover/${this.$root.user.uid}/${this.coverImg.name}`
      // diamo le coordinate (cioè l'url) allo storage per cercare quello che vogliamo
      const storageRef = projectStorage.ref(this.filePath)
      try {
        const res = await storageRef.put(this.coverImg)
        // metodo di firebase per avere il link al download del file che abbiamo appena caricato
        this.url = await res.ref.getDownloadURL()
      } catch (err) {
        console.log(err.message)
        this.storageError = err
      }
    }
  }
}
</script>

<style></style>
