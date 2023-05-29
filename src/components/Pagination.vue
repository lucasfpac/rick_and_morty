<template>
  <div class="mt-6 flex items-center justify-center">
    <button v-if="currentPage > 1" @click="previousPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
      Previous
    </button>
    <span class="px-4">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button v-if="currentPage < totalPages" @click="nextPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
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
