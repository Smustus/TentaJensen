//-----------------------------------------------------------------------\\

function generateUniqueId(){
  let products = JSON.parse(localStorage.getItem('products'));
  let randomNum;
  do {
    randomNum = Math.ceil(Math.random() * 100);
  } while (products.some(product => product.id === randomNum));
      return randomNum;
}

async function fetchToolsData(){
  try {
    const data = await fetch('../scripts/products.json');
    const tools = await data.json()
    return tools.products;

  } catch (error) {
    console.log(error);
  }
}

export { generateUniqueId, fetchToolsData };