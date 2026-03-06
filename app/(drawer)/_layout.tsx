import { useUser } from "@/lib/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default function Layout() {
  const { isFetched, isError, error } = useUser();

  useEffect(() => {
    if (isFetched) {
      SplashScreen.hide();
    }
  }, [isFetched]);

  if (!isFetched) {
    return null;
  }

  if (isError) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#258052",
        }}
      >
        <Drawer.Screen name='index' />
        <Drawer.Screen name='(rucher-tabs)' options={{ title: "Au rucher" }} />
        <Drawer.Screen
          name='parametres'
          options={{
            title: "Paramètres",
            drawerIcon: ({ color, size }) => <Ionicons name='settings' size={size} color={color} />,
          }}
        />
      </Drawer>
    </>
  );
}
