import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Dashboard from './pages/Dashboard';
import MyListingsPage from './pages/MyListingsPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import SupportPage from './pages/SupportPage';
import CouponsPage from './pages/CouponsPage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Browsing from './pages/Browsing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SellItemForm from './pages/SellItemForm';
import Sidebar from './components/Dashboard/Sidebar';
import Header from './components/Dashboard/Header';

// 🔒 Protect routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <Header />

        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/my-listings" element={<ProtectedRoute><MyListingsPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
            <Route path="/support" element={<ProtectedRoute><SupportPage /></ProtectedRoute>} />
            <Route path="/coupons" element={<ProtectedRoute><CouponsPage /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/browsing" element={<ProtectedRoute><Browsing /></ProtectedRoute>} />
            <Route path="/sell" element={<ProtectedRoute><SellItemForm /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SidebarProvider>
          <Router>
            <AppContent />
          </Router>
        </SidebarProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
