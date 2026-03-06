import { Rucher } from "@/lib/types/rucherTypes";
import React from "react";
import { KeyboardAvoidingView, Platform, RefreshControl, Text, View } from "react-native";
import Animated, { CurvedTransition } from "react-native-reanimated";
import RucherItem from "./RucherItem";

interface ListeRuchersProps {
  ruchers: Rucher[];
  refreshing: boolean;
  onRefresh: () => void;
}

export default function ListeRuchers({ ruchers, refreshing, onRefresh }: ListeRuchersProps) {
  return (
    <KeyboardAvoidingView className='flex-1 bg-slate-50' behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Animated.FlatList
        className='flex-1 pt-3'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={ruchers}
        ListEmptyComponent={() => (
          <View className='flex-1 items-center justify-center mt-4'>
            <Text className='text-slate-500'>Vous n&apos;avez pas encore créé de ruchers.</Text>
          </View>
        )}
        itemLayoutAnimation={CurvedTransition}
        renderItem={({ item }) => <RucherItem rucher={item} />}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 50 : 30,
          paddingTop: 6,
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'
        contentInsetAdjustmentBehavior='automatic'
      />
    </KeyboardAvoidingView>
  );
}
