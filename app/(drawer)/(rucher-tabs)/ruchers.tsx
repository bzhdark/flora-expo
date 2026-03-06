import ListeRuchers from "@/components/ruchers/ListeRuchers";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedView from '@/components/ui/ThemedView';
import { useRuchers } from "@/lib/hooks/useRuchers";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router, Tabs } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RuchersPage() {
  const { ruchers: rawRuchers, isLoading, refetch } = useRuchers();
  const [filtre, setFiltre] = useState<string>("");

  const ruchers = useMemo(
    () => rawRuchers?.filter((rucher) => rucher.nom.toLowerCase().includes(filtre.toLowerCase())),
    [rawRuchers, filtre]
  );

  const handleAddRucher = () => {
    router.push("/ruchers/create");
  };

  return (
    <ThemedView>
      {/* <Stack.Screen
        options={{
          headerLeft: () => <DrawerToggleButton />,
          title: "Ruchers",
          headerSearchBarOptions: {
            placement: "inline",
            placeholder: "Rechercher un rucher",
            onChangeText: (e) => setFiltre(e.nativeEvent.text),
          },
        }}
      /> */}
      <Tabs.Screen
        options={{
          title: "Ruchers",
          headerLeft: () => <DrawerToggleButton />,
          headerSearchBarOptions: {
            placeholder: "Rechercher un rucher",
            onChangeText: (e) => setFiltre(e.nativeEvent.text),
            cancelButtonText: "Annuler",
          },
        }}
      />

      {!ruchers ? (
        <View className='flex-1 items-center justify-center bg-slate-50'>
          <ActivityIndicator />
        </View>
      ) : (
        <ListeRuchers ruchers={ruchers} refreshing={isLoading} onRefresh={refetch} />
      )}

      <FloatingActionButton onPress={handleAddRucher} />
    </ThemedView>
  );
}
