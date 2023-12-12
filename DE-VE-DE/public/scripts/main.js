//MODULE TO INITIATE THE SITE
//Intended for a concise way of understanding what happends when loading the site
//----------------------------------------------------------------------------
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  import { firebaseConfig } from "./firebaseConfig.js";
  import { getMovieData } from "./movies.js";
//----------------------------------------------------------------------------
// Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
//----------------------------------------------------------------------------
//Function calls
//Fetch data from the DB and generate it on the site
getMovieData('movies');
//----------------------------------------------------------------------------
export { db };
