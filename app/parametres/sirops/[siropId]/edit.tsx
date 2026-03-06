import SiropForm from "@/components/sirops/SiropForm";
import HeaderButton from "@/components/ui/HeaderButton";
import ThemedView from "@/components/ui/ThemedView";
import { useDeleteSirop, useSirop } from "@/lib/hooks/useSirops";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text } from "react-native";

export default function EditSiropScreen() {
  const { siropId } = useLocalSearchParams<{ siropId: string }>();
  const deleteMutation = useDeleteSirop(true);
  const { data: sirop, isLoading: isLoadingSirop } = useSirop(Number(siropId));

  const handleDeleteSirop = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous supprimer ce sirop ? Son nom ne sera plus affiché sur les fiches de visites des nourrissements associés.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          isPreferred: true,
          onPress: () => {
            deleteMutation.mutate(Number(siropId));
          },
        },
      ]
    );
  };

  if (isLoadingSirop || !sirop) {
    return (
      <ThemedView className='flex-1'>
        <Stack.Screen options={{ title: "Modifier le sirop", headerBackButtonDisplayMode: "minimal" }} />
        <Text className='text-center text-gray-500 mt-8 p-4'>Chargement du sirop...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen
        options={{
          title: "Modifier le sirop",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => <HeaderButton icon='trash' onPress={() => handleDeleteSirop()} />,
        }}
      />
      <SiropForm
        sirop={sirop}
      />
    </ThemedView>
  );
}
