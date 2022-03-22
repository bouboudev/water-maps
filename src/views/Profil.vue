<template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img height="100%"></v-img>
    <v-col>
      <v-avatar color="indigo">
        <span class="white--text text-h5">{{ this.initials }}</span>
      </v-avatar>
    </v-col>
    <v-list-item color="rgba(0, 0, 0, .4)">
      <v-list-item-content>
        <v-list-item-title class="title">{{ email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: null,
    };
  },
  computed: {
    initials: function () {
      let computedInitials = "";
      if (this.email && this.email.length > 0) {
        computedInitials = this.email.charAt(0);
      }
      return computedInitials;
    },
  },
  created() {
    var user = firebase.auth().currentUser;
    this.email = user.email;
    console.log(this.name);
  },
};
</script>

<style></style>
