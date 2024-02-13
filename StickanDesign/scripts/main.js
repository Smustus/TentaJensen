//-----------------------------------------------------------------------\\
//SOMEDAY THIS MIGHT CONTAIN USEFUL CODE

function generateUniqueId(){
  let products = JSON.parse(localStorage.getItem('products'));
  console.log(products);
  let randomNum;
  
  console.log(products);
  do {
    randomNum = Math.ceil(Math.random() * 100);
  } while (products.some(product => product.id === randomNum));
      return randomNum;
}
console.log(generateUniqueId());
