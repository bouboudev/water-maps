<template>
  <div class="home">
    <h3>Accueil</h3>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <Tablewater />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase";
import Tablewater from "@/components/TableWater.vue";

export default {
  name: "Home",
  components: { Tablewater },
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
