'use strict';

// GLobal Variables
var
  imageOneEl = document.getElementById('choice-one'),
  imageTwoEl = document.getElementById('choice-two'),
  imageThreeEl = document.getElementById('choice-three');

var currentProductsDisplayed = [];
var previousProductsDisplayed = [];

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

// Get random Product numbers and place into and Array
// There can be no duplicate items in the currentProductDisplay or the previousProductsDisplayed

function getCurrentDisplay() {

  for (var numberOfProducts = 1; numberOfProducts <= 3; numberOfProducts++) {
    var randomProductNumber = Math.floor(allProducts.length * Math.random());

    while (currentProductsDisplayed.includes(randomProductNumber) | previousProductsDisplayed.includes(randomProductNumber)) {
      randomProductNumber = Math.floor(allProducts.length * Math.random());
    }

    currentProductsDisplayed.push(randomProductNumber);
    allProducts[randomProductNumber].views++;
  }


  imageOneEl.src = allProducts[currentProductsDisplayed[0]].path;
  imageOneEl.title = allProducts[currentProductsDisplayed[0]].name;
  imageOneEl.alt = allProducts[currentProductsDisplayed[0]].name;


  imageTwoEl.src = allProducts[currentProductsDisplayed[1]].path;
  imageTwoEl.title = allProducts[currentProductsDisplayed[1]].name;
  imageTwoEl.alt = allProducts[currentProductsDisplayed[1]].name;


  imageThreeEl.src = allProducts[currentProductsDisplayed[2]].path;
  imageThreeEl.title = allProducts[currentProductsDisplayed[2]].name;
  imageThreeEl.alt = allProducts[currentProductsDisplayed[2]].name;

  previousProductsDisplayed.length = 0;

  previousProductsDisplayed = currentProductsDisplayed.slice();

  currentProductsDisplayed.length = 0;
}
var testLength = 1;
// getCurrentDisplay();

while (testLength <= 25) {
  imageOneEl.addEventListener('click', function (event) {
    // allProducts[].clicks++;
    console.log(event.target);
    testLength++;
    getCurrentDisplay(event);
  });


}

