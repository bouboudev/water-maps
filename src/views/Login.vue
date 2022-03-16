<template>
  <v-row class="login">
    <v-col cols="6">
      <h1>Water Maps</h1>
    </v-col>
    <v-col cols="6" class="right">
      <h1>Bienvenue !</h1>
      <v-card flat>
        <v-card-text>
          <h2>Se connecter</h2>
          <v-text-field
            label="Adresse mail"
            required
            v-model="emailLogin"
          ></v-text-field>
          <v-text-field
            :append-icon="showConnexion ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConnexion ? 'text' : 'password'"
            name="input-10-2"
            label="Mot de passe"
            @click:append="showConnexion = !showConnexion"
            v-model="passwordLogin"
          ></v-text-field>
        </v-card-text>
      </v-card>
      <div style="cursor: pointer" @click="needAccount">
        Besoin d'un compte ?
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
      showRegister: false,
      showConnexion: false,
      emailLogin: "",
      passwordLogin: "",
      error: "",
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
          alert("Connexion reussie ! Bienvenue dans la watermaps");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
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
