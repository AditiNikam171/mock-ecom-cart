import { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle2, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import '../styles/CheckoutPage.css';
import '../styles/Card.css';
import '../styles/Button.css';
import '../styles/Form.css';

export function CheckoutPage({
  cart,
  onNavigateToCart,
  onNavigateToProducts,
  onCheckoutComplete,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock receipt
    const mockReceipt = {
      orderId: `VC-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      total,
      timestamp: new Date().toISOString(),
      customerName: name,
      customerEmail: email,
      items: cart,
    };

    setReceipt(mockReceipt);
    setShowReceipt(true);
    setIsSubmitting(false);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    onCheckoutComplete();
    onNavigateToProducts();
  };

  if (cart.length === 0) {
    return (
      <div className="container checkout-page">
        <div className="card empty-cart">
          <h2>No items to checkout</h2>
          <p>Please add items to your cart first.</p>
          <button onClick={onNavigateToProducts} className="btn btn-primary btn-full">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container checkout-page">
        <button onClick={onNavigateToCart} className="btn btn-ghost checkout-back-button">
          <ArrowLeft />
          Back to Cart
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Contact Information</h4>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email}</p>
                  )}
                </div>

                <div className="form-note">
                  <p>
                    <strong>Note:</strong> This is a mock checkout. No payment will be processed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary-section">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Order Summary</h4>
              </div>
              <div className="card-content">
                {/* Items List */}
                <div className="checkout-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="checkout-item">
                      <div className="checkout-item-image-wrapper">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="checkout-item-image"
                        />
                      </div>
                      <div className="checkout-item-details">
                        <p className="checkout-item-name">{item.name}</p>
                        <p className="checkout-item-quantity">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="checkout-item-price">
                        <p>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="separator"></div>

                {/* Totals */}
                <div className="checkout-totals">
                  <div className="checkout-total-row">
                    <span className="summary-label">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="checkout-total-row">
                    <span className="summary-label">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="checkout-total-final">
                    <span className="checkout-total-label">Total</span>
                    <span className="checkout-total-amount">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className={`btn btn-primary btn-full btn-lg checkout-button ${isSubmitting ? 'animate-pulse' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CreditCard />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="modal-overlay" onClick={handleCloseReceipt}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseReceipt}>
              <X />
              <span className="sr-only">Close</span>
            </button>
            
            <div className="modal-header">
              <div className="success-icon">
                <CheckCircle2 />
              </div>
              <h2 className="modal-title">Order Confirmed!</h2>
              <p className="modal-description">
                Thank you for your purchase, {receipt?.customerName}!
              </p>
            </div>

            {receipt && (
              <div>
                <div className="receipt-details">
                  <div className="receipt-row">
                    <span className="receipt-label">Order ID:</span>
                    <span className="receipt-value">{receipt.orderId}</span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Date:</span>
                    <span className="receipt-value">
                      {new Date(receipt.timestamp).toLocaleDateString()} at{' '}
                      {new Date(receipt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Email:</span>
                    <span className="receipt-value">{receipt.customerEmail}</span>
                  </div>
                </div>

                <div className="separator"></div>

                <div>
                  <p className="receipt-items-title">Order Items:</p>
                  <div>
                    {receipt.items.map((item) => (
                      <div key={item.id} className="receipt-item">
                        <span className="receipt-item-name">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="receipt-item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="receipt-total">
                  <span className="receipt-total-label">Total Paid:</span>
                  <span className="receipt-total-amount">
                    ${receipt.total.toFixed(2)}
                  </span>
                </div>

                <div className="receipt-note">
                  A confirmation email has been sent to {receipt.customerEmail}
                </div>

                <button onClick={handleCloseReceipt} className="btn btn-primary btn-full btn-lg">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
