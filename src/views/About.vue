<template>
  <div class="about pa-5">
    <h1 class="accent-clr mb-4 text-center">About Paphero</h1>
    <div class="mt-6 mb-4">
      <Logo />
    </div>
    <p>
      Paphero is a web app for tracking fitness and training progress. After you
      sign in you are able to make your own gym program and easily track your
      exercises progress. It was created and developed using VueJS and Firebase
      by <a href="https://giufigliuolo.xyz/">Giuseppe Figliuolo</a> for
      educational purposes.
    </p>
    <p>
      Please check its GitHub repo
      <a href="https://github.com/giuseppefigliuolo/papHero">here</a>.
    </p>
  </div>
</template>

<script>
import Logo from '../components/atoms/Logo'

export default {
  name: 'About',
  components: { Logo }
}
</script>
<style lang="scss" scoped>
.about {
  max-width: 500px;
}

a {
  color: $accent-clr;
  font-weight: bold;
}
</style>
