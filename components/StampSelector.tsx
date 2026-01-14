import React, { useState } from 'react';
import { PortfolioStatus, BehaviorStatus } from '../types';
import { AXIS_PORTFOLIO, AXIS_BEHAVIOR } from '../constants';
import { CheckCircle2 } from 'lucide-react';

interface StampSelectorProps {
  onSubmit: (p: PortfolioStatus, b: BehaviorStatus) => void;
  isSubmitting: boolean;
}

export const StampSelector: React.FC<StampSelectorProps> = ({ onSubmit, isSubmitting }) => {
  const [portfolio, setPortfolio] = useState<PortfolioStatus | null>(null);
  const [behavior, setBehavior] = useState<BehaviorStatus | null>(null);

  const canSubmit = portfolio && behavior;

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      
      {/* Axis 1: Portfolio */}
      <div className="space-y-3">
        <h3 className="text-crypto-accent font-mono text-sm uppercase tracking-widest border-b border-crypto-dim/30 pb-1">
          1. Portfolio Status
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {AXIS_PORTFOLIO.map((item) => (
            <button
              key={item.id}
              onClick={() => setPortfolio(item.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200
                ${portfolio === item.id 
                  ? 'border-crypto-accent bg-crypto-accent/10 text-crypto-accent shadow-[0_0_15px_rgba(0,255,157,0.3)]' 
                  : 'border-crypto-dim/50 bg-crypto-card text-crypto-dim hover:border-crypto-dim hover:text-white'
                }
              `}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-xs font-bold uppercase">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Axis 2: Behavior */}
      <div className="space-y-3">
        <h3 className="text-crypto-rekt font-mono text-sm uppercase tracking-widest border-b border-crypto-dim/30 pb-1">
          2. Daily Behavior
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {AXIS_BEHAVIOR.map((item) => (
            <button
              key={item.id}
              onClick={() => setBehavior(item.id)}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-200
                ${behavior === item.id 
                  ? 'border-crypto-rekt bg-crypto-rekt/10 text-crypto-rekt shadow-[0_0_15px_rgba(255,0,85,0.3)]' 
                  : 'border-crypto-dim/50 bg-crypto-card text-crypto-dim hover:border-crypto-dim hover:text-white'
                }
              `}
            >
              <span className="text-2xl mb-2">{item.icon}</span>
              <span className="text-xs font-bold uppercase">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="pt-4">
        <button
          disabled={!canSubmit || isSubmitting}
          onClick={() => canSubmit && onSubmit(portfolio!, behavior!)}
          className={`
            w-full py-4 rounded-lg font-mono text-lg font-bold tracking-widest uppercase transition-all
            flex items-center justify-center gap-3
            ${canSubmit 
              ? 'bg-white text-black hover:bg-crypto-accent hover:scale-[1.02] shadow-lg cursor-pointer' 
              : 'bg-crypto-dim/20 text-crypto-dim cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <span className="animate-pulse">Forging Block...</span>
          ) : (
            <>
              <CheckCircle2 size={24} />
              Confirm Ritual
            </>
          )}
        </button>
      </div>

    </div>
  );
};