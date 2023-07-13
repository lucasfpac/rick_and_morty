<template>
  <div class="min-h-screen bg-gray-800 text-white">
    <div class="container mx-auto py-10">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Build Your Team</h1>
        <div class="flex">
          <SearchInput v-model="searchTerm" @input="searchCharacters" class="rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <TeamButton @click="openModal" />
      </div>
      <CharacterGrid v-if="characters.length" :characters="characters" :isSelected="isSelected" @change-colour="changeColour" />
      <div v-else>
        <p class="text-center">Loading...</p>
      </div>
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @previous-page="previousPage" @next-page="nextPage" @go-to-page="goToPage" />
      <TeamModal v-if="isModalOpen" :selected-characters="getSelectedCharacters()" @close-modal="closeModal" @update:selected-characters="updateSelectedCharacters" />
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
      isModalOpen: false,
      selectedCharacters: [] // Array to store selected characters
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

          // Update isSelected status for the characters
          this.isSelected = this.characters.reduce((acc, character) => {
            acc[character.id] = this.selectedCharacters.some(
              selectedCharacter => selectedCharacter.id === character.id
            );
            return acc;
          }, {});
        })
        .catch(error => {
          console.error(error);
        });
    },
    changeColour(characterId) {
      this.isSelected[characterId] = !this.isSelected[characterId];

      // Update selectedCharacters based on isSelected status
      if (this.isSelected[characterId]) {
        const character = this.characters.find(c => c.id === characterId);
        if (character) {
          this.selectedCharacters.push(character);
        }
      } else {
        this.selectedCharacters = this.selectedCharacters.filter(
          character => character.id !== characterId
        );
      }
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
    goToPage(page) {
      this.currentPage = page;
      this.fetchCharacters();
    },
    searchCharacters() {
      if (this.searchTerm) {
        axios
          .get(`https://rickandmortyapi.com/api/character/?name=${this.searchTerm}`)
          .then(response => {
            this.characters = response.data.results;
            this.totalPages = response.data.info.pages;

            // Update isSelected status for the characters
            this.isSelected = this.characters.reduce((acc, character) => {
              acc[character.id] = this.selectedCharacters.some(
                selectedCharacter => selectedCharacter.id === character.id
              );
              return acc;
            }, {});
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
      this.$refs.searchInput.clear(); // Clear the input value of the SearchInput component
      this.fetchCharacters();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    updateSelectedCharacters(newSelectedCharacters) {
      this.selectedCharacters = newSelectedCharacters;
      this.isSelected = this.characters.reduce((acc, character) => {
        acc[character.id] = this.selectedCharacters.some(
          selectedCharacter => selectedCharacter.id === character.id
        );
        return acc;
      }, {});
    },
    getSelectedCharacters() {
      return this.selectedCharacters;
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.bg-red-600 {
  /* Set the background color of the Clear button to a red shade */
  background-color: #f80202;
}

.hover\:bg-red-700:hover {
  /* Set the background color of the button when hovered to a darker red shade */
  background-color: #c53030;
}

.focus\:ring-red-500:focus {
  /* Set the focus ring color of the button to a red shade */
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.5);
}
</style>
