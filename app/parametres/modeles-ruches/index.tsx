import TypeRucheItem from '@/components/types-ruches/TypeRucheItem';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import ThemedView from '@/components/ui/ThemedView';
import { useTypesRuches } from '@/lib/hooks/useTypeRuche';
import { QUERY_KEYS } from '@/lib/utils/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';

export default function ModelesRuchesScreen() {
  const { data: typesRuches, refetch } = useTypesRuches();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setRefreshing(true);
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TYPE_RUCHES.all });
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ThemedView>
      <FloatingActionButton icon='add' onPress={() => router.push("/parametres/modeles-ruches/create")} />
      <Stack.Screen options={{ title: "Modeles de ruches", headerBackButtonDisplayMode: "minimal" }} />
      {typesRuches ? (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TypeRucheItem typeRuche={item} />}
          data={typesRuches}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          ListEmptyComponent={<Text>Aucun modèle de ruche trouvé</Text>}
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      )}
    </ThemedView>
  )
}
