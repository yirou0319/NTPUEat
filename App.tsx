import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import FoodList from './components/FoodList';
import Schedule from './components/Schedule';
import Wallet from './components/Wallet';
import { Tab } from './types';

const App: React.FC = () => {
  // Default set to FOOD as requested
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.FOOD);

  const renderContent = () => {
    switch (currentTab) {
      case Tab.HOME:
        return <Dashboard onTabChange={setCurrentTab} />;
      case Tab.FOOD:
        return <FoodList />;
      case Tab.SCHEDULE:
        return <Schedule />;
      case Tab.WALLET:
        return <Wallet />;
      case Tab.PROFILE:
        return (
            <div className="flex flex-col items-center justify-center h-screen pb-20 p-6 text-center">
                <div className="h-24 w-24 bg-surface rounded-full mb-4 flex items-center justify-center">
                    <i className="fas fa-user text-4xl text-gray-500"></i>
                </div>
                <h2 className="text-xl font-bold text-white">王小明</h2>
                <p className="text-gray-400 mb-8">企管系 2年級 • 永續積分: 1250</p>
                
                <div className="w-full space-y-3">
                    <button className="w-full bg-surface p-4 rounded-xl border border-surface-light flex justify-between items-center hover:bg-surface-light transition-colors">
                        <span className="font-medium text-gray-200">數位學院 Moodle</span>
                        <i className="fas fa-external-link-alt text-gray-500 text-xs"></i>
                    </button>
                    <button className="w-full bg-surface p-4 rounded-xl border border-surface-light flex justify-between items-center hover:bg-surface-light transition-colors">
                        <span className="font-medium text-gray-200">校務系統</span>
                        <i className="fas fa-external-link-alt text-gray-500 text-xs"></i>
                    </button>
                    <button className="w-full bg-surface p-4 rounded-xl border border-surface-light flex justify-between items-center hover:bg-surface-light transition-colors">
                        <span className="font-medium text-gray-200">設定</span>
                        <i className="fas fa-chevron-right text-gray-500 text-xs"></i>
                    </button>
                </div>
                <div className="mt-8 text-xs text-gray-600">
                    NTPU Eats+ v1.0.0<br/>
                    Made for Sustainability
                </div>
            </div>
        );
      default:
        return <Dashboard onTabChange={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black max-w-md mx-auto relative shadow-2xl overflow-hidden text-white">
      {/* Content Area */}
      <main className="h-full overflow-y-auto no-scrollbar">
        {renderContent()}
      </main>

      {/* Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
};

export default App;