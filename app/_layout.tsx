import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "../assets/global.css";
import { useAuthStore } from "../lib/stores/authStore";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const token = useAuthStore((s) => s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Protected guard={!token}>
          <Stack.Screen
            name='login'
            options={{ headerShown: false, animationTypeForReplace: "pop", gestureEnabled: false }}
          />
        </Stack.Protected>
        <Stack.Protected guard={!!token}>
          <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
