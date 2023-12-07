//MODULE WITH MOVIE RELATED STUFF
//----------------------------------------------------------------------------
import { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from "./main.js";

const titleInput = document.querySelector('.movieTitleInput');
const genreInput = document.querySelector('.movieGenre');
const yearInput = document.querySelector('.movieReleaseYear');
const descriptionInput = document.querySelector('.movieDescription');
const addMovieBtn = document.querySelector('.addMovieBtn');

const movieContainer = document.querySelector('.main__movieContainer');
const movieSearch = document.querySelector('.main__searchMovieInput');
const movieSearchBtn = document.querySelector('.main__searchMovieBtn');
//----------------------------------------------------------------------------
//Fetch the movie data from the DB
async function getMovieData(dataCollection){
  try {
    const response = await getDocs(collection(db, dataCollection));
    const dataArr = [];
    response.forEach((movieObj) => {
      console.log(movieObj.data());
      dataArr.push({
        id: movieObj.id,
        movie: movieObj.data()
      });
    });
    console.log(dataArr);
    generateMovieHTML(dataArr);
    
  } catch (error) {
    console.error('Data could not be retrieved: ' + error);
  }
}

movieSearchBtn.addEventListener('click', () => {
  searchMovie()
});

movieSearch.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
  searchMovie()
  }
});
//----------------------------------------------------------------------------
//Generate movie HTML 
  function generateMovieHTML(dataArr) {
    movieContainer.textContent = '';
    for(const {id, movie} of dataArr){
      new MovieUI(id, movie.title, movie.genre, movie.releaseDate, movie.description, movie.watched, movieContainer);
    }
  }
//----------------------------------------------------------------------------
//Movie template
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
      await updateWatchedDB('movies', id);
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
        /* titleInput.value = '';
        genreInput.value = '';
        yearInput.value = '';
        descriptionInput.value = ''; */
        
      } else {
        alert('Movie already exist in DB');
      }
    } else {
      alert('Please fill all fields');
    }
  } catch (error) {
    console.error('Data could not be added: ' + error);
  }
});
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
//Search the DB for a movie
async function searchMovie() {
  try {
    const movie = await checkMovieExists(movieSearch);
    if(movie){
      console.log(movie.data());
      movieContainer.textContent = '';
      new MovieUI(movie.id, movie.data().title, movie.data().genre, movie.data().releaseDate, movie.data().description, movie.data().watched, movieContainer);
    } else {
      getMovieData('movies');
    }
  } catch (error) {
    console.error('Data could not be retrieved: ' + error);
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
async function updateWatchedDB(dataCollection, id){
  try {
    const movie = await getDoc(doc(db, dataCollection, id));
    const watchedStatus = movie.data().watched;
    console.log(watchedStatus);
    if (!watchedStatus) {
      await updateDoc(doc(db, dataCollection, id), {
        watched: true
    });
  } else {
      await updateDoc(doc(db, dataCollection, id), {
        watched: false
      });
    }
  } catch (error) {
    console.error('Data could not be updated: ' + error);
  }
}
//----------------------------------------------------------------------------
//Remove a movie from the DB collection
async function removeMovieDB(dataCollection, id){
  try {
    await deleteDoc(doc(db, dataCollection, id));
  } catch (error) {
    console.error('Data could not be removed: ' + error);
  }
}
//----------------------------------------------------------------------------


export { getMovieData };