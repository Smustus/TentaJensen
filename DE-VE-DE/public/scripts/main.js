//MODULE TO INITIATE THE SITE
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
getMovieData('movies');
//----------------------------------------------------------------------------
export { db };
