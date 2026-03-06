import MielleeBottomSheet, { MielleeBottomSheetProps } from "@/components/miellees/MielleeBottomSheet";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { Miellee } from "@/lib/types/mielleeTypes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface MielleeItemProps {
  miellee: Miellee;
}

export default function MielleeItem({ miellee }: MielleeItemProps) {
  const { openBottomSheet } = useBottomSheet();

  const handlePress = () => {
    router.push(`/parametres/miellees/${miellee.id}/edit`);
  };

  return (
    <Pressable
      className='bg-white mb-4 px-4 py-3 rounded-2xl border border-gray-100 active:bg-gray-50 flex flex-row items-center gap-4 overflow-hidden shadow-sm'
      onPress={handlePress}
    >
      <View className='h-12 w-12 rounded-2xl bg-amber-50 items-center justify-center'>
        <Ionicons name='flower-outline' size={22} color='#d97706' />
      </View>
      <View className='flex-1'>
        <Text className='text-base font-semibold text-gray-900' numberOfLines={2}>
          {miellee.nom}
        </Text>
        <Text className='text-sm text-gray-500 mt-0.5'>Miellée</Text>
      </View>
      <Pressable
        className='h-10 w-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200'
        onPress={(e) => {
          e.stopPropagation();
          openBottomSheet({
            id: "miellee-bottom-sheet",
            component: MielleeBottomSheet,
            snapPoints: [],
            props: {
              mielleeId: miellee.id,
            } as MielleeBottomSheetProps,
          });
        }}
      >
        <Ionicons name='ellipsis-vertical' size={18} color='#6b7280' />
      </Pressable>
    </Pressable>
  );
}
