import { useState } from 'react';
import { ActivityIndicator, Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AllergyToggle } from '@/components/allergy-toggle';
import { CalorieSummary } from '@/components/calorie-summary';
import { Chevron, DayNav } from '@/components/day-nav';
import { MealCard } from '@/components/meal-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemeToggle } from '@/components/theme-toggle';
import { UnitPickerModal } from '@/components/unit-picker-modal';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useMeal } from '@/hooks/use-meal';
import { nowMinutesInSeoul } from '@/lib/date';
import { MEAL_FIELDS, serviceLabel, type MealFieldConfig } from '@/lib/meals';

function StatusCard({
  tone,
  title,
  actionLabel,
  onAction,
}: {
  tone: 'danger' | 'neutral';
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const theme = useTheme();
  const bg = tone === 'danger' ? theme.dangerSoft : theme.backgroundElement;
  const fg = tone === 'danger' ? theme.danger : theme.textSecondary;

  return (
    <Animated.View entering={FadeIn.duration(220)} style={[styles.statusCard, { backgroundColor: bg, boxShadow: theme.cardShadow }]}>
      <ThemedText type="small" style={[styles.statusText, { color: fg }]}>
        {title}
      </ThemedText>
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: tone === 'danger' ? theme.danger : theme.tint, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <ThemedText type="smallBold" style={styles.retryText}>
            {actionLabel}
          </ThemedText>
        </Pressable>
      )}
    </Animated.View>
  );
}

export default function MealScreen() {
  const theme = useTheme();
  const meal = useMeal();
  const [pickerOpen, setPickerOpen] = useState(false);

  const hasMeal = !!meal.meal;
  const dimmed = meal.loading && hasMeal;
  const showFullLoading = meal.loading && !hasMeal;
  const showError = !meal.loading && !!meal.error;
  const showEmpty = !meal.loading && !meal.error && !hasMeal;

  const nowMin = meal.dayOffset === 0 ? nowMinutesInSeoul() : -1;
  const visibleFields = meal.meal ? MEAL_FIELDS.filter((field) => meal.meal![field.key]) : [];

  const segments = meal.meal
    ? MEAL_FIELDS.reduce<{ field: MealFieldConfig; cal: number }[]>((acc, field) => {
        const raw = meal.meal![field.calKey];
        const cal = raw != null ? Number(raw) : 0;
        if (cal > 0) acc.push({ field, cal });
        return acc;
      }, [])
    : [];
  const total = meal.meal?.total_cal != null ? Number(meal.meal.total_cal) : segments.reduce((sum, s) => sum + s.cal, 0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <ThemedText type="eyebrow" themeColor="tint">
              짬봇
            </ThemedText>
            <ThemedText type="subtitle">식단 조회</ThemedText>
          </View>
          <View style={styles.headerActions}>
            <ThemeToggle />
            <Pressable
              onPress={() => setPickerOpen(true)}
              disabled={meal.services.length === 0}
              accessibilityRole="button"
              accessibilityLabel="부대 선택"
              accessibilityHint="현재 부대를 변경합니다"
              style={({ pressed }) => [
                styles.unitButton,
                {
                  backgroundColor: theme.backgroundElement,
                  opacity: meal.services.length === 0 ? 0.5 : pressed ? 0.7 : 1,
                },
              ]}
            >
              <ThemedText type="smallBold">{meal.service ? serviceLabel(meal.service) : '불러오는 중…'}</ThemedText>
              <Chevron direction="down" color={theme.textSecondary} size={7} />
            </Pressable>
          </View>
        </View>

        <View style={styles.navBlock}>
          <DayNav
            label={meal.dateLabel}
            isToday={meal.dayOffset === 0}
            onPrev={() => meal.shiftDay(-1)}
            onNext={() => meal.shiftDay(1)}
            onToday={meal.goToday}
          />
        </View>

        <View style={styles.toggleBlock}>
          <AllergyToggle value={meal.allergyOn} onToggle={meal.toggleAllergy} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={meal.loading && hasMeal}
              onRefresh={meal.refresh}
              tintColor={theme.tint}
              colors={[theme.tint]}
            />
          }
        >
          {showFullLoading && (
            <View style={styles.statusBox}>
              <ActivityIndicator color={theme.tint} />
              <ThemedText type="small" themeColor="textSecondary">
                불러오는 중…
              </ThemedText>
            </View>
          )}

          {showError && (
            <StatusCard tone="danger" title="식단 정보를 불러오지 못했습니다." actionLabel="다시 시도" onAction={meal.refresh} />
          )}

          {showEmpty && <StatusCard tone="neutral" title="이 부대는 이 날짜의 식단 정보가 없습니다." />}

          {hasMeal && (
            <>
              {dimmed && (
                <View style={styles.inlineLoadingRow}>
                  <ActivityIndicator size="small" color={theme.tint} />
                </View>
              )}

              <View style={[styles.cardList, dimmed && styles.cardListDimmed]}>
                {visibleFields.map((field, idx) => {
                  const rawCal = meal.meal![field.calKey];
                  const cal = rawCal != null ? Number(rawCal) : null;
                  const isNow = field.band != null && nowMin >= field.band[0] && nowMin <= field.band[1];
                  return (
                    <MealCard
                      key={field.key}
                      field={field}
                      dish={meal.meal![field.key] as string}
                      cal={cal}
                      allergyOn={meal.allergyOn}
                      isNow={isNow}
                      index={idx}
                    />
                  );
                })}
              </View>

              {segments.length > 0 && <CalorieSummary segments={segments} total={total} />}
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      <UnitPickerModal
        visible={pickerOpen}
        services={meal.services}
        selected={meal.service}
        onSelect={meal.selectService}
        onClose={() => setPickerOpen(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: Spacing.three,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  unitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  navBlock: {
    marginTop: Spacing.four,
  },
  toggleBlock: {
    marginTop: Spacing.three,
  },
  content: {
    gap: Spacing.three,
    paddingVertical: Spacing.four,
  },
  statusBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.six,
  },
  statusCard: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.three,
    alignItems: 'center',
  },
  statusText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    borderRadius: 999,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  retryText: {
    color: '#ffffff',
  },
  inlineLoadingRow: {
    alignItems: 'center',
    paddingBottom: Spacing.one,
  },
  cardList: {
    gap: Spacing.three,
  },
  cardListDimmed: {
    opacity: 0.5,
  },
});
