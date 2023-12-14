//MODULE ORGANIZED WITH MOVIE FUNCTIONS/CLASS
//Intended to easy locate all functions related to the movies on the page
//----------------------------------------------------------------------------
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from "./main.js";
import { movieSearch, movieContainer } from './eventListenersAndDOM.js';
//----------------------------------------------------------------------------
//Fetch the movie data from the DB and generate respective HTML
async function getMovieData(dataCollection){
  try {
    const response = await getDocs(collection(db, dataCollection));
    const dataArr = [];
    response.forEach((movieObj) => {
      dataArr.push({
        id: movieObj.id,
        movie: movieObj.data()
      });
    });
    generateMovieHTML(dataArr);
  } catch (error) {
    console.error('Movie data could not be retrieved: ' + error);
  }
}
//------------------------------------------------------
//Generate movie HTML 
  function generateMovieHTML(dataArr) {
    movieContainer.textContent = '';
    for(const {id, movie} of dataArr){
      new MovieUI(id, movie.title, movie.genre, movie.releaseDate, movie.description, movie.watched, movieContainer);
    }
  }
//------------------------------------------------------
//Movie template class
class MovieUI {
  constructor(id, title, genre, releaseDate, description, watched, parent) {
    this.productArticle = document.createElement('article');
    this.productArticle.classList.add('productBox', watched ? 'watched' : 'notWatched');
    parent.append(this.productArticle);

    this.title = document.createElement('h3');
    this.title.textContent = title[0].toUpperCase() + title.slice(1);

    this.price = document.createElement('h4');
    this.price.textContent = `${genre[0].toUpperCase() + genre.slice(1)}, ${releaseDate}`;

    this.description = document.createElement('p');
    this.description.textContent = description[0].toUpperCase() + description.slice(1);

    this.watchedBtn = document.createElement('button');
    this.watchedBtn.classList.add('watchedBtn');
    this.watchedBtn.textContent = 'Watched';
    this.watchedBtn.addEventListener('click', async () => {
      await updateWatchedStatus('movies', id);
      this.productArticle.classList.add('watched');
      getMovieData('movies');
    });

    this.removeBtn = document.createElement('button');
    this.removeBtn.classList.add('removeBtn');
    this.removeBtn.textContent = 'Remove';
    this.removeBtn.addEventListener('click', async () => {
      await removeMovieDB('movies', id);
      getMovieData('movies');
    });

    this.productArticle.append(
      this.title,
      this.price,
      this.description,
      this.removeBtn,
      this.watchedBtn
    );
  }
}
//----------------------------------------------------------------------------
//Check the DB for movie title duplicates
async function checkMovieExists(input) {
  const movieTitle = input.value.toLowerCase();
  const titleQuery = query(collection(db, 'movies'), where('title', '==', movieTitle.toLowerCase()));
  const titles = await getDocs(titleQuery);

  let titleFound;
  titles.forEach((title) => {
      titleFound = title;
  });
  return titleFound;
}
//----------------------------------------------------------------------------
//Search the DB for a movie, if theres no match, generate all movies in the DB
async function searchMovie() {
  try {
    const movie = await checkMovieExists(movieSearch);
    if(movie){
      movieContainer.textContent = '';
      new MovieUI(movie.id, movie.data().title, movie.data().genre, movie.data().releaseDate, movie.data().description, movie.data().watched, movieContainer);
    } else {
      getMovieData('movies');
    }
  } catch (error) {
    console.error('Movie could not be found: ' + error);
  }
}
//----------------------------------------------------------------------------
//Search the DB for a movie, if theres no match, generate all movies in the DB
async function searchMovieCategory(cat) {
  try {
    const category = cat.toLowerCase()
    const genreQuery = await query(collection(db, 'movies'), where('genre', '==', category));
    const genres = await getDocs(genreQuery);
    const dataArr = [];

    genres.forEach((movieObj) => {
      dataArr.push({
        id: movieObj.id,
        movie: movieObj.data()
      });
    })

    if(dataArr.length > 0){
      movieContainer.textContent = '';
      generateMovieHTML(dataArr) 
    } else {
      alert('No movies could be found with this category');
      getMovieData('movies');
    }
  } catch (error) {
    console.error('Movies could not be found: ' + error);
  }
}
//----------------------------------------------------------------------------
//Add a movie to the DB collection
async function addMovieDB(title, genre, releaseDate, description, dataCollection){
  const movie = {
      title,
      genre,
      releaseDate,
      description,
      watched: false
    }
  await addDoc(collection(db, dataCollection), movie);
  getMovieData(dataCollection);
}
//----------------------------------------------------------------------------
//Update the watched status of a movie in the DB
async function updateWatchedStatus(dataCollection, id){
  try {
    const movie = await getDoc(doc(db, dataCollection, id));
    const watchedStatus = movie.data().watched;
    await updateDoc(doc(db, dataCollection, id), {
      watched: !watchedStatus
    });
  } catch (error) {
    console.error('Watched status could not be updated: ' + error);
  }
}
//----------------------------------------------------------------------------
//Remove a movie from the DB collection
async function removeMovieDB(dataCollection, id){
  try {
    await deleteDoc(doc(db, dataCollection, id));
  } catch (error) {
    console.error('Movie could not be removed: ' + error);
  }
}
//----------------------------------------------------------------------------
export { getMovieData, checkMovieExists, searchMovie, addMovieDB, searchMovieCategory };