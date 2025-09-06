import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeCard from './components/WelcomeCard';
import CarbonFootprintCard from './components/CarbonFootprintCard';
import StatsCards from './components/StatsCards';
import OrdersWidget from './components/OrdersWidget';
import RecommendationsGrid from './components/RecommendationsGrid';
import ActivityFeed from './components/ActivityFeed';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Authentication check
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.href = '/login.html';
    } else {
      setUser(currentUser);
    }

    // ✅ Animation + DOM logic
    const initPageAnimations = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.setAttribute('data-reduced-motion', 'true');
        return;
      }

      const dashboardRoot = document.querySelector('.dashboard-root');
      if (dashboardRoot) {
        const children = Array.from(dashboardRoot.children[0]?.children || []);
        children.forEach((child, index) => {
          const delay = index * 60;
          child.style.setProperty('--delay', `${delay}ms`);
          child.classList.add('page-enter');
        });
      }
    };

    const handleRightRailVisibility = () => {
      const rightRail = document.querySelector('.right-rail');
      const bottomPanels = document.querySelectorAll('[data-row="bottom"]');

      if (!rightRail || bottomPanels.length === 0) return;

      let isHidden = true;

      // ✅ Safe check before calling getComputedStyle
      if (rightRail instanceof Element) {
        const style = getComputedStyle(rightRail);
        isHidden = rightRail.offsetHeight === 0 || style.display === 'none';
      }

      bottomPanels.forEach(panel => {
        if (isHidden) {
          panel.classList.remove('panel--wide');
          panel.classList.add('panel--full');
        } else {
          panel.classList.remove('panel--full');
          panel.classList.add('panel--wide');
        }
      });
    };

    const initDOMHelpers = () => {
      initPageAnimations();
      handleRightRailVisibility();
      window.addEventListener('resize', handleRightRailVisibility);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDOMHelpers);
    } else {
      initDOMHelpers();
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleRightRailVisibility);
    };
  }, []);

  if (!user) {
    return null; // ✅ Optionally show a loading spinner here
  }

  return (
    <div className="min-h-screen bg-eco-bg">
      <Header user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 dashboard-root">
          <div className="dashboard-grid">
            {/* Hero Row */}
            <div className="panel--full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WelcomeCard user={user} />
                <CarbonFootprintCard />
              </div>
            </div>

            {/* Stats Row */}
            <div className="panel--full">
              <StatsCards />
            </div>

            {/* Content Row */}
            <div className="panel--wide" data-row="bottom">
              <div className="space-y-6">
                <OrdersWidget />
                <RecommendationsGrid />
              </div>
            </div>

            {/* Right Rail */}
            <div className="right-rail">
              <div className="sticky top-24">
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;