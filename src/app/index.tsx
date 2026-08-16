import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UnitPickerModal } from '@/components/unit-picker-modal';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useMeal } from '@/hooks/use-meal';
import { ALLERGEN_LABELS, extractAllergens } from '@/lib/allergens';
import { serviceLabel, type MealRow } from '@/lib/meals';

const MEAL_FIELDS: { key: keyof Pick<MealRow, 'breakfast' | 'lunch' | 'dinner' | 'special_dish'>; calKey: keyof Pick<MealRow, 'breakfast_cal' | 'lunch_cal' | 'dinner_cal' | 'special_dish_cal'>; name: string }[] = [
  { key: 'breakfast', calKey: 'breakfast_cal', name: '아침' },
  { key: 'lunch', calKey: 'lunch_cal', name: '점심' },
  { key: 'dinner', calKey: 'dinner_cal', name: '저녁' },
  { key: 'special_dish', calKey: 'special_dish_cal', name: '특식' },
];

function MealDish({ text, allergyOn }: { text: string; allergyOn: boolean }) {
  const { plain, codes } = extractAllergens(text);
  return (
    <View style={styles.dishWrap}>
      <ThemedText type="small" themeColor="textSecondary">
        {plain}
      </ThemedText>
      {allergyOn && codes.length > 0 && (
        <View style={styles.tagRow}>
          {codes.map((code) => (
            <View key={code} style={styles.tag}>
              <ThemedText type="small" style={styles.tagText}>
                {ALLERGEN_LABELS[code] ?? code}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function MealScreen() {
  const theme = useTheme();
  const meal = useMeal();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="subtitle">식단 조회</ThemedText>
          <Pressable
            onPress={() => setPickerOpen(true)}
            disabled={meal.services.length === 0}
            style={[styles.unitButton, { borderColor: theme.backgroundSelected }]}
          >
            <ThemedText type="smallBold">{meal.service ? serviceLabel(meal.service) : '불러오는 중…'}</ThemedText>
          </Pressable>
        </View>

        <View style={styles.dateRow}>
          <Pressable onPress={() => meal.shiftDay(-1)} hitSlop={12} style={styles.dateArrow}>
            <ThemedText type="title" style={styles.arrowGlyph}>
              ‹
            </ThemedText>
          </Pressable>
          <View style={styles.dateCenter}>
            <ThemedText type="smallBold">{meal.dateLabel}</ThemedText>
            {meal.dayOffset !== 0 && (
              <Pressable onPress={meal.goToday} hitSlop={8}>
                <ThemedText type="link" themeColor="textSecondary">
                  오늘로
                </ThemedText>
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => meal.shiftDay(1)} hitSlop={12} style={styles.dateArrow}>
            <ThemedText type="title" style={styles.arrowGlyph}>
              ›
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.toggleRow}>
          <ThemedText type="small">알러지 표기</ThemedText>
          <Switch value={meal.allergyOn} onValueChange={meal.toggleAllergy} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {meal.loading && (
            <View style={styles.statusBox}>
              <ActivityIndicator />
              <ThemedText type="small" themeColor="textSecondary">
                불러오는 중…
              </ThemedText>
            </View>
          )}

          {!meal.loading && meal.error && (
            <View style={[styles.statusBox, styles.errorBox]}>
              <ThemedText type="small" style={styles.errorText}>
                식단 정보를 불러오지 못했습니다.
              </ThemedText>
            </View>
          )}

          {!meal.loading && !meal.error && !meal.meal && (
            <View style={[styles.statusBox, styles.emptyBox]}>
              <ThemedText type="small" style={styles.emptyText}>
                이 부대는 이 날짜의 식단 정보가 없습니다.
              </ThemedText>
            </View>
          )}

          {!meal.loading &&
            !meal.error &&
            meal.meal &&
            MEAL_FIELDS.filter((field) => meal.meal![field.key]).map((field) => (
              <ThemedView key={field.key} type="backgroundElement" style={styles.mealCard}>
                <View style={styles.mealCardHead}>
                  <ThemedText type="smallBold">{field.name}</ThemedText>
                  {meal.meal![field.calKey] != null && (
                    <ThemedText type="small" themeColor="textSecondary">
                      {Number(meal.meal![field.calKey])}kcal
                    </ThemedText>
                  )}
                </View>
                <MealDish text={meal.meal![field.key] as string} allergyOn={meal.allergyOn} />
              </ThemedView>
            ))}

          {!meal.loading && !meal.error && meal.meal?.total_cal != null && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.totalCal}>
              총 {Number(meal.meal.total_cal)}kcal
            </ThemedText>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.three,
  },
  unitButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.four,
  },
  dateArrow: {
    paddingHorizontal: Spacing.three,
  },
  arrowGlyph: {
    fontSize: 28,
    lineHeight: 32,
  },
  dateCenter: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingVertical: Spacing.five,
  },
  errorBox: {
    backgroundColor: 'rgba(196,140,32,0.14)',
    borderRadius: Spacing.three,
  },
  errorText: {
    color: '#8a5f12',
  },
  emptyBox: {
    backgroundColor: 'rgba(59,95,207,0.09)',
    borderRadius: Spacing.three,
  },
  emptyText: {
    color: '#3b5fcf',
  },
  mealCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  mealCardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dishWrap: {
    gap: Spacing.one,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  tag: {
    backgroundColor: 'rgba(196,140,32,0.14)',
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: 1,
  },
  tagText: {
    color: '#8a5f12',
  },
  totalCal: {
    textAlign: 'right',
  },
});
