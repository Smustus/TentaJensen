import { products } from "./products.js";

console.log(products);

function genPic(image){
  const wrapper = document.querySelector('.wrapper');
  const imgBox = document.createElement('img');
  imgBox.src = image;
  wrapper.appendChild(imgBox);
}