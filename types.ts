export type PortfolioStatus = 'down' | 'flat' | 'up';
export type BehaviorStatus = 'traded' | 'held' | 'out';

export interface UserStamp {
  uid: string;
  date: string; // YYYY-MM-DD in SGT
  portfolio: PortfolioStatus;
  behavior: BehaviorStatus;
  title: string;
  blessing: string;
  timestamp: number;
}

export interface AggregateStats {
  globalCount: number;
  distribution: Record<string, number>; // combo_key -> count
}

export interface UserState {
  hasStamped: boolean;
  currentStamp?: UserStamp;
  stats: AggregateStats;
}

// Combo key format: portfolio_behavior (e.g., "down_held")
export const getComboKey = (p: PortfolioStatus, b: BehaviorStatus) => `${p}_${b}`;