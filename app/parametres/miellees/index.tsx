import MielleeItem from "@/components/miellees/MielleeItem";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedView from "@/components/ui/ThemedView";
import { useMiellees } from "@/lib/hooks/useMiellees";
import { Miellee } from "@/lib/types/mielleeTypes";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MielleesScreen() {
  const { data: miellees, error, refetch } = useMiellees();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ThemedView>
      <FloatingActionButton icon='add' onPress={() => router.push("/parametres/miellees/create")} />
      <Stack.Screen options={{ title: "Miellées", headerBackButtonDisplayMode: "minimal" }} />
      {miellees ? (
        <FlatList
          data={miellees}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          renderItem={({ item }: { item: Miellee }) => <MielleeItem miellee={item} />}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<Text>Aucune miellée trouvée</Text>}
        />
      ) : error ? (
        <View className='flex-1 items-center justify-center'>
          <Text>Erreur lors de la récupération des miellées</Text>
        </View>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      )}
    </ThemedView>
  );
}
