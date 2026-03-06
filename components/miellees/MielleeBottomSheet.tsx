import ActionSheetButton from "@/components/ui/ActionSheetButton";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { useDeleteMiellee } from "@/lib/hooks/useMiellees";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface MielleeBottomSheetProps {
  mielleeId: number;
}

export default function MielleeBottomSheet({ mielleeId }: MielleeBottomSheetProps) {
  const { mutate: deleteMiellee } = useDeleteMiellee();
  const { closeActiveSheet, closeAndNavigate } = useBottomSheet();

  const handleEdit = () => {
    closeAndNavigate(`/parametres/miellees/${mielleeId}/edit`);
  };

  const handleDelete = () => {
    Alert.alert("Confirmation", "Voulez-vous supprimer cette miellée ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          closeActiveSheet();
          deleteMiellee(mielleeId);
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
