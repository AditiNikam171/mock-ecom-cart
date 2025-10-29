
# mock-ecom-cart

A small mock e-commerce application (React + Vite frontend, Express + MongoDB backend) that demonstrates a product list, a simple cart stored in MongoDB, and a checkout endpoint.

This repository contains two parts:

- frontend: React app in the `src/` folder (started with Vite)
- backend: Express API in the `backend/` folder (MongoDB for persistence)

## Features

- Display products
- Add product to cart (server-backed)
- View and remove items from cart
- Checkout endpoint that clears the cart and returns a receipt

## Quick start (Windows / PowerShell)

1) Install dependencies for both frontend and backend

```powershell
# from project root
npm install

# install backend deps (optional if already installed)
cd backend
npm install
cd ..
```

2) Configure environment

Create `backend/.env` (there is a sample in the repo). Required values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mock-ecom-cart
```

If your backend will run on a different host/port, set `REACT_APP_API_URL` in the frontend environment or your OS environment (the frontend axios instance uses this var).

3) Start backend

```powershell
# from backend folder
cd backend
# development with auto-reload (nodemon)
npm run start
# or run directly
node index.js
```

4) Start frontend dev server

```powershell
# from project root
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser.

## API Endpoints (backend)

Base URL: http://localhost:5000 (change if you set a different PORT)

- GET /api/products
  - Returns list of products
- GET /api/seed
  - (Optional) Seeds example products into the database
- POST /api/cart
  - Body: { productId: string, qty?: number }
  - Adds the product to the cart (creates or updates a CartItem)
- GET /api/cart
  - Returns cart items and total
- DELETE /api/cart/:id
  - Removes a cart item by cart item id
- POST /api/checkout
  - Processes checkout (in this mock app it computes total and clears the cart)

## Notes & troubleshooting

- If you get a frontend alert "Could not add to cart: Network Error":
  - Ensure the backend is running and listening on the port configured in `backend/.env` (default 5000).
  - Open the browser DevTools → Network and inspect the POST /api/cart request to see the request URL and response.
  - From PowerShell you can test endpoints directly:

```powershell
# test products endpoint
Invoke-RestMethod -Uri http://localhost:5000/api/products -Method GET

# test add to cart (replace <PRODUCT_ID>)
$body = @{ productId = '<PRODUCT_ID>'; qty = 1 } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:5000/api/cart -Method Post -Body $body -ContentType 'application/json'
```

- Make sure MongoDB is running (if using a local Mongo instance). If the backend fails to start it will log the MongoDB connection error.
- CORS is enabled in the backend, but if the frontend and backend run on different origins verify the `REACT_APP_API_URL` environment variable or the axios baseURL in `src/service/index.jsx`.

## Development notes

- Frontend axios instance: `src/service/index.jsx` (reads `REACT_APP_API_URL` or defaults to `http://localhost:5000`).
- Product card component calls `/api/cart` to add items and uses optimistic UI feedback.

If you'd like, I can:
- Add example `.env.example` to the backend
- Add automated seeding on server start (optional)
- Add a small README section that documents the frontend component structure

Happy hacking!
  