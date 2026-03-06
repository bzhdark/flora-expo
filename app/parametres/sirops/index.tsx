import SiropItem from "@/components/sirops/SiropItem";
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import ThemedView from "@/components/ui/ThemedView";
import { useSirops } from "@/lib/hooks/useSirops";
import { Sirop } from "@/lib/types/siropTypes";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function SiropsScreen() {
  const { data: sirops, error, refetch } = useSirops();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ThemedView>
      <FloatingActionButton icon='add' onPress={() => router.push("/parametres/sirops/create")} />
      <Stack.Screen
        options={{
          title: "Types de sirops",
          headerBackButtonDisplayMode: "minimal"
        }}
      />
      {sirops ? (
        <FlatList
          data={sirops}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          renderItem={({ item }: { item: Sirop }) => <SiropItem sirop={item} />}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListEmptyComponent={<Text>Aucun type de sirop trouvé</Text>}
        />
      ) : error ? (
        <View className='flex-1 items-center justify-center'>
          <Text>Erreur lors de la récupération des types de sirops</Text>
        </View>
      ) : (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      )}
    </ThemedView>
  );
}
