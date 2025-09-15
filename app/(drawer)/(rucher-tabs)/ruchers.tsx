import ListeRuchers from "@/components/ruchers/ListeRuchers";
import ListeRuchersSkeleton from "@/components/ruchers/ListeRuchersSkeleton";
import { useRuchers } from "@/lib/hooks/queries/useRuchers";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RuchersPage() {
  const { ruchers, isLoading, refetch } = useRuchers();

  return (
    <View className='flex-1 p-4'>
      <Tabs.Screen options={{ title: "Ruchers", headerLeft: () => <DrawerToggleButton /> }} />
      {!ruchers ? <ListeRuchersSkeleton /> : <ListeRuchers ruchers={ruchers} refreshing={isLoading} onRefresh={refetch} />}
    </View>
  );
}
