<template>
  <div class="home">
    <h3>Accueil</h3>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <tablewater />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase";
import tablewater from "@/components/TableWater.vue";

export default {
  name: "Home",
  components: { tablewater },
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
