<template>
  <v-card flat tile>
    <v-snackbar
      color="success accent-2"
      v-model="snackBarDrilling"
      top
      :timeout="4000"
    >
      Super ! Vous venez d'ajouter un nouveau forage !

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackBarDrilling = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <v-toolbar class="white--text mb-5" color="#03a9f4" dense height="90">
      <v-toolbar-title class="pointer" @click.prevent="goHome">
        <h1>Water Maps <v-icon x-large>mdi-water</v-icon></h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text><Popup @projectAdded="snackBarDrilling = true" /></v-btn>
      <v-btn class="white--text" text to="/about"> à propos</v-btn>
      <v-btn text @click="logout">
        Se deconnecter <v-icon> mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import firebase from "firebase";
import Popup from "./Popup.vue";
export default {
  components: {
    Popup,
  },
  data: () => ({
    snackBarDrilling: false,
  }),
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
