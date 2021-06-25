<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Nome Cognome
          </v-list-item-title>
          <v-list-item-subtitle>
            Dashboard
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark color="accent">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><router-link to="/" class="white--text"
          >PapHero</router-link
        ></v-toolbar-title
      >
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  data: () => {
    return {
      drawer: null,
      items: [
        { title: "Routine", icon: "mdi-view-dashboard", link: "/" },
        { title: "About", icon: "mdi-information", link: "/" },
        { title: "Settings", icon: "mdi-account-cog", link: "/" },
      ],
      right: null,
    };
  },
};
</script>

<style></style>
