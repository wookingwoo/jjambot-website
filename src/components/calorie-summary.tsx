import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { MealFieldConfig } from '@/lib/meals';

interface CalorieSummaryProps {
  segments: { field: MealFieldConfig; cal: number }[];
  total: number;
}

export function CalorieSummary({ segments, total }: CalorieSummaryProps) {
  const theme = useTheme();

  return (
    <Animated.View entering={FadeIn.duration(300)}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <View style={styles.headRow}>
          <ThemedText type="small" themeColor="textSecondary">
            총 섭취 칼로리
          </ThemedText>
          <ThemedText type="smallBold">{Math.round(total)}kcal</ThemedText>
        </View>
        <View style={[styles.bar, { backgroundColor: theme.backgroundSelected }]}>
          {segments.map(({ field, cal }) => (
            <View key={field.key} style={{ flex: cal, backgroundColor: theme[field.accent] }} />
          ))}
        </View>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
