import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types';
import { getFoodRecommendation } from '../services/geminiService';

const MOCK_FOOD: FoodItem[] = [
  {
    id: '1',
    name: '招牌排骨便當',
    restaurant: '阿姨自助餐',
    originalPrice: 85,
    discountedPrice: 60,
    quantity: 5,
    distance: '150m',
    imageUrl: 'https://picsum.photos/200/200?random=1',
    endTime: '13:30',
    tags: ['便當', '熱食']
  },
  {
    id: 'c1',
    name: '學餐自助餐 (稱重)',
    restaurant: '學生活動中心 1F',
    originalPrice: 100,
    discountedPrice: 70,
    quantity: 8,
    distance: '100m',
    imageUrl: 'https://picsum.photos/200/200?random=10',
    endTime: '13:30',
    tags: ['學餐', '自助餐', '熱食']
  },
  {
    id: 'c2',
    name: '滷味拼盤',
    restaurant: '商學大樓 B1',
    originalPrice: 80,
    discountedPrice: 50,
    quantity: 3,
    distance: '250m',
    imageUrl: 'https://picsum.photos/200/200?random=11',
    endTime: '19:00',
    tags: ['學餐', '滷味', '熱食']
  },
  {
    id: '2',
    name: '總匯三明治',
    restaurant: '早安美芝城',
    originalPrice: 55,
    discountedPrice: 35,
    quantity: 2,
    distance: '300m',
    imageUrl: 'https://picsum.photos/200/200?random=2',
    endTime: '12:00',
    tags: ['早餐', '輕食']
  },
  {
    id: '3',
    name: '珍珠奶茶 (L)',
    restaurant: '50嵐 北大店',
    originalPrice: 60,
    discountedPrice: 40,
    quantity: 8,
    distance: '500m',
    imageUrl: 'https://picsum.photos/200/200?random=3',
    endTime: '22:00',
    tags: ['飲料', '甜點']
  },
  {
    id: '4',
    name: '日式咖哩雞飯',
    restaurant: '學餐 2F 咖哩屋',
    originalPrice: 90,
    discountedPrice: 65,
    quantity: 3,
    distance: '50m',
    imageUrl: 'https://picsum.photos/200/200?random=4',
    endTime: '19:00',
    tags: ['晚餐', '熱食', '學餐']
  }
];

// Mock coordinates for the map view (using percentages for responsive design)
const MAP_LOCATIONS: Record<string, { top: string; left: string }> = {
  '1': { top: '30%', left: '40%' },
  'c1': { top: '45%', left: '50%' }, // Student Center
  'c2': { top: '35%', left: '60%' }, // Commerce Bldg
  '2': { top: '50%', left: '70%' },
  '3': { top: '20%', left: '20%' },
  '4': { top: '65%', left: '35%' },
};

