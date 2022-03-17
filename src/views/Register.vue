<template>
  <v-row class="register">
    <v-col cols="6" class="d-flex flex-column align-center mt-10">
      <h1 class="logo">
        Water Maps <v-icon class="logo" x-large>mdi-water</v-icon>
      </h1>
      <h2>Organiser ses forages en toute simplicité !</h2>
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
      <h1>Rejoins-nous !</h1>

      <h3>S'inscrire</h3>
      <v-text-field
        solo
        label="Adresse mail"
        required
        v-model="emailRegister"
      ></v-text-field>
      <v-text-field
        solo
        :append-icon="showRegister ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showRegister ? 'text' : 'password'"
        name="input-10-2"
        label="Mot de passe"
        @click:append="showRegister = !showRegister"
        v-model="passwordRegister"
      ></v-text-field>

      <v-alert type="error" v-show="error != ''"> {{ error }}</v-alert>
      <div>
        <v-btn small text @click="haveAccount">Déjà un compte ?</v-btn>
      </div>

      <v-btn @click="register" class="mt-4" light color="primary--text">
        S'inscrire
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
      emailRegister: "",
      passwordRegister: "",
      error: "",
      message: "",
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
          this.message = "Inscription reussie ! Bienvenue dans la watermaps";
          this.snackbarValide = true;
          setTimeout(() => this.$router.push({ path: "/" }), 2000);
        })
        .catch((error) => {
          this.snackbar = true;
          this.error = error.message;
        });
    },
    haveAccount() {
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.register {
  height: 100%;
}
.right {
  background: #03a9f4;
}
</style>
