'use strict';

// GLobal Variables
var
  imageOneEl = document.getElementById('choice-one'),
  imageTwoEl = document.getElementById('choice-two'),
  imageThreeEl = document.getElementById('choice-three');

var currentProductsDisplayed = [];
var previousProductsDisplayed = [];

var maxChoices = 25;
var resultsChart;

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

// Handle and process clicks
var testLength = 1;

// Listen for a click on picture one
imageOneEl.addEventListener('click', processClicks);
imageTwoEl.addEventListener('click', processClicks);
imageThreeEl.addEventListener('click', processClicks);


function processClicks(event) {
  event.preventDefault(); //prevent reload

  var title = event.target.title;
  var pos = productList.indexOf(title);
  allProducts[pos].clicks++;

  // Check for end of survey
  if (testLength < maxChoices) {
    testLength++;
    previousProductsDisplayed.length = 0;
    previousProductsDisplayed = currentProductsDisplayed.slice();
    currentProductsDisplayed.length = 0;
    getCurrentDisplay(event);
  }
  else {
    alert('All Done');
    imageOneEl.removeEventListener('click', processClicks);
    imageTwoEl.removeEventListener('click', processClicks);
    imageThreeEl.removeEventListener('click', processClicks);
    // renderResults();
    updateArraysForChart();
    drawResultsChart();
  }
}

function renderResults() {
  var bodyEl = document.getElementById('body');
  var ulEl = document.createElement('ul');
  for (var productId = 0; productId < allProducts.length; productId++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allProducts[productId].clicks} for the ${allProducts[productId].name}`;
    ulEl.appendChild(liEl);
  }
  bodyEl.appendChild(ulEl);
}

// Create the arrays to send to the chart
var productName = [];
var productClicks = [];
var dataColors = [];

(function populateColors() {
  for (var numberOfProducts = 0; numberOfProducts < allProducts.length; numberOfProducts++) {
    console.log(Math.floor(Math.random() * 16777215).toString(16));
    dataColors[numberOfProducts] = (`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
})();


console.log(dataColors);

function updateArraysForChart() {
  for (var listOfProducts = 0; listOfProducts < allProducts.length; listOfProducts++) {
    productName[listOfProducts] = allProducts[listOfProducts].name;
    productClicks[listOfProducts] = allProducts[listOfProducts].clicks;
  }
}

// // Chart rendered with chartData.js

var chartData = {
  label: productName,
  datasets: [{
    data: productClicks,
    // backgoundColor: dataColors,
    // hoverBackgroundColors: dataColors
  }]
};

function drawResultsChart() {
  var ctx = document.getElementById('product-results-chart').getContext('2d');
  resultsChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: false,
      animation: {
        duration: 1000,
        // easing: 'easeOutBounce'
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0,
          stepSize: 1.0
        }
      }]
    }
  });
  // chartDrawn = true;
}

