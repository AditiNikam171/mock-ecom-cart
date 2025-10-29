const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/products");
const CartItem = require("./models/CartItem");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

/**
 * Seed route (run once if you want)
 * GET /api/seed
 */
app.get("/api/seed", async (req, res) => {
  try {
    // Remove existing (optional)
    await Product.deleteMany();

    const docs = await Product.insertMany([
      { name: "Shoes", price: 49, image: "shoes.jpg", description: "Comfortable running shoes" },
      { name: "T-shirt", price: 29, image: "tshirt.jpg", description: "100% cotton" },
      { name: "Bag", price: 59, image: "bag.jpg", description: "Stylish bag" },
      { name: "Hat", price: 19, image: "hat.jpg", description: "Sun hat" },
      { name: "Socks", price: 9, image: "socks.jpg", description: "Cozy socks" }
    ]);

    res.json({ seeded: true, count: docs.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Seed failed" });
  }
});

/**
 * GET /api/products
 */
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

/**
 * POST /api/cart
 * body: { productId, qty }
 */
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: "productId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Check if same product already in cart -> update qty
    let existing = await CartItem.findOne({ product: productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
    } else {
      existing = new CartItem({ product: productId, qty });
      await existing.save();
    }

    const cart = await CartItem.find().populate("product").lean();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not add to cart" });
  }
});

/**
 * DELETE /api/cart/:id  (cart item id)
 */
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await CartItem.findByIdAndDelete(id);
    const cart = await CartItem.find().populate("product").lean();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not remove item" });
  }
});

/**
 * GET /api/cart
 */
app.get("/api/cart", async (req, res) => {
  try {
    const cart = await CartItem.find().populate("product").lean();
    const total = cart.reduce((sum, item) => {
      const price = item.product?.price ?? 0;
      return sum + price * item.qty;
    }, 0);
    res.json({ cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch cart" });
  }
});

/**
 * POST /api/checkout
 * body: { cartItems }  (optional — server can compute from DB)
 */
app.post("/api/checkout", async (req, res) => {
  try {
    // Option A: compute from DB
    const cart = await CartItem.find().populate("product").lean();
    const total = cart.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.qty, 0);

    // Create receipt
    const receipt = { total, timestamp: new Date().toISOString() };

    // Clear cart
    await CartItem.deleteMany();

    res.json(receipt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));