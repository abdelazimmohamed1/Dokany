const products = [
  {
    id: 1,
    name: "New Green Jacket",
    category: "Women",
    price: 290,
    oldPrice: 350,
    image: "https://dokanfashion01.vercel.app/images/women-01.jpg",
    badge: "NEW",
    description: "A comfortable green jacket with a clean everyday style.",
  },

  {
    id: 2,
    name: "Classic Spring Shirt",
    category: "Men",
    price: 150,
    oldPrice: 190,
    image: "https://dokanfashion01.vercel.app/images/men-01.jpg",
    badge: "SALE",
    description: "A classic shirt made for casual everyday outfits.",
  },

  {
    id: 3,
    name: "School Collection",
    category: "Kids",
    price: 295,
    oldPrice: 340,
    image: "https://dokanfashion01.vercel.app/images/kid-01.jpg",
    badge: "POPULAR",
    description: "Comfortable and practical pieces for the kids collection.",
  },

  {
    id: 4,
    name: "Fashion Accessories",
    category: "Accessories",
    price: 85,
    oldPrice: 110,
    image: "https://dokanfashion01.vercel.app/images/accessories-01.jpg",
    badge: "NEW",
    description: "Simple accessories to complete your look.",
  },

  {
    id: 5,
    name: "Women Casual Look",
    category: "Women",
    price: 320,
    oldPrice: 390,
    image: "https://dokanfashion01.vercel.app/images/women-001.jpg",
    badge: "TRENDING",
    description: "A modern casual look for your daily style.",
  },

  {
    id: 6,
    name: "Men Everyday Style",
    category: "Men",
    price: 240,
    oldPrice: 280,
    image: "https://dokanfashion01.vercel.app/images/men-001.jpg",
    badge: "",
    description: "Easy-to-wear essentials for every day.",
  },

  {
    id: 7,
    name: "Kids Daily Outfit",
    category: "Kids",
    price: 210,
    oldPrice: 250,
    image: "https://dokanfashion01.vercel.app/images/kid-001.jpg",
    badge: "",
    description: "A practical outfit designed for comfort.",
  },

  {
    id: 8,
    name: "Accessories Set",
    category: "Accessories",
    price: 120,
    oldPrice: 150,
    image: "https://dokanfashion01.vercel.app/images/accessories-001.jpg",
    badge: "SALE",
    description: "A useful set of accessories for your collection.",
  },
];

// Get Data From Local Storage
function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Save Data In Local Storage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Format Product Price
function money(value) {
  return "EGP " + Number(value).toFixed(2);
}

// Create Product Card
function productCard(p) {
  let wished = getData("dokanyWishlist").includes(p.id);

  return `
        <div class="product-card">

            <div class="product-image">

                <img src="${p.image}" alt="${p.name}"
                onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,#dce9df,#a9c6b3)'">

                ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}

                <div class="product-actions">

                    <button class="${wished ? "active" : ""}"
                    onclick="toggleWishlist(${p.id})"
                    aria-label="Add to wishlist">

                        <i class="fa-${wished ? "solid" : "regular"} fa-heart"></i>

                    </button>

                    <button onclick="addToCart(${p.id})"
                    aria-label="Add to cart">

                        <i class="fa-solid fa-cart-plus"></i>

                    </button>

                </div>

            </div>

            <div class="product-info">

                <div class="product-category">${p.category}</div>

                <h3>${p.name}</h3>

                <div class="rating mb-2">

                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>

                </div>

                <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">

                    <div class="product-price">

                        ${money(p.price)}

                        <span class="old-price">${money(p.oldPrice)}</span>

                    </div>

                    <a class="btn btn-outline-green" href="product.html?id=${p.id}">
                        See More
                    </a>

                </div>

            </div>

        </div>
    `;
}

// Show Notification
function showToast(message) {
  let el = document.getElementById("liveToast");

  if (!el) {
    el = document.createElement("div");

    el.className = "toast-container position-fixed bottom-0 end-0 p-3";

    el.innerHTML = `
            <div id="liveToast" class="toast" role="alert">
                <div class="toast-body"></div>
            </div>
        `;

    document.body.appendChild(el);

    el = el.querySelector(".toast");
  }

  el.querySelector(".toast-body").textContent = message;

  bootstrap.Toast.getOrCreateInstance(el).show();
}

// Add Product To Cart
function addToCart(id) {
  let cart = getData("dokanyCart");

  let item = cart.find((x) => x.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id,
      quantity: 1,
    });
  }

  saveData("dokanyCart", cart);

  updateCounts();

  showToast("Product added to your cart");
}

// Add Or Remove Product From Wishlist
function toggleWishlist(id) {
  let list = getData("dokanyWishlist");

  if (list.includes(id)) {
    list = list.filter((x) => x !== id);

    showToast("Removed from wishlist");
  } else {
    list.push(id);

    showToast("Added to wishlist");
  }

  saveData("dokanyWishlist", list);

  updateCounts();

  renderProductsIfNeeded();
}

