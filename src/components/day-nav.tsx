import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

/** 순수 border 트릭으로 그리는 화살표. 폰트별 글리프 렌더링 차이 없이 플랫폼 전반에서 동일하게 보인다. */
export function Chevron({ direction, color, size = 9 }: { direction: 'left' | 'right' | 'down'; color: string; size?: number }) {
  const rotation = direction === 'right' ? '-45deg' : direction === 'left' ? '135deg' : '45deg';
  return (
    <View
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        transform: [{ rotate: rotation }],
      }}
    />
  );
}

interface DayNavProps {
  label: string;
  isToday: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function DayNav({ label, isToday, onPrev, onNext, onToday }: DayNavProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onPrev}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="이전 날짜"
        style={({ pressed }) => [
          styles.arrowButton,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Chevron direction="left" color={theme.text} />
      </Pressable>

      <View style={styles.center}>
        <ThemedText type="default" style={styles.dateLabel}>
          {label}
        </ThemedText>
        {!isToday && (
          <Pressable onPress={onToday} hitSlop={8} accessibilityRole="button" accessibilityLabel="오늘로 이동">
            <ThemedText type="small" style={[styles.todayText, { color: theme.tint }]}>
              오늘로
            </ThemedText>
          </Pressable>
        )}
      </View>

      <Pressable
        onPress={onNext}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="다음 날짜"
        style={({ pressed }) => [
          styles.arrowButton,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Chevron direction="right" color={theme.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 2,
    minHeight: 36,
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
  },
  todayText: {
    fontWeight: '700',
  },
});
