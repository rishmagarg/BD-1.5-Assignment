const express = require('express');
const cors = require('cors');
const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});

function calculateDiscount(carTotal, isMember) {
  if (isMember) {
    carTotal = carTotal - (carTotal * discountPercentage) / 100;
  }
  return carTotal.toString();
}

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember === 'true';
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateDiscount(cartTotal, isMember));
});

function calculateTax(carTotal) {
  let taxPrice = (carTotal * taxRate) / 100;
  return taxPrice.toString();
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});

function calculateDeliveryTime(distance, shippingMethod) {
  if (shippingMethod === 'standard') {
    return distance / 50;
  }
  if (shippingMethod === 'express') {
    return distance / 100;
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateDeliveryTime(distance, shippingMethod).toString());
});

function calculateShippingCost(distance, weight) {
  return distance * weight * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(distance, weight).toString());
});

function calculateShippingCost(distance, weight) {
  return distance * weight * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(distance, weight).toString());
});

function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
