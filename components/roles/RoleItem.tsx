import RoleBottomSheet, { RoleBottomSheetProps } from "@/components/roles/RoleBottomSheet";
import { useBottomSheet } from "@/lib/hooks/useBottomSheet";
import { Role } from "@/lib/types/roleTypes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface RoleItemProps {
  role: Role;
}

export default function RoleItem({ role }: RoleItemProps) {
  const { openBottomSheet } = useBottomSheet();

  return (
    <Pressable
      className='bg-white mb-4 p-4 rounded-2xl border border-gray-100 active:bg-gray-50 flex flex-row gap-4 items-center overflow-hidden shadow-sm justify-between'
      onPress={() => router.push(`/parametres/roles/${role.id}`)}
    >
      <View className='flex-row items-center gap-2'>
        <Text className='text-lg font-semibold text-gray-800 leading-6 mb-1'>{role.nom}</Text>
        {role.is_proprietaire && <Ionicons name='lock-closed' size={15} color='#6b7280' />}
      </View>
      <Pressable
        className='p-3 rounded-full bg-gray-100'
        onPress={(e) => {
          e.stopPropagation();
          openBottomSheet({
            id: "role-bottom-sheet",
            component: RoleBottomSheet,
            snapPoints: [],
            props: {
              roleId: role.id,
            } as RoleBottomSheetProps,
          });
        }}
      >
        <Ionicons name='ellipsis-vertical' size={20} color='#6b7280' />
      </Pressable>
    </Pressable>
  );
}
