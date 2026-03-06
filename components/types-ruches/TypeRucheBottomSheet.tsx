import ActionSheetButton from "@/components/ui/ActionSheetButton";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { useDeleteTypeRuche } from "@/lib/hooks/useTypeRuche";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface TypeRucheBottomSheetProps {
  typeRucheId: number;
}

export default function TypeRucheBottomSheet({
  typeRucheId,
}: TypeRucheBottomSheetProps) {
  const { mutate: deleteTypeRuche } = useDeleteTypeRuche(typeRucheId);
  const { closeActiveSheet, closeAndNavigate } = useBottomSheet();

  const handleEdit = () => {
    closeAndNavigate(`/parametres/modeles-ruches/${typeRucheId}/edit`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce modèle de ruche ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Confirmer",
          style: "destructive",
          onPress: () => {
            closeActiveSheet();
            deleteTypeRuche();
          },
        },
      ]
    );
  };

  return (
    <View>
      <SafeAreaView
        className='flex flex-row items-center justify-center mt-5 gap-3'
        edges={["bottom"]}
      >
        <ActionSheetButton
          label='Modifier'
          onPress={handleEdit}
          icon='pencil-outline'
          color='orange'
        />
        <ActionSheetButton
          label='Supprimer'
          onPress={handleDelete}
          icon='trash'
          color='red'
        />
      </SafeAreaView>
    </View>
  );
}
