import MielleeForm from "@/components/miellees/MielleeForm";
import HeaderButton from "@/components/ui/HeaderButton";
import ThemedView from "@/components/ui/ThemedView";
import { useDeleteMiellee, useMiellee } from "@/lib/hooks/useMiellees";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text } from "react-native";

export default function EditMielleeScreen() {
  const { mielleeId } = useLocalSearchParams<{ mielleeId: string }>();
  const deleteMutation = useDeleteMiellee(true);
  const { data: miellee, isLoading } = useMiellee(Number(mielleeId));

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer cette miellée ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        isPreferred: true,
        onPress: () => {
          deleteMutation.mutate(Number(mielleeId));
        },
      },
    ]);
  };

  if (isLoading || !miellee) {
    return (
      <ThemedView className='flex-1'>
        <Stack.Screen options={{ title: "Modifier la miellée", headerBackButtonDisplayMode: "minimal" }} />
        <Text className='text-center text-gray-500 mt-8 p-4'>Chargement de la miellée...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen
        options={{
          title: "Modifier la miellée",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => <HeaderButton icon='trash' onPress={handleDelete} />,
        }}
      />
      <MielleeForm miellee={miellee} />
    </ThemedView>
  );
}
