import { products as baseProd } from "./products.js";
import { ToolUISmall, ToolUIBorrow, ToolUILend } from "./classes.js";

let borrowedToolsArr = JSON.parse(localStorage.getItem('borrowedToolsArr')) || [];

function generateToolsSearchPage(){
  const main = document.querySelector('.main');
  let products = JSON.parse(localStorage.getItem('products')) || localStorage.setItem('products', JSON.stringify(baseProd));
  console.log(products);
  /* let products = fetch('./products.json') */
  for(const item of products){
    const tool = new ToolUISmall(item.id, item.image, item.title, item.description, item.placement, item.borrowed, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function updateToolData(id, reservedFrom, reservedTo, borrowed){
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

function generateBorrowedToolsHTML(){
  let borrowedToolsArr = JSON.parse(localStorage.getItem('borrowedToolsArr')) || [];
  const main = document.querySelector('.main');
  console.log(borrowedToolsArr);
  for(const item of borrowedToolsArr){
    const tool = new ToolUIBorrow(item.id, item.image, item.title, item.description, item.placement, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function generateLendedToolsHTML(){
  const main = document.querySelector('.main');
  console.log(lendedToolsArr);
  for(const item of lendedToolsArr){
    const tool = new ToolUILend(item.id, item.image, item.title, item.description, item.placement, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function resetAllStatus(){
  let products = JSON.parse(localStorage.getItem('products')) || localStorage.setItem('products', JSON.stringify(baseProd));
  onsole.log(products);

  /* localStorage.removeItem('products'); */
  localStorage.removeItem('borrowedTools');
 
  products.forEach((obj, index) => {
    const newValues = {
      ...obj, 
      borrowed: false,
      reservedTo: null,
      reservedFrom: null,
    };
    products[index] = newValues;
  });
  localStorage.setItem('products', JSON.stringify(products));
}
/* resetAllStatus(); */



export { generateToolsSearchPage, updateToolData, generateBorrowedToolsHTML, generateLendedToolsHTML};