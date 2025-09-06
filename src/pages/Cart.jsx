import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          <p className="text-gray-600 mt-1">You have {cartCount} item(s) in your cart.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-card border">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/browse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-flex items-center gap-2 bg-eco-green text-white px-6 py-3 rounded-card font-medium hover:bg-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-card shadow-sm border">
                <ul className="divide-y divide-gray-200">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CartItem item={item} />
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3">
              <OrderSummary />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
