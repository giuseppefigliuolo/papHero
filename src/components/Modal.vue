<template>
  <v-row>
    <v-col class="overlay"></v-col>
    <v-col class="modal">
      <v-card class="mx-auto pa-4 pb-0" max-width="400px">
        <slot></slot>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
.overlay {
  background-color: rgba(36, 36, 36, 0.644);
  position: fixed;
  z-index: 800;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal {
  position: fixed;
  z-index: 800;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
