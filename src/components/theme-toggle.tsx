import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { useThemeMode } from '@/hooks/theme-mode';

/** 순수 도형으로 그린 해/달 글리프. 채워진 원+광선=라이트, 고리만=다크. */
function ModeGlyph({ scheme, color }: { scheme: 'light' | 'dark'; color: string }) {
  if (scheme === 'light') {
    return (
      <View style={styles.glyphBox}>
        <View style={[styles.sunCore, { backgroundColor: color }]} />
        <View style={[styles.ray, styles.rayN, { backgroundColor: color }]} />
        <View style={[styles.ray, styles.rayS, { backgroundColor: color }]} />
        <View style={[styles.ray, styles.rayW, { backgroundColor: color }]} />
        <View style={[styles.ray, styles.rayE, { backgroundColor: color }]} />
      </View>
    );
  }
  return (
    <View style={styles.glyphBox}>
      <View style={[styles.moonRing, { borderColor: color }]} />
    </View>
  );
}

export function ThemeToggle() {
  const theme = useTheme();
  const { scheme, toggle } = useThemeMode();

  return (
    <Pressable
      onPress={toggle}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={scheme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
      ]}
    >
      <ModeGlyph scheme={scheme} color={theme.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphBox: {
    width: 18,
    height: 18,
  },
  sunCore: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    left: 5,
    top: 5,
  },
  ray: {
    position: 'absolute',
    borderRadius: 1,
  },
  rayN: { width: 2, height: 4, left: 8, top: 0 },
  rayS: { width: 2, height: 4, left: 8, bottom: 0 },
  rayW: { width: 4, height: 2, left: 0, top: 8 },
  rayE: { width: 4, height: 2, right: 0, top: 8 },
  moonRing: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    left: 2,
    top: 2,
  },
});
