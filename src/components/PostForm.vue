<template>
  <form class="form" @submit.prevent>
    <h4>Create Post</h4>
    <my-input
        v-model="post.title"
        type="text"
        placeholder="Enter post-title"
    />
    <my-input
        v-model="post.description"
        type="text"
        placeholder="Enter post-description"
    />
    <my-button class="form__btn" @click="createPost()">Create</my-button>
  </form>
</template>

<script>

export default {
  name: "PostForm",
  data() {
    return {
      post: {
        title: '',
        description: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = new Date();
      this.$emit('create', this.post);
      this.post = {
        title : '',
        description: ''
      }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form__btn {
  align-self: flex-end;
  margin-top: 15px;
}

</style>