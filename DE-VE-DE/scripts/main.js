/*INSTRUKTIONER
I denna slutexamination ska du skapa en sida åt det fiktiva företaget DE-VE-DE där man kan lägga till information om filmer man vill se, ta bort information om filmer man sett och se all information om de filmer man har sparat. Allt detta ska sedan sparas i Firebase databas.
Det är information om en film ska sparas i databasen, inte själva filmen! Ni måste inte heller ha några bilder/posters eller något sådant.

Funktionalitet

  Det ska gå och mata in i inputfält: titel, genre, utgivningsdatum.
  Kunna lägga till information om en film som sparas i din Firebase-databas.
  Kunna ta bort information om en film från din Firebase-databas.
  Kunna se all information om de filmer på sidan som hämtas från din Firebase-databas.
  Det ska inte kunna gå och lägga upp en film som redan finns alltså titeln får inte förekomma mer än en gång i din databas.
  Man ska kunna trycka på en film och välja att man sett den då ska egenskapen watched sättas till true i din databas på den filmen.

Film
Fält 	Datatyp 	Beskrivning
title 	Sträng 	Filmens titel
genre 	Sträng 	Filmens genre
releaseDate 	Sträng 	Filmens utgivningsår
watched 	Boolean 	Om filmen setts eller ej, kan vara true eller false

Betygskriterier
Godkänt

  All funktionalitet finns med.
  Att du använder Firebase.
  Sidan fungerar med inga fel i konsolen i developer tools.
  Vettiga namn på variabler etc på engelska.

Väl godkänt

  Allt i godkänt.
  Att din kod är uppdelad i moduler där du har skrivit en kommentar i varje modul om varför du har delat upp som du gjort.
  Att det går att söka efter en specifik film via ett inputfält på titel. Sökningen ska göras mot din databas i Firebase.

*/
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
