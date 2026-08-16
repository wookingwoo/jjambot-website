import { FlatList, Pressable, StyleSheet } from 'react-native';

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

// react-native의 <Modal>은 react-native-web에서 배경이 실제 포인터 이벤트를 받지 못하는
// 문제가 있어(시각적으로는 위에 그려지지만 클릭이 아래 요소로 통과함), 3개 플랫폼에서
// 동일하게 동작하도록 화면 내부 절대 위치 오버레이로 직접 구현한다.
export function UnitPickerModal({ visible, services, selected, onSelect, onClose }: UnitPickerModalProps) {
  const theme = useTheme();
  if (!visible) return null;

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable style={[styles.sheet, { backgroundColor: theme.background }]} onPress={(e) => e.stopPropagation()}>
        <ThemedText type="smallBold" style={styles.title}>
          부대 선택
        </ThemedText>
        <FlatList
          data={services}
          keyExtractor={(item) => item}
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
                  { backgroundColor: active || pressed ? theme.backgroundSelected : 'transparent' },
                ]}
              >
                <ThemedText type={active ? 'smallBold' : 'default'}>{serviceLabel(item)}</ThemedText>
              </Pressable>
            );
          }}
        />
      </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  sheet: {
    maxHeight: '70%',
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
  },
  title: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
  },
  row: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
});
