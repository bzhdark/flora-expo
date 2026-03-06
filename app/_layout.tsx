import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../assets/global.css";
import { BottomSheetManager } from "../components/BottomSheetManager";
import { useAuthStore } from "../lib/stores/authStore";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function RootLayout() {
  const token = useAuthStore((s) => s.token);


  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <GestureHandlerRootView className='flex-1'>
          <QueryClientProvider client={queryClient}>
            <BottomSheetModalProvider>
              <BottomSheetManager />
              <StatusBar style='dark' />
              <Stack>
                <Stack.Protected guard={!token}>
                  <Stack.Screen
                    name='login'
                    options={{ headerShown: false, animationTypeForReplace: "pop", gestureEnabled: false }}
                  />
                  <Stack.Screen name='register' options={{ headerShown: true, presentation: "modal" }} />
                </Stack.Protected>
                <Stack.Protected guard={!!token}>
                  <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
                  <Stack.Screen name='ruchers/[rucherId]/show' />
                  <Stack.Screen name='ruchers/create' />
                  <Stack.Screen name='ruchers/rucher-location-picker' />
                  <Stack.Screen name='parametres/exploitation' />
                  {/* Roles */}
                  <Stack.Screen name='parametres/roles' />
                  <Stack.Screen name='parametres/roles/[roleId]' options={{ headerBackButtonDisplayMode: "minimal" }} />
                  <Stack.Screen name='parametres/roles/create' options={{ headerBackButtonDisplayMode: "minimal" }} />
                  <Stack.Screen
                    name='parametres/roles/[roleId]/edit'
                    options={{ headerBackButtonDisplayMode: "minimal" }}
                  />
                </Stack.Protected>
              </Stack>
            </BottomSheetModalProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
