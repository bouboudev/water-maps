<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form">
        <v-card>
          <v-card-title>
            <span class="text-h5">Editer un forage</span>
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
                  <v-text-field label="Image" v-model="imageUrl"></v-text-field>
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
              Editer
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

export default {
  props: ["dialog"],
  data() {
    return {
      nameDrilling: "",
      nameVillage: "",
      latitudeDrilling: null,
      longitudeDrilling: null,
      imageUrl: "",
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
