<template>
  <v-card>
    <v-snackbar
      color="success accent-2"
      v-model="snackBarDrilling"
      top
      :timeout="4000"
    >
      Super ! Vous venez d'ajouter un nouveau forage !

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackBarDrilling = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <v-snackbar color="accent-2" v-model="snackBar" top>
      Super ! Vous venez d'ajouter un nouveau forage !

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackBar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar> -->
    <PopupEditing :dialog="dialogPopup" />
    <v-card flat class="d-flex justify-space-between">
      <v-card-title>
        <h3>Liste des forages</h3>
      </v-card-title>
      <v-card-title>
        <Popup @projectAdded="snackBarDrilling = true" />
      </v-card-title>
      <v-card-title>
        <v-text-field
          prepend-icon="mdi-water-pump"
          rounded
          dense
          clearable
          outlined
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher un forage"
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="projects"
      :search="search"
      :footer-props="{ itemsPerPageText: 'Forage par page' }"
    >
      <template v-slot:[`item.Date`]="{ item }">
        <span>{{ item.Date.toDate().toLocaleDateString() }}</span>
      </template>
      <template v-slot:[`item.Image`]="{ item }">
        <v-img :src="item.Image" max-height="50" max-width="50"></v-img>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="grey_dark" class="pointer">
                mdi-dots-vertical</v-icon
              >
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item class="pointer" @click="editDrilling(item)">
              Editer
            </v-list-item>
            <v-list-item class="pointer" @click="deleteDrilling(item)">
              <v-dialog v-model="dialogConfirm" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <div text v-bind="attrs" v-on="on">Supprimer</div>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    Voulez-vous vraiment supprimer ce forage ?
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogConfirm = false"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteDrilling(item)"
                    >
                      Supprimer
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import db from "@/main";
import PopupEditing from "./PopupEditing.vue";
import Popup from "./Popup.vue";

export default {
  components: { PopupEditing, Popup },
  data() {
    return {
      snackBarDrilling: false,
      dialogConfirm: false,
      dialogPopup: false,
      snackBar: false,
      projects: [],
      search: "",
      headers: [
        {
          text: "Nom",
          value: "Nom",
        },
        { text: "Date", value: "Date" },
        { text: "Latitude", value: "Latitude" },
        { text: "Longitude", value: "Longitude" },
        { text: "Village", value: "Village" },
        { text: "Image", value: "Image" },
        {
          text: "Actions",
          align: "end",
          value: "actions",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    editDrilling(item) {
      this.dialogPopup = true;
      console.log("Success editing", item.id);
    },
    deleteDrilling(item) {
      db.collection("projects").doc(item.id).delete();
      this.dialogConfirm = false;
    },
  },

  created() {
    db.collection("projects").onSnapshot((res) => {
      const changes = res.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id,
          });
        } else if (change.type === "removed") {
          this.projects.pop({
            ...change.doc.data(),
            id: change.doc.id,
          });
        }
      });
    });
  },
};
</script>

<style></style>
