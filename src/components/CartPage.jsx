import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import '../styles/CartPage.css';
import '../styles/Card.css';
import '../styles/Button.css';

export function CartPage({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onNavigateToProducts,
  onProceedToCheckout 
}) {
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="container cart-page">
        <button 
          onClick={onNavigateToProducts} 
          className="btn btn-ghost cart-back-button"
        >
          <ArrowLeft />
          Back to Products
        </button>
        <div className="card empty-cart">
          <ShoppingBag />
          <h2>Your cart is empty!</h2>
          <p>Add some products to get started.</p>
          <button onClick={onNavigateToProducts} className="btn btn-primary btn-full">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <button 
        onClick={onNavigateToProducts} 
        className="btn btn-ghost cart-back-button"
      >
        <ArrowLeft />
        Back to Products
      </button>
      
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items-section">
          <div className="card cart-card">
            {/* Desktop Table View */}
            <div className="desktop-table">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-item-info">
                          <div className="cart-item-image-wrapper">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                            />
                          </div>
                          <div>
                            <p className="cart-item-name">{item.name}</p>
                            {item.description && (
                              <p className="cart-item-description">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>${item.price.toFixed(2)}</p>
                      </td>
                      <td>
                        <div className="quantity-controls">
                          <button
                            className="btn btn-outline btn-icon btn-sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus />
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="btn btn-outline btn-icon btn-sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus />
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <p className="cart-item-name">${(item.price * item.quantity).toFixed(2)}</p>
                      </td>
                      <td>
                        <button
                          className="btn btn-destructive btn-icon"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="mobile-cart-view mobile-cart-items">
              {cart.map((item) => (
                <div key={item.id} className="mobile-cart-item">
                  <div className="mobile-cart-item-header">
                    <div className="mobile-cart-item-image-wrapper">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </div>
                    <div className="mobile-cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-description">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className="mobile-cart-item-footer">
                    <div className="quantity-controls">
                      <button
                        className="btn btn-outline btn-icon btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="btn btn-outline btn-icon btn-sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                    
                    <div className="mobile-item-total">
                      <p className="cart-item-name">${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className="btn btn-destructive btn-icon"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="cart-summary-section">
          <div className="card order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="separator"></div>
              
              <div className="summary-total">
                <span>Total</span>
                <span className="summary-total-amount">${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={onProceedToCheckout} className="btn btn-primary btn-full btn-lg">
              Proceed to Checkout
            </button>
            
            <button 
              onClick={onNavigateToProducts} 
              className="btn btn-outline btn-full"
              style={{ marginTop: '0.75rem' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}