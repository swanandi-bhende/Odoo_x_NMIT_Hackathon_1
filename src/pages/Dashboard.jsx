import React from 'react';
import MainContent from '../components/Dashboard/MainContent';
import RightRail from '../components/Dashboard/RightRail';

const Dashboard = () => {
  return (
    <div className="flex">
      <MainContent />
      <RightRail />
    </div>
  );
};

export default Dashboard;
