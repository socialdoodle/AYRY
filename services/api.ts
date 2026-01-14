import { UserState, UserStamp, PortfolioStatus, BehaviorStatus, getComboKey } from '../types';
import { getSGTDateString } from '../utils/date';
import { TITLES, MOCK_DISTRIBUTION_BASE } from '../constants';
import { GoogleGenAI } from "@google/genai";

// Allow TypeScript to recognize process.env which is polyfilled by Vite
declare const process: { env: { API_KEY: string } };

// Simulated "Database" in localStorage
const STORAGE_KEY_USER = 'ayry_user_id';
const STORAGE_KEY_STAMPS = 'ayry_stamps_v1';

// Initialize anonymous ID
export const getOrInitUserId = (): string => {
  let uid = localStorage.getItem(STORAGE_KEY_USER);
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY_USER, uid);
  }
  return uid;
};

// Mock GET /api/today
export const checkTodayStatus = async (uid: string): Promise<UserState> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const todayStr = getSGTDateString();
  const allStampsRaw = localStorage.getItem(STORAGE_KEY_STAMPS);
  const allStamps: Record<string, UserStamp[]> = allStampsRaw ? JSON.parse(allStampsRaw) : {};
  
  const userStamps = allStamps[uid] || [];
  const todayStamp = userStamps.find(s => s.date === todayStr);

  // Calculate mock aggregate stats
  // In a real app, this comes from Redis
  // Fix: Explicitly type this as a Record to allow string indexing
  const dist: Record<string, number> = { ...MOCK_DISTRIBUTION_BASE };
  let globalCount = Object.values(dist).reduce((a, b) => a + b, 0);

  // Add local stamps to mock aggregation to make it feel alive
  Object.values(allStamps).flat().forEach(s => {
      if (s.date === todayStr) {
          const k = getComboKey(s.portfolio, s.behavior);
          dist[k] = (dist[k] || 0) + 1;
          globalCount++;
      }
  });

  return {
    hasStamped: !!todayStamp,
    currentStamp: todayStamp,
    stats: {
      globalCount,
      distribution: dist
    }
  };
};

// Mock POST /api/stamp
export const submitStamp = async (
  uid: string, 
  portfolio: PortfolioStatus, 
  behavior: BehaviorStatus
): Promise<UserStamp> => {
  const todayStr = getSGTDateString();
  const comboKey = getComboKey(portfolio, behavior);
  const title = TITLES[comboKey] || "Unknown Entity";

  // GENERATE BLESSING WITH GEMINI
  let blessing = "May the candles be ever in your favor.";
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      ROLE: You are the "Chain Oracle", a cynical, memetic, slightly toxic but ultimately wise crypto entity.
      TASK: Write a short "blessing" or "curse" (max 20 words) for a user based on their daily trading status.
      
      USER STATUS:
      - Portfolio: ${portfolio.toUpperCase()}
      - Behavior: ${behavior.toUpperCase()}
      - Designation: ${title}

      GUIDELINES:
      - Use crypto twitter slang (copium, rekt, wagmi, ngmi, exit liquidity, down bad, touch grass, pvp, bags).
      - Be roasting but funny. Ideally a backhanded compliment or a harsh truth.
      - If they are 'down', mock their choices but offer 'copium'.
      - If they are 'up', warn them of the inevitable crash or call them lucky.
      - If they are 'flat' or 'out', call them boring or smart cowards.
      
      EXAMPLES:
      - "Sold the bottom? Thank you for being someone else's exit liquidity."
      - "Your diamond hands are just decision paralysis in disguise. Respect."
      - "Profits? In this economy? Clearly a glitch in the matrix."
      - "Touching grass was the highest EV play you made today. WAGMI."
      - "Stablecoin exposure is the only hedge against your own trading IQ."

      OUTPUT (String only):
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    if (response.text) {
      blessing = response.text.trim();
    }
  } catch (e) {
    console.error("Gemini blessing failed, using default", e);
  }

  const newStamp: UserStamp = {
    uid,
    date: todayStr,
    portfolio,
    behavior,
    title,
    blessing,
    timestamp: Date.now()
  };

  // Persist locally
  const allStampsRaw = localStorage.getItem(STORAGE_KEY_STAMPS);
  const allStamps: Record<string, UserStamp[]> = allStampsRaw ? JSON.parse(allStampsRaw) : {};
  
  if (!allStamps[uid]) allStamps[uid] = [];
  
  // Idempotency check
  const existing = allStamps[uid].find(s => s.date === todayStr);
  if (existing) return existing;

  allStamps[uid].push(newStamp);
  localStorage.setItem(STORAGE_KEY_STAMPS, JSON.stringify(allStamps));

  return newStamp;
};