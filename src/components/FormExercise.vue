<template>
  <div>
    <v-col cols="10">
      <v-text-field
        label="Exercise Name"
        color="grey darken-3"
        outlined
        :rules="[rules.required]"
        v-model="newExName"
        dense
        autofocus
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
      rules: {
        image: (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!',
        required: (value) => !!value || 'Give a name to this exercise!'
      }
    }
  },
  methods: {
    savingUpdates() {
      this.isPending = false
      if (this.formForUpdate) {
        console.log('Exercise updated')
      } else {
        // for adding new exercise
        this.$root.userDoc
          .collection('exercises')
          .doc()
          .set({
            name: this.newExName,
            description: this.newExDescription
          })
          .then(() => {
            this.isPending = false
            console.log('exercise added!')
            this.cancelBtnClicked()
          })
          .catch((err) => console.log(err))
      }
    },
    cancelBtnClicked() {
      this.$events.emit('closeFormEx')
    },
    handleChange(evt) {
      console.log(this.coverImg)
    }
  }
}
</script>

<style></style>
