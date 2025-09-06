import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'My Listings', path: '/my-listings' },
    { label: 'Orders', path: '/orders' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Support', path: '/support' },
    { label: 'Coupons', path: '/coupons' },
    { label: 'Cart', path: '/cart' },
    { label: 'Profile', path: '/profile' },
    { label: 'Browsing', path: '/browsing' },
    { label: 'Sell Item', path: '/sell' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 flex flex-col">
      <div className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-md px-4 py-2 text-sm font-medium ${
                isActive
                  ? 'bg-eco-light text-eco-green'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-eco-green'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Logout pinned at bottom */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
