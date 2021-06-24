<template>
  <div class="login">
    <v-container class="mt-12">
      <logo />
    </v-container>
    <v-row justify="center">
      <v-col cols="9" class="d-flex flex-column align-center">
        <h2 class="form fz--3">Hai già un account?</h2>
        <!-- FORM -->
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="e-mail"
                v-model="email"
                class="mt-4"
                color="grey darken-3"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                class="input-group--focused"
                color="grey darken-3"
                @click:append="show = !show"
                @keypress.enter="loginHandler"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <p class="mt-n5 primary--text">
                Altrimenti
                <router-link to="/sign-in" class="accent-clr fw--bold"
                  >Registrati</router-link
                >
              </p>
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                color="accent"
                elevation="2"
                height="43px"
                @click="loginHandler"
                :loading="isPending"
                >Accedi</v-btn
              >
              <v-btn block dark elevation="2" height="43px" class="mt-4"
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
import { useLogin } from "@/mixins/useLogin";

export default {
  components: { Logo },
  mixins: [useLogin],
  data() {
    return {
      show: false,
      rules: {
        password: this.error,
      },
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
