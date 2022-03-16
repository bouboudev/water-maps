<template>
  <v-row class="login">
    <v-col cols="6">
      <h1>Water Maps</h1>
    </v-col>
    <v-col cols="6" class="right">
      <v-card flat>
        <v-card-text>
          <h4>Se connecter</h4>
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

      <v-btn @click="login" class="mt-4" color="secondary">
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
    test() {
      console.log("le router cest : ", this.$routes.path);
    },
  },
  mounted() {
    this.test;
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.login {
  height: 100%;
}
.right {
  background: #03a9f4;
}
</style>
