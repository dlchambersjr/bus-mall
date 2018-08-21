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

  // Load Product One
  imageOneEl.src = allProducts[currentProductsDisplayed[0]].path;
  imageOneEl.title = allProducts[currentProductsDisplayed[0]].name;
  imageOneEl.alt = allProducts[currentProductsDisplayed[0]].name;

  // Load Product Two
  imageTwoEl.src = allProducts[currentProductsDisplayed[1]].path;
  imageTwoEl.title = allProducts[currentProductsDisplayed[1]].name;
  imageTwoEl.alt = allProducts[currentProductsDisplayed[1]].name;

  // Load Product Three
  imageThreeEl.src = allProducts[currentProductsDisplayed[2]].path;
  imageThreeEl.title = allProducts[currentProductsDisplayed[2]].name;
  imageThreeEl.alt = allProducts[currentProductsDisplayed[2]].name;

  // Prepare for next set of products
  // previousProductsDisplayed.length = 0;
  // previousProductsDisplayed = currentProductsDisplayed.slice();
  // currentProductsDisplayed.length = 0;
}

// Load first set of product pictures
getCurrentDisplay();

// CheckforClicks();
var testLength = 1;

// Listen for a click on picture one
imageOneEl.addEventListener('click', function (event) {
  processClicks(event, 0);
});

imageTwoEl.addEventListener('click', function (event) {
  processClicks(event, 1);
});

imageThreeEl.addEventListener('click', function (event) {
  processClicks(event, 2);
});

function processClicks(event, productPosition) {
  event.preventDefault(); //prevent reload

  // *** WORK IN PROGRESS ***
  // console.log(`ImageThree-${event.target.title}`);
  // var title = event.target.title;
  // console.log(title);
  // *************************

  var pos = currentProductsDisplayed[productPosition];
  allProducts[pos].clicks++;

  // Check for end of survey
  if (testLength < 25) {
    testLength++;
    previousProductsDisplayed.length = 0;
    previousProductsDisplayed = currentProductsDisplayed.slice();
    currentProductsDisplayed.length = 0;
    getCurrentDisplay(event);
  }
  else {
    alert('All Done');
    // imageOneEl.removeEventListener('click', function());
    // imageTwoEl.removeEventListener('click');
    // imageThreeEl.removeEventListener('click');
    renderResults();
  }
}


function renderResults() {
  var bodyEl = document.getElementById('body');
  var ulEl = document.createElement('ul');
  for (var position = 0; position < allProducts.length; position++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allProducts[position].clicks} for the ${allProducts[position].name}`;
    ulEl.appendChild(liEl);
  }
  bodyEl.appendChild(ulEl);
}

