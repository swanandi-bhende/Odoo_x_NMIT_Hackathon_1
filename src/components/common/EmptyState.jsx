import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon: Icon, title, message, ctaText, ctaLink }) => {
  return (
    <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
      {Icon && (
        <div className="text-gray-400 dark:text-gray-500 mb-4 flex justify-center">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">{message}</p>
      {ctaText && ctaLink && (
        <div className="mt-6">
          <Link
            to={ctaLink}
            className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition-colors font-medium text-sm"
          >
            {ctaText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmptyState;