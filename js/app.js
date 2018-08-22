'use strict';

// GLobal Variables
var
  maxSelections = 25,
  maxProductsToDisplay = 3,
  currentProductsToDisplay = [],
  previousProductsDisplayed = [];

// Create required number of image elements
var imageEl = [];

for (var numberOfProducts = 0; numberOfProducts < maxProductsToDisplay; numberOfProducts++) {
  var IdNumber = numberOfProducts + 1;
  imageEl[numberOfProducts] = document.getElementById(`choice-${IdNumber}`);
}

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

productList.forEach(function (name) {
  new Product(name);
});

// Choose random products and add one to their view count
// There can be no duplicate items in the currentProductDisplay or the previousProductsDisplayed
function chooseRandomProducts() {

  for (var numberOfProducts = 0; numberOfProducts < maxProductsToDisplay; numberOfProducts++) {
    var randomProductNumber = Math.floor(allProducts.length * Math.random());

    while (currentProductsToDisplay.includes(randomProductNumber) | previousProductsDisplayed.includes(randomProductNumber)) {
      randomProductNumber = Math.floor(allProducts.length * Math.random());
    }

    currentProductsToDisplay.push(randomProductNumber);
    allProducts[randomProductNumber].views++;
  }
}

// Update the HTML <img> tags with the prodcuts to be shown.
function updateHtmlImgTags() {
  for (var numberOfImages = 0; numberOfImages < maxProductsToDisplay; numberOfImages++) {
    imageEl[numberOfImages].src = allProducts[currentProductsToDisplay[numberOfImages]].path;
    imageEl[numberOfImages].title = allProducts[currentProductsToDisplay[numberOfImages]].name;
    imageEl[numberOfImages].alt = allProducts[currentProductsToDisplay[numberOfImages]].name;
  }
}

//Add or remove eventListeners
function toggleListenerOn() {
  for (var numberOfImages = 0; numberOfImages < maxProductsToDisplay; numberOfImages++) {
    imageEl[numberOfImages].addEventListener('click', processClicks);
  }
}

function toggleListenerOff() {
  for (var numberOfImages = 0; numberOfImages < maxProductsToDisplay; numberOfImages++) {
    imageEl[numberOfImages].removeEventListener('click', processClicks);
  }
}

//Process the results when a picture is clicked
var selectionCount = 1;

function processClicks(event) {
  event.preventDefault(); //prevent reload

  var title = event.target.title;
  var productNumber = productList.indexOf(title);
  allProducts[productNumber].clicks++;

  // Check for end of survey
  if (selectionCount < maxSelections) {
    selectionCount++;
    previousProductsDisplayed.length = 0;
    previousProductsDisplayed = currentProductsToDisplay.slice();
    currentProductsToDisplay.length = 0;
    chooseRandomProducts(event);
    updateHtmlImgTags();
  }
  else {
    alert('You have completed the survey.\n\nplease click "OK" to see the results');
    toggleListenerOff();
    updateArraysForChart();
    drawResultsChart();
  }
}

// Create the arrays to send to the chart
var productName = [];
var productClicks = [];
var dataColors = [];

(function populateColors() {
  for (var numberOfProducts = 0; numberOfProducts < allProducts.length; numberOfProducts++) {
    dataColors[numberOfProducts] = (`#${Math.floor(Math.random() * 16777215).toString(16)} `);
  }
})();

function updateArraysForChart() {
  for (var listOfProducts = 0; listOfProducts < allProducts.length; listOfProducts++) {
    productName[listOfProducts] = allProducts[listOfProducts].name;
    productClicks[listOfProducts] = allProducts[listOfProducts].clicks;
  }
}

function drawResultsChart() {
  var ctx = document.getElementById('product-results-chart').getContext('2d');
  var resultsChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: productList,
      datasets: [{
        label: 'Votes',
        data: productClicks,
        backgroundColor: dataColors,
        borderColor: 'black',
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Product Preferences'
      },
      responsive: false,
      animation: {
        duration: 6000
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// Start the Survey
chooseRandomProducts();
updateHtmlImgTags();
toggleListenerOn();