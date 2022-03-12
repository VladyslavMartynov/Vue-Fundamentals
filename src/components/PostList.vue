<template>
  <div v-if="!!posts.length">
    <h3>List of Posts</h3>
    <transition-group name="post-list">
      <post-item  v-for="post in posts"
                  :post="post" :key="post.id" @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else>
    List of Posts is empty!
  </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.5s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .post-list-move {
    transition: transform 0.8s ease;
  }
</style>