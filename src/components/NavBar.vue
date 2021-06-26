<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ user ? user.displayName : 'Welcome' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user ? user.email : 'Login or signup to start' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav v-if="user">
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
        <!-- logout menu item -->
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ logoutItem.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ logoutItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list dense nav v-else>
        <v-list-item
          v-for="item in unloggedItems"
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
    <loader v-if="isPending" />
  </nav>
</template>

<script>
import { logoutMixin } from '@/mixins/logout'
import { checkUser } from '@/mixins/checkUser'
import Loader from './Loader.vue'

export default {
  components: { Loader },
  mixins: [logoutMixin, checkUser],
  data: () => {
    return {
      drawer: null,
      items: [
        { title: 'Routine', icon: 'mdi-view-dashboard', link: '/' },
        { title: 'About', icon: 'mdi-information', link: '/about' }
      ],
      logoutItem: { title: 'Logout', icon: 'mdi-logout', link: '/login' },
      unloggedItems: [
        { title: 'Login', icon: 'mdi-login', link: '/login' },
        { title: 'Sign in', icon: 'mdi-account', link: '/sign-in' }
      ],
      right: null
    }
  },
  computed: {
    checkItemDestination() {
      if (!this.item.onClick) {
        return this.item.link
      } else {
        return undefined
      }
    }
  },
  methods: {
    itemClickHandler(menuItem) {
      console.log(menuItem)
      if (menuItem.onClick) {
        this.logoutHandler()
      } else {
        return
      }
    }
  }
}
</script>

<style></style>
