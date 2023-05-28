import axios from 'axios';

// API request to fetch characters
export function fetchCharacters(page) {
  return axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
}
