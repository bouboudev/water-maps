<template>
  <v-card flat tile>
    <v-toolbar color="#03a9f4" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title class="pointer" @click.prevent="goHome">
        <h1>Water Maps</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text to="/about"> à propos</v-btn>
      <v-btn text @click="logout"> Se deconnecter </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({}),
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    goHome() {
      this.$router.push("/").catch(() => {});
    },
  },
  computed: {},
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
