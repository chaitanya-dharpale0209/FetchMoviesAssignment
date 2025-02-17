import axios from 'axios';

const API_KEY = 'f55cb2c2';
const BASE_URL = 'http://www.omdbapi.com/';

export const fetchMovies = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      s: searchTerm,
      apikey: API_KEY,
      page
    },
  });

  return response.data;  
};
