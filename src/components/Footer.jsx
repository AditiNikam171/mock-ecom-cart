import { Mail, Phone, MessageCircle } from 'lucide-react';
import '../styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Customer Service */}
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  <Phone />
                  <span>1-800-VIBE-SHOP</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <Mail />
                  <span>support@vibecommerce.com</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <MessageCircle />
                  <span>Live Chat</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="footer-section">
            <h3>Help & Support</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Warranty Information
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-list">
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; 2025 Vibe Commerce Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
