<template>
  <div class="home">
    <h1>Home</h1>
    <test />
    <button @click="logout">Se déconnecter</button>
  </div>
</template>

<script>
// @ is an alias to /src

import test from "../components/test";
import firebase from "firebase";

export default {
  name: "Home",
  components: {
    test,
  },
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
