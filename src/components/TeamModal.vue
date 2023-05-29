<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white rounded shadow p-8">
        <h2 class="text-2xl font-bold mb-4">Your Team</h2>
        <ul>
          <li v-for="character in selectedCharacters" :key="character.id" class="flex items-center justify-between py-2">
            <div class="flex items-center">
              <img :src="character.image" :alt="character.name" class="w-8 h-8 rounded mr-2">
              <span>{{ character.name }}</span>
            </div>
            <button @click="removeCharacter(character)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Remove
            </button>
          </li>
        </ul>
        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    props: {
      selectedCharacters: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeCharacter(character) {
        this.$emit('remove-character', character);
      },
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  