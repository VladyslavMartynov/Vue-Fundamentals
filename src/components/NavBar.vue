<template>
  <div class="navbar">
    <h2 class="navbar__title">Vue-3</h2>
    <div class="navbar__links">
      <my-button class="navbar__item" @click="navigateToMain">Main</my-button>
      <my-button class="navbar__item" @click="navigateToPosts">Posts</my-button>
      <my-button class="navbar__item" @click="navigateToAbout">About</my-button>
    </div>
  </div>
</template>

<script>
import router, { PathNames } from "@/router/router";

export default {
  name: "NavBar",
  methods: {
    navigateToPosts() {
      router.push(PathNames.POSTS);
    },
    navigateToAbout() {
      router.push(PathNames.ABOUT)
    },
    navigateToMain() {
      router.push(PathNames.MAIN)
    }
  }
}
</script>

<style scoped>
  .navbar {
    height: 50px;
    background-color: grey;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    justify-content: space-between;
  }

  .navbar__title {
    padding: 5px;
    align-self: center;
  }

  .navbar__links {
    display: flex;
  }

  .navbar__links button {
    border: 1px solid black;
    color: black;
    background-color: teal;
  }


</style>