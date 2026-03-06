import { useBottomSheet } from '@/lib/hooks/useBottomSheet';
import { TypeRuche } from '@/lib/types/typeRucheTypes';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import TypeRucheBottomSheet, {
  TypeRucheBottomSheetProps,
} from './TypeRucheBottomSheet';

interface TypeRucheItemProps {
  typeRuche: TypeRuche;
}

export default function TypeRucheItem({ typeRuche }: TypeRucheItemProps) {
  const { openBottomSheet } = useBottomSheet();
  const isCustom = typeRuche.exploitation_id != null;
  const iconBgClass = isCustom ? 'bg-purple-50' : 'bg-amber-50';
  const iconColor = isCustom ? '#7c3aed' : '#f59e0b';

  return (
    <View
      className='bg-white mb-4 px-4 py-3 rounded-2xl border border-gray-100 active:bg-gray-50 flex flex-row items-center gap-4 overflow-hidden shadow-sm'
    >
      <View className={`h-12 w-12 rounded-2xl ${iconBgClass} items-center justify-center`}>
        <Ionicons name='cube-outline' size={22} color={iconColor} />
      </View>
      <View className='flex-1'>
        <Text className='text-base font-semibold text-gray-900'>{typeRuche.nom}</Text>
        <Text className='text-sm text-gray-500 mt-0.5'>
          {typeRuche.nb_cadres} cadres
        </Text>
      </View>
      {isCustom ? (
        <Pressable
          className='h-10 w-10 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200'
          onPress={(e) => {
            e.stopPropagation();
            openBottomSheet({
              id: "type-ruche-bottom-sheet",
              component: TypeRucheBottomSheet,
              snapPoints: [],
              props: {
                typeRucheId: typeRuche.id,
              } as TypeRucheBottomSheetProps,
            });
          }}
        >
          <Ionicons name='ellipsis-vertical' size={18} color='#6b7280' />
        </Pressable>
      ) : (
        <View className='h-10 w-10 items-center justify-center rounded-full bg-gray-100'>
          <Ionicons name='lock-closed' size={18} color='#9ca3af' />
        </View>
      )}
    </View>
  )
}
