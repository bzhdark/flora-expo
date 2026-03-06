import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Dashboard() {
  return (
    <View className='p-4'>
      <Stack.Screen
        options={{ headerLeft: () => <DrawerToggleButton />, title: "Tableau de bord", headerShown: true }}
      />

      <Text>Dashboard</Text>
      <Link href='/(drawer)/(rucher-tabs)/ruchers' asChild>
        <Pressable className='bg-blue-500 p-4 rounded-md'>
          <Text className='text-white'>Go to Ruchers</Text>
        </Pressable>
      </Link>
      <TextInput className='mt-12' placeholder='Test' selectTextOnFocus={false} />
    </View>
  );
}
