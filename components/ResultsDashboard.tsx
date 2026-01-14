import React from 'react';
import { UserStamp, AggregateStats, getComboKey } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Share2, Trophy } from 'lucide-react';
import { TITLES } from '../constants';

interface ResultsDashboardProps {
  stamp: UserStamp;
  stats: AggregateStats;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ stamp, stats }) => {
  
  const chartData = Object.entries(stats.distribution).map(([key, count]) => ({
    name: TITLES[key] || key,
    key: key,
    count: Number(count),
    isUser: key === getComboKey(stamp.portfolio, stamp.behavior)
  })).sort((a, b) => b.count - a.count).slice(0, 5); // Top 5

  const handleShare = async () => {
    const text = `I am a ${stamp.title}. ${stamp.blessing} #AYRY #Crypto2026`;
    // Ensure we have a valid URL string.
    const shareUrl = window.location.href.startsWith('http') 
      ? window.location.href 
      : 'https://AYRY.copute.ai'; // Custom domain fallback

    if (navigator.share) {
      try {
        await navigator.share({ 
          title: 'Are You Rekt Yet?', 
          text: text, 
          url: shareUrl 
        });
      } catch (err) {
        // Ignore AbortError (user cancelled)
        if (err instanceof Error && err.name !== 'AbortError') {
          console.warn('Share API failed, falling back to clipboard', err);
          navigator.clipboard.writeText(`${text} ${shareUrl}`)
            .then(() => alert("Copied to clipboard!"))
            .catch(() => alert("Failed to copy."));
        }
      }
    } else {
      navigator.clipboard.writeText(`${text} ${shareUrl}`)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-700">
      
      {/* Identity Card */}
      <div className="relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-crypto-accent to-crypto-rekt rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-crypto-card border border-crypto-dim/30 rounded-xl p-8 text-center space-y-4">
          
          <div className="inline-block p-2 rounded-full bg-crypto-dark border border-crypto-dim/50">
             <Trophy size={32} className="text-yellow-500" />
          </div>

          <div>
            <h2 className="text-crypto-dim font-mono text-sm uppercase tracking-widest">Your Designation</h2>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-2 glitch-text">
              {stamp.title}
            </h1>
          </div>

          <div className="py-4 border-t border-b border-dashed border-crypto-dim/30">
            <p className="font-mono text-crypto-accent text-lg italic">
              "{stamp.blessing}"
            </p>
          </div>

          <div className="text-xs text-crypto-dim font-mono">
            Ritual completed: {stamp.date} (SGT)
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="bg-crypto-dark rounded-xl p-6 border border-crypto-dim/20">
        <h3 className="text-sm font-mono text-crypto-dim mb-6 uppercase flex justify-between">
          <span>Global Consensus</span>
          <span>{stats.globalCount} Rituals</span>
        </h3>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30, top: 0, bottom: 0 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={120} 
                tick={{fill: '#666', fontSize: 10, fontFamily: 'monospace'}} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isUser ? '#00ff9d' : '#444444'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Share Actions */}
      <button 
        onClick={handleShare}
        className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition"
      >
        <Share2 size={20} />
        <span>Shill Your Designation</span>
      </button>

    </div>
  );
};