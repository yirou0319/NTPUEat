import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, icon: 'fa-home', label: '首頁' },
    { id: Tab.SCHEDULE, icon: 'fa-calendar', label: '課表' },
    { id: Tab.FOOD, icon: 'fa-utensils', label: '剩食', highlight: true },
    { id: Tab.WALLET, icon: 'fa-wallet', label: '錢包' },
    { id: Tab.PROFILE, icon: 'fa-user', label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-black/90 backdrop-blur-md border-t border-surface-light px-6 py-2 pb-5 z-50 flex justify-between items-end">
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        
        if (item.highlight) {
            return (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className="flex flex-col items-center justify-center -mt-8 space-y-1 group"
                >
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-all duration-300 ${isActive ? 'bg-white scale-110' : 'bg-surface border border-surface-light text-gray-400'}`}>
                        <i className={`fas ${item.icon} text-xl ${isActive ? 'text-black' : 'text-white'}`}></i>
                    </div>
                    <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {item.label}
                    </span>
                </button>
            )
        }

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center justify-center w-12 space-y-1"
          >
            <i className={`fas ${item.icon} text-lg transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-600'}`}></i>
            <span className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-600'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;