import ActionSheetButton from "@/components/ui/ActionSheetButton";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { useDeleteHausse } from "@/lib/hooks/useHausses";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface HausseBottomSheetProps {
  hausseId: number;
}

export default function HausseBottomSheet({ hausseId }: HausseBottomSheetProps) {
  const { mutate: deleteHausse } = useDeleteHausse();
  const { closeActiveSheet, closeAndNavigate } = useBottomSheet();

  const handleEdit = () => {
    closeAndNavigate(`/parametres/hausses/${hausseId}/edit`);
  };

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer cette hausse ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          closeActiveSheet();
          deleteHausse(hausseId);
        },
      },
    ]);
  };

  return (
    <View>
      <SafeAreaView className='flex flex-row items-center justify-center mt-5 gap-3' edges={["bottom"]}>
        <ActionSheetButton label='Modifier' onPress={handleEdit} icon='pencil-outline' color='orange' />
        <ActionSheetButton label='Supprimer' onPress={handleDelete} icon='trash' color='red' />
      </SafeAreaView>
    </View>
  );
}
