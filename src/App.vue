<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar :color="colorBar" dark fixed app clipped-right>
        <v-toolbar-side-icon @click.stop="sideBar = !sideBar"></v-toolbar-side-icon>
        <v-toolbar-title>Toolbar</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-navigation-drawer fixed v-model="sideBar" app>
        <v-list>
          <v-list-tile avatar v-for="menu in menuItems" :key="menu.title" @click="changePage(menu)">
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="menu.title"/>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container fluid fill-height>
          <!-- <v-layout justify-center align-center> -->
          <app-alert></app-alert>
          <router-view></router-view>
          <!-- </v-layout> -->
        </v-container>
      </v-content>
      <v-footer :color="colorBar" class="white--text" app>
        <span>Vuetify</span>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import store from "@/store";

export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters["auth/isLoggedIn"];
    }
  },
  created() {
    this.$http.interceptors.response.use(undefined, err => {
      return new Promise(function(resolve, reject) {
        const { status, config } = err.response;
        // if (status === 401 && config && !config.__isRetryRequest) {
        if (status === 401 && config && !config.__isRetryRequest) {
          store.dispatch("auth/logout");
        }
        // throw err;
        reject(err);
      });
    });
  },
  data() {
    return {
      sideBar: true,
      colorBar: "teal",
      menuItems: [
        { icon: "widgets", title: "Dashboard", path: "/" },
        { icon: "info", title: "About", path: "/about" },
        { icon: "supervisor_account", title: "Users", path: "/users" },
        { icon: "supervisor_account", title: "Login", path: "/login" }
      ]
    };
  },
  methods: {
    changePage(menu) {
      console.log("changePage: ", menu);
      this.$router.push(menu.path);
    },
    onLogout: function() {
      console.log("onLogout");
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>


<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
