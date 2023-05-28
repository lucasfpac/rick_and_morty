<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="character in characters" :key="character.id" class="bg-white rounded shadow p-4">
      <div class="mb-4">
        <img :src="character.image" :alt="character.name" class="w-full h-auto rounded">
      </div>
      <div class="text-center">
        <h2 class="text-lg font-bold mb-2">{{ character.name }}</h2>
        <p class="text-gray-600">{{ character.species }}</p>
        <p class="text-gray-600">{{ character.status }}</p>
      </div>
      <div class="mt-4">
        <button @click="changeColour(character.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ isSelected[character.id] ? 'Selected' : 'Select' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    characters: {
      type: Array,
      required: true
    },
    isSelected: {
      type: Object,
      required: true
    }
  },
  methods: {
    changeColour(characterId) {
      this.$emit('change-colour', characterId);
    }
  }
};
</script>