const FoodList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState('all');
  const [aiAdvice, setAiAdvice] = useState<string>('正在分析剩食數據...');
  const [loadingAi, setLoadingAi] = useState(true);
  const [selectedMapItem, setSelectedMapItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoadingAi(true);
      const advice = await getFoodRecommendation(new Date().getHours(), '商學院', MOCK_FOOD);
      setAiAdvice(advice);
      setLoadingAi(false);
    };
    fetchAdvice();
  }, []);

  const filteredFood = filter === 'all' 
    ? MOCK_FOOD 
    : MOCK_FOOD.filter(item => item.tags.includes(filter));

  return (
    <div className="p-4 pb-24 space-y-5 h-full flex flex-col">
      {/* Header & Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">剩食拯救隊</h1>
          <div className="flex items-center text-gray-400 text-xs mt-1">
             <i className="fas fa-map-marker-alt mr-1"></i> 三峽校區
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="bg-surface border border-surface-light rounded-full p-1 flex">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            列表
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'map' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            地圖
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="bg-surface border border-surface-light rounded-2xl p-4 text-gray-200 shadow-lg relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
        <div className="flex items-start space-x-3 relative z-10">
          <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm text-white h-fit">
            <i className={`fas fa-robot text-xl ${loadingAi ? 'animate-bounce' : ''}`}></i>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">AI 助理建議</p>
            <p className="text-sm font-medium leading-relaxed text-gray-200">
              {aiAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1 flex-shrink-0">
        {['all', '學餐', '熱食', '飲料', '輕食'].map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              filter === tag 
                ? 'bg-white text-black border-white' 
                : 'bg-black text-gray-500 border-surface-light hover:border-gray-600'
            }`}
          >
            {tag === 'all' ? '全部' : tag}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredFood.map(item => (
            <div key={item.id} className="bg-surface rounded-2xl p-3 shadow-lg border border-surface-light flex space-x-4 hover:border-gray-700 transition-colors cursor-pointer">
              <div className="relative h-24 w-24 flex-shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="h-full w-full object-cover rounded-xl opacity-80"
                />
                <div className="absolute top-1 left-1 bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-2 py-0.5 rounded-md">
                  剩 {item.quantity}
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-white text-lg line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-400 flex items-center mt-1">
                    <i className="fas fa-store mr-1.5"></i> {item.restaurant}
                  </p>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                  <div>
                     <span className="text-xs text-gray-600 line-through mr-1">${item.originalPrice}</span>
                     <span className="text-xl font-bold text-white">${item.discountedPrice}</span>
                  </div>
                  <button className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-200 active:scale-95 transition-all">
                    搶購
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center text-xs text-gray-600 pt-2">
            <p>📍 顯示距離為直線距離，實際路程可能不同</p>
          </div>
        </div>
      ) : (
        /* MAP VIEW */
        <div className="relative flex-1 min-h-[400px] bg-zinc-900 rounded-3xl overflow-hidden border border-surface-light shadow-inner group">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>
            
            {/* Decorative Map Elements */}
            <div className="absolute top-1/2 left-1/2 w-[80%] h-[80%] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 w-[40%] h-[40%] border border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* User Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-0">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-black shadow-[0_0_20px_rgba(59,130,246,0.5)] relative z-10"></div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                <span className="text-[10px] font-bold text-blue-400 mt-6 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-md">你這在裡</span>
            </div>

            {/* Food Pins */}
            {filteredFood.map((item) => {
               const pos = MAP_LOCATIONS[item.id] || { top: '50%', left: '50%' };
               const isSelected = selectedMapItem === item.id;
               const isCafeteria = item.tags.includes('學餐');

               return (
                <button 
                    key={item.id}
                    onClick={() => setSelectedMapItem(isSelected ? null : item.id)}
                    className="absolute flex flex-col items-center group/pin transition-all duration-300 z-10"
                    style={{ top: pos.top, left: pos.left }}
                >
                    <div className={`relative transition-transform duration-300 ${isSelected ? 'scale-125' : 'scale-100 hover:scale-110'}`}>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 shadow-lg ${isSelected ? 'bg-white border-white text-black' : (isCafeteria ? 'bg-accent border-white text-black' : 'bg-black border-white text-white')}`}>
                            <i className="fas fa-utensils text-xs"></i>
                        </div>
                        {item.quantity < 3 && (
                             <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border border-black"></div>
                        )}
                    </div>
                </button>
               );
            })}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="h-8 w-8 bg-black/80 backdrop-blur-md border border-surface-light rounded-lg text-white flex items-center justify-center hover:bg-white/20"><i className="fas fa-plus text-xs"></i></button>
                <button className="h-8 w-8 bg-black/80 backdrop-blur-md border border-surface-light rounded-lg text-white flex items-center justify-center hover:bg-white/20"><i className="fas fa-minus text-xs"></i></button>
                <button className="h-8 w-8 bg-black/80 backdrop-blur-md border border-surface-light rounded-lg text-blue-400 flex items-center justify-center hover:bg-white/20"><i className="fas fa-location-arrow text-xs"></i></button>
            </div>

            {/* Selected Item Preview Card (Overlay) */}
            {selectedMapItem && (() => {
                const item = filteredFood.find(i => i.id === selectedMapItem);
                if (!item) return null;
                return (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/20 p-3 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 z-50">
                        <div className="flex space-x-3">
                            <img src={item.imageUrl} className="h-16 w-16 rounded-lg object-cover bg-gray-800" alt={item.name} />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-white text-sm truncate">{item.name}</h3>
                                    <button onClick={(e) => { e.stopPropagation(); setSelectedMapItem(null); }} className="text-gray-500 hover:text-white"><i className="fas fa-times"></i></button>
                                </div>
                                <p className="text-xs text-gray-400">{item.restaurant} • {item.distance}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-white">${item.discountedPrice} <span className="text-xs text-gray-500 line-through font-normal">${item.originalPrice}</span></span>
                                    <button className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-md hover:bg-gray-200">去搶購</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
      )}
    </div>
  );
};

export default FoodList;