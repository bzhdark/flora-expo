import TypeRucheForm from "@/components/types-ruches/TypeRucheForm";
import HeaderButton from "@/components/ui/HeaderButton";
import ThemedView from "@/components/ui/ThemedView";
import { useDeleteTypeRuche, useTypeRuche } from "@/lib/hooks/useTypeRuche";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Text } from "react-native";

export default function EditTypeRucheScreen() {
  const { typeRucheId } = useLocalSearchParams<{ typeRucheId: string }>();
  const { data: typeRuche, isLoading } = useTypeRuche(Number(typeRucheId));
  const deleteMutation = useDeleteTypeRuche(Number(typeRucheId));

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer ce modèle de ruche ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(undefined, {
            onSuccess: () => {
              router.back();
            },
          });
        },
      },
    ]);
  };

  if (!typeRuche || isLoading) {
    return (
      <ThemedView className='flex-1'>
        <Stack.Screen options={{ title: "Modifier le modèle de ruche", headerBackButtonDisplayMode: "minimal" }} />
        <Text className='text-center text-gray-500 mt-8 p-4'>Chargement du modèle...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen
        options={{
          title: "Modifier le modèle de ruche",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () =>
            <HeaderButton icon='trash' onPress={handleDelete} />,
        }}
      />

      <TypeRucheForm typeRuche={typeRuche} />
    </ThemedView>
  );
}
