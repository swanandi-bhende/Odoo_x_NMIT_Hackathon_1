import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { X, Minus, Plus, Leaf } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4">
      <img src={item.image} alt={item.title} className="w-24 h-24 sm:w-32 sm:h-32 rounded-card object-cover" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-2">Sold by {item.seller}</p>
        <div className="flex items-center gap-2 text-sm text-eco-green font-medium">
          <Leaf className="w-4 h-4" />
          <span>-{((item.co2Saved || 0) * item.quantity).toFixed(1)}kg CO₂</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        <div className="flex items-center border border-gray-300 rounded-card">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-3 text-sm font-medium">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-xs text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
