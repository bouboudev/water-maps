<template>
  <div class="home">
    <test />
  </div>
</template>

<script>
// @ is an alias to /src

import test from "../components/test";

export default {
  name: "Home",
  components: {
    test,
  },
};
</script>
