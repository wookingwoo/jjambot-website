import type { ThemeColor } from '@/constants/theme';

import { supabase } from './supabase';

const SERVICE_PREFIX = 'DS_TB_MNDT_DATEBYMLSVC';

export interface MealRow {
  id: number;
  service: string;
  meal_date: string;
  weekday: string | null;
  breakfast: string | null;
  breakfast_cal: number | null;
  lunch: string | null;
  lunch_cal: number | null;
  dinner: string | null;
  dinner_cal: number | null;
  special_dish: string | null;
  special_dish_cal: number | null;
  total_cal: number | null;
}

export interface MealFieldConfig {
  key: 'breakfast' | 'lunch' | 'dinner' | 'special_dish';
  calKey: 'breakfast_cal' | 'lunch_cal' | 'dinner_cal' | 'special_dish_cal';
  name: string;
  accent: ThemeColor;
  accentSoft: ThemeColor;
  /** [시작, 끝] 자정 이후 분 단위. 오늘 날짜를 볼 때 "지금" 배지를 띄우는 기준. null이면 표시 안 함. */
  band: [number, number] | null;
}

/** 화면에 표시할 끼니 순서와, 각 끼니의 색상/시간대 매핑. index.tsx와 MealCard가 공유하는 단일 소스. */
export const MEAL_FIELDS: MealFieldConfig[] = [
  { key: 'breakfast', calKey: 'breakfast_cal', name: '아침', accent: 'mealMorning', accentSoft: 'mealMorningSoft', band: [360, 540] },
  { key: 'lunch', calKey: 'lunch_cal', name: '점심', accent: 'mealNoon', accentSoft: 'mealNoonSoft', band: [660, 810] },
  { key: 'dinner', calKey: 'dinner_cal', name: '저녁', accent: 'mealEvening', accentSoft: 'mealEveningSoft', band: [1020, 1140] },
  { key: 'special_dish', calKey: 'special_dish_cal', name: '특식', accent: 'mealSpecial', accentSoft: 'mealSpecialSoft', band: null },
];

function serviceSuffix(service: string): string {
  return service.slice(SERVICE_PREFIX.length).replace(/^_/, '');
}

/** e.g. "DS_TB_MNDT_DATEBYMLSVC_5861" -> "5861부대", base service -> "병영표준" */
export function serviceLabel(service: string): string {
  const suffix = serviceSuffix(service);
  return suffix ? `${suffix}부대` : '병영표준';
}

const PAGE_SIZE = 1000;

/** Distinct services currently present in the table, sorted with the base service first.
 *  PostgREST caps each response at PAGE_SIZE rows regardless of .limit(), so this pages
 *  through the whole table via .range() to make sure every service is seen. */
export async function fetchServices(): Promise<string[]> {
  const seen = new Set<string>();
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('meals')
      .select('service')
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    for (const row of data ?? []) seen.add(row.service as string);
    if (!data || data.length < PAGE_SIZE) break;
  }

  const unique = Array.from(seen);
  unique.sort((a, b) => {
    const sa = serviceSuffix(a);
    const sb = serviceSuffix(b);
    if (sa === sb) return 0;
    if (!sa) return -1;
    if (!sb) return 1;
    return sa.localeCompare(sb, undefined, { numeric: true });
  });
  return unique;
}

export async function fetchMealFor(service: string, date: string): Promise<MealRow | null> {
  const { data, error } = await supabase
    .from('meals')
    .select(
      'id, service, meal_date, weekday, breakfast, breakfast_cal, lunch, lunch_cal, dinner, dinner_cal, special_dish, special_dish_cal, total_cal',
    )
    .eq('service', service)
    .eq('meal_date', date)
    .maybeSingle();
  if (error) throw error;
  return data;
}
