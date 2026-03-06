import HausseForm from "@/components/hausses/HausseForm";
import HeaderButton from "@/components/ui/HeaderButton";
import ThemedView from "@/components/ui/ThemedView";
import { useDeleteHausse, useHausse } from "@/lib/hooks/useHausses";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text } from "react-native";

export default function EditHausseScreen() {
  const { hausseId } = useLocalSearchParams<{ hausseId: string }>();
  const deleteMutation = useDeleteHausse();
  const { data: hausse, isLoading } = useHausse(Number(hausseId));

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer cette hausse ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        isPreferred: true,
        onPress: () => {
          deleteMutation.mutate(Number(hausseId), {
            onSuccess: () => {
              router.back();
            },
          });
        },
      },
    ]);
  };

  if (isLoading || !hausse) {
    return (
      <ThemedView className='flex-1'>
        <Stack.Screen options={{ title: "Modifier la hausse", headerBackButtonDisplayMode: "minimal" }} />
        <Text className='text-center text-gray-500 mt-8 p-4'>Chargement de la hausse...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen
        options={{
          title: "Modifier la hausse",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => <HeaderButton icon='trash' onPress={handleDelete} />,
        }}
      />
      <HausseForm hausse={hausse} />
    </ThemedView>
  );
}
