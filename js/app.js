'use strict';

// GLobal Variables
var MAX_SELECTIONS = 25;
var MAX_PRODUCTS_TO_DISPLAY = 3;
var currentProductsToDisplay = [];
var previousProductsDisplayed = [];
var imageEl = [];
var allProducts = [];
var SURVEY_STATUS = 'surveyStatus';
var SELECTION_NUMBER = 'selectionCount';
var ALL_PRODUCTS = 'allProducts';
var selectionCount;
var storedProducts;
var productName = [];
var productClicks = [];
var dataColors = [];

//Create the product list
var productList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// Evaluate the status of the user and survey
var surveyStatus = localStorage.getItem(SURVEY_STATUS);

console.log(`The survey status is: ${surveyStatus}`);

if (surveyStatus === null) {
  startTheSurvey();
} else if (surveyStatus === 'started') {
  // continiue the survey where they left off
} else {
  displaySurveyResults();
}

// Create required number of image elements
function createImageElIds() {
  for (var numberOfProducts = 0; numberOfProducts < MAX_PRODUCTS_TO_DISPLAY; numberOfProducts++) {
    var IdNumber = numberOfProducts + 1;
    imageEl[numberOfProducts] = document.getElementById(`choice-${IdNumber}`);
  }
}

// Define the Product constructor
function Product(name) {
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;

  // allProducts.push(this);
}

// Create an Object for each product and place in an Array
function createProducts() {
  productList.forEach(function (name) {
    var newProduct = new Product(name);
    allProducts.push(newProduct);
  });
}

console.table(allProducts);


// Choose random products and add one to their view count
// There can be no duplicate items in the currentProductDisplay or the previousProductsDisplayed
function chooseRandomProducts() {
  // Vinicio - consider changing the name numberofProducts
  for (var numberOfProducts = 0; numberOfProducts < MAX_PRODUCTS_TO_DISPLAY; numberOfProducts++) {

    var randomProductNumber = Math.floor(allProducts.length * Math.random());

    while (currentProductsToDisplay.includes(randomProductNumber) || previousProductsDisplayed.includes(randomProductNumber)) {
      randomProductNumber = Math.floor(allProducts.length * Math.random());
    }

    currentProductsToDisplay.push(randomProductNumber);
    allProducts[randomProductNumber].views++;
  }
}

// Update the HTML <img> tags with the prodcuts to be shown.
function updateHtmlImgTags() {
  for (var numberOfImages = 0; numberOfImages < MAX_PRODUCTS_TO_DISPLAY; numberOfImages++) {
    imageEl[numberOfImages].src = allProducts[currentProductsToDisplay[numberOfImages]].path;
    imageEl[numberOfImages].title = allProducts[currentProductsToDisplay[numberOfImages]].name;
    imageEl[numberOfImages].alt = allProducts[currentProductsToDisplay[numberOfImages]].name;
  }
}

//Add or remove eventListeners
function toggleListenerOn() {
  for (var numberOfImages = 0; numberOfImages < MAX_PRODUCTS_TO_DISPLAY; numberOfImages++) {
    imageEl[numberOfImages].addEventListener('click', processClicks);
  }
}

function toggleListenerOff() {
  for (var numberOfImages = 0; numberOfImages < MAX_PRODUCTS_TO_DISPLAY; numberOfImages++) {
    imageEl[numberOfImages].removeEventListener('click', processClicks);
  }
}

//Process the results when a picture is clicked


function processClicks(event) {

  var title = event.target.title;

  var productIndex = productList.indexOf(title);
  allProducts[productIndex].clicks++;

  // Check for end of survey
  if (selectionCount < MAX_SELECTIONS) {
    selectionCount++;

    previousProductsDisplayed.length = 0;
    previousProductsDisplayed = currentProductsToDisplay.slice();
    currentProductsToDisplay.length = 0;

    writeStorage('start', selectionCount, allProducts);
    chooseRandomProducts(event);
    updateHtmlImgTags();
  }
  else {
    writeStorage('finished', selectionCount, allProducts);
    alert('You have completed the survey.\n\nplease click "OK" to see the results');
    toggleListenerOff();
    // updateArraysForChart();
    drawResultsChart();
  }
}

// Create the arrays to send to the chart



// Generate random colors for the bars in graph
function populateColors() {
  for (var numberOfProducts = 0; numberOfProducts < allProducts.length; numberOfProducts++) {
    dataColors[numberOfProducts] = (`#${Math.floor(Math.random() * 16777215).toString(16)} `);
  }
}

// Render the chart
function drawResultsChart() {
  updateArraysForChart();
  populateColors();

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

// Write data to local storage
function writeStorage(surveyStatus, selectionCount) {
  localStorage.setItem(SURVEY_STATUS, surveyStatus);
  localStorage.setItem(SELECTION_NUMBER, selectionCount);
  localStorage.setItem(ALL_PRODUCTS, JSON.stringify(allProducts));
}

// Read data from local storage and place into proper variables
function readStorage() {
  surveyStatus = localStorage.getItem(SURVEY_STATUS);
  selectionCount = JSON.parse(localStorage.getItem(SELECTION_NUMBER));
  storedProducts = JSON.parse(localStorage.getItem(ALL_PRODUCTS));

  console.log(storedProducts);

  (function restoreProducts() {
    allProducts = storedProducts;
  })();

}

function updateArraysForChart() {
  for (var listOfProducts = 0; listOfProducts < allProducts.length; listOfProducts++) {
    productName[listOfProducts] = allProducts[listOfProducts].name;
    productClicks[listOfProducts] = allProducts[listOfProducts].clicks;
  }
}




function startTheSurvey() {
  surveyStatus = 'start';
  selectionCount = 1;
  writeStorage(surveyStatus, selectionCount);
  createImageElIds();
  createProducts();
  chooseRandomProducts();
  updateHtmlImgTags();
  toggleListenerOn();
}

// function continueTheSurvey() {
//   //continue the survey
// }

function displaySurveyResults() {
  readStorage();
  // updateArraysForChart();
  drawResultsChart();
}




// // Start the Survey
// chooseRandomProducts();
// updateHtmlImgTags();
// toggleListenerOn();