const headerTitle = document.querySelector('.header_title');
const headerSubtitle = document.querySelector('.header_subtitle');
const returnBtn = document.querySelector('.returnBtn');
const mainPlanets = document.querySelector('.main_planets');
const mainPlanetInfo = document.querySelector('.main_planetInfo');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

//Fetch API key
async function getAPIKey(){
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: "POST"
  });
    const data = await response.json();
    return data.key;
  } catch (error) {
    return `Key could not be retrieved: ${error}`;
  }
}

//Fetch planet data
async function getPlanetData(){
  const key = await getAPIKey();
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
      method: "GET",
      headers: { "x-zocom": `${key}` }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return `Data could not be retrieved: ${error}`;
  }
} 

//Hide frontpage elements and show information page
function hideStartPage(){
  headerTitle.classList.add('hidden');
  headerSubtitle.classList.add('hidden');
  mainPlanets.classList.add('hidden');
  mainPlanetInfo.classList.remove('hidden');
  returnBtn.classList.remove('hidden');
  prevBtn.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
}

//Show frontpage elements and hide information page
function showStartPage(){
  headerTitle.classList.remove('hidden');
  headerSubtitle.classList.remove('hidden');
  mainPlanets.classList.remove('hidden');
  mainPlanetInfo.classList.add('hidden');
  returnBtn.classList.add('hidden');
  prevBtn.classList.add('hidden');
  nextBtn.classList.add('hidden');
}

//Generate planet HTMLs and their respective event listeners
async function generatePlanetsAndEventListeners(){
  const planetData = await getPlanetData();
  const planetArr =  await planetData.bodies;
  let currentPlanet = 0;

  for(let i = 0; i < planetArr.length; i++){
    createPlanet(i);
  }
  
  function createPlanet(i){
    const planetContainer = document.createElement('div');
    planetContainer.classList.add(`planet-${i}`, 'planet');
    mainPlanets.append(planetContainer);

    planetContainer.addEventListener('click', () => {
      mainPlanetInfo.innerHTML = '';
      document.body.style.background = 'rgb(23,23,87)';
      document.body.style.background = 'linear-gradient(301deg, rgba(23,23,87,1) 0%, rgba(8,10,89,1) 14%, rgba(31,11,115,1) 32%, rgba(37,35,102,1) 53%, rgba(57,42,139,1) 83%, rgba(100,78,166,1) 100%)'; 
      hideStartPage();
      currentPlanet = i;
      new PlanetUI(planetArr[i], mainPlanetInfo);
    });

    planetContainer.addEventListener('mouseover', () => {
      const dropDownInfo = document.createElement('article');
      dropDownInfo.classList.add(`dropDownPlanet-${i}`, 'dropDown');
      planetContainer.append(dropDownInfo);
      new PlanetUI(planetArr[i], dropDownInfo);
    });

    planetContainer.addEventListener('mouseout', () => {
      const dropDownInfo = planetContainer.querySelector(`.dropDownPlanet-${i}`);
      if (dropDownInfo) {
        dropDownInfo.remove();
      }
    });

    if(i === 6){
      const ringContainer = document.createElement('div');
      ringContainer.classList.add('saturnRing');
      planetContainer.append(ringContainer);
    }
  }

  //Return to start page
  returnBtn.addEventListener('click', () => {
    document.body.style.background = 'rgb(23,23,87)';
    document.body.style.background = 'linear-gradient(266deg, rgba(23,24,51,1) 0%, rgba(73,45,34,1) 47%, rgba(131,101,28,1) 83%, rgba(255,203,0,1) 100%)'; 
    showStartPage();
  });

  //Generate previous planet, unless we reached the start of the array
  prevBtn.addEventListener('click', () => {
  if(currentPlanet > 0){
    currentPlanet--;
    mainPlanetInfo.innerHTML = '';
    new PlanetUI(planetArr[currentPlanet], mainPlanetInfo);
  }
  });
  
  //Generate next planet, unless we reached the end of the array
  nextBtn.addEventListener('click', () => {
    if(currentPlanet < planetArr.length -1){
      currentPlanet++;
      mainPlanetInfo.innerHTML = '';
      new PlanetUI(planetArr[currentPlanet], mainPlanetInfo);
    }
  });
}
generatePlanetsAndEventListeners();

//Template for planet information
class PlanetUI {
  constructor(planet, parent){
    this.section = document.createElement('article');
    this.section.classList.add('planetInfo');
    parent.append(this.section);

    //Info segment
    this.title = document.createElement('h1');
    this.subtitle = document.createElement('h3');
    this.subtitle.classList.add('subtitle');
    this.infoText = document.createElement('p');

    this.title.textContent = planet.name;
    this.subtitle.textContent = planet.latinName;
    this.infoText.textContent = planet.desc;

    this.section.append(
      this.title,
      this.subtitle, 
      this.infoText
    );
  
    //Other empiric data segment
    this.infoSegment = document.createElement('section');
    this.infoSegment.classList.add('article_infoSegment');
    this.section.append(this.infoSegment);

    this.circum = document.createElement('h4');
    this.circumText = document.createElement('p');
    this.circum.textContent = 'OMKRETS';
    this.circumText.textContent = `${planet.circumference} km`;

    this.distance = document.createElement('h4');
    this.distanceText = document.createElement('p');
    this.distance.textContent = 'AVSTÅND TILL SOLEN';
    this.distanceText.textContent = `${planet.distance} km`;

    this.maxTemp = document.createElement('h4');
    this.maxTempText = document.createElement('p');
    this.maxTemp.textContent = 'MAX TEMPERATUR';    
    this.maxTempText.textContent = `${planet.temp.day} °C`;

    this.minTemp = document.createElement('h4');
    this.minTempText = document.createElement('p');
    this.minTemp.textContent = 'MIN TEMPERATUR';
    this.minTempText.textContent = `${planet.temp.night} °C`;   

    this.infoSegment.append(
      this.circum,
      this.distance,
      this.circumText,
      this.distanceText,
      this.maxTemp,
      this.minTemp,
      this.maxTempText,
      this.minTempText
    );
    
    //Moon segment
    this.moons = document.createElement('h4');
    this.moonText = document.createElement('p');
    this.moons.textContent = 'MÅNAR';
    this.moonText.textContent = planet.moons.toString().split(',').join(', ');
    
    this.section.append(
      this.moons, 
      this.moonText
    );
  }
}
