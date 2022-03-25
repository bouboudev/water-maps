<template>
  <div>
    <!-- snackbar -->
    <div class="text-center ma-2">
      <v-snackbar color="success accent-2" v-model="snackbar" top>
        Votre profil a été mis à jour avec succès !

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <!-- menu tabs -->
    <v-toolbar flat>
      <template v-slot:extension>
        <v-tabs v-model="tabs" centered>
          <v-tab class="black--text"> Profil card</v-tab>
          <v-tab> Informations</v-tab>
          <v-tab> Paramètre</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <!-- card profil : -->
          <v-card
            outlined
            flat
            class="mx-auto mt-15"
            max-width="434"
            tile
            id="profile"
          >
            <v-img height="100%"></v-img>
            <v-col>
              <v-avatar :color="color">
                <span class="white--text text-h5">{{ this.initials }}</span>
              </v-avatar>
            </v-col>
            <v-list-item color="rgba(0, 0, 0, .4)">
              <v-list-item-content>
                <v-list-item-title class="title"
                  >{{ firstName }} {{ lastName }}</v-list-item-title
                >
                <v-list-item-subtitle>{{ nameAssos }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <!-- Formulaire : -->
          <v-form v-model="valid">
            <v-container>
              <v-card outlined class="pa-10">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!disabled"
                      v-model="firstName"
                      label="Prénom"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!disabled"
                      v-model="lastName"
                      label="Nom"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!disabled"
                      v-model="nameAssos"
                      label="Nom de l'association"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!disabled"
                      v-model="email"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!disabled"
                      v-model="number"
                      label="Numéro de téléphone"
                      :counter="10"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" class="d-flex justify-end mt-auto">
                    <v-btn
                      v-if="disabled"
                      large
                      color="blue darken-1 white--text"
                      class="mr-2"
                      @click="disabled = false"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                      v-else
                      large
                      color="blue darken-1 white--text"
                      class="mr-2"
                      @click="disabled = true"
                    >
                      Modifier
                    </v-btn>
                    <v-btn
                      :disabled="!disabled"
                      large
                      color="blue darken-1 white--text"
                      @click="updateProfile"
                    >
                      Enregistrer
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title class="text-h5"> An even better title </v-card-title>
          <v-card-text>
            <p>
              Maecenas ullamcorper, dui et placerat feugiat, eros pede varius
              nisi, condimentum viverra felis nunc et lorem. Sed hendrerit.
              Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin
              faucibus arcu quis ante.
            </p>

            <p class="mb-0">
              Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed
              magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam
              lobortis. Suspendisse potenti.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import firebase from "firebase";
import stringToColor from "string-to-color";
import db from "@/main";
export default {
  data() {
    return {
      valid: false,
      disabled: false,
      tabs: null,
      nameAssos: "",
      firstName: null,
      lastName: "",
      email: null,
      number: null,
      snackbar: false,
    };
  },
  computed: {
    initials: function () {
      let computedInitials = "";
      if (this.firstName && this.firstName.length > 0) {
        computedInitials = this.firstName.charAt(0) + this.lastName.charAt(0);
      }
      return computedInitials;
    },
    color: function () {
      const computedColor = stringToColor(this.firstName + this.lastName);
      return computedColor;
    },
  },

  methods: {
    updateProfile() {
      // Method pour modifier les informations du profil :
      const user = firebase.auth().currentUser;

      user
        .updateEmail(this.email)
        .then(() => {
          console.log("Email updated");
          // Update successful
          // ...
        })
        .catch((error) => {
          console.log(error);
          // An error occurred
          // ...
        });

      var docRef = db.collection("profiles").doc(user.uid);
      docRef.set({
        firstname: this.firstName,
        lastname: this.lastName,
        assos: this.nameAssos,
        number: this.number,
      });

      this.disabled = false;
      this.snackbar = true;
    },
    getProfile() {
      // Method pour trouver les informations du profil :
      var user = firebase.auth().currentUser;
      this.email = user.email;
      var docRef = db.collection("profiles").doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.firstName = doc.data().firstname;
            this.lastName = doc.data().lastname;
            this.nameAssos = doc.data().assos;
            this.number = doc.data().number;
            console.log("Document data:", doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },

  created() {
    this.getProfile();
  },
};
</script>

<style></style>
