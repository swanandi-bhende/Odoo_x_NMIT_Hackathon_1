import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ProfileForm from '../components/Profile/ProfileForm';

const Profile = () => {
  const { user, updateUser } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSave = async (profileData) => {
    // Simulate API call
    console.log("Saving profile data:", profileData);
    await updateUser(profileData);
    // In a real app, show a success toast
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and preferences.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ProfileForm user={user} onSave={handleSave} />
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
