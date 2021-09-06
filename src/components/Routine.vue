<template>
  <v-container class="mt-2">
    <div class="fz--2">
      <h2 class="pl-5 primary--text fw--semi-bold" v-if="$root.user">
        Routine di {{ $root.user.displayName.split(' ')[0] }}
      </h2>
    </div>
    <v-row class="my-4">
      <div v-if="!programs" class="skeleton-container">
        <v-skeleton-loader
          class="ma-auto"
          type="expansion-panel, article, actions"
        ></v-skeleton-loader>
      </div>
      <draggable
        v-else
        class="draggable-section"
        v-model="programs"
        handle=".drag-ex-icon"
        @start="drag = true"
        @end="dragEnded"
        animation="200"
      >
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          class="mr-n2 pr-1 d-flex align-center"
          v-for="(program, i) in programs"
          :key="program.day + i"
          @click="goToExercise(program)"
        >
          <v-icon large left class="drag-ex-icon">mdi-drag</v-icon>
          <v-avatar :color="program.color" dark size="46"
            ><span class="white--text">{{ program.day }}</span></v-avatar
          >
          <span class="ml-5 fz--2">{{ program.name }}</span>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="ml-auto c-pointer"
                large
                left
                v-bind="attrs"
                v-on="on"
                aria-label="menu dots"
              >
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="handleDotsMenu(item.title.toLowerCase(), program)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </draggable>
    </v-row>
    <v-btn
      fixed
      bottom
      right
      color="accent"
      class="mb-3 mr-3"
      elevation="3"
      fab
      @click="showModal = true"
    >
      <v-icon class="mx-auto c-pointer" large left>mdi-plus</v-icon>
    </v-btn>
    <Modal v-if="showModal">
      <v-card-text class="py-6">
        <h2 class="fz--3 accent-clr mb-10">
          {{ programToEdit ? 'Edit' : 'Add' }} daily session
        </h2>
        <v-form>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Name"
                color="grey darken-3"
                outlined
                v-model="newName"
                hide-details
                :rules="[rules.required]"
                dense
                autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Day"
                color="grey darken-3"
                :rules="[rules.required]"
                v-model="newDay"
                outlined
                hide-details
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-col><p class="fz--2 mb-n2">Color</p></v-col>
              <v-color-picker
                dot-size="25"
                hide-canvas
                hide-inputs
                hide-sliders
                mode="rgba"
                show-swatches
                swatches-max-height="120"
                :rules="[rules.required]"
                v-model="newColor"
                width="100%"
              ></v-color-picker>
            </v-col>
            <v-divider></v-divider>
            <v-col class="d-flex justify-end ">
              <v-btn
                outlined
                plain
                class="mr-4"
                @click="
                  showModal = false
                  programToEdit = null
                  newColor = ''
                  newDay = ''
                  newName = ''
                "
                >Cancel</v-btn
              >
              <v-btn
                elevation="2"
                color="accent"
                class="mr-4"
                :loading="isPending"
                @click="handleSubmitNewProgram"
                :disabled="
                  newName.length < 3 || newDay.length < 1 || newColor.length < 1
                "
                >Done</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </Modal>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
import Modal from '../components/Modal.vue'
import { timestamp } from '../firebase/config'

export default {
  name: 'Routine',
  components: {
    draggable,
    Modal
  },
  data() {
    return {
      drag: false,
      items: [{ title: 'Edit' }, { title: 'Delete' }],
      showModal: false,
      newColor: '',
      isPending: false,
      newName: '',
      programs: null,
      newDay: '',
      error: null,
      programToEdit: null,
      rules: {
        required: (value) => !!value || 'Please fill this empty field.'
      }
    }
  },
  created() {
    this.programsOrder = null
    this.docRef = this.$root.userDoc.collection('programs')
    this.unsub = this.docRef.orderBy('createdAt').onSnapshot(
      (collection) => {
        let results = []
        collection.docs.forEach((program) => {
          program.data().createdAt &&
            results.push({ ...program.data(), id: program.id })
        })
        this.programs = results
        this.error = null
      },
      (err) => console.log(err)
    )

    this.$events.on('logout', () => {
      this.unsub()
    })
  },
  watch: {
    newDay(value) {
      if (value.length >= 3) {
        this.newDay = value
      }
    }
  },
  methods: {
    goToExercise(program) {
      // this.$events.emit('goToProgram', program)
      this.$router.push(`/program/${program.id}`)
    },
    async handleSubmitNewProgram() {
      this.isPending = true
      try {
        if (this.programToEdit) {
          await this.docRef.doc(this.programToEdit.id).set(
            {
              name: this.newName,
              day: this.newDay,
              color: this.newColor
            },
            { merge: true }
          )
        } else {
          await this.docRef.doc().set({
            name: this.newName,
            day: this.newDay,
            color: this.newColor,
            createdAt: timestamp()
          })
        }
        this.isPending = false
        this.showModal = false
        this.programToEdit = null
        this.newName = ''
        this.newDay = ''
        this.newColor = ''
      } catch (err) {
        console.log(err)
      }
    },
    handleDotsMenu(type, program) {
      if (type === 'delete') {
        this.docRef
          .doc(program, id)
          .delete()
          .then(() => {
            console.log('Document deleted!')
          })
          .catch((err) => console.log(err))
      } else if ('edit') {
        this.programToEdit = program
        this.newName = this.programToEdit.name
        this.newColor = this.programToEdit.color
        this.newDay = this.programToEdit.day
        this.showModal = true
      }
    },
    dragEnded() {
      this.drag = false

      this.$root.userDoc
        .collection('programs')
        .get()
        .then((collection) => {
          collection.docs.forEach((doc, i) => {
            doc.ref.set(
              {
                color: this.programs[i].color,
                day: this.programs[i].day,
                exercises: this.programs[i].exercises || [],
                name: this.programs[i].name
              },
              { merge: true }
            )
          })
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #fbefc8;
}

.draggable-section {
  width: 100%;
}

.skeleton-container {
  width: 90%;
  margin: 0 auto;
}
</style>
