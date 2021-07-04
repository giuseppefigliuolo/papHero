import { projectAuth } from '../firebase/config'
import firebase from 'firebase'

export const useSignup = {
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
      error: null,
      isPending: false
    }
  },
  computed: {},
  methods: {
    async signupHandler() {
      this.error = null
      this.isPending = true

      try {
        const res = await projectAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
        // una volta creato lo user vogliamo aggiornargli il campo displayName. Possiamo modificare ovviamente solo campi che già esistono
        if (!res) {
          throw new Error('Could not complete the signup')
        }
        await res.user.updateProfile({ displayName: this.displayName })
        // resettiamo l'errore
        this.error = null
        this.isPending = false

        console.log(res.user)
        await firebase
          .firestore()
          .collection('accounts')
          .doc(res.user.uid)
          .set({
            id: res.user.uid,
            name: res.user.displayName
          })
        console.log('user collection istanciated')
      } catch (err) {
        console.log(err.message)
        this.error = err.message
        this.isPending = false
      }

      if (!this.error) {
        // a questo punto significa che l'accesso è andato a buon fine quindi possiamo reindirizzare l'utente nella chat
        this.$emit('signup')
        this.$router.push({ name: 'Home' })
        console.log('User Signup!')
      }
    }
  }
}
