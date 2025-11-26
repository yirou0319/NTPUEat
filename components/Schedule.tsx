import React, { useState } from 'react';
import { ClassSession } from '../types';

// Extended Schedule Data for Mon-Fri
const WEEKLY_SCHEDULE: ClassSession[] = [
    // Monday
    { id: 'm1', name: '企業倫理', room: '商 2F01', time: '09:00 - 12:00', day: 'Mon' },
    { id: 'm2', name: '永續發展導論', room: '社 1F05', time: '13:00 - 15:00', day: 'Mon' },
    // Tuesday
    { id: 't1', name: '程式設計', room: '資 3F12', time: '10:00 - 12:00', day: 'Tue' },
    { id: 't2', name: '體育 (羽球)', room: '體育館', time: '15:00 - 17:00', day: 'Tue' },
    // Wednesday
    { id: 'w1', name: '微積分 (二)', room: '商 3F08', time: '09:00 - 12:00', day: 'Wed' },
    { id: 'w2', name: '經濟學原理', room: '商 1F01', time: '13:00 - 16:00', day: 'Wed' },
    // Thursday
    { id: 'th1', name: '會計學', room: '商 2F10', time: '09:00 - 12:00', day: 'Thu' },
    { id: 'th2', name: '通識：音樂賞析', room: '人 1F03', time: '14:00 - 16:00', day: 'Thu' },
    // Friday
    { id: 'f1', name: '班會', room: '商 5F02', time: '10:00 - 12:00', day: 'Fri' },
    { id: 'f2', name: '社團活動', room: '學生活動中心', time: '18:00 - 20:00', day: 'Fri' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const DAY_LABELS: Record<string, string> = {
    'Mon': '週一',
    'Tue': '週二',
    'Wed': '週三',
    'Thu': '週四',
    'Fri': '週五',
};

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('Mon');

  // Filter classes for the selected day
  const dailyClasses = WEEKLY_SCHEDULE.filter(c => c.day === selectedDay);

  return (
    <div className="p-4 pb-24 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">我的課表 📅</h1>
        <button className="text-white text-sm font-medium bg-surface border border-surface-light px-4 py-1.5 rounded-full hover:bg-surface-light transition-colors">
            匯入 Portal
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex justify-between bg-surface p-1 rounded-xl mb-6 border border-surface-light">
          {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedDay === day 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                  {DAY_LABELS[day]}
              </button>
          ))}
      </div>

      {/* Content */}
      <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar">
        {/* Date Header for Selected Day */}
        <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center bg-white text-black rounded-xl p-3 w-16 shadow-md">
                <span className="text-xs font-bold uppercase opacity-60">{selectedDay}</span>
                <span className="text-2xl font-extrabold">
                    {/* Fake date logic just for demo visuals */}
                    {20 + DAYS.indexOf(selectedDay)}
                </span>
            </div>
            <div>
                <h2 className="text-lg font-bold text-white">{DAY_LABELS[selectedDay]}</h2>
                <p className="text-gray-500 text-sm">
                    {dailyClasses.length > 0 ? `${dailyClasses.length} 堂課` : '今日無課'}
                </p>
            </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-surface-light ml-4 space-y-8 pl-6 pb-4">
            {dailyClasses.length === 0 && (
                <div className="text-gray-500 py-10">
                    <p>這天沒有安排課程，去探索美食吧！</p>
                </div>
            )}

            {dailyClasses.map((session, idx) => (
                <div key={session.id} className="relative group animate-in slide-in-from-bottom-2 duration-500">
                    {/* Dot */}
                    <div className="absolute -left-[31px] top-4 h-4 w-4 rounded-full border-4 border-black bg-white shadow-sm"></div>
                    
                    {/* Card */}
                    <div className="bg-surface p-4 rounded-2xl hover:bg-surface-light transition-all border border-surface-light hover:border-gray-600">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white text-lg">{session.name}</h3>
                            <span className="bg-black text-gray-400 text-xs px-2 py-1 rounded-md border border-surface-light">{session.time}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <i className="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                            {session.room}
                        </div>
                        {/* Contextual Action */}
                        {idx === dailyClasses.length - 1 && (
                            <div className="mt-3 pt-3 border-t border-surface-light">
                                <p className="text-xs text-primary font-medium flex items-center">
                                    <i className="fas fa-utensils mr-1.5"></i>
                                    下課後去「學生活動中心」看看剩食？
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;