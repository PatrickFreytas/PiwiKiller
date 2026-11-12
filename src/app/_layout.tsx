import '@/theme/global.css';

import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Inter_800ExtraBold } from '@expo-google-fonts/inter/800ExtraBold';
import { Inter_900Black } from '@expo-google-fonts/inter/900Black';
import { useFonts } from 'expo-font';
import { DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/feedback/animated-splash-overlay';
import AppTabs from '@/components/navigation/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Los nombres de las claves son los que usa `FontFamily` en `@/theme`.
  const [fontsLoaded, fontsError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  // La pantalla de carga nativa sigue visible hasta que Inter esté lista (o falle la carga).
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
