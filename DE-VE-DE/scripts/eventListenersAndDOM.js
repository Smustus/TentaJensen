//MODULE CONTAINING ALL DOM ELEMENTS AND EVENTLISTENERS
//----------------------------------------------------------------------------
import { searchMovie, checkMovieExists, addMovieDB } from './movies.js';

const titleInput = document.querySelector('.movieTitleInput');
const genreInput = document.querySelector('.movieGenre');
const yearInput = document.querySelector('.movieReleaseYear');
const descriptionInput = document.querySelector('.movieDescription');

const movieContainer = document.querySelector('.main__movieContainer');
const movieSearch = document.querySelector('.main__searchMovieInput');
const movieSearchBtn = document.querySelector('.main__searchMovieBtn');
const addMovieBtn = document.querySelector('.addMovieBtn');
//----------------------------------------------------------------------------
//Event Listeners
movieSearchBtn.addEventListener('click', () => {
  searchMovie()
});

movieSearch.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
  searchMovie()
  }
});

//Function to add a movie to the database unless it already exist
addMovieBtn.addEventListener('click', async () => {
  try {
    const title = titleInput.value.toLowerCase();
    const genre = genreInput.value;
    const releaseDate = yearInput.value;
    const description = descriptionInput.value;
    const checkTitle = await checkMovieExists(titleInput);
    console.log(checkTitle);
    if(titleInput.value && genreInput.value && yearInput.value && descriptionInput.value){
      if(!checkTitle){
        addMovieDB(title, genre, releaseDate, description, 'movies');
        titleInput.value = '';
        genreInput.value = '';
        yearInput.value = '';
        descriptionInput.value = '';
      } else {
        alert('Movie already exist in DB');
      }
    } else {
      alert('Please fill all fields');
    }
  } catch (error) {
    console.error('Movie could not be added: ' + error);
  }
});

export { titleInput, movieSearch, movieSearchBtn, addMovieBtn, movieContainer }