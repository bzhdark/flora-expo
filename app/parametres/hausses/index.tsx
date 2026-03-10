import HausseItem from "@/components/hausses/HausseItem";
import HaussesMenuBottomSheet from "@/components/hausses/HaussesMenuBottomSheet";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import HeaderButton from "@/components/ui/HeaderButton";
import ThemedInput from "@/components/ui/ThemedInput";
import ThemedView from "@/components/ui/ThemedView";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { useHausses } from "@/lib/hooks/useHausses";
import { Hausse } from "@/lib/types/hausseTypes";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, Text, View } from "react-native";

export default function HaussesScreen() {
  const { data: hausses, error, refetch } = useHausses();
  const [refreshing, setRefreshing] = useState(false);
  const { openBottomSheet } = useBottomSheet();
  const [searchRef, setSearchRef] = useState("");

  const openHaussesMenu = () => {
    openBottomSheet({
      id: "hausses-menu",
      component: HaussesMenuBottomSheet,
      snapPoints: ["25%"],
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ThemedView>
      <FloatingActionButton icon='add' onPress={() => router.push("/parametres/hausses/create")} />
      <Stack.Screen
        options={{
          title: "Hausses",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => (
            <HeaderButton icon='ellipsis-vertical' onPress={openHaussesMenu} />
          ),
        }}
      />
      {hausses ? (
        <FlatList
          data={hausses}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          renderItem={({ item }: { item: Hausse }) => <HausseItem hausse={item} />}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<Text>Aucune hausse trouvée</Text>}
          onScroll={() => Keyboard.dismiss()}
          ListHeaderComponent={<ThemedInput
            className='mb-4' placeholder='Rechercher par référence'
            onChangeText={(text) => setSearchRef(text)} />}
        />
      ) : error ? (
        <View className='flex-1 items-center justify-center'>
          <Text>Erreur lors de la récupération des hausses</Text>
        </View>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      )}
    </ThemedView>
  );
}
