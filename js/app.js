'use strict';

// GLobal Variables
var
  imageOneEl = document.getElementById('choice-one'),
  imageTwoEl = document.getElementById('choice-two'),
  imageThreeEl = document.getElementById('choice-three');

//Create the product list

var productList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

productList.forEach(function (product) {
  new Product(product);
});

// Get three unique random numbers and put into the current array
var currentProductsDisplayed = [];
var previousProductsDisplayed = [];

function getRandomProducts() {

  var getRandomNumber = 3;

  while (getRandomNumber !== 0) {
    var randomProductNumber = Math.floor(allProducts.length * Math.random());
    console.log(randomProductNumber);
    currentProductsDisplayed.push(randomProductNumber);
    getRandomNumber--;
  }

  // Assign image source files
  var productNumber = 0;

  imageOneEl.src = allProducts[currentProductsDisplayed[productNumber]].path;
  imageOneEl.title = allProducts[currentProductsDisplayed[productNumber]].name;
  imageOneEl.alt = allProducts[currentProductsDisplayed[productNumber]].name;

  productNumber++;

  imageTwoEl.src = allProducts[currentProductsDisplayed[productNumber]].path;
  imageTwoEl.title = allProducts[currentProductsDisplayed[productNumber]].name;
  imageTwoEl.alt = allProducts[currentProductsDisplayed[productNumber]].name;

  productNumber++;

  imageThreeEl.src = allProducts[currentProductsDisplayed[productNumber]].path;
  imageThreeEl.title = allProducts[currentProductsDisplayed[productNumber]].name;
  imageThreeEl.alt = allProducts[currentProductsDisplayed[productNumber]].name;

  previousProductsDisplayed = currentProductsDisplayed;

  currentProductsDisplayed = [];

  console.log(previousProductsDisplayed, currentProductsDisplayed);

}

getRandomProducts();

// for (var numberOfProduct = 0; numberOfProduct < allProducts.length; numberOfProduct++) {
//   new Product(productList[numberOfProduct]);
// }


// console.log(Product);