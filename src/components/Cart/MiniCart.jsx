import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';

const MiniCart = (props) => {
  const { items, cartCount, subtotal, removeFromCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-lg border border-gray-200 z-50"
      {...props}
    >
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">My Cart ({cartCount})</h3>
      </div>
      <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            Your cart is empty.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.slice(0, 3).map(item => (
              <li key={item.id} className="flex items-center gap-4 p-4">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                  aria-label={`Remove ${item.title}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          {items.length > 3 && (
            <p className="text-xs text-center text-gray-500 mb-3">
              + {items.length - 3} more item(s)
            </p>
          )}
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/cart">
            <button className="w-full bg-eco-green text-white py-2.5 rounded-card font-medium hover:bg-emerald-700 transition-colors">
              View Cart & Checkout
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default MiniCart;
