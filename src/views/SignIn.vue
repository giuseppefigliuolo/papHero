<template>
  <div class="signup">
    <v-container class="mt-12">
      <logo />
    </v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="9" class="red--text py-0 text-center error-container">
        <p v-if="error">{{ error }}</p>
      </v-col>
      <v-col cols="9" class="d-flex flex-column align-center mt-n9">
        <h2 class="form fz--3">Registrati</h2>
        <!-- FORM -->
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Username"
                v-model="displayName"
                class="mt-4"
                color="grey darken-3"
                :rules="[rules.required]"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                label="E-mail"
                v-model="email"
                color="grey darken-3"
                :rules="[rules.required, rules.email]"
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
                :rules="[rules.min]"
                @click:append="show = !show"
                @keypress.enter="signupHandler"
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
          <v-row class="mt-n5">
            <v-col cols="12">
              <v-btn
                block
                color="accent"
                elevation="2"
                height="43px"
                @click="signupHandler"
                :loading="isPending"
                >Register</v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-btn block dark elevation="2" height="43px" :loading="isPending"
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
import { useSignup } from "@/mixins/useSignup";

export default {
  components: { Logo },
  mixins: [useSignup],
  data() {
    return {
      show: false,
      rules: {
        required: (value) => !!value || "E-mail field is required",
        min: (v) => v.length >= 6 || "Must be at least 6 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
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

.error-container {
  height: 60px;
}
</style>
