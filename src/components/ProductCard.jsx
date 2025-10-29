import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import '../styles/Card.css';
import '../styles/Button.css';

export function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    
    // Reset button text after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="card product-card">
      <div className="product-image-wrapper">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>
      
      <div className="card-header">
        <h4 className="card-title">{product.name}</h4>
        {product.description && (
          <p className="card-description">{product.description}</p>
        )}
      </div>
      
      <div className="card-content">
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
      
      <div className="card-footer">
        <button 
          onClick={handleAddToCart} 
          className={`btn btn-full btn-default ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

