/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useCustomThemeContext } from '@/context/theme/themeProvider';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // const theme = useColorScheme() ?? 'light';
  const theme = useCustomThemeContext().theme;
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
