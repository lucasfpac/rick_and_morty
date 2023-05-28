<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-bold mb-4">Team Members</h2>
        <ul>
          <li v-for="character in characters" :key="character.id" class="mb-2">
            <!-- Character content -->
          </li>
        </ul>
        <button @click="closeModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      characters: {
        type: Array,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  