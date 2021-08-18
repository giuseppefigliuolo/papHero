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
import { projectFirestore, projectAuth } from './firebase/config'

export default {
  name: 'App',
  components: { NavBar },
  async created() {
    console.log('created')
    try {
      if (!this.$root.user) {
        projectAuth.onAuthStateChanged((_user) => {
          console.log('user state change. Current user is: ', _user)
          this.$root.user = _user

          this.$root.userDoc = projectFirestore
            .collection('accounts')
            .doc(this.$root.user?.uid)
        })
      }

      if (!this.$root.userDoc) {
        this.$root.userDoc = projectFirestore
          .collection('accounts')
          .doc(this.$root.user?.uid)
      }

      this.$root.userDoc?.collection('exercises').onSnapshot((ref) => {
        this.$root.allExercises = ref.docs.map((doc) => {
          const extractedData = doc.data()
          return {
            text: extractedData.name,
            value: doc.id,
            disabled: false,
            existingIn: extractedData.existingIn
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
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
