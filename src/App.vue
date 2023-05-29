<template>
  <div class="min-h-screen" :class="{ 'dark': isDarkMode }">
    <div class="container mx-auto py-10">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Build Your Team</h1>
        <div class="flex">
          <input type="text" v-model="searchTerm" @input="searchCharacters" placeholder="Search characters" class="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <button @click="clearSearch" class="bg-gray-300 text-gray-600 rounded-r px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">Clear</button>
        </div>
        <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Team</button>
      </div>
      <div v-if="characters.length" class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <button @click="toggleSelection(character)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {{ isSelected(character) ? 'Selected' : 'Select' }}
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Loading...</p>
      </div>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage" />
    </div>

    <!-- Team Modal -->
    <TeamModal
      :selectedCharacters="selectedCharacters"
      v-if="isModalOpen"
      @remove-character="removeCharacter"
      @close="closeModal"
    />
    
    <button @click="toggleDarkMode" class="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from './components/Pagination.vue';
import TeamModal from './components/TeamModal.vue';

export default {
  components: {
    Pagination,
    TeamModal
  },
  data() {
    return {
      characters: [],
      selectedCharacters: [],
      currentPage: 1,
      totalPages: 0,
      searchTerm: '',
      isModalOpen: false,
      isDarkMode: false
    };
  },
  mounted() {
    this.fetchCharacters();
  },
  methods: {
    fetchCharacters() {
      axios
        .get(`https://rickandmortyapi.com/api/character/?page=${this.currentPage}`)
        .then(response => {
          this.characters = response.data.results;
          this.totalPages = response.data.info.pages;
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleSelection(character) {
      if (this.isSelected(character)) {
        this.selectedCharacters = this.selectedCharacters.filter(
          selected => selected.id !== character.id
        );
      } else {
        this.selectedCharacters.push(character);
      }
    },
    isSelected(character) {
      return this.selectedCharacters.some(selected => selected.id === character.id);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCharacters();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchCharacters();
      }
    },
    searchCharacters() {
      this.currentPage = 1;
      this.fetchCharacters();
    },
    clearSearch() {
      this.searchTerm = '';
      this.searchCharacters();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    removeCharacter(character) {
      this.selectedCharacters = this.selectedCharacters.filter(
        selected => selected.id !== character.id
      );
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.dark {
  --tw-bg-opacity: 1 !important;
  --tw-text-opacity: 1 !important;
  background-color: #1f2937 !important;
  color: #f9fafb !important;
}

.dark h2.text-lg {
  color: #000000 !important;
}

.dark h2.text-2xl {
  color: #000000 !important;
}

.dark span {
  color: #000000 !important;
}
</style>
