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
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSearchedPosts from "@/hooks/useSearchedPosts";
export default {
  name: "App",
  components: { PostList, PostForm },
  data() {
    return {
      sortOptions: [
        { value: 'title', name: 'By name' },
        { value: 'body', name: 'By description' }
      ]
    }
  },
  setup(props) {
     const { totalPages, posts, isLoading } = usePosts(10);
     const { sortedPosts, selectedSort } = useSortedPosts(posts);
     const { searchedPosts, searchQuery } = useSearchedPosts(sortedPosts);
     return {
       totalPages,
       posts,
       isLoading,
       sortedPosts,
       selectedSort,
       searchedPosts,
       searchQuery
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