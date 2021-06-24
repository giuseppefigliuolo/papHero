import { projectFirestore } from "../firebase/config";

export const useCollection = {
  data() {
    return {
      error: null,
    };
  },
  methods: {
    async addDoc(collection, doc) {
      this.error = null;

      try {
        await projectFirestore.collection(collection).add(doc);
      } catch (err) {
        console.log(err.message);
        this.error = "could not send the message";
      }
    },
  },
};
