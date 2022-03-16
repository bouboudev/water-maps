<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Chercher un forage"
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="projects" :search="search">
    </v-data-table>
  </v-card>

  <!-- <v-card>
    <div>
      <v-card-title v-for="project in projects" :key="project.id">{{
        project.Nom
      }}</v-card-title>
    </div>
  </v-card> -->
</template>

<script>
import db from "@/main";
export default {
  data() {
    return {
      projects: [],
      search: "",
      headers: [
        {
          text: "Nom",
          value: "Nom",
        },
        { text: "date", value: "Date" },
        { text: "geoloc", value: "Geoloc" },
        { text: "Village", value: "Village" },
        { text: "Image", value: "Image" },
      ],
      //   desserts: [
      //     {
      //       name: "Frozen Yogurt",
      //       calories: 159,
      //       fat: 6.0,
      //       carbs: 24,
      //       protein: 4.0,
      //       iron: "1%",
      //     },
      //     {
      //       name: "Ice cream sandwich",
      //       calories: 237,
      //       fat: 9.0,
      //       carbs: 37,
      //       protein: 4.3,
      //       iron: "1%",
      //     },
      //     {
      //       name: "Eclair",
      //       calories: 262,
      //       fat: 16.0,
      //       carbs: 23,
      //       protein: 6.0,
      //       iron: "7%",
      //     },
      //     {
      //       name: "Cupcake",
      //       calories: 305,
      //       fat: 3.7,
      //       carbs: 67,
      //       protein: 4.3,
      //       iron: "8%",
      //     },
      //     {
      //       name: "Gingerbread",
      //       calories: 356,
      //       fat: 16.0,
      //       carbs: 49,
      //       protein: 3.9,
      //       iron: "16%",
      //     },
      //     {
      //       name: "Jelly bean",
      //       calories: 375,
      //       fat: 0.0,
      //       carbs: 94,
      //       protein: 0.0,
      //       iron: "0%",
      //     },
      //     {
      //       name: "Lollipop",
      //       calories: 392,
      //       fat: 0.2,
      //       carbs: 98,
      //       protein: 0,
      //       iron: "2%",
      //     },
      //     {
      //       name: "Honeycomb",
      //       calories: 408,
      //       fat: 3.2,
      //       carbs: 87,
      //       protein: 6.5,
      //       iron: "45%",
      //     },
      //     {
      //       name: "Donut",
      //       calories: 452,
      //       fat: 25.0,
      //       carbs: 51,
      //       protein: 4.9,
      //       iron: "22%",
      //     },
      //     {
      //       name: "KitKat",
      //       calories: 518,
      //       fat: 26.0,
      //       carbs: 65,
      //       protein: 7,
      //       iron: "6%",
      //     },
      //   ],
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
      console.log(this.projects.Nom);
    });
  },
};
</script>

<style></style>
