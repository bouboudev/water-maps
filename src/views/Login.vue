<template>
  <v-row class="login">
    <v-col cols="6">
      <h1>Water Maps</h1>
    </v-col>
    <v-col cols="6" class="right">
      <div class="text-center ma-2">
        <v-snackbar color="red accent-2" v-model="snackbar" top>
          {{ error }}

          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Fermer
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar color="success accent-2" v-model="snackbarValide" top>
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbarValide = false"
            >
              Fermer
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <h1>Bienvenue !</h1>

      <h3>Se connecter</h3>
      <v-text-field
        solo
        label="Adresse mail"
        required
        v-model="emailLogin"
      ></v-text-field>
      <v-text-field
        solo
        :append-icon="showConnexion ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConnexion ? 'text' : 'password'"
        name="input-10-2"
        label="Mot de passe"
        @click:append="showConnexion = !showConnexion"
        v-model="passwordLogin"
      ></v-text-field>
      <v-alert type="error" v-show="error != ''"> {{ error }}</v-alert>
      <div>
        <v-btn small text @click="needAccount">Besoin d'un compte ?</v-btn>
      </div>

      <v-btn @click="login" class="mt-4" light color="primary--text">
        Se connecter
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",

  data() {
    return {
      snackbar: false,
      snackbarValide: false,
      showRegister: false,
      showConnexion: false,
      emailLogin: "",
      passwordLogin: "",
      error: "",
      message: "",
      loader: null,
      loading: false,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.emailLogin, this.passwordLogin)
        .then(() => {
          this.message = "Connexion reussie ! Bienvenue dans la watermaps";
          this.snackbarValide = true;
          setTimeout(() => this.$router.push({ path: "/" }), 2000);
        })
        .catch((error) => {
          this.snackbar = true;
          this.error = error.message;
        });
    },
    needAccount() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
.login {
  height: 100%;
}
.right {
  background: #03a9f4;
}
</style>
