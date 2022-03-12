<template>
  <div class="page__wrapper">
    <div class="page__item"
         @click="changePage(pageNumber)"
         v-for="pageNumber in totalPages"
         :key="pageNumber"
         :class="{
           'page__active': pageNumber === currentPage
         }"
    >
      {{pageNumber}}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    totalPages: Number,
    currentPage: Number
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('changePage', pageNumber)
    }
  }
}
</script>

<style scoped>
  .page__wrapper {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .page__item {
    border: 1px solid black;
    padding: 10px;
    margin-left: 10px;
  }

  .page__active {
    border: 2px solid teal;
  }
</style>