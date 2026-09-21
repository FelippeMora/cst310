// Online Shop - Task 2

// Global scope: products and cart need to be available to all functions.
const products = [
    {
        productName: "Running Shoes",
        price: 89.99,
        category: "Footwear",
        inStock: true
    },
    {
        productName: "Hiking Boots",
        price: 129.99,
        category: "Footwear",
        inStock: false
    },
    {
        productName: "Chocolate Cookies",
        price: 5.99,
        category: "Food",
        inStock: true
    },
    {
        productName: "Coffee Beans",
        price: 14.99,
        category: "Food",
        inStock: true
    }
];

const cart = [];

// Part A: Inspect the entire products array.
console.log("Products Array:", products);


// Part B: Add a product to the cart.
function addToCart(productName) {
    // Function scope
    const product = products.find(
        item => item.productName === productName
    );

    if (product && product.inStock) {
        // Block scope
        const confirmationMessage =
            `${product.productName} was added to the cart.`;

        cart.push(product);
        console.log(confirmationMessage);
    } else if (product && !product.inStock) {
        console.log(`${product.productName} is out of stock.`);
    } else {
        console.log(`${productName} was not found.`);
    }
}


// Part B: Display the cart and calculate its total.
function viewCart() {
    // Function scope
    let totalPrice = 0;

    console.log("Cart Summary:");

    cart.forEach(function(item) {
        console.log(`${item.productName}: $${item.price.toFixed(2)}`);
        totalPrice += item.price;
    });

    console.log(`Total Price: $${totalPrice.toFixed(2)}`);
}


// Part B: Display products belonging to a category.
function filterByCategory(category) {
    // Function scope
    const filteredProducts = products.filter(
        product => product.category === category
    );

    console.log(`${category} Products:`);

    filteredProducts.forEach(function(product) {
        console.log(
            `${product.productName}: $${product.price.toFixed(2)}`
        );
    });
}


// Call each function.
addToCart("Running Shoes");
addToCart("Hiking Boots");
addToCart("Gaming Laptop");

viewCart();

filterByCategory("Footwear");
