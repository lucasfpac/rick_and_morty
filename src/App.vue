<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-10">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Build Your Team</h1>
        <div class="flex">
          <SearchInput v-model="searchTerm" @input="searchCharacters" />
          <button @click="clearSearch" class="bg-gray-300 text-gray-600 rounded-r px-4 py-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">Clear</button>
        </div>
        <TeamButton @click="openModal" />
      </div>
      <CharacterGrid v-if="characters.length" :characters="characters" :isSelected="isSelected" @change-colour="changeColour" />
      <div v-else>
        <p class="text-center">Loading...</p>
      </div>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage" />
      <TeamModal v-if="isModalOpen" :selectedCharacters="getSelectedCharacters" @close-modal="closeModal" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CharacterGrid from './components/CharacterGrid.vue';
import Pagination from './components/Pagination.vue';
import SearchInput from './components/SearchInput.vue';
import TeamButton from './components/TeamButton.vue';
import TeamModal from './components/TeamModal.vue';

export default {
  components: {
    CharacterGrid,
    Pagination,
    SearchInput,
    TeamButton,
    TeamModal
  },
  data() {
    return {
      characters: [],
      isSelected: {},
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
      axios.get(`https://rickandmortyapi.com/api/character/?page=${this.currentPage}`)
        .then(response => {
          this.characters = response.data.results;
          this.isSelected = this.characters.reduce((acc, character) => {
            acc[character.id] = false;
            return acc;
          }, {});
          this.totalPages = response.data.info.pages;
        })
        .catch(error => {
          console.error(error);
        });
    },
    changeColour(characterId) {
      this.isSelected[characterId] = !this.isSelected[characterId];
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
        axios.get(`https://rickandmortyapi.com/api/character/?name=${this.searchTerm}`)
          .then(response => {
            this.characters = response.data.results;
            this.isSelected = this.characters.reduce((acc, character) => {
              acc[character.id] = false;
              return acc;
            }, {});
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
    }
  },
  computed: {
    getSelectedCharacters() {
      return this.characters.filter(character => this.isSelected[character.id]);
    }
  },
  watch: {
    isSelected: {
      handler() {
        this.$forceUpdate(); // Force re-rendering to update the modal content
      },
      deep: true
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
