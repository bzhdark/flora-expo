import { DrawerToggleButton } from "@react-navigation/drawer";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import ListeRuchersSkeleton from "../../../components/ruchers/ListeRuchersSkeleton";
import { axiosClient } from "../../../lib/utils/axiosClient";
import { QUERY_KEYS } from "../../../lib/utils/queryKeys";

export default function RuchersPage() {
  const { data: ruchers } = useQuery({
    queryKey: QUERY_KEYS.RUCHERS.all,
    queryFn: async () => {
      console.log("fetching ruchers");
      const res = await axiosClient.get(`/ruchers`);
      return res.data;
    },
  });

  console.log(ruchers);

  return (
    <View className='flex-1 p-4'>
      <Tabs.Screen options={{ title: "Ruchers", headerLeft: () => <DrawerToggleButton /> }} />
      {!ruchers ? <ListeRuchersSkeleton /> : <View>ListeRuchers</View>}
    </View>
  );
}
