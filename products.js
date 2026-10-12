// Week 5: retrieve live catalog data instead of a hardcoded array.
export async function loadProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=30');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error('Invalid product data');
    return data.products.map(product => ({
      id: product.id,
      productName: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      thumbnail: product.thumbnail,
      description: product.description
    }));
  } catch (error) {
    console.error('Unable to retrieve products:', error);
    const friendlyMessage = 'We could not load products right now. Please try again later.';
    const fetchError = new Error(friendlyMessage);
    // Throw a friendly error inside the fetch catch, then return a safe empty array.
    try { throw fetchError; } catch (friendlyError) {
      document.getElementById('error-message').textContent = friendlyError.message;
      return [];
    }
  }
}
