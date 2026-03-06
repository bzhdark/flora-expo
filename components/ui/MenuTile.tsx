import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuTileProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  destructive?: boolean;
}

export default function MenuTile({ title, icon, onPress, destructive = false }: MenuTileProps) {
  return (
    <TouchableOpacity className='flex-row items-center justify-between px-4 py-3 gap-3' onPress={onPress}>
      <View className='flex-row items-center gap-2'>
        {icon && <View className='bg-gray-50 rounded-full p-2 w-11 h-11 items-center justify-center'>{icon}</View>}
        <Text className={clsx("text-md text-gray-500 font-semibold", { "text-red-500": destructive })}>{title}</Text>
      </View>
      <Ionicons name='chevron-forward' size={24} color='gray' />
    </TouchableOpacity>
  );
}
