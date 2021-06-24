import { projectAuth } from "../firebase/config";

export const useLogin = {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isPending: false,
    };
  },
  computed: {},
  methods: {
    async loginHandler() {
      this.error = null;
      this.isPending = true;

      try {
        // login in firebase
        const res = await projectAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        );
        this.isPending = false;
        // resettiamo l'errore
        this.error = null;
      } catch (err) {
        console.log(err.message);
        this.error = "Incorrect login credentials";
        this.isPending = false;
      }

      if (!this.error) {
        // a questo punto significa che l'accesso è andato a buon fine quindi possiamo reindirizzare l'utente nella chat
        this.$emit("login");
        console.log("User Signup!");
      }
    },
  },
};
