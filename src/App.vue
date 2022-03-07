<template>
  <v-app>
    <v-app-bar class="d-flex justify-center" app color="light-blue" dark flat>
      <h2>Water-maps</h2>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
