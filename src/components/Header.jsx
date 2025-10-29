import { ShoppingCart } from 'lucide-react';
import '../styles/Header.css';

export function Header({ cartCount, onNavigateToHome, onNavigateToCart }) {
  return (
    <header className="header">
      <div className="container header-content">
        <button 
          onClick={onNavigateToHome}
          className="header-title"
        >
          Vibe Commerce Cart
        </button>
        
        <button 
          onClick={onNavigateToCart}
          className="header-cart-button"
        >
          <ShoppingCart />
          {cartCount > 0 && (
            <span className="header-cart-badge">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
