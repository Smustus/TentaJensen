//MODULE CONTAINING ALL DOM ELEMENTS AND EVENTLISTENERS
//Organized to have easier access to respective button, would divide them into two separate modules if I had more code
//----------------------------------------------------------------------------
import { searchMovie, checkMovieExists, addMovieDB, searchMovieCategory } from './movies.js';
//----------------------------------------------------------------------------
//DOM elements, organized in group with regards to their page location
const introSection = document.querySelector('.header__introSection');
const introBtn = document.querySelector('.header__introBtn');
const hideBtn = document.querySelector('.header__hideBtn');
const titleInput = document.querySelector('.movieTitleInput');
const genreInput = document.querySelector('.movieGenre');
const yearInput = document.querySelector('.movieReleaseYear');
const descriptionInput = document.querySelector('.movieDescription');
const addMovieBtn = document.querySelector('.header__addMovieBtn');

const navSection = document.querySelector('nav');

const movieContainer = document.querySelector('.main__movieContainer');
const movieSearch = document.querySelector('.main__searchMovieInput');
const movieSearchBtn = document.querySelector('.main__searchMovieBtn');
//----------------------------------------------------------------------------
//Event Listeners (EL)
//EL troll subscripe button
introBtn.addEventListener('click', () => {
  if(introBtn.textContent === 'Subscribe now!'){
    return introBtn.textContent = 'You what?'
  }
  if(introBtn.textContent === 'You what?'){
    return introBtn.textContent = 'Do something better with your money';
  }
  if(introBtn.textContent === 'Do something better with your money'){
    return introBtn.textContent = 'Press this if you´re a fool'
  }
  if(introBtn.textContent === 'Press this if you´re a fool'){
    return introBtn.textContent = 'Subscribe now!'
  }
});
//------------------------------------------------------
//EL to hide the info text
hideBtn.addEventListener('click', () => {
  if(introSection.classList.contains('header__animationOut')){
    introSection.classList.remove('header__animationOut')
    introSection.classList.add('header__animationIn')
    
  } else {
    introSection.classList.remove('header__animationIn')
    introSection.classList.add('header__animationOut')
  }
  setTimeout(() => {
    introSection.classList.toggle('hidden');
    introSection.classList.contains('header__animationOut') ? hideBtn.innerHTML = '&#11167;' : hideBtn.innerHTML = '&#11165;'
  }, 600);
});
//------------------------------------------------------
//EL to add a movie to the database unless it already exist
addMovieBtn.addEventListener('click', async () => {
  try {
    const title = titleInput.value.toLowerCase();
    const genre = genreInput.value.toLowerCase();
    const getYear = new Date().getFullYear();
    let releaseDate;

    if(Number(yearInput.value) > 1800 && Number(yearInput.value) <= getYear){
      releaseDate = yearInput.value
    } else {
      yearInput.value = '';
      alert('Please enter a valid year between 1800 and the current year.');
      return;
    }
    const description = descriptionInput.value;
    const checkTitle = await checkMovieExists(titleInput);

    if(title && genre && releaseDate && description){
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
//------------------------------------------------------
//EL for the nav container to find movies with respective genres/categories
navSection.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__categoryAction')) {
    searchMovieCategory('action');
  } else if (e.target.classList.contains('nav__categoryComedy')) {
    searchMovieCategory('comedy');
  } else if (e.target.classList.contains('nav__categoryDrama')) {
    searchMovieCategory('drama');
  } else if (e.target.classList.contains('nav__categoryFantasy')) {
    searchMovieCategory('fantasy');
  } else if (e.target.classList.contains('nav__categorySci-Fi')) {
    searchMovieCategory('sci-fi');
  } else if (e.target.classList.contains('nav__categoryOther')) {
    searchMovieCategory('other');
  } 
});
//------------------------------------------------------
//EL to search for a movie title
movieSearchBtn.addEventListener('click', () => {
  searchMovie();
});
movieSearch.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
  searchMovie();
  }
});
//----------------------------------------------------------------------------
export { titleInput, movieSearch, movieSearchBtn, addMovieBtn, movieContainer }