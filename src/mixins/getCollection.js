import { projectFirestore } from "../firebase/config";

export const getCollection = {
  data() {
    return {
      documents: null,
      collectionError: null,
    };
  },
  created() {
    this.unsub = null;
  },
  beforeDestroy() {
    // qui in pratica togliamo l'event-listener di firebase quando si fa il logout se no avremmo tantissimi snapshot (ovvero eventlistener)
    this.unsub();
  },
  methods: {
    getCollectionRef(collection) {
      let collectionRef = projectFirestore
        .collection(collection)
        .orderBy("createdAt");
      //ogni volta che cambia qualcosa nel database firebase ci invia uno snapshot e lo usiamo per aggiornare la chat (ovvero i nostri documenti)
      this.unsub = collectionRef.onSnapshot(
        (snap) => {
          console.log("snapshot");
          let results = [];
          snap.docs.forEach((doc) => {
            // per ogni documento della collezione lo aggiungiamo all'array appena creato e in più gli inseriamo un id
            // checkiamo createdAt() perchè così non si usa la versione locale di createdAt ( in pratica per rendere tutto più dinamico e veloce nel browser dell'utente locale il messaggio in chat compare subitissimo e non aspettiamo che vada prima sul server)
            // Se un messaggio ha un createdAt significa che è già stato salvato anche nel db firestore e non solo in locale
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
          });
          this.documents = results;
          this.error = null;
        },
        //questa seconda callback dello snapshot equivale ad un catch, nel caso qualcosa vada storto
        (err) => {
          console.log(err.message);
          this.documents = null;
          this.error = "Could not fetch data";
        }
      );
    },
  },
};
