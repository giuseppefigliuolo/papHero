<template>
  <v-container class="mt-2">
    <div class="fz--2">
      <h2 class="pl-5 primary--text fw--semi-bold">Routine di Tony</h2>
    </div>
    <v-row class="my-4">
      <draggable
        class="draggable-section"
        v-model="exercises"
        @start="drag = true"
        @end="drag = false"
        animation="200"
      >
        <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          class="mr-n2 pr-1 d-flex align-center"
          v-for="(ex, i) in exercises"
          :key="ex.name + i"
          @click="goToExercise(ex.name)"
        >
          <v-icon large left>mdi-drag</v-icon>
          <v-avatar :color="ex.color" dark size="46"
            ><span class="white--text">{{ ex.day }}</span></v-avatar
          >
          <span class="ml-5 fz--2">{{ ex.name }}</span>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="ml-auto c-pointer"
                large
                left
                v-bind="attrs"
                v-on="on"
              >
                mdi-dots-vertical
              </v-icon>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-title
                  ><router-link :to="`/${item.title}`">{{
                    item.title
                  }}</router-link></v-list-item-title
                >
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
      ghost-class="ghost"
      elevation="3"
      fab
      @click="showModal = true"
    >
      <v-icon class="mx-auto c-pointer" large left>mdi-plus</v-icon>
    </v-btn>
    <Modal v-if="showModal">
      <v-card-text class="py-6">
        <h2 class="fz--3 accent-clr mb-10">Add daily session</h2>
        <v-form>
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Name"
                color="grey darken-3"
                outlined
                v-model="newName"
                dense
                autofocus
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Day"
                color="grey darken-3"
                v-model="newDay"
                outlined
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
                v-model="chosenClr"
                width="100%"
              ></v-color-picker>
            </v-col>
            <v-divider></v-divider>
            <v-col class="d-flex justify-end ">
              <v-btn outlined plain class="mr-4" @click="showModal = false"
                >Cancel</v-btn
              >
              <v-btn elevation="2" color="accent" class="mr-4">Done</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </Modal>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import Modal from "../components/Modal.vue";

export default {
  components: {
    draggable,
    Modal,
  },
  data() {
    return {
      exercises: [
        {
          name: "Petto e tricipiti",
          color: "primary",
          day: "lun",
        },
        {
          name: "Gambe",
          color: "orange",
          day: "mer",
        },
        {
          name: "Dorso e bicipiti",
          color: "green",
          day: "ven",
        },
      ],
      dragging: false,
      items: [{ title: "Edit" }, { title: "Delete" }],
      showModal: false,
      chosenClr: "",
      newName: "",
      newDay: "",
    };
  },
  watch: {
    exercises(value) {
      console.log(value);
    },
    chosenClr(value) {
      console.log(value);
    },
    newDay(value) {
      if (value.length >= 3) {
        this.newDay = value;
      }
    },
  },
  methods: {
    goToExercise(ex) {
      const cleanEx = ex.replace(/\s+/g, "-").toLowerCase();
      this.$router.push(`/${cleanEx}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #fbefc8;
}

.draggable-section {
  width: 100%;
}
</style>
