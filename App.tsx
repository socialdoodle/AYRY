import React, { useEffect, useState } from 'react';
import { UserState, PortfolioStatus, BehaviorStatus } from './types';
import { getOrInitUserId, checkTodayStatus, submitStamp } from './services/api';
import { StampSelector } from './components/StampSelector';
import { ResultsDashboard } from './components/ResultsDashboard';
import { Countdown } from './components/Countdown';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState<UserState | null>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const uid = getOrInitUserId();
      setUserId(uid);
      try {
        const state = await checkTodayStatus(uid);
        setUserState(state);
      } catch (e) {
        console.error("Failed to load state", e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleStamp = async (portfolio: PortfolioStatus, behavior: BehaviorStatus) => {
    if (!userId) return;
    setLoading(true);
    try {
      await submitStamp(userId, portfolio, behavior);
      // Refresh full state
      const updatedState = await checkTodayStatus(userId);
      setUserState(updatedState);
    } catch (e) {
      console.error("Failed to stamp", e);
      alert("The ritual failed. The chain is congested. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark text-crypto-text flex flex-col font-mono selection:bg-crypto-accent selection:text-black">
      
      {/* Header */}
      <header className="px-4 py-3 md:p-6 border-b border-crypto-dim/20 flex items-center justify-between relative bg-crypto-card/50 backdrop-blur-sm sticky top-0 z-50 h-[80px] md:h-auto">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-14 md:h-14">
          <img 
            src="/logo.png" 
            alt="AYRY Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(0,255,157,0.3)]"
            onError={(e) => {
              // Fallback if image missing - simple text placeholder or hide
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Center: Title */}
        <div className="flex flex-col items-center justify-center flex-grow mx-2">
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white text-center leading-none">
            <span className="text-crypto-rekt">ARE YOU</span> <span className="text-crypto-accent">REKT YET?</span>
          </h1>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-crypto-dim uppercase mt-1 tracking-widest hidden sm:flex">
            <span>Daily Ritual</span>
            <span className="text-crypto-accent">•</span>
            <span>SGT Zone</span>
            <span className="text-crypto-accent">•</span>
            <span>2026 Cycle</span>
          </div>
        </div>

        {/* Right: Spacer for balance (matches logo width) */}
        <div className="w-10 md:w-14 flex-shrink-0 hidden sm:block"></div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-4xl mx-auto relative">
        
        {/* Background Gradients */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crypto-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-crypto-rekt/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4 animate-pulse">
            <Loader2 className="w-12 h-12 text-crypto-accent animate-spin" />
            <p className="text-sm text-crypto-dim">Syncing with Consensus...</p>
          </div>
        ) : !userState ? (
          <div className="text-center text-red-500">System Failure. Refresh.</div>
        ) : userState.hasStamped && userState.currentStamp ? (
          <ResultsDashboard stamp={userState.currentStamp} stats={userState.stats} />
        ) : (
          <div className="w-full">
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-xl text-white font-bold">Perform The Ritual</h2>
              <p className="text-crypto-dim text-sm max-w-md mx-auto">
                Confess your positions to the chain. Receive your daily blessing. One entry per day (SGT).
              </p>
            </div>
            <StampSelector onSubmit={handleStamp} isSubmitting={loading} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-crypto-dim/20 bg-crypto-dark">
        <Countdown />
        <div className="mt-4 text-[10px] text-crypto-dim/50">
          ID: {userId.slice(0, 8)}... • v0.1.0-alpha
        </div>
      </footer>

    </div>
  );
};

export default App;