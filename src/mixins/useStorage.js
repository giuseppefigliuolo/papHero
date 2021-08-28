import { projectStorage } from '../firebase/config'

export const useStorage = {
  data() {
    return {
      storageError: null,
      url: null,
      filePath: null
    }
  },
  methods: {
    async uploadImage(file) {
      // creiamo l'url
      this.filePath = `exerciseCover/${this.$root.user.uid}/${file.name}`
      // diamo le coordinate (cioè l'url) allo storage per cercare quello che vogliamo
      const storageRef = projectStorage.ref(this.filePath)

      // ora lo aggiungiamo allo storage
      try {
        const res = await storageRef.put(file)
        // metodo di firebase per avere il link al download del file che abbiamo appena caricato
        this.url = await res.ref.getDownloadURL()
      } catch (err) {
        console.log(err.message)
        this.storageError = err
      }
    }
  }
}
