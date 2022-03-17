<template>
  <v-row class="register">
    <v-col cols="6">
      <h1>Water Maps</h1>
    </v-col>
    <v-col cols="6" class="right">
      <h1>Bienvenue !</h1>

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

      <div class="white--text text--darken-1" v-show="error != ''">
        <strong>
          <p>{{ error }}</p>
        </strong>
      </div>
      <div style="cursor: pointer" @click="haveAccount">Déjà un compte ?</div>
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
