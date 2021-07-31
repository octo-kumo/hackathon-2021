<template>
  <v-app id="app">
    <v-app-bar dense elevate-on-scroll app>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-text="username" class="pr-1"></span>
      <v-btn icon small @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            eSpace
          </v-list-item-title>
          <v-list-item-subtitle>
            NUS High School
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-blue--text text--accent-2">
          <router-link :key="route.name" :to="route.path"
                       v-for="route in $router.options.routes.filter(e=>e.meta.public)">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ route.meta.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height:100%;overflow-y:scroll;">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: false,
    group: null,
    username: '',
  }),
  methods: {
    logout() {
      this.$cookies.remove('logged_in')
      this.$cookies.remove('username')
      this.$router.push("Login")
    }
  },
  mounted() {
    this.username = this.$cookies.get('username');
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

a {
  text-decoration: none;
}
</style>
