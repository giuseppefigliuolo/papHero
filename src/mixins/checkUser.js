import { projectAuth } from '../firebase/config'

export const checkUser = {
  data() {
    return {
      user: null
    }
  },
  created() {
    // questa funzione partirà ogni volta che c'è un cambiamento nello stato dell'autenticazione dello user
    // qui abbiamo accesso anche all'oggetto user

    this.authChecker = projectAuth.onAuthStateChanged((_user) => {
      this.user = _user
      console.log('user state change. Current user is: ', _user)
      this.$root.user = _user
    })
  },
  beforeDestroy() {
    this.authChecker()
  }
}
