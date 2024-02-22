import { fetchToolsData } from "./main.js";
import { ToolUISmall, ToolUIBorrow, ToolUILend } from "./classes.js";
import { generateUniqueId } from "./main.js"

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE "SEACH TOOLS PAGE" IS INITIATED
//Searches for a local storage of tools(products) and generate respective HTML
async function generateToolsSearchPage(){
  const main = document.querySelector('.main');
  const searchFieldInput = document.querySelector('.searchField').value.toLowerCase();

  if(!JSON.parse(localStorage.getItem('products'))){
    const toolsData = await fetchToolsData();
    localStorage.setItem('products', JSON.stringify(toolsData));
  }
  let products = JSON.parse(localStorage.getItem('products'));
  console.log(products);

  if(searchFieldInput){
    products = products.filter((tool) => {
      return tool.title.toLowerCase().includes(searchFieldInput);
    });
    console.log(products);
  }
  
  main.innerHTML = '';
  for(const item of products){
    const tool = new ToolUISmall(item.id, item.image, item.title, item.description, item.placement, item.borrowed, item.reservedTo); 
    main.append(tool.tool);
  }  
}

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE "BORROWED OVERVIEW PAGE" IS INITIATED
//Searches for a local storage of borrowed tools and generate respective HTML
function generateBorrowedToolsHTML(){
  let borrowedToolsArr = JSON.parse(localStorage.getItem('borrowedToolsArr')) || [];
  const main = document.querySelector('.main');
  console.log(borrowedToolsArr);
  for(const item of borrowedToolsArr){
    const tool = new ToolUIBorrow(item.id, item.image, item.title, item.placement, item.reservedTo); 
    main.append(tool.tool);
  }  
}

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE "LENDED OVERVIEW PAGE" IS INITIATED
//Searches for a local storage of lended tools and generate respective HTML
function generateLendedToolsHTML(){
  let lendedToolsArr = JSON.parse(localStorage.getItem('lendedToolsArr')) || [];
  const main = document.querySelector('.main');
  console.log(lendedToolsArr);
  for(const item of lendedToolsArr){
    const tool = new ToolUILend(item.id, item.image, item.title, item.placement, item.reservedTo); 
    main.append(tool.tool);
  }  
}

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE USER CHOOSES TO RESERVE/BORROW A TOOL
//Searches for a local storage of tools(products) and borrowed tools and update data according to user input
function updateToolData(id, reservedFrom, reservedTo, borrowed){
  let products = JSON.parse(localStorage.getItem('products'))
  let borrowedToolsArr = JSON.parse(localStorage.getItem('borrowedToolsArr')) || [];
  if(borrowed === false){
    const findIndex = products.findIndex(obj => obj.id === id);
    if(findIndex >= 0){
      const updatedArr = [...products];
      updatedArr[findIndex] = {
        ...updatedArr[findIndex], 
        borrowed: !borrowed,
        reservedTo: reservedTo,
        reservedFrom: reservedFrom,
      };
      borrowedToolsArr.push(updatedArr[findIndex]);
     
      console.log(updatedArr);
      console.log(borrowedToolsArr);
      localStorage.setItem('products', JSON.stringify(updatedArr));
      localStorage.setItem('borrowedToolsArr', JSON.stringify(borrowedToolsArr));
    }
  }  
}

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE USER CHOOSES TO RETURN A BORROWED TOOL
//Searches for a local storage of tools(products) and borrowed tools and updated data
function returnTool(id){

  let products = JSON.parse(localStorage.getItem('products'));
  let borrowedToolsArr = JSON.parse(localStorage.getItem('borrowedToolsArr'));

  const findIndex = products.findIndex(obj => obj.id === id);
  if(findIndex >= 0){
    const updatedArr = [...products];
    updatedArr[findIndex] = {
      ...updatedArr[findIndex], 
      borrowed: false,
      reservedTo: null,
      reservedFrom: null,
    };
    borrowedToolsArr.splice(borrowedToolsArr[findIndex], 1);
   
    console.log(borrowedToolsArr);
    localStorage.setItem('products', JSON.stringify(updatedArr));
    localStorage.setItem('borrowedToolsArr', JSON.stringify(borrowedToolsArr));
    generateBorrowedToolsHTML();
    location.reload();
  }
}

//-----------------------------------------------------------------------\\
//FUNCTION CALLED WHENEVER THE "LENDED OVERVIEW PAGE" IS INITIATED
//Searches for a local storage of lended tools adds the new item to the array
function registerNewLendedItem(title, category, description){
  let products = JSON.parse(localStorage.getItem('products'))
  let lendedToolsArr = JSON.parse(localStorage.getItem('lendedToolsArr')) || [];
  const id = generateUniqueId();

  const updatedArr = [...products];
  const lendedToolsArrUpdated = [...lendedToolsArr];
  const newTool = { 
    id,
    title,
    borrowed: false,
    image: '../assets/product-pictures/NoImage.jpg',
    category,
    description,
    placement: 'husnr',
    reservedTo: null,
    reservedFrom: null,
  };
  updatedArr.push(newTool);
  lendedToolsArrUpdated.push(newTool);
    
  localStorage.setItem('products', JSON.stringify(updatedArr));
  localStorage.setItem('lendedToolsArr', JSON.stringify(lendedToolsArrUpdated));
  window.location.href = '../HTMLPages/OverviewLendPage.html';
}

//-----------------------------------------------------------------------\\
//FUNCTION TO RESET ALL TOOLS RESERVED STATUS BACK TO AVAILABLE
//Searches for a local storage of tools(products) and resets their values
async function resetAllToolStatus(){

  localStorage.removeItem('products');
  localStorage.removeItem('borrowedToolsArr');
  localStorage.removeItem('lendedToolsArr');

  let products = JSON.parse(localStorage.getItem('products'));
  console.log(products);
 
  /* products.forEach((obj, index) => {
    const newValues = {
      ...obj, 
      borrowed: false,
      reservedTo: null,
      reservedFrom: null,
    };
    products[index] = newValues;
  });
  localStorage.setItem('products', JSON.stringify(products)); */
}
/* resetAllToolStatus(); */



export { generateToolsSearchPage, generateBorrowedToolsHTML, generateLendedToolsHTML, updateToolData, returnTool,  registerNewLendedItem };