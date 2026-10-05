// Online Shop - Task 4

import { products } from "./products.js";
import { cart, addToCart } from "./cart.js";

// Inspect the products array.
console.log("Products Array:", products);


// Filter products by category and re-render the webpage.
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



// Update the cart counter in the navigation.
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
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
        button.textContent = "Add to Cart";



        // Add the product when its button is clicked.
button.addEventListener("click", function () {
    const errorMessage = document.getElementById("error-message");

    try {
        button.disabled = true;

        addToCart(product.productName);
        updateCartCount();

        errorMessage.textContent = "";
} catch (error) {
    errorMessage.textContent =
        "Sorry, this item could not be added to your cart. Please check its availability.";

    errorMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
} finally {
    button.disabled = false;
}
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
updateCartCount();
