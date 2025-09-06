import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const Card = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  const List = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="flex space-x-4">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
    </div>
  )

  const renderSkeleton = () => {
    switch(type) {
      case 'list': return <List />;
      case 'card':
      default: return <Card />;
    }
  }

  return (
    <div className={`grid ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
      ))}
    </div>
  );
};

export default SkeletonLoader;