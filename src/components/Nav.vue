<template>
  <v-card flat tile>
    <v-toolbar class="white--text mb-5" color="#03a9f4" dense height="90">
      <v-toolbar-title class="pointer" @click.prevent="goHome">
        <h1>Water Maps</h1>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="white--text" text to="/about"> à propos</v-btn>
      <v-btn class="white--text" text @click="logout"> Se deconnecter </v-btn>
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
