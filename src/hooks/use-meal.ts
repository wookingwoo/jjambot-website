import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';

import { addDaysISO, labelOfISO, todayISOInSeoul } from '@/lib/date';
import { fetchMealFor, fetchServices, type MealRow } from '@/lib/meals';

const STORAGE_KEY = 'jjambot-app:selected-service';

/** 부대/날짜 선택 상태와 그에 맞는 식단 조회 결과, 로딩/에러 상태를 관리하는 훅. */
export function useMeal() {
  const [services, setServices] = useState<string[]>([]);
  const [service, setServiceState] = useState<string | null>(null);
  const [dayOffset, setDayOffset] = useState(0);
  const [meal, setMeal] = useState<MealRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allergyOn, setAllergyOn] = useState(true);
  const [bootNonce, setBootNonce] = useState(0);
  const [mealNonce, setMealNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [list, stored] = await Promise.all([fetchServices(), AsyncStorage.getItem(STORAGE_KEY)]);
      if (cancelled) return;
      setServices(list);
      setServiceState(stored && list.includes(stored) ? stored : (list[0] ?? null));
    })().catch((err: unknown) => {
      if (cancelled) return;
      setError(err instanceof Error ? err.message : '식단 정보를 불러오지 못했습니다.');
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [bootNonce]);

  const requestId = useRef(0);

  useEffect(() => {
    if (!service) return;
    const id = ++requestId.current;
    setLoading(true);
    setError(null);

    const date = addDaysISO(todayISOInSeoul(), dayOffset);
    fetchMealFor(service, date)
      .then((row) => {
        if (requestId.current !== id) return;
        setMeal(row);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (requestId.current !== id) return;
        setMeal(null);
        setError(err instanceof Error ? err.message : '식단 정보를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, [service, dayOffset, mealNonce]);

  const selectService = useCallback((next: string) => {
    setServiceState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const shiftDay = useCallback((delta: number) => setDayOffset((d) => d + delta), []);
  const goToday = useCallback(() => setDayOffset(0), []);
  const toggleAllergy = useCallback(() => setAllergyOn((v) => !v), []);

  /** 부대 목록을 아직 못 받아왔으면 그것부터, 받아왔다면 현재 부대/날짜의 식단을 다시 불러온다.
   *  풀-투-리프레시와 에러 화면의 "다시 시도" 버튼이 함께 쓴다. */
  const refresh = useCallback(() => {
    if (!service) {
      setLoading(true);
      setError(null);
      setBootNonce((n) => n + 1);
      return;
    }
    setMealNonce((n) => n + 1);
  }, [service]);

  const date = addDaysISO(todayISOInSeoul(), dayOffset);
  const dateLabel = labelOfISO(date, meal?.weekday);

  return {
    services,
    service,
    selectService,
    dayOffset,
    shiftDay,
    goToday,
    meal,
    loading,
    error,
    allergyOn,
    toggleAllergy,
    dateLabel,
    refresh,
  };
}
