import ActionSheetButton from "@/components/ui/ActionSheetButton";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HaussesMenuBottomSheet() {
  const { closeAndNavigate } = useBottomSheet();

  const handleCreateBulk = () => {
    closeAndNavigate("/parametres/hausses/bulk");
  };

  return (
    <View>
      <SafeAreaView className='mt-5 flex flex-row flex-wrap items-center justify-center gap-3' edges={["bottom"]}>
        <ActionSheetButton
          label='Créer en masse'
          onPress={handleCreateBulk}
          icon='copy-outline'
          color='purple'
        />
      </SafeAreaView>
    </View>
  );
}
