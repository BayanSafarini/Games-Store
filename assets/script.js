// Returns a product object from the products array based on the given product ID.
function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId === id) {
      return products[i]
    }
  }
}

// Array of product objects, each containing details such as name, price, quantity, productId, and image.
const products = [
  {
    name: "Red Dead Redemption 2",
    priceInUSD: 59.99,
    price:59.99,
    quantity:0 ,
    productId:1,
    image:"https://m.media-amazon.com/images/I/71nlEoSrewL._AC_UF894,1000_QL80_.jpg"
  },
  {
    name: "Counter-Strike 2 Prime Status ",
    priceInUSD: 14.99,
    price:14.99,
    quantity:0,
    productId:2,
    image:"https://m.media-amazon.com/images/M/MV5BYTRjNTJkYWItMGEwMy00OGI1LTk4ZWMtMDViOGRlMDNkNzQ1XkEyXkFqcGdeQXVyMTE5OTI4ODI0._V1_.jpg"
  }, 
  {
    name: "Call of Duty®: Black Ops 6",
    priceInUSD: 69.99,
    price:69.99,
    quantity:0,
    productId:3,
    image:"https://m.media-amazon.com/images/I/81n0457tIgL.jpg"
  },
  {
    name: "Black Myth: Wukong",
    priceInUSD: 59.99,
    price:59.99,
    quantity:0 ,
    productId:4,
    image:"https://m.media-amazon.com/images/M/MV5BNGVmZTVjZDMtMzkyZi00MTczLWE4OTUtY2Y1ODBlMGFlYTAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    name: "ELDEN RING",
    priceInUSD: 39.99,
    price:39.99,
    quantity:0,
    productId:5,
    image:"https://storage.googleapis.com/pod_public/1300/216712.jpg"
  }
];


const cart = []; // Array to hold products added to the shopping cart.

//Adds a product to the cart based on the product ID. 
// Increments the product's quantity if it was already there.
function addProductToCart(productId) {
  let product = getProductById(productId);
  product.quantity = product.quantity + 1;
  if (product.quantity === 1) {
    cart.push(product);
  }
}

// Increases the quantity of a specific product (by its Id) in the cart by 1.
function increaseQuantity(productId) {
  let product = getProductById(productId);
  product.quantity = product.quantity + 1;
}

// Decreases the quantity of a specific (by its Id) product in the cart by 1.
// If the quantity drops to 0, the product is removed from the cart.
function decreaseQuantity(productId) {
  let product = getProductById(productId);
  product.quantity = product.quantity - 1;
  if (product.quantity === 0) {
    removeProductFromCart(productId);
  }
}

// Removes a product from the cart based on the product ID and resets its quantity to 0.
function removeProductFromCart(productId) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = 0;
      cart.splice(i, 1);
    }
  }
}

// Calculates and returns the total cost of the products in the cart, considering their quantity.
function cartTotal() {
  let cartTotalCost = 0;
  for (let i = 0; i < cart.length; i++) {
    cartTotalCost += cart[i].price * cart[i].quantity;
  }
  return Number(cartTotalCost.toFixed(2));
}

// Empties the cart by removing all products.
function emptyCart() {
  for (let i = 0; i < cart.length; i++) {
    cart[i].quantity = 0;
  }
  cart.splice(0, cart.length);
}

let totalPaid = 0; // Variable to track the total amount paid by the customer.

// Handles payment logic. Updates the total paid amount and returns the remaining balance.
// If the payment is sufficient, it clears the cart.
function pay(amount) {
  totalPaid += amount;
  let costRemaining = totalPaid - cartTotal();
  if (costRemaining >= 0) {
    totalPaid = 0;
    emptyCart();
  }
  return Number(costRemaining.toFixed(2));
}



// Converts product prices to the specified currency.
// Supports conversion to EUR, YEN, or reverts to USD.
function currency(currencySymbol) {
  if (currencySymbol === "EUR") {
    for (let i = 0; i < products.length; i++) {
      products[i].price = (products[i].priceInUSD * 0.9).toFixed(2);
    }
  } else if (currencySymbol === "YEN") { 
    for (let i = 0; i < products.length; i++) {
      products[i].price = (products[i].priceInUSD * 144.89).toFixed(2);
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      products[i].price = (products[i].priceInUSD).toFixed(2);
    }
  }
}

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
   currency
};