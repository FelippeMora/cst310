import { loadProducts } from './products.js';
import { addToCart, removeFromCart, viewCart } from './cart.js';

let products = [];
let activeCategory = 'All';
const grid = document.getElementById('product-grid');
const filters = document.getElementById('category-filters');
const cartItems = document.getElementById('cart-items');
const errorMessage = document.getElementById('error-message');
const money = value => `$${value.toFixed(2)}`;

function renderProducts() {
  grid.replaceChildren();
  const visible = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
  if (!visible.length) {
    const empty = document.createElement('p');
    empty.textContent = products.length ? 'No products in this category.' : 'No products are available.';
    grid.appendChild(empty);
  }
  visible.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product';
    const image = document.createElement('img');
    image.src = product.thumbnail;
    image.alt = product.productName;
    image.loading = 'lazy';
    const name = document.createElement('h3');
    name.textContent = product.productName;
    const category = document.createElement('p');
    category.textContent = `Category: ${product.category}`;
    const price = document.createElement('p');
    price.textContent = `Price: ${money(product.price)}`;
    const stock = document.createElement('p');
    stock.textContent = product.stock > 0 ? `${product.stock} available` : 'Out of stock';
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Add to Cart';
    button.disabled = product.stock < 1;
    button.addEventListener('click', () => {
      try {
        addToCart(product.productName, products);
        errorMessage.textContent = '';
        renderCart();
      } catch (error) {
        errorMessage.textContent = error.message;
      }
    });
    card.append(image, name, category, price, stock, button);
    grid.appendChild(card);
  });
}

function renderFilters() {
  filters.replaceChildren();
  const categories = ['All', ...new Set(products.map(p => p.category))];
  categories.forEach(category => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category === 'All' ? 'All' : category.replace(/\b\w/g, c => c.toUpperCase());
    button.setAttribute('aria-pressed', String(category === activeCategory));
    button.addEventListener('click', () => {
      activeCategory = category;
      renderFilters();
      renderProducts();
    });
    filters.appendChild(button);
  });
}

function renderCart() {
  cartItems.replaceChildren();
  const items = viewCart();
  if (!items.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Your cart is empty.';
    cartItems.appendChild(empty);
  }
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    const details = document.createElement('span');
    details.textContent = `${item.productName} — ${item.quantity} × ${money(item.price)} = ${money(item.quantity * item.price)}`;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', `Remove ${item.productName} from cart`);
    remove.addEventListener('click', () => {
      try { removeFromCart(item.productName); errorMessage.textContent = ''; renderCart(); }
      catch (error) { errorMessage.textContent = error.message; }
    });
    row.append(details, remove);
    cartItems.appendChild(row);
  });
  // Calculate total AFTER rendering all cart items.
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = money(total);
  document.getElementById('cart-count').textContent = items.reduce((sum, item) => sum + item.quantity, 0);
}

async function initializeShop() {
  renderCart();
  document.getElementById('loading-message').textContent = 'Loading live products…';
  products = await loadProducts(); // Await the Promise before using the array.
  document.getElementById('loading-message').textContent = '';
  renderFilters();
  renderProducts();
}

initializeShop();
