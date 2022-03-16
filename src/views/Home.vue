<template>
  <div class="home">
    <h1>Accueil</h1>

    <tablewater />
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
