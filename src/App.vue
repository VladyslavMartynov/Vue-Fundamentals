<template>
  <div class="app">
    <div class="app__btn">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-modal v-model:is-open="modalVisible">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isLoading" v-bind:posts="sortedPosts" @remove="removePost"/>
    <div v-else>...Loading</div>
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
export default {
  name: "App",
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      modalVisible: false,
      isLoading: false,
      isError: '',
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'By title'},
        { value: 'body',  name: 'By body'}
      ]
    }
  },
  methods: {
    createPost(post) {
        this.posts.push(post);
        this.modalVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(({id}) => post.id !== id )
    },
    showDialog() {
      this.modalVisible = true;
    },
    async fetchUserPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (_) {
        this.isError = 'Fetch error!';
        alert(this.isError);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchUserPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    }
  },
}
</script>

<style>
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html {
    box-sizing: inherit;
  }

  .app {
    padding: 20px;
  }

  .app__btn {
    display: flex;
    justify-content: space-between;
  }
</style>