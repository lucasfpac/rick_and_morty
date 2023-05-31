<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-green-700 rounded shadow p-4">
      <h2 class="text-lg font-bold text-white mb-4">Team Members</h2>
      <ul>
        <li v-for="character in localSelectedCharacters" :key="character.id" class="mb-2 flex items-center justify-between">
          <div class="flex items-center">
            <img :src="character.image" :alt="character.name" class="w-16 h-auto rounded mr-2">
            <span class="text-white font-bold mr-3">{{ character.name }}</span>
          </div>
          <button @click="removeCharacter(character.id)" class="rounded-full bg-red-500 hover:bg-red-600 focus:outline-none text-white w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </li>
      </ul>
      <button @click="closeModalAndSaveChanges" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
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
  data() {
    return {
      localSelectedCharacters: []
    };
  },
  created() {
    this.localSelectedCharacters = [...this.selectedCharacters];
  },
  methods: {
    removeCharacter(characterId) {
      const index = this.localSelectedCharacters.findIndex(character => character.id === characterId);
      if (index !== -1) {
        this.localSelectedCharacters.splice(index, 1);
      }
    },
    closeModalAndSaveChanges() {
      this.$emit('close-modal');
      this.$emit('update:selected-characters', this.localSelectedCharacters);
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.bg-green-800 {
  /* Set the background color of the modal to a dark green */
  background-color: #1F9D55;
}

.text-white {
  /* Set the text color to white */
  color: white;
}

.text-gray-200 {
  /* Set the character name color to a light gray */
  color: #E2E8F0;
}

.bg-red-600 {
  /* Set the background color of the button to a red shade */
  background-color: #E53E3E;
}

.hover\:bg-red-700:hover {
  /* Set the background color of the button when hovered to a darker red shade */
  background-color: #C53030;
}
</style>
