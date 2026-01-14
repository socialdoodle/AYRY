// SGT is UTC+8
const SGT_OFFSET_HOURS = 8;

export const getCurrentSGT = (): Date => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * SGT_OFFSET_HOURS));
};

export const getSGTDateString = (): string => {
  const sgt = getCurrentSGT();
  // Format to YYYY-MM-DD manually to avoid locale issues
  const year = sgt.getFullYear();
  const month = String(sgt.getMonth() + 1).padStart(2, '0');
  const day = String(sgt.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getSecondsUntilSGTMidnight = (): number => {
  const nowSGT = getCurrentSGT();
  const tomorrowSGT = new Date(nowSGT);
  tomorrowSGT.setHours(24, 0, 0, 0); // Next midnight
  return Math.floor((tomorrowSGT.getTime() - nowSGT.getTime()) / 1000);
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};