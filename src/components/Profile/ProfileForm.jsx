import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save, Loader } from 'lucide-react';
import LocationMap from './LocationMap';

const ProfileForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    displayName: user.displayName || `${user.firstName} ${user.lastName}`,
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    bio: user.bio || '',
    shippingAddress: user.shippingAddress || '',
    location: user.location || { lat: 51.505, lng: -0.09 },
    preferences: user.preferences || {
      ecoShipping: true,
      newsletter: false,
      saveSearches: true,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.preferences) {
      setFormData(prev => ({
        ...prev,
        preferences: { ...prev.preferences, [name]: checked },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = useCallback((newLocation) => {
    setFormData(prev => ({ ...prev, location: newLocation }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const formInputClasses = "block w-full px-3 py-2 border border-gray-300 rounded-card focus:ring-2 focus:ring-eco-green focus:border-transparent transition-all";
  const formCheckboxClasses = "rounded border-gray-300 text-eco-green focus:ring-eco-green";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-8 rounded-card border shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={formInputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={formInputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} className={formInputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} className={formInputClasses} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (read-only)</label>
            <input type="email" name="email" value={formData.email} readOnly className={`${formInputClasses} bg-gray-100 cursor-not-allowed`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={formInputClasses} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className={formInputClasses}></textarea>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-card border shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Address & Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} rows="4" className={formInputClasses}></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location Coordinates</label>
              <div className="flex gap-4">
                <input type="text" readOnly value={`Lat: ${formData.location.lat.toFixed(4)}`} className={`${formInputClasses} bg-gray-100`} />
                <input type="text" readOnly value={`Lng: ${formData.location.lng.toFixed(4)}`} className={`${formInputClasses} bg-gray-100`} />
              </div>
            </div>
          </div>
          <div className="h-80">
            <LocationMap 
              lat={formData.location.lat} 
              lng={formData.location.lng} 
              onLocationChange={handleLocationChange} 
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-card border shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="ecoShipping" checked={formData.preferences.ecoShipping} onChange={handleChange} className={formCheckboxClasses} />
            <span className="text-sm text-gray-700">Default to eco-friendly shipping</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="newsletter" checked={formData.preferences.newsletter} onChange={handleChange} className={formCheckboxClasses} />
            <span className="text-sm text-gray-700">Subscribe to newsletter</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" name="saveSearches" checked={formData.preferences.saveSearches} onChange={handleChange} className={formCheckboxClasses} />
            <span className="text-sm text-gray-700">Enable saved searches</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" className="px-6 py-2.5 bg-white border border-gray-300 rounded-card font-medium text-sm hover:bg-gray-50">Cancel</button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-eco-green text-white rounded-card font-medium text-sm hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
          {loading ? 'Saving...' : 'Save Changes'}
        </motion.button>
      </div>
    </form>
  );
};

export default ProfileForm;
