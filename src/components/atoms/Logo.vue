<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex flex-column align-center">
          <Logo />
          <p class="mt-5">Scroll your workout progress</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Logo from "../../assets/logo.svg";

export default {
  components: { Logo },
};
</script>

<style></style>
