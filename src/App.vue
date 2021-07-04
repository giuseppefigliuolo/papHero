<template>
  <v-app id="inspire">
    <nav-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import { projectFirestore } from './firebase/config'

export default {
  components: { NavBar },
  created() {
    this.$root.userDoc = projectFirestore
      .collection('accounts')
      .doc(this.$root.user.uid)
  }
}
</script>

<style lang="scss">
.accent-clr {
  color: $accent-clr !important;
}

.full-vh {
  height: 100vh;
}

.fw {
  &--light {
    font-weight: $light;
  }
  &--normal {
    font-weight: $normal;
  }
  &--semi-bold {
    font-weight: $semi-bold;
  }
  &--bold {
    font-weight: $bold;
  }
}

.fz {
  &--1 {
    font-size: 0.8rem;
  }
  &--2 {
    font-size: 1.2rem;
  }
  &--3 {
    font-size: 1.35rem;
  }
  &--4 {
    font-size: 2.75rem;
  }
}

a {
  color: $accent-clr;
  text-decoration: none;
}

.c-pointer {
  cursor: pointer;
}
</style>
