import { products as baseProd } from "./products.js";
import { ToolUISmall, ToolUIBorrow, ToolUILend } from "./classes.js";

let products = JSON.parse(localStorage.getItem('products')) || localStorage.setItem('products', JSON.stringify(baseProd));
console.log(products);

let borrowedArr = JSON.parse(localStorage.getItem('borrowedTools')) || [];

function genTools(){
  const main = document.querySelector('.main');
  
  for(const item of products){
    const tool = new ToolUISmall(item.id, item.image, item.title, item.description, item.placement, item.borrowed, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function updateObj(id, reservedFrom, reservedTo, borrowed){
  const findIndex = products.findIndex(obj => obj.id === id);
  if(findIndex >= 0){
    const updatedArr = [...products];
    updatedArr[findIndex] = {
      ...updatedArr[findIndex], 
      borrowed: !borrowed,
      reservedTo: reservedTo,
      reservedFrom: reservedFrom,
    };
    borrowedArr.push(updatedArr[findIndex]);
   
    console.log(updatedArr);
    console.log(borrowedArr);
  localStorage.setItem('products', JSON.stringify(updatedArr));
  localStorage.setItem('borrowedTools', JSON.stringify(borrowedArr));
  }
}

function genBorrowed(){
  const main = document.querySelector('.main');
  console.log(borrowedArr);
  for(const item of borrowedArr){
    const tool = new ToolUIBorrow(item.id, item.image, item.title, item.description, item.placement, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function genLended(){
  const main = document.querySelector('.main');
  console.log(borrowedArr);
  for(const item of borrowedArr){
    const tool = new ToolUILend(item.id, item.image, item.title, item.description, item.placement, item.reservedTo); 
    main.appendChild(tool.tool);
  }  
}

function resetAllStatus(){
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



export { genTools, updateObj, genBorrowed};