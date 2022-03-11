<template>
  <div class="modal" v-if="isOpen" @click="hideModal">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:isOpen', false)
    }
  }
}
</script>

<style scoped>
  .modal {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
  }

  .modal__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }

</style>