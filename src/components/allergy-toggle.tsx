import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface AllergyToggleProps {
  value: boolean;
  onToggle: () => void;
}

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 26;
const THUMB_SIZE = 22;
const THUMB_INSET = 2;
const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - THUMB_INSET;

// A hand-built toggle instead of RN's <Switch>: react-native-web's Switch keeps its
// trackColor/thumbColor pinned to their first-render value on this stack and never
// reflects later color-scheme or value changes, while plain conditional styles (used here)
// update correctly every time.
export function AllergyToggle({ value, onToggle }: AllergyToggleProps) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.label}>
        <View style={[styles.dot, { backgroundColor: value ? theme.warning : theme.textTertiary }]} />
        <ThemedText type="small">알러지 표기</ThemedText>
      </View>
      <Pressable
        onPress={onToggle}
        hitSlop={8}
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel="알러지 표기"
      >
        <View style={[styles.track, { backgroundColor: value ? theme.tint : theme.backgroundSelected }]}>
          <View style={[styles.thumb, { left: value ? THUMB_TRAVEL : THUMB_INSET }]} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 2px rgba(0,0,0,0.25)',
  },
});
