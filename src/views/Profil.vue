<template>
  <div>
    <!-- menu tabs -->
    <v-card flat>
      <v-toolbar flat>
        <template v-slot:extension>
          <v-tabs v-model="tabs" centered>
            <v-tab> Profil card</v-tab>
            <v-tab> Informations</v-tab>
            <v-tab> Paramètre</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card flat>
            <!-- card profil : -->
            <v-card class="mx-auto" max-width="434" tile>
              <v-img height="100%"></v-img>
              <v-col>
                <v-avatar color="indigo">
                  <span class="white--text text-h5">{{ this.initials }}</span>
                </v-avatar>
              </v-col>
              <v-list-item color="rgba(0, 0, 0, .4)">
                <v-list-item-content>
                  <v-list-item-title class="title">{{
                    email
                  }}</v-list-item-title>
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
                <v-card>
                  <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="Prénom"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        label="Nom"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        label="Nom de l'association"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="number"
                        :rules="emailRules"
                        label="Numéro de téléphone"
                        :counter="10"
                        required
                      ></v-text-field>
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
                Maecenas malesuada. Vestibulum ullamcorper mauris at ligula.
                Proin faucibus arcu quis ante.
              </p>

              <p class="mb-0">
                Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed
                magna purus, fermentum eu, tincidunt eu, varius ut, felis.
                Aliquam lobortis. Suspendisse potenti.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tabs: null,
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
