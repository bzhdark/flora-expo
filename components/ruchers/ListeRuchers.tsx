import { Rucher } from '@/lib/models/rucher.model';
import React from 'react';
import { RefreshControl, View } from 'react-native';
import Animated, { CurvedTransition } from 'react-native-reanimated';
import RucherItem from './RucherItem';

interface ListeRuchersProps {
  ruchers: Rucher[];
  refreshing: boolean;
  onRefresh: () => void;
}

export default function ListeRuchers({ ruchers, refreshing, onRefresh }: ListeRuchersProps) {
  return (
    <View className='rounded-lg bg-white flex-1'>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={ruchers}
        itemLayoutAnimation={CurvedTransition}
        renderItem={({ item }) => <RucherItem rucher={item} />}
      />
    </View>
  )
}