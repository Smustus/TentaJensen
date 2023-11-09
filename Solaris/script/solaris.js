
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header_title');
const headerSubtitle = document.querySelector('.header_subtitle');
const returnBtn = document.querySelector('.returnBtn');

const main = document.querySelector('.main');
const mainPlanets = document.querySelector('.main_planets');
const mainPlanetInfo = document.querySelector('.main_planetInfo');


//Fetch API key
async function getAPIKey(){
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
    method: "POST"
  });
    const data = await response.json();
    console.log(data);
    return data.key;

  } catch (error) {
    return 'Error fetching data' + ' ' + error;
  }
}
/* console.log(getAPIKey()); */


//Fetch data
async function getPlanetData(){
  const key = await getAPIKey();
  try {
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
      method: "GET",
      headers: { "x-zocom": `${key}` }
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
    return data;

  } catch (error) {
    return 'Data could not be retrieved' + ' ' + error;
  }
} 

function hideFrontPage(){
  headerTitle.classList.add('hidden');
  headerSubtitle.classList.add('hidden');
  mainPlanets.classList.add('hidden');
  mainPlanetInfo.classList.remove('hidden');
  returnBtn.classList.remove('hidden');
}

function showFrontPage(){
  headerTitle.classList.remove('hidden');
  headerSubtitle.classList.remove('hidden');
  mainPlanets.classList.remove('hidden');
  mainPlanetInfo.classList.add('hidden');
  returnBtn.classList.add('hidden');
}


//Generate planets and add event listeners
async function generatePlanetsAndEventListeners(){
  const planetData = await getPlanetData();
  const planetArr =  await planetData.bodies;

  for(let i = 0; i < planetArr.length; i++){
    const planetContainer = document.createElement('div');
    planetContainer.classList.add(`planet-${i}`, 'planet');
    mainPlanets.append(planetContainer);

    planetContainer.addEventListener('click', () => {
      mainPlanetInfo.innerHTML = '';
      hideFrontPage();
      return new PlanetUI(planetArr[i]);
    });
  }
  returnBtn.addEventListener('click', () => {
    showFrontPage();
  });
}
console.log(generatePlanetsAndEventListeners());

//Template for planet information
class PlanetUI {
  constructor(planet){
    this.section = document.createElement('article');
    this.section.classList.add('planetInfo');
    mainPlanetInfo.append(this.section);

    //Info segment
    this.title = document.createElement('h1');
    this.subtitle = document.createElement('h3');
    this.subtitle.classList.add('subtitle');
    this.infoText = document.createElement('p');
    this.title.textContent = planet.name;
    this.subtitle.textContent = planet.latinName;
    this.infoText.textContent = planet.desc;
    this.section.append(this.title);
    this.section.append(this.subtitle);
    this.section.append(this.infoText);

    //other empiric data segment
    this.infoSegment = document.createElement('section');
    this.infoSegment.classList.add('article_infoSegment');
    this.section.append(this.infoSegment);

    this.circum = document.createElement('h4');
    this.circumText = document.createElement('p');
    this.circum.textContent = 'OMKRETS';
    this.circumText.textContent = planet.circumference + ' km';

    this.distance = document.createElement('h4');
    this.distanceText = document.createElement('p');
    this.distance.textContent = 'AVSTÅND TILL SOLEN';
    this.distanceText.textContent = planet.distance + ' km';

    this.maxTemp = document.createElement('h4');
    this.maxTempText = document.createElement('p');
    this.maxTemp.textContent = 'MAX TEMPERATUR';    
    this.maxTempText.textContent = planet.temp.day + '°C';

    this.minTemp = document.createElement('h4');
    this.minTempText = document.createElement('p');
    this.minTemp.textContent = 'MIN TEMPERATUR';
    this.minTempText.textContent = planet.temp.night +'°C';   

    this.infoSegment.append(this.circum);
    this.infoSegment.append(this.distance);
    this.infoSegment.append(this.circumText);
    this.infoSegment.append(this.distanceText);
    this.infoSegment.append(this.maxTemp);
    this.infoSegment.append(this.minTemp);
    this.infoSegment.append(this.maxTempText);
    this.infoSegment.append(this.minTempText);

    //Moon segment
    this.moons = document.createElement('h4');
    this.moonText = document.createElement('p');
    this.moons.textContent = 'MÅNAR';
    this.moonText.textContent = planet.moons.toString().split(',').join(', ');
    
    this.section.append(this.moons);
    this.section.append(this.moonText);    
  }
}
