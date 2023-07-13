<template>
  <div class="mt-6 flex items-center justify-center">
    <button v-if="currentPage > 1" @click="previousPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
      Previous
    </button>
    <div class="flex">
      <button v-for="page in displayedPages" :key="page" @click="goToPage(page)" :class="getPageButtonClass(page)">
        <div class="page-number" :class="{ 'current-page': page === currentPage }">
          {{ page }}
        </div>
      </button>
    </div>
    <button v-if="currentPage < totalPages" @click="nextPage" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
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
  computed: {
    displayedPages() {
      const range = 5; // Number of pages to display
      const start = Math.max(this.currentPage - Math.floor(range / 2), 1);
      const end = Math.min(start + range - 1, this.totalPages);

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  },
  methods: {
    previousPage() {
      this.$emit('previous-page');
    },
    nextPage() {
      this.$emit('next-page');
    },
    goToPage(page) {
      this.$emit('go-to-page', page);
    },
    getPageButtonClass(page) {
      return {
        'bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-l': page !== this.currentPage,
        'bg-gray-800 text-white rounded-r': page === this.currentPage
      };
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.page-number {
  /* Set the background color and border radius for the page number boxes */
  background-color: #D1D5DB;
  padding: 0.5rem;
}

.current-page {
  /* Set the background color and text color for the current page number */
  background-color: #4B5563;
  color: white;
}

.bg-gray-300 {
  /* Set the background color of the buttons to a gray shade */
  background-color: #D1D5DB;
}

.hover\:bg-gray-400:hover {
  /* Set the background color of the buttons when hovered to a darker gray shade */
  background-color: #9CA3AF;
}

.text-gray-800 {
  /* Set the text color of the buttons to a dark gray */
  color: #1F2937;
}

.text-white {
  /* Set the text color to white */
  color: white;
}

.rounded-l {
  /* Set the left border radius for the previous button */
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.rounded-r {
  /* Set the right border radius for the next button */
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>
