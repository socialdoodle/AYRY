import { PortfolioStatus, BehaviorStatus } from './types';

export const TITLES: Record<string, string> = {
  'down_traded': 'Rekt Gambler',
  'down_held': 'Bagholder Monk',
  'down_out': 'Paper Handed Saviour',
  'flat_traded': 'Fee Burner',
  'flat_held': 'Stablecoin Tourist',
  'flat_out': 'Nocoiner Spy',
  'up_traded': 'Alpha Chad',
  'up_held': 'Diamond Hand God',
  'up_out': 'Profit Taker Normie',
};

export const MOCK_DISTRIBUTION_BASE = {
  'down_traded': 150,
  'down_held': 300,
  'down_out': 50,
  'flat_traded': 80,
  'flat_held': 120,
  'flat_out': 200,
  'up_traded': 45,
  'up_held': 60,
  'up_out': 120,
};

export const AXIS_PORTFOLIO: { id: PortfolioStatus; label: string; icon: string }[] = [
  { id: 'down', label: 'Down Bad', icon: '📉' },
  { id: 'flat', label: 'Flat / Stable', icon: '⚖️' },
  { id: 'up', label: 'Up Only', icon: '🚀' },
];

export const AXIS_BEHAVIOR: { id: BehaviorStatus; label: string; icon: string }[] = [
  { id: 'traded', label: 'Active Trader', icon: '⚡' },
  { id: 'held', label: 'HODLer', icon: '💎' },
  { id: 'out', label: 'Sidelined', icon: '🏖️' },
];