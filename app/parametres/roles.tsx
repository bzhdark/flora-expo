import RoleItem from "@/components/roles/RoleItem";
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import ThemedView from "@/components/ui/ThemedView";
import { useRoles } from "@/lib/hooks/useRoles";
import { FlashList } from "@shopify/flash-list";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function RolesScreen() {
  const { data: roles, refetch } = useRoles();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    refetch().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <ThemedView>
      <FloatingActionButton icon='add' onPress={() => router.push("/parametres/roles/create")} />
      <Stack.Screen
        options={{
          title: "Rôles",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      {roles ? (
        <FlashList
          data={roles}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          renderItem={({ item }) => <RoleItem role={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Aucun rôle trouvé</Text>}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      ) : (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator />
        </View>
      )}
    </ThemedView>
  );
}
