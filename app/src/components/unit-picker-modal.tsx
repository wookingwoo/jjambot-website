import { useEffect, useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { serviceLabel } from '@/lib/meals';

interface UnitPickerModalProps {
  visible: boolean;
  services: string[];
  selected: string | null;
  onSelect: (service: string) => void;
  onClose: () => void;
}

function RadioDot({ active, color, mutedColor }: { active: boolean; color: string; mutedColor: string }) {
  return (
    <View style={[styles.radioOuter, { borderColor: active ? color : mutedColor }]}>
      {active && <View style={[styles.radioInner, { backgroundColor: color }]} />}
    </View>
  );
}

// react-native의 <Modal>은 react-native-web에서 배경이 실제 포인터 이벤트를 받지 못하는
// 문제가 있어(시각적으로는 위에 그려지지만 클릭이 아래 요소로 통과함), 3개 플랫폼에서
// 동일하게 동작하도록 화면 내부 절대 위치 오버레이로 직접 구현한다.
export function UnitPickerModal({ visible, services, selected, onSelect, onClose }: UnitPickerModalProps) {
  const theme = useTheme();
  const [query, setQuery] = useState('');

  // 이 컴포넌트는 visible이 바뀌어도 계속 마운트된 채로 있으므로(부모가 조건부 렌더링하지 않음),
  // 닫힐 때 검색어를 지워 다음에 열었을 때 항상 전체 목록에서 시작하게 한다.
  useEffect(() => {
    if (!visible) setQuery('');
  }, [visible]);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return services;
    return services.filter((item) => serviceLabel(item).includes(q));
  }, [services, query]);

  if (!visible) return null;

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Animated.View entering={FadeInDown.duration(240)}>
          <Pressable
            style={[styles.sheet, { backgroundColor: theme.background }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.handle, { backgroundColor: theme.backgroundSelected }]} />
            <ThemedText type="smallBold" style={styles.title}>
              부대 선택
            </ThemedText>

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="부대 번호로 검색"
              placeholderTextColor={theme.textTertiary}
              style={[
                styles.search,
                { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.border },
              ]}
              autoCorrect={false}
              autoCapitalize="none"
            />

            {filtered.length === 0 ? (
              <View style={styles.emptyResult}>
                <ThemedText type="small" themeColor="textSecondary">
                  검색 결과가 없습니다
                </ThemedText>
              </View>
            ) : (
              <FlatList
                data={filtered}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => {
                  const active = item === selected;
                  return (
                    <Pressable
                      onPress={() => {
                        onSelect(item);
                        onClose();
                      }}
                      style={({ pressed }) => [
                        styles.row,
                        { backgroundColor: active ? theme.tintSoft : pressed ? theme.backgroundElement : 'transparent' },
                      ]}
                    >
                      <ThemedText type={active ? 'smallBold' : 'default'}>{serviceLabel(item)}</ThemedText>
                      <RadioDot active={active} color={theme.tint} mutedColor={theme.border} />
                    </Pressable>
                  );
                }}
              />
            )}
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  sheet: {
    maxHeight: '75%',
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 999,
    marginBottom: Spacing.three,
  },
  title: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  search: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 15,
  },
  emptyResult: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
