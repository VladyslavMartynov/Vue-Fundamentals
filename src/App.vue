<template>
  <nav-bar></nav-bar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  components: { NavBar }
}
</script>

<style>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: inherit;
  }

  .app {
    padding: 20px;
  }

</style>
