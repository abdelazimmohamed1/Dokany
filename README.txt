# Dokany

A multi-page front-end fashion store built with HTML, CSS, Bootstrap 5 and vanilla JavaScript.

## Run
Open `index.html` in your browser, or use VS Code Live Server.

## Pages
- `index.html` – Home, categories, latest products, offers, store video and newsletter.
- `shop.html` – Product listing, search, category query, sorting and price filter.
- `product.html` – Product details (`?id=1` through `?id=8`).
- `cart.html` – Cart with quantity controls and subtotal.
- `wishlist.html` – Saved products.
- `about-us.html`, `contact.html`, `sign-in.html`, `sign-up.html`.

## Notes
- Cart, wishlist, theme and demo users use browser `localStorage`.
- Sign-in/sign-up are front-end demonstrations only. Do not use real passwords.
- Checkout is a demo button; no payment provider or backend is connected.
- Product images reuse the image paths from the original deployed Dukan Shop site. If those old image URLs stop working, replace them with local images in the `images` folder and update `js/index.js`.
- The original store video and Bootstrap/Font Awesome assets are retained.
