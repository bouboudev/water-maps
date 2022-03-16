<template>
  <v-row>
    <v-col cols="6"></v-col>
    <v-col cols="6">
      <v-card>
        <v-card-text>
          <h4>S'inscrire</h4>
          <v-text-field
            label="Adresse mail"
            required
            v-model="emailRegister"
          ></v-text-field>
          <v-text-field
            :append-icon="showRegister ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRegister ? 'text' : 'password'"
            name="input-10-2"
            label="Mot de passe"
            @click:append="showRegister = !showRegister"
            v-model="passwordRegister"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn @click="register" color="primary" text type="submit">
            S'inscrire
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",

  data() {
    return {
      showRegister: false,
      showConnexion: false,
      emailRegister: "",
      passwordRegister: "",
      error: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.emailRegister,
          this.passwordRegister
        )
        .then(() => {
          alert("Inscription reussie ! Bienvenue dans la watermaps");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style></style>
