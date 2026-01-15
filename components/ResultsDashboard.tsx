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
    <div className="w-full max-w-lg mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-700 pb-8">
      
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

      {/* Social Links */}
      <div className="pt-6 border-t border-crypto-dim/20 text-center">
        <p className="text-[10px] text-crypto-dim uppercase tracking-widest mb-4">
          Follow Us At
        </p>
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://x.com/CoputeAi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-crypto-card border border-crypto-dim/30 rounded-lg hover:border-crypto-accent hover:text-crypto-accent transition-all text-sm font-mono group"
          >
            {/* X Logo */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="group-hover:underline decoration-crypto-accent/50 underline-offset-4">@CoputeAi</span>
          </a>

          <a 
            href="https://t.me/coputeai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-crypto-card border border-crypto-dim/30 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all text-sm font-mono group"
          >
            {/* Telegram Logo */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span className="group-hover:underline decoration-blue-400/50 underline-offset-4">coputeai</span>
          </a>
        </div>
      </div>

    </div>
  );
};
