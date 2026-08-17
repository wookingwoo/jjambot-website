const KST_TZ = 'Asia/Seoul';
const WEEKDAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

/** "오늘"을 기기 타임존과 무관하게 Asia/Seoul 기준 YYYY-MM-DD로 계산 (봇의 todayInSeoul()과 동일한 기준). */
export function todayISOInSeoul(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: KST_TZ }).format(new Date());
}

/** 현재 시각을 기기 타임존과 무관하게 Asia/Seoul 기준 자정 이후 분 단위로 반환 (0~1439). */
export function nowMinutesInSeoul(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: KST_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  return hour * 60 + minute;
}

export function addDaysISO(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function weekdayOfISO(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return WEEKDAY_NAMES[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

export function labelOfISO(iso: string, weekday?: string | null): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}월 ${d}일 ${weekday ?? weekdayOfISO(iso)}요일 식단`;
}
