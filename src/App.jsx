import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { mockProducts } from './data/products';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import './styles/globals.css';
import './styles/App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Increment quantity if product already in cart
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Show toast notification
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const handleProceedToCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleCheckoutComplete = () => {
    // Clear the cart after successful checkout
    setCart([]);
    toast.success('Order placed successfully!');
  };

  // Calculate total number of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Header 
        cartCount={totalItems}
        onNavigateToHome={() => setCurrentPage('products')}
        onNavigateToCart={() => setCurrentPage('cart')}
      />
      
      <main className="app-main">
        {currentPage === 'products' && (
          <div className="container products-container">
            <div className="products-grid">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToProducts={() => setCurrentPage('products')}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            cart={cart}
            onNavigateToCart={() => setCurrentPage('cart')}
            onNavigateToProducts={() => setCurrentPage('products')}
            onCheckoutComplete={handleCheckoutComplete}
          />
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
