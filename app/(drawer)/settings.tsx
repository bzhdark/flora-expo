import { DrawerToggleButton } from "@react-navigation/drawer";
import { useMutation } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { Alert, Button, Text, View } from "react-native";
import { axiosClient } from "../../lib/utils/axiosClient";
import { API_URL } from "../../lib/utils/constantes";

export default function SettingsScreen() {
  const test = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.get(`${API_URL}/user`);
      console.log(res.status);
      return res.data;
    },
    onSuccess: (data) => {
      Alert.alert("success", JSON.stringify(data));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <View className='p-4 flex-1 items-center justify-center'>
      <Stack.Screen options={{ headerLeft: () => <DrawerToggleButton />, title: "Paramètres", headerShown: true }} />
      <Text>settings</Text>
      <Button title='Fetch user' onPress={() => test.mutate()} />
    </View>
  );
}
