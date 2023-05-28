<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-bold mb-4">Team Members</h2>
        <ul>
          <li v-for="character in selectedCharacters" :key="character.id" class="mb-2">
            <img :src="character.image" :alt="character.name" class="w-12 h-auto rounded mr-2">
            <span class="text-gray-800">{{ character.name }}</span>
          </li>
        </ul>
        <button @click="$emit('close-modal')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
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
    }
  };
  </script>
  