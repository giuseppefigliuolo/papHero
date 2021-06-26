<template>
  <v-row>
    <v-col class="overlay"></v-col>
    <v-col class="loader d-flex justify-center x-large">
      <v-btn loading fab x-large></v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
.overlay {
  background-color: rgba(180, 130, 130, 0.644);
  position: fixed;
  z-index: 800;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.loader {
  position: fixed;
  z-index: 800;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
