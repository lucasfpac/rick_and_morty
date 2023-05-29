<template>
  <div class="min-h-screen bg-gray-100">
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
      <div class="mt-6">
        <button @click="previousPage" :disabled="currentPage === 1" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Previous
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Next
        </button>
      </div>

      <!-- Team Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded shadow p-4">
          <h2 class="text-lg font-bold mb-4">Team Members</h2>
          <ul>
            <li v-for="character in selectedCharacters" :key="character.id" class="mb-2">
              <img :src="character.image" :alt="character.name" class="w-12 h-auto rounded mr-2">
              <span class="text-gray-800">{{ character.name }}</span>
              <button @click="removeCharacter(character.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-sm">Remove</button>
            </li>
          </ul>
          <button @click="closeModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      characters: [],
      selectedCharacters: [],
      currentPage: 1,
      totalPages: 0,
      searchTerm: '',
      isModalOpen: false
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
        this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== character.id);
      } else {
        if (this.selectedCharacters.length < 5) {
          this.selectedCharacters.push(character);
        } else {
          alert('Maximum limit of 5 characters reached!');
        }
      }
    },
    isSelected(character) {
      return this.selectedCharacters.some(c => c.id === character.id);
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
      if (this.searchTerm) {
        axios
          .get(`https://rickandmortyapi.com/api/character/?name=${this.searchTerm}`)
          .then(response => {
            this.characters = response.data.results;
            this.totalPages = response.data.info.pages;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.fetchCharacters();
      }
    },
    clearSearch() {
      this.searchTerm = '';
      this.fetchCharacters();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    removeCharacter(characterId) {
      this.selectedCharacters = this.selectedCharacters.filter(c => c.id !== characterId);
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
