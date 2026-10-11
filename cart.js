// Cart state is in memory; refreshing the page resets the cart.
export const cart = [];

// CREATE and UPDATE: add a new line or increment an existing line.
export function addToCart(productName, products) {
  const product = products.find(item => item.productName === productName);
  if (!product) throw new Error('The selected product was not found.');
  const existing = cart.find(item => item.productName === productName);
  const currentQuantity = existing ? existing.quantity : 0;
  if (product.stock <= currentQuantity) throw new Error('This item is out of stock or the available quantity is already in your cart.');
  if (existing) existing.quantity += 1;
  else cart.push({ id: product.id, productName: product.productName, price: product.price, quantity: 1 });
}

// DELETE: remove a cart line by product name.
export function removeFromCart(productName) {
  const index = cart.findIndex(item => item.productName === productName);
  if (index === -1) throw new Error('The selected item is not in your cart.');
  cart.splice(index, 1);
}

// READ: return a snapshot for displaying cart contents.
export function viewCart() { return cart.map(item => ({ ...item })); }
