<template>
    <div class="mt-6">
      <button @click="previousPage" :disabled="currentPage === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        Previous
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      previousPage() {
        this.$emit('previous-page');
      },
      nextPage() {
        this.$emit('next-page');
      }
    }
  };
  </script>
  