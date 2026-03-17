import 'react-native-reanimated';
import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { ThemeProvider as UIThemeProvider } from '@/components/ui/theme';

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'hsl(0 0% 97.6%)',
    card: 'hsl(0 0% 100%)',
    text: 'hsl(0 0% 0%)',
    border: 'hsl(0 0% 0%)',
    primary: 'hsl(0 0% 0%)',
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'hsl(0 0% 0%)',
    card: 'hsl(0 0% 8.5%)',
    text: 'hsl(0 0% 97.6%)',
    border: 'hsl(0 0% 97.6%)',
    primary: 'hsl(0 0% 97.6%)',
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UIThemeProvider>
          <ThemeProvider value={CustomLightTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
            <StatusBar hidden={true} />
          </ThemeProvider>
        </UIThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
