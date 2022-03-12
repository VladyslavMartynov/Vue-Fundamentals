<template>
  <div>
    <h1>Posts Page</h1>
    <my-input class="app_search" v-model="searchQuery" placeholder="Search..."/>
    <div class="app__btn">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-modal v-model:is-open="modalVisible">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isLoading" v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>
    <div v-else>...Loading</div>
    <my-pagination v-bind:current-page="page" v-bind:total-pages="totalPages" @changePage="changePage"/>
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
      searchQuery: '',
      page: 1,
      perPage: 10,
      totalPages: 0,
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
      this.posts = this.posts.filter(({ id }) => post.id !== id )
    },
    showDialog() {
      this.modalVisible = true;
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
    async fetchUserPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.perPage
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.perPage)
        this.posts = response.data;
      } catch (_) {
        this.isError = 'Fetch error!';
        alert(this.isError);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchUserPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    page() {
      this.fetchUserPosts();
    }
  }
}
</script>

<style>
.app__btn {
  display: flex;
  justify-content: space-between;
}

.app_search {
  margin-bottom: 15px;
}
</style>