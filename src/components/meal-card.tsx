import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ALLERGEN_LABELS, extractAllergens } from '@/lib/allergens';
import type { MealFieldConfig } from '@/lib/meals';

interface MealCardProps {
  field: MealFieldConfig;
  dish: string;
  cal: number | null;
  allergyOn: boolean;
  isNow: boolean;
  index: number;
}

export function MealCard({ field, dish, cal, allergyOn, isNow, index }: MealCardProps) {
  const theme = useTheme();
  const { plain, codes } = extractAllergens(dish);
  const accent = theme[field.accent];
  const accentSoft = theme[field.accentSoft];

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(360)}>
      <ThemedView type="backgroundElement" style={[styles.card, { boxShadow: theme.cardShadow }]}>
        <View style={styles.head}>
          <View style={styles.identity}>
            <View style={[styles.badge, { backgroundColor: accent }]}>
              <ThemedText type="smallBold" style={styles.badgeText}>
                {field.name[0]}
              </ThemedText>
            </View>
            <ThemedText type="smallBold">{field.name}</ThemedText>
            {isNow && (
              <View style={[styles.nowPill, { backgroundColor: accentSoft }]}>
                <ThemedText type="small" style={[styles.nowText, { color: accent }]}>
                  지금
                </ThemedText>
              </View>
            )}
          </View>
          {cal != null && (
            <View style={[styles.calPill, { backgroundColor: accentSoft }]}>
              <ThemedText type="small" style={{ color: accent }}>
                {Math.round(cal)}kcal
              </ThemedText>
            </View>
          )}
        </View>

        <ThemedText type="default" themeColor="textSecondary" style={styles.dish}>
          {plain}
        </ThemedText>

        {allergyOn && codes.length > 0 && (
          <View style={styles.tagRow}>
            {codes.map((code) => (
              <View key={code} style={[styles.tag, { backgroundColor: theme.warningSoft }]}>
                <ThemedText type="small" style={[styles.tagText, { color: theme.warning }]}>
                  {ALLERGEN_LABELS[code] ?? code}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexShrink: 1,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
  },
  nowPill: {
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  nowText: {
    fontWeight: '700',
  },
  calPill: {
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
  },
  dish: {
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: 2,
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
  },
  tagText: {
    fontWeight: '600',
  },
});
