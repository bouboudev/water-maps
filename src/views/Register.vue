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
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
              :timeout="3000"
            >
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

      <h3 class="mt-8 mb-5 white--text">S'inscrire</h3>
      <v-form ref="form" v-model="isvalid" lazy-validation color="grey">
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          label="Nom de l'association"
          :rules="caractereRules"
          required
          v-model="assosRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          label="Prénom"
          :rules="caractereRules"
          required
          v-model="firstNameRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          label="Nom"
          :rules="caractereRules"
          required
          v-model="lastNameRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          label="Numéro de télépone"
          required
          :counter="10"
          :rules="numberRules"
          error-count="3"
          v-model="numberRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          label="Adresse mail"
          required
          :rules="caractereRules"
          v-model="emailRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          :append-icon="showRegister ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showRegister ? 'text' : 'password'"
          name="input-10-2"
          label="Mot de passe"
          @click:append="showRegister = !showRegister"
          required
          :rules="passwordRules"
          error-count="5"
          v-model="passwordRegister"
        ></v-text-field>
        <v-text-field
          filled
          background-color="white"
          color="grey-dark"
          :append-icon="showRegister ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showRegister ? 'text' : 'password'"
          name="input-10-2"
          label="Confirmer le mot de passe"
          @click:append="showRegister = !showRegister"
          required
          :rules="confirmPasswordRules"
          error-count="5"
          v-model="confirmPasswordRegister"
        ></v-text-field>

        <v-alert type="error" v-show="error != ''"> {{ error }}</v-alert>
        <div>
          <v-btn small text @click="haveAccount">Déjà un compte ?</v-btn>
        </div>

        <v-btn
          @click="register"
          :disabled="!isvalid"
          class="mt-4"
          light
          color="primary--text"
        >
          S'inscrire
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase";
import db from "@/main";

export default {
  name: "register",

  data() {
    return {
      snackbar: false,
      snackbarValide: false,
      showRegister: false,
      showConnexion: false,
      assosRegister: "",
      firstNameRegister: "",
      lastNameRegister: "",
      numberRegister: "",
      emailRegister: "",
      passwordRegister: "",
      confirmPasswordRegister: "",
      error: "",
      message: "",
      isvalid: true,
      caractereRules: [
        (v) => !!v || "le champs est recquis ",
        (v) => (v && v.length >= 3) || "Minimum de 3 caractères",
      ],
      numberRules: [
        (v) => !!v || "Le numéro est recquis",
        (v) => (v && v.length >= 10) || "Le numéro doit être de 10 chiffres",
      ],
      emailRules: [
        (v) => !!v || "E-mail est recquis",
        (v) => /.+@.+\..+/.test(v) || "E-mail doit être valide",
      ],
      passwordRules: [
        (v) => !!v || "le mot de passe est recquis",
        (v) =>
          (v && v.length >= 5) ||
          "le mot de passe doit avoir au minimum 5 caractères",
        (v) =>
          /(?=.*[A-Z])/.test(v) || "le mot de passe doit avoir une Majuscule",
        (v) => /(?=.*\d)/.test(v) || "le mot de passe doit avoir un numéro",
        (v) =>
          /([!@$%])/.test(v) ||
          "le mot de passe doit avoir un caracère spéciale : [!@#$%]",
      ],
      confirmPasswordRules: [
        (v) => !!v || "la confirmation du mot de passe est recquis",
        (v) =>
          v === this.passwordRegister ||
          "la confirmation du mot de passe doit être identique au mot de passe",
      ],
    };
  },
  methods: {
    register() {
      this.$refs.form.validate();

      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.emailRegister,
          this.passwordRegister
        )
        .then((user) => {
          console.log(user.user.uid);
          //  ajouter à la collection profiles les informations de l'utilisateur
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              assos: this.assosRegister,
              firstname: this.firstNameRegister,
              lastname: this.lastNameRegister,
              number: this.numberRegister,
            })
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });

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
<style scoped>
.register {
  height: 100%;
}
.right {
  background: #03a9f4;
}
.logo {
  font-size: 80px;
  color: #03a9f4;
}
</style>
