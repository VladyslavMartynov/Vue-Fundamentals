<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">
      Choose option
    </option>
    <option
        v-for="option in options"
            :key="option.value"
        :value="option.value">
      {{option.name}}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      const { value } = event.target;
      this.$emit('update:modelValue', value);
    }
  }
}
</script>

<style scoped>

</style>