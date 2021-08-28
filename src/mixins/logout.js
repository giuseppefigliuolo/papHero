import { projectAuth } from '../firebase/config'

export const logoutMixin = {
  data() {
    return {
      error: null,
      isPending: false
    }
  },
  methods: {
    async logoutHandler() {
      this.error = null
      this.isPending = true

      try {
        await projectAuth.signOut()
        this.isPending = false
        this.$router.push({ name: 'Login' })
      } catch (err) {
        console.log(err.message)
        this.error = err.message
        this.isPending = false
      }

      if (!this.error) {
        this.$events.emit('logout')
        console.log(' user logged out')
      }
    }
  }
}
