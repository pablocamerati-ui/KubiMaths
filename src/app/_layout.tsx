import {
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/sora';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProgressProvider } from '@/features/progress/ProgressContext';
import { colors } from '@/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Sora_400Regular, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold });

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: colors.fondo }} />;

  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.fondo },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="mapa" />
          <Stack.Screen name="perfil" />
          <Stack.Screen name="desafio/[misionId]" options={{ gestureEnabled: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="recompensas" options={{ gestureEnabled: false, animation: 'fade' }} />
        </Stack>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
