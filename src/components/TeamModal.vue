<template>
    <div v-if="selectedCharacters.length > 0" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded shadow p-4 max-w-lg">
        <h2 class="text-lg font-bold mb-4">Team Members</h2>
        <ul>
          <li v-for="character in selectedCharacters" :key="character.id" class="mb-6">
            <div class="flex items-center">
              <img :src="character.image" :alt="character.name" class="w-32 h-auto rounded mr-4">
              <div>
                <h3 class="text-lg font-bold">{{ character.name }}</h3>
                <p class="text-gray-600">{{ character.species }}</p>
                <p class="text-gray-600">{{ character.status }}</p>
                <p class="text-gray-600">{{ character.description }}</p>
              </div>
            </div>
            <button @click="removeCharacter(character.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm text-xs">Remove</button>
          </li>
        </ul>
        <button @click="clearTeam" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Clear Team</button>
        <button @click="closeModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Close</button>
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
      removeCharacter(characterId) {
        this.$emit('remove', characterId);
      },
      closeModal() {
        this.$emit('close');
      },
      clearTeam() {
        this.$emit('clear');
      }
    }
  };
  </script>
  