<template>
  <div>
    <h1>Page with Posts</h1>
    <my-input
        class="app_search"
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Search..."
    />
    <div class="app__btn">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-modal v-model:is-open="modalVisible">
      <post-form @create="createPost"/>
    </my-modal>
    <post-list v-if="!isLoading" v-bind:posts="sortedAndSearchedPosts" @remove="removePost"/>
    <div v-else>...Loading</div>
    <my-pagination v-bind:current-page="page" v-bind:total-pages="totalPages" @changePage="setPage"/>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { mapGetters,mapActions, mapMutations, mapState } from 'vuex';
export default {
  name: "App",
  components: { PostList, PostForm },
  data() {
    return {
      modalVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
      removePost: 'post/removePost'
    }),
    ...mapActions({
      fetchUserPosts: 'post/fetchUserPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.modalVisible = false;
    },
    showDialog() {
      this.modalVisible = true;
    },
  },
  mounted() {
    this.fetchUserPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts ,
      isLoading: state => state.post.isLoading,
      isError: state => state.post.isError,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      perPage: state => state.post.perPage,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
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