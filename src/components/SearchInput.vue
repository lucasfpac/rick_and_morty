<template>
  <div class="flex">
    <input type="text" :value="inputValue" @input="updateValue" :placeholder="placeholder" class="text-gray-500 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <button @click="clearInput" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r">
      Clear
    </button>
  </div>
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
    },
    clearInput() {
      this.inputValue = '';
      this.$emit('input', this.inputValue);
    }
  }
};
</script>
