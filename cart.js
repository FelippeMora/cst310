// Import the products array so cart functions can find products.
import { products } from "./products.js";

// The cart stores products successfully added by the shopper.
export const cart = [];

// Adds a product to the cart after validating that it exists
// and is currently in stock.
export function addToCart(productName) {
    const product = products.find(
        (item) => item.productName === productName
    );

    // Throw an error if the requested product cannot be found.
    if (!product) {
        throw new Error("Product not found.");
    }

    // Throw an error if the requested product is out of stock.
    if (!product.inStock) {
        throw new Error("Product is out of stock.");
    }

    // Add the valid product object to the cart.
    cart.push(product);

    return product;
}
