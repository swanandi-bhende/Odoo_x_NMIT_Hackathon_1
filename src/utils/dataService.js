// src/utils/dataService.js

// Simple mock version (local storage). Replace with API calls later.
export const dataService = {
  getWishlist: (userId) => {
    const data = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || "[]");
    return data;
  },
  removeFromWishlist: (userId, itemId) => {
    let data = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || "[]");
    data = data.filter(item => item.id !== itemId);
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(data));
  },
  createOrder: (userId, item) => {
    let orders = JSON.parse(localStorage.getItem(`orders_${userId}`) || "[]");
    orders.push({ ...item, orderId: Date.now() });
    localStorage.setItem(`orders_${userId}`, JSON.stringify(orders));
  }
};
