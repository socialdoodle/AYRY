import React, { useEffect, useState } from 'react';
import { getSecondsUntilSGTMidnight, formatDuration } from '../utils/date';
import { Timer } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getSecondsUntilSGTMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getSecondsUntilSGTMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs font-mono text-crypto-dim mt-4">
      <Timer size={14} />
      <span>NEXT RITUAL IN: {formatDuration(timeLeft)} (SGT)</span>
    </div>
  );
};