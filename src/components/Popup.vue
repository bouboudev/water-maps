<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="white--text"
          color="blue darken-1"
          v-bind="attrs"
          v-on="on"
        >
          Ajouter un forage
        </v-btn>
      </template>
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="text-h5">Ajouter un forage</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Nom du forage"
                    v-model="nameDrilling"
                    :rules="inputRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Nom du village"
                    v-model="nameVillage"
                    :rules="inputRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Latitude"
                    v-model="latitudeDrilling"
                    hint="Exemple: 48.887737638046794"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Longitude"
                    v-model="longitudeDrilling"
                    hint="Exemple: 48.887737638046794"
                    :rules="inputRules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-i label="Image" v-model="imageUrl"></v-i>

                  <v-file-input
                    @change="uploadImage"
                    label="Image du Forage"
                    filled
                    prepend-icon="mdi-camera"
                  ></v-file-input>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formattedDate"
                        label="Picker without buttons"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="inputRules"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="datePicker"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <small class="red--text">*Champs obligatoire</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annuler
            </v-btn>
            <v-btn color="blue darken-1" text @click="valid" :loading="loading">
              Ajouter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import format from "date-fns/format";
import { parseISO } from "date-fns";
import db from "@/main";
import firebase from "firebase";

export default {
  data() {
    return {
      dialog: false,
      nameDrilling: "",
      nameVillage: "",
      latitudeDrilling: null,
      longitudeDrilling: null,
      imageUrl: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      datePicker: null,
      menu: false,
      modal: false,
      inputRules: [
        (v) => (v && v.length >= 3) || "Le Minimum est de 3 caractères.",
      ],
      loading: false,
    };
  },
  methods: {
    uploadImage(event) {
      let file = event;

      console.log(file.name);
      var storageRef = firebase.storage().ref("Forage/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          // Handle unsuccessful uploads
          console.log(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.imageUrl = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    },

    valid() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          Nom: this.nameDrilling,
          Village: this.nameVillage,
          Latitude: this.latitudeDrilling,
          Longitude: this.longitudeDrilling,
          Image: this.imageUrl,
          Date: new Date(this.datePicker),
        };
        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
            this.nameDrilling = "";
            this.nameVillage = "";
            this.latitudeDrilling = null;
            this.longitudeDrilling = null;
            this.imageUrl = "";
            this.datePicker = null;
            setTimeout(() => this.$router.push({ path: "/" }), 4000);
          });
      }
    },
  },
  computed: {
    formattedDate() {
      return this.datePicker
        ? format(parseISO(this.datePicker), "dd/MMMM/yyyy")
        : "";
    },
  },
};
</script>

<style></style>
