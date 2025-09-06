import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';
import { Leaf, Truck, Tag } from 'lucide-react';

const OrderSummary = () => {
  const { subtotal, totalCo2Saved } = useCart();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-card shadow-sm border p-6 sticky top-24"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Enter coupon code" className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green" />
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-card hover:bg-gray-300">Apply</button>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-eco-green/10 rounded-card text-center">
        <div className="flex items-center justify-center gap-2 text-eco-green font-semibold">
          <Leaf className="w-5 h-5" />
          <span>You've saved {totalCo2Saved.toFixed(1)}kg of CO₂!</span>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 bg-eco-green text-white py-3 rounded-card font-medium hover:bg-emerald-700 transition-colors"
      >
        Proceed to Checkout
      </motion.button>
    </motion.div>
  );
};

export default OrderSummary;
