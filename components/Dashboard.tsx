import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SustainabilityMetric, Announcement, Tab, FoodItem } from '../types';

interface DashboardProps {
  onTabChange: (tab: Tab) => void;
}

const data = [
  { name: 'Mon', kg: 2.1 },
  { name: 'Tue', kg: 1.5 },
  { name: 'Wed', kg: 3.2 },
  { name: 'Thu', kg: 2.8 },
  { name: 'Fri', kg: 4.0 },
  { name: 'Sat', kg: 1.2 },
  { name: 'Sun', kg: 0.8 },
];

// Mock specific cafeteria food for the dashboard
const CAFETERIA_FOOD: FoodItem[] = [
    {
        id: 'c1',
        name: '自助餐 (稱重)',
        restaurant: '學生活動中心 1F',
        originalPrice: 100,
        discountedPrice: 70,
        quantity: 8,
        distance: '100m',
        imageUrl: 'https://picsum.photos/200/200?random=10',
        endTime: '13:30',
        tags: ['學餐', '自助餐']
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
        tags: ['學餐', '滷味']
    }
];

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  const [metrics] = useState<SustainabilityMetric[]>([
    { label: '拯救食物', value: 12.5, unit: 'kg', change: 12 },
    { label: '減少碳排', value: 28.4, unit: 'kgCO2e', change: 8 },
    { label: '省下金額', value: 1250, unit: 'TWD', change: 15 },
  ]);

  const [announcements] = useState<Announcement[]>([
    { id: '1', title: '🌱 永續週：自備餐盒折 $5', date: '今日', type: 'promo' },
    { id: '2', title: '📢 學餐 2F 新增剩食回收點', date: '昨日', type: 'general' },
  ]);

  const handleLinkClick = (label: string) => {
    if (label === '課程') {
        onTabChange(Tab.SCHEDULE);
    } else if (label === '錢包') {
        onTabChange(Tab.WALLET);
    } else if (label === 'eLearn') {
        window.open('https://lms3.ntpu.edu.tw/login/index.php', '_blank');
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">早安, 同學 👋</h1>
          <p className="text-sm text-gray-400">今天也要一起愛護地球！</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-surface border border-surface-light text-white flex items-center justify-center shadow-lg">
          <i className="fas fa-leaf text-primary"></i>
        </div>
      </header>

      {/* 1. Announcements (First as requested) */}
      <div>
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white">校園公告</h2>
            <button className="text-xs text-gray-500 hover:text-white">查看全部</button>
        </div>
        <div className="space-y-3">
          {announcements.map((item) => (
            <div key={item.id} className="bg-surface p-4 rounded-xl shadow-sm border border-surface-light flex items-start space-x-3 hover:bg-surface-light transition-colors cursor-pointer">
              <div className={`mt-1 h-2 w-2 rounded-full ${item.type === 'promo' ? 'bg-accent' : 'bg-blue-500'}`}></div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-200">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.date}</p>
              </div>
              <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Quick Links (Below Announcements) */}
      <div className="grid grid-cols-4 gap-4">
        {[
            { icon: 'fa-book-open', label: '課程', color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { icon: 'fa-graduation-cap', label: 'eLearn', color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { icon: 'fa-wallet', label: '錢包', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { icon: 'fa-calendar-check', label: '活動', color: 'text-pink-400', bg: 'bg-pink-500/10' }
        ].map((link, i) => (
            <button 
                key={i} 
                onClick={() => handleLinkClick(link.label)}
                className="flex flex-col items-center space-y-2 group"
            >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${link.bg} border border-transparent group-hover:border-white/10 transition-all`}>
                    <i className={`fas ${link.icon} ${link.color}`}></i>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300">{link.label}</span>
            </button>
        ))}
      </div>

      {/* 3. School Cafeteria Surplus (Special Section) */}
      <div>
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-white flex items-center">
                <i className="fas fa-utensils text-accent mr-2"></i>
                學餐剩食直擊
            </h2>
            <button onClick={() => onTabChange(Tab.FOOD)} className="text-xs text-primary hover:text-white">
                前往搶購 <i className="fas fa-arrow-right ml-1"></i>
            </button>
        </div>
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
            {CAFETERIA_FOOD.map(item => (
                <div key={item.id} className="min-w-[200px] bg-surface rounded-xl p-3 border border-surface-light hover:border-gray-600 transition-all cursor-pointer">
                    <div className="relative h-24 w-full mb-2">
                        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover rounded-lg opacity-80" />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            剩 {item.quantity}
                        </div>
                    </div>
                    <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 mb-2 truncate">{item.restaurant}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">${item.discountedPrice}</span>
                        <span className="text-xs text-gray-500 line-through">${item.originalPrice}</span>
                    </div>
                </div>
            ))}
            <div 
                onClick={() => onTabChange(Tab.FOOD)}
                className="min-w-[100px] bg-surface/50 rounded-xl border border-surface-light border-dashed flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-surface transition-colors cursor-pointer"
            >
                <i className="fas fa-search mb-1"></i>
                <span className="text-xs">查看更多</span>
            </div>
        </div>
      </div>

      {/* 4. Sustainability Stats (Bottom) */}
      <div className="bg-surface p-4 rounded-2xl shadow-sm border border-surface-light">
        <h2 className="text-lg font-bold text-white mb-4">本週永續足跡</h2>
        
        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
            {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-xs text-gray-500 mb-1">{metric.label}</span>
                <span className="text-lg font-bold text-white">{metric.value}</span>
                <span className="text-[10px] text-primary">+{metric.change}%</span>
            </div>
            ))}
        </div>

        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A"/>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#52525B'}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181B', borderRadius: '12px', border: '1px solid #27272A', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="kg" stroke="#10B981" fillOpacity={1} fill="url(#colorKg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;