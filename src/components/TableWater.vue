<template>
  <v-card>
    <v-snackbar color="success accent-2" v-model="snackBar" top>
      Super ! Vous venez d'ajouter un nouveau forage !

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackBar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher un forage"
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="projects"
      :search="search"
      :footer-props="{ itemsPerPageText: 'Forage par page' }"
    >
      <template v-slot:[`item.Date`]="{ item }">
        <span>{{ item.Date.toDate().toLocaleDateString() }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import db from "@/main";

export default {
  components: {},
  data() {
    return {
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
      ],
    };
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
        }
      });
    });
  },
};
</script>

<style></style>
