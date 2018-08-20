'use strict';

//Create the product list

var allProducts = [];

function Product(name) {
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

var productList = ['bag', 'banana', 'bathrom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'taunton', 'unicorn', 'usb', 'water-can', 'wine-glass']

for (var numberOfProduct = 0; numberOfProduct < allProducts.length; numberOfProduct++) {
  new Product(productList[numberOfProduct]);
}


console.table(Product);