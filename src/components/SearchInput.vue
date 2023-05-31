<template>
  <input type="text" :value="inputValue" @input="updateValue" :placeholder="placeholder" class=" text-black border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    updateValue(event) {
      this.inputValue = event.target.value;
      this.$emit('input', this.inputValue);
    }
  }
};
</script>