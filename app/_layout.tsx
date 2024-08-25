import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CustomThemeProvider } from '@/context/theme/themeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  const updateTheme = (theme: 'dark' | 'light') => {
    setTheme(theme)
  }

  return (
    <CustomThemeProvider onThemeChange={updateTheme} > 

    <ThemeProvider value={ theme==='dark'? DarkTheme: theme ==='light'? DefaultTheme:  colorScheme  === 'dark'? DarkTheme : DefaultTheme}>


      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  
    </ThemeProvider>
    </CustomThemeProvider>
  );
}
