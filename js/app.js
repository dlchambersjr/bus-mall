'use strict';

// GLobal Variables
var
  imageOneEl = document.getElementById('choiceOne'),
  imageTwoEl = document.getElementById('choiceTwo'),
  imageThree = document.getElementById('choiceThree');

//Create the product list

var productList = ['bag', 'banana', 'bathrom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'taunton', 'unicorn', 'usb', 'water-can', 'wine-glass'];

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
var getRandomNumber = 3;

while (getRandomNumber !== 0) {
  var randomProductNumber = (Math.floor(allProducts.length * Math.random));
  console.log(randomProductNumber);
  currentProductsDisplayed.push(randomProductNumber);
  getRandomNumber--;
}

// for (var numberOfProduct = 0; numberOfProduct < allProducts.length; numberOfProduct++) {
//   new Product(productList[numberOfProduct]);
// }


// console.log(Product);