import ActionSheetButton from "@/components/ui/ActionSheetButton";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { useDeleteRole } from "@/lib/hooks/useRoles";
import { router } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface RoleBottomSheetProps {
  roleId: number;
}

export default function RoleBottomSheet({ roleId }: RoleBottomSheetProps) {
  const { mutate: deleteRole } = useDeleteRole();
  const { closeActiveSheet } = useBottomSheet();

  const handleEditRole = () => {
    closeActiveSheet();
    router.push(`/parametres/roles/${roleId}/edit`);
  };

  const handleDeleteRole = () => {
    Alert.alert("Confirmation", "Êtes-vous sûr de vouloir supprimer ce rôle ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          closeActiveSheet();
          deleteRole(roleId);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View>
      <SafeAreaView className='flex flex-row items-center justify-center mt-5 gap-3' edges={["bottom"]}>
        <ActionSheetButton label='Modifier' onPress={handleEditRole} icon='pencil-outline' color='orange' />
        <ActionSheetButton label='Supprimer' onPress={handleDeleteRole} icon='trash' color='red' />
      </SafeAreaView>
    </View>
  );
}
