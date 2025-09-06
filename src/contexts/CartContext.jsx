import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const localCart = localStorage.getItem('ecofinds_cart');
      if (localCart) {
        setItems(JSON.parse(localCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      setItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ecofinds_cart', JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [items]);

  // TODO: Implement cart sync on login/logout
  useEffect(() => {
    if (user) {
      // console.log("User logged in, syncing cart...");
      // Here you would typically merge the local cart with the server cart
    } else {
      // console.log("User logged out, cart remains local.");
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    // Here you would also make a POST /api/cart/add call if the user is authenticated
  };

  const updateQuantity = (productId, newQuantity) => {
    setItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCo2Saved = items.reduce((total, item) => total + (item.co2Saved || 0) * item.quantity, 0);

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    totalCo2Saved,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
