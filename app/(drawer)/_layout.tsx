import { useQuery } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { axiosClient } from "../../lib/utils/axiosClient";

export default function Layout() {
  const { isFetched, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/user");
      console.log("User loaded", data);
      return data;
    },
  });

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
    <Drawer screenOptions={{ headerShown: false, drawerActiveTintColor: "red" }}>
      <Drawer.Screen name='index' />
      <Drawer.Screen name='(rucher-tabs)' options={{ title: "Au rucher" }} />
      <Drawer.Screen name='settings' />
    </Drawer>
  );
}
