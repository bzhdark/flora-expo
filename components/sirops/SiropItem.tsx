import { Sirop } from "@/lib/types/siropTypes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface SiropItemProps {
  sirop: Sirop;
}

export default function SiropItem({ sirop }: SiropItemProps) {
  const handlePress = () => {
    router.push(`/parametres/sirops/${sirop.id}/edit`);
  };

  return (
    <Pressable
      className='bg-white mb-4 p-4 rounded-2xl border border-gray-100 active:bg-gray-50 flex flex-row gap-4 items-center overflow-hidden shadow-sm'
      onPress={handlePress}
      style={({ pressed }) => [
        {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        },
      ]}
    >
      {/* Icône de sirop */}
      <View className='rounded-xl flex items-center justify-center w-12 h-12 bg-amber-50 border border-amber-100'>
        <Ionicons name='water' size={24} color='#d97706' />
      </View>

      {/* Contenu principal */}
      <View className='flex-1'>
        <Text className='text-lg font-semibold text-gray-900 leading-6 mb-1' numberOfLines={2}>
          {sirop.nom}
        </Text>
        <View className='mt-2'>
          <View className='flex-row items-center justify-between mb-1.5'>
            <View className='flex-row items-center gap-1.5'>
              <Ionicons name='cube-outline' size={14} color='#6b7280' />
              <Text className='text-xs text-gray-500 font-medium'>Sucre</Text>
            </View>
            <Text className='text-xs font-semibold text-gray-700'>{sirop.pourcentage_sucre}%</Text>
          </View>
          {/* Barre de progression */}
          <View className='h-2 bg-gray-100 rounded-full overflow-hidden'>
            <View className='h-full bg-amber-500 rounded-full' style={{ width: `${sirop.pourcentage_sucre}%` }} />
          </View>
        </View>
      </View>

      {/* Icône d'édition */}
      <View className='p-3 rounded-full bg-gray-100'>
        <Ionicons name='chevron-forward' size={20} color='#6b7280' />
      </View>
    </Pressable>
  );
}
