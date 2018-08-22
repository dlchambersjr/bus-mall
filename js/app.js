'use strict';

// GLobal Variables
var
  maxChoices = 25,
  totalProductsToChoose = 3,
  currentProductsDisplayed = [],
  previousProductsDisplayed = [];

// Create required number of image elements
var imageEl = [];

for (var numberOfImages = 0; numberOfImages < totalProductsToChoose; numberOfImages++) {
  var IdNumber = numberOfImages + 1;
  imageEl[numberOfImages] = document.getElementById(`choice-${IdNumber}`);
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

productList.forEach(function (product) {
  new Product(product);
});

// Choose random products and add one to their view count
// There can be no duplicate items in the currentProductDisplay or the previousProductsDisplayed
function chooseRandomProducts() {

  for (var numberOfProducts = 0; numberOfProducts < totalProductsToChoose; numberOfProducts++) {
    var randomProductNumber = Math.floor(allProducts.length * Math.random());

    while (currentProductsDisplayed.includes(randomProductNumber) | previousProductsDisplayed.includes(randomProductNumber)) {
      randomProductNumber = Math.floor(allProducts.length * Math.random());
    }

    currentProductsDisplayed.push(randomProductNumber);
    allProducts[randomProductNumber].views++;
  }
}

// Update the HTML <img> tags with the prodcuts to be shown.
function updateHtmlImgTags() {
  for (var numberOfImages = 0; numberOfImages < totalProductsToChoose; numberOfImages++) {
    imageEl[numberOfImages].src = allProducts[currentProductsDisplayed[numberOfImages]].path;
    imageEl[numberOfImages].title = allProducts[currentProductsDisplayed[numberOfImages]].name;
    imageEl[numberOfImages].alt = allProducts[currentProductsDisplayed[numberOfImages]].name;
  }
}

//Add or remove eventListeners
function toggleListenerOn() {
  for (var numberOfImages = 0; numberOfImages < totalProductsToChoose; numberOfImages++) {
    imageEl[numberOfImages].addEventListener('click', processClicks);
  }
}

function toggleListenerOff() {
  for (var numberOfImages = 0; numberOfImages < totalProductsToChoose; numberOfImages++) {
    imageEl[numberOfImages].removeEventListener('click', processClicks);
  }
}

//Process the results when a picture is clicked
var testLength = 1;

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
    chooseRandomProducts(event);
    updateHtmlImgTags();
  }
  else {
    alert('All Done');
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