const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    category: 'smartphones',
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    category: 'cameras',
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    category: 'cameras',
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    category: 'televisions',
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    category: 'games',
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    category: 'games',
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    category: 'televisions',
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    category: 'smartphones',
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    category: 'cameras',
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    category: 'televisions',
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    category: 'smartphones',
    price: 999.99,
  },
];

// Select DOM Elements
const productsWrapper = document.getElementById('products-wrapper');
const filtersContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');
const checkBoxes = document.querySelectorAll('.check');

// Initialize cart item count, prodcut element array
let cartItemCount = 0;
const productsElements = [];

// Loop over products and create an element
products.forEach((product) => {
  const productsElement = createProdElement(product);

  productsElements.push(productsElement);
  productsWrapper.appendChild(productsElement);
});

function createProdElement(product) {
  //   console.log(product);
  const productsElement = document.createElement('div');

  productsElement.className = 'item space-y-2';
  //   console.log(productsElement);

  productsElement.innerHTML = `
  <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">

    <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover" />
            
    <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add To Cart</button>
  </div>
          
    <p class="text-xl">${product.name}<p>
    <strong>$${product.price.toLocaleString()}</strong>
  `;

  productsElement.querySelector('.status').addEventListener('click', updateCart);

  return productsElement;
}

// Function for add or remove item from cart
function updateCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains('added')) {
    // Remove from cart
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add to Cart';
    statusEl.classList.remove('bg-red-800');
    statusEl.classList.add('bg-gray-800');

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove from Cart';
    statusEl.classList.remove('bg-gray-800');
    statusEl.classList.add('bg-red-800');

    cartItemCount++;
  }

  //   Update Cart Item Count
  cartCount.innerText = cartItemCount.toString();
}

// Product Filter Event Listerner
filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Filter Product Function
function filterProducts() {
  // Search term
  const searchTerm = searchInput.value.trim().toLowerCase();
  // Get checked categories
  const checkedCategories = Array.from(checkBoxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  //   console.log(`Search term : ${searchTerm}`);

  // Loop over products and check for matches
  productsElements.forEach((productElement, index) => {
    const product = products[index];

    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);
    // console.log(`${product.name}`);
    // console.log(matchesSearchTerm);
    // console.log(isInCheckedCategory);

    if (matchesSearchTerm && isInCheckedCategory) {
      productElement.classList.remove('hidden');
    } else {
      productElement.classList.add('hidden');
    }
  });
}
