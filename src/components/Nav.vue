<template>
  <v-app-bar class="d-flex justify-center" app color="light-blue" dark flat>
    <h2>Water-maps 2</h2>
    <v-spacer></v-spacer>
    <v-btn @click="logout">Se déconnecter</v-btn>
  </v-app-bar>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
  },
};
</script>

<style></style>
