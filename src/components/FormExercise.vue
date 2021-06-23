<template>
  <div>
    <v-col cols="10">
      <v-text-field
        label="Exercise Name"
        color="grey darken-3"
        outlined
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
      :rules="rules"
      accept="image/png, image/jpeg, image/webp"
      placeholder="Pick an exercise preview"
      prepend-icon="mdi-image"
      label="Image"
    ></v-file-input>
    <v-col class="d-flex justify-end mb-n3 mt-2">
      <v-btn outlined plain class="mr-4" @click="cancelBtnClicked"
        >Cancel</v-btn
      >
      <v-btn elevation="2" color="accent" class="mr-n2" @click="savingUpdates"
        >Done</v-btn
      >
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    formForUpdate: { type: Boolean, default: false },
  },
  data() {
    return {
      newExName: "",
      newExDescription: "",
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!",
      ],
    };
  },
  methods: {
    savingUpdates() {
      if (this.formForUpdate) {
        console.log("Exercise updated");
      } else {
        console.log("Exercise created");
      }
    },
    cancelBtnClicked() {
      this.$events.emit("closeFormEx");
    },
  },
};
</script>

<style></style>
