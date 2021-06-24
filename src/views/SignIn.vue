<template>
  <div class="login">
    <v-container class="mt-12">
      <logo />
    </v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="9" class="d-flex flex-column align-center">
        <h2 class="form fz--3">Registrati</h2>
        <!-- FORM -->
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username"
                class="mt-4"
                color="grey darken-3"
                outlined
                dense
                autofocus
              ></v-text-field>
              <v-text-field
                label="Nome"
                color="grey darken-3"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                color="grey darken-3"
                @click:append="show = !show"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <p class="mt-n5 primary--text">
                Hai già un account?
                <router-link to="/login" class="accent-clr fw--bold"
                  >Accedi</router-link
                >
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn block color="accent" elevation="2" height="43px"
                >Registrati</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn block dark elevation="2" height="43px"
                ><v-icon left dark> mdi-google </v-icon>Continua con
                Google</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Logo from "../components/atoms/Logo";
export default {
  components: { Logo },
  data() {
    return {
      show: false,
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  color: $gray;
  font-weight: $normal;
}
</style>
