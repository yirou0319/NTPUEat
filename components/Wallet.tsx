import React from 'react';

const Wallet: React.FC = () => {
  return (
    <div className="p-4 pb-24 space-y-6">
        <h1 className="text-2xl font-bold text-white">校園錢包 💳</h1>
        
        {/* Card Component */}
        <div className="bg-gradient-to-br from-zinc-800 to-black rounded-2xl p-6 text-white shadow-lg relative overflow-hidden border border-surface-light">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-10 -mr-10 blur-2xl"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                    <p className="text-gray-400 text-sm">現有餘額</p>
                    <h2 className="text-3xl font-bold mt-1 tracking-tight">$ 1,250</h2>
                </div>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md">
                    <i className="fas fa-wifi text-white/70"></i>
                </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <div>
                    <p className="text-gray-500 text-xs mb-1">學生證號</p>
                    <p className="font-mono tracking-wider text-gray-200">71120000</p>
                </div>
                <div className="h-8 w-12 bg-white/20 rounded-md"></div>
            </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-white text-black py-3 rounded-xl shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform font-bold hover:bg-gray-200">
                <i className="fas fa-qrcode"></i>
                <span>付款/取餐</span>
            </button>
            <button className="bg-surface text-gray-300 border border-surface-light py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-surface-light transition-colors">
                <i className="fas fa-history"></i>
                <span>交易紀錄</span>
            </button>
        </div>

        {/* Recent Transactions */}
        <div>
            <h3 className="font-bold text-white mb-3">最近活動</h3>
            <div className="bg-surface rounded-2xl shadow-sm border border-surface-light overflow-hidden">
                {[
                    { name: '阿姨自助餐 - 剩食便當', date: '今日 12:30', amount: '-$60', icon: 'fa-utensils', color: 'text-white', bg: 'bg-zinc-700' },
                    { name: '全家便利商店', date: '昨日 08:15', amount: '-$45', icon: 'fa-store', color: 'text-white', bg: 'bg-zinc-700' },
                    { name: '永續獎勵金', date: '10/20', amount: '+$50', icon: 'fa-leaf', color: 'text-primary', bg: 'bg-primary/20' }
                ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-surface-light last:border-0 hover:bg-surface-light transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.bg} ${tx.color}`}>
                                <i className={`fas ${tx.icon} text-sm`}></i>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-200">{tx.name}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                        </div>
                        <span className={`font-bold text-sm ${tx.amount.startsWith('+') ? 'text-primary' : 'text-white'}`}>
                            {tx.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Wallet;