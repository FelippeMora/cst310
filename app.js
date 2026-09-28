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


// Re-render to webpage.
function filterByCategory(category) {
    if (category === "All") {
        renderProducts(products);
        return;
    }

    const filteredProducts = products.filter(
        product => product.category === category
    );

    renderProducts(filteredProducts);
}



const shopTitle = document.getElementById("shop-title");

function changeShopTitle() {
    shopTitle.textContent = "Welcome to Felippe's Online Shop";
}

function addToCart(productName) {
    const product = products.find(
        item => item.productName === productName
    );

    if (product && product.inStock) {
        cart.push(product);

        document.getElementById("cart-count").textContent = cart.length;

        console.log(`${product.productName} was added to the cart.`);
    } else if (product && !product.inStock) {
        console.log(`${product.productName} is out of stock.`);
    } else {
        console.log(`${productName} was not found.`);
    }
}

function renderProducts(productsToDisplay) {
    const productGrid = document.getElementById("product-grid");

    // Clear existing products before rendering.
    productGrid.innerHTML = "";

    productsToDisplay.forEach(function(product) {

        // Create the product card.
        const card = document.createElement("div");
        card.classList.add("product");

        // Create and add the product name.
        const name = document.createElement("h2");
        name.textContent = product.productName;
        card.appendChild(name);

        // Create and add the category.
        const category = document.createElement("p");
        category.textContent = `Category: ${product.category}`;
        card.appendChild(category);

        // Create and add the price.
        const price = document.createElement("p");
        price.textContent = `Price: $${product.price.toFixed(2)}`;
        card.appendChild(price);

        // Create and add the stock status.
        const status = document.createElement("p");
        status.textContent = `Status: ${product.inStock ? "In Stock" : "Out of Stock"}`;
        card.appendChild(status);

        // Create the Add to Cart button.
        const button = document.createElement("button");
        button.textContent = product.inStock
            ? "Add to Cart"
            : "Out of Stock";

        // Prevent customers from adding unavailable products.
        if (!product.inStock) {
            button.disabled = true;
        }

        // Add the product when its button is clicked.
        button.addEventListener("click", function() {
            addToCart(product.productName);
        });

        card.appendChild(button);

        // Add the completed card to the product grid.
        productGrid.appendChild(card);
    });
}

function renderCategoryFilters() {
    const filterContainer =
        document.getElementById("category-filters");

    const categories = ["All", "Footwear", "Food"];

    categories.forEach(function(category) {
        const button = document.createElement("button");

        button.textContent = category;

        button.addEventListener("click", function() {
            filterByCategory(category);
        });

        filterContainer.appendChild(button);
    });
}

renderCategoryFilters();
renderProducts(products);
