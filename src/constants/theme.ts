/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111318',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#5B5F68',
    textTertiary: '#9599A2',
    border: '#E3E4E9',

    tint: '#1372D6',
    tintSoft: 'rgba(19,114,214,0.10)',

    danger: '#C4384A',
    dangerSoft: 'rgba(196,56,74,0.10)',
    warning: '#8A5F12',
    warningSoft: 'rgba(196,140,32,0.14)',
    info: '#3B5FCF',
    infoSoft: 'rgba(59,95,207,0.09)',

    mealMorning: '#D9822B',
    mealMorningSoft: 'rgba(217,130,43,0.14)',
    mealNoon: '#0E9488',
    mealNoonSoft: 'rgba(14,148,136,0.12)',
    mealEvening: '#6C5CE0',
    mealEveningSoft: 'rgba(108,92,224,0.12)',
    mealSpecial: '#D6437A',
    mealSpecialSoft: 'rgba(214,67,122,0.12)',

    // 라이트 배경에서만 카드가 붕 뜬 듯한 느낌이 실제로 보인다(다크 배경에서는 그림자가 거의 안 보임).
    cardShadow: '0px 1px 2px rgba(17,19,24,0.04), 0px 10px 24px rgba(17,19,24,0.07)',
  },
  dark: {
    text: '#F5F6F8',
    background: '#000000',
    backgroundElement: '#1C1D20',
    backgroundSelected: '#2E3135',
    textSecondary: '#A7ABB4',
    textTertiary: '#6E7278',
    border: '#2A2C31',

    tint: '#5FA8FF',
    tintSoft: 'rgba(95,168,255,0.16)',

    danger: '#FF7A82',
    dangerSoft: 'rgba(255,122,130,0.16)',
    warning: '#E0A542',
    warningSoft: 'rgba(224,165,66,0.16)',
    info: '#8AA6FF',
    infoSoft: 'rgba(138,166,255,0.14)',

    mealMorning: '#E8A254',
    mealMorningSoft: 'rgba(232,162,84,0.18)',
    mealNoon: '#3DBDB0',
    mealNoonSoft: 'rgba(61,189,176,0.16)',
    mealEvening: '#9C8FFF',
    mealEveningSoft: 'rgba(156,143,255,0.18)',
    mealSpecial: '#F072A0',
    mealSpecialSoft: 'rgba(240,114,160,0.16)',

    cardShadow: '0px 1px 2px rgba(0,0,0,0.4)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
