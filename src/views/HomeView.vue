<template>
  <div>
    <hello-world />
    <test />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import test from "../components/test";

export default {
  name: "Home",

  components: {
    HelloWorld,
    test,
  },
};
</script>