// Update Cart And Wishlist Counters
function updateCounts() {
  let cart = getData("dokanyCart").reduce((n, x) => n + x.quantity, 0);

  let wish = getData("dokanyWishlist").length;

  document.querySelectorAll(".cart-count").forEach((x) => {
    x.textContent = cart;
  });

  document.querySelectorAll(".wish-count").forEach((x) => {
    x.textContent = wish;
  });
}

// Render Products If Needed
function renderProductsIfNeeded() {
  let grid = document.getElementById("productGrid");

  if (grid) {
    renderShop();
  }

  let latest = document.getElementById("latestGrid");

  if (latest) {
    latest.innerHTML = products.slice(0, 4).map(productCard).join("");
  }

  let wishGrid = document.getElementById("wishlistGrid");

  if (wishGrid) {
    renderWishlist();
  }
}

// Display Products In Shop
function renderShop() {
  let grid = document.getElementById("productGrid");

  if (!grid) return;

  let category = new URLSearchParams(location.search).get("category");

  let search = new URLSearchParams(location.search).get("search") || "";

  let term = (
    document.getElementById("shopSearch")?.value || search
  ).toLowerCase();

  let sort = document.getElementById("sortProducts")?.value || "default";

  let max = Number(document.getElementById("priceFilter")?.value || 1000);

  let list = products.filter(
    (p) =>
      (!category || p.category.toLowerCase() === category.toLowerCase()) &&
      (p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)) &&
      p.price <= max,
  );

  if (sort === "low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `
            <div class="empty-state" style="grid-column:1/-1">

                <i class="fa-solid fa-magnifying-glass d-block"></i>

                <h3>No products found</h3>

                <p class="text-muted-custom">
                    Try another search or change the filters.
                </p>

            </div>
        `;

  let count = document.getElementById("resultCount");

  if (count) {
    count.textContent = `Showing ${list.length} products`;
  }
}

// Display Wishlist Products
function renderWishlist() {
  let grid = document.getElementById("wishlistGrid");

  if (!grid) return;

  let ids = getData("dokanyWishlist");

  let list = products.filter((p) => ids.includes(p.id));

  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `
            <div class="empty-state" style="grid-column:1/-1">

                <i class="fa-regular fa-heart d-block"></i>

                <h3>Your wishlist is empty</h3>

                <p class="text-muted-custom">
                    Save products you love and find them here.
                </p>

                <a class="btn btn-green mt-2" href="shop.html">
                    Explore Products
                </a>

            </div>
        `;
}

// Display Cart Products
function renderCart() {
  let holder = document.getElementById("cartItems");

  if (!holder) return;

  let cart = getData("dokanyCart");

  if (!cart.length) {
    holder.innerHTML = `
            <div class="empty-state">

                <i class="fa-solid fa-bag-shopping d-block"></i>

                <h3>Your cart is empty</h3>

                <p class="text-muted-custom">
                    Looks like you haven't added anything yet.
                </p>

                <a class="btn btn-green mt-2" href="shop.html">
                    Start Shopping
                </a>

            </div>
        `;

    document.getElementById("cartSubtotal").textContent = money(0);

    document.getElementById("cartTotal").textContent = money(0);

    return;
  }

  let subtotal = 0;

  holder.innerHTML = cart
    .map((item) => {
      let p = products.find((x) => x.id === item.id);

      if (!p) return "";

      subtotal += p.price * item.quantity;

      return `
            <div class="cart-row">

                <img src="${p.image}" alt="${p.name}"
                onerror="this.style.display='none'">

                <div class="flex-grow-1">

                    <h3>${p.name}</h3>

                    <div class="product-price">
                        ${money(p.price)}
                    </div>

                    <div class="quantity-control mt-2">

                        <button onclick="changeQuantity(${p.id},-1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${p.id},1)">
                            +
                        </button>

                    </div>

                </div>

                <button class="btn btn-sm btn-outline-danger"
                onclick="removeCartItem(${p.id})">

                    <i class="fa-regular fa-trash-can"></i>

                </button>

            </div>
        `;
    })
    .join("");

  document.getElementById("cartSubtotal").textContent = money(subtotal);

  document.getElementById("cartTotal").textContent = money(subtotal);
}

// Change Product Quantity
function changeQuantity(id, change) {
  let cart = getData("dokanyCart");

  let item = cart.find((x) => x.id === id);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cart = cart.filter((x) => x.id !== id);
    }
  }

  saveData("dokanyCart", cart);

  updateCounts();

  renderCart();
}

// Remove Product From Cart
function removeCartItem(id) {
  saveData(
    "dokanyCart",
    getData("dokanyCart").filter((x) => x.id !== id),
  );

  updateCounts();

  renderCart();
}

// Display Product Details
function setupProductDetail() {
  let holder = document.getElementById("productDetail");

  if (!holder) return;

  let id = Number(new URLSearchParams(location.search).get("id"));

  let p = products.find((x) => x.id === id);

  if (!p) {
    holder.innerHTML = `
            <div class="empty-state">

                <h3>Product not found</h3>

                <a href="shop.html" class="btn btn-green">
                    Back to Shop
                </a>

            </div>
        `;

    return;
  }

  holder.innerHTML = `
        <div class="row g-5 align-items-center">

            <div class="col-md-6">

                <img class="product-detail-img"
                src="${p.image}"
                alt="${p.name}"
                onerror="this.style.display='none'">

            </div>

            <div class="col-md-6">

                <div class="product-category mb-2">
                    ${p.category}
                </div>

                <h1 class="detail-title">
                    ${p.name}
                </h1>

                <div class="rating mb-3">

                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>

                    <span class="text-muted-custom">(4.0)</span>

                </div>

                <div class="detail-price mb-3">

                    ${money(p.price)}

                    <span class="old-price">
                        ${money(p.oldPrice)}
                    </span>

                </div>

                <p class="text-muted-custom">
                    ${p.description}
                </p>

                <p>
                    <i class="fa-solid fa-circle-check text-success me-2"></i>
                    In stock and ready to order
                </p>

                <div class="d-flex gap-2 mt-4">

                    <button class="btn btn-green px-4"
                    onclick="addToCart(${p.id})">

                        <i class="fa-solid fa-cart-plus me-2"></i>
                        Add to Cart

                    </button>

                    <button class="btn btn-outline-green"
                    onclick="toggleWishlist(${p.id})">

                        <i class="fa-regular fa-heart"></i>

                    </button>

                </div>

            </div>

        </div>
    `;
}

// Dark Mode
function setupTheme() {
  let dark = localStorage.getItem("dokanyTheme") === "dark";

  document.body.classList.toggle("dark-mode", dark);

  let button = document.getElementById("themeButton");

  if (button) {
    button.innerHTML = dark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';

    button.onclick = () => {
      document.body.classList.toggle("dark-mode");

      let isDark = document.body.classList.contains("dark-mode");

      localStorage.setItem("dokanyTheme", isDark ? "dark" : "light");

      button.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';
    };
  }
}

// Search Products
function setupSearch() {
  document.querySelectorAll(".search-box").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let value = form.querySelector("input").value.trim();

      location.href = "shop.html?search=" + encodeURIComponent(value);
    });
  });
}

// Forms
function setupForms() {
  let newsletter = document.getElementById("newsletterForm");

  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();

      showToast("Thanks for subscribing!");
    });
  }

  let contact = document.getElementById("contactForm");

  if (contact) {
    contact.addEventListener("submit", (e) => {
      e.preventDefault();

      showToast("Your message has been received!");

      contact.reset();
    });
  }

  let auth = document.getElementById("signupForm");

  if (auth) {
    auth.addEventListener("submit", (e) => {
      e.preventDefault();

      let users = getData("dokanyUsers");

      let email = document.getElementById("signupEmail").value;

      if (users.some((x) => x.email === email)) {
        showToast("This email is already registered");

        return;
      }

      users.push({
        name: document.getElementById("signupName").value,
        email,
        password: document.getElementById("signupPassword").value,
      });

      saveData("dokanyUsers", users);

      showToast("Account created successfully");

      setTimeout(() => (location.href = "sign-in.html"), 900);
    });
  }

  let login = document.getElementById("loginForm");

  if (login) {
    login.addEventListener("submit", (e) => {
      e.preventDefault();

      let email = document.getElementById("loginEmail").value;

      let password = document.getElementById("loginPassword").value;

      let user = getData("dokanyUsers").find(
        (x) => x.email === email && x.password === password,
      );

      if (user) {
        localStorage.setItem("dokanyUser", JSON.stringify(user));

        showToast("Welcome back, " + user.name);

        setTimeout(() => (location.href = "index.html"), 900);
      } else {
        showToast("Email or password is incorrect");
      }
    });
  }
}

// Initialize Website
function init() {
  setupTheme();

  setupSearch();

  updateCounts();

  renderProductsIfNeeded();

  renderCart();

  setupProductDetail();

  setupForms();

  let searchInput = document.getElementById("shopSearch");

  if (searchInput) {
    searchInput.addEventListener("input", renderShop);
  }

  ["sortProducts", "priceFilter"].forEach((id) => {
    let el = document.getElementById(id);

    if (el) {
      el.addEventListener("change", renderShop);
    }
  });

  renderShop();
}

// Run Website
document.addEventListener("DOMContentLoaded", init);
