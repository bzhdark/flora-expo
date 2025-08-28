import React from "react";
import { View } from "react-native";

export default function ListeRuchersSkeleton() {
  return (
    <View className='flex flex-col gap-4'>
      <View className='h-10 w-full bg-gray-200 rounded-md' />
      <View className='h-10 w-full bg-gray-200 rounded-md' />
      <View className='h-10 w-full bg-gray-200 rounded-md' />
      <View className='h-10 w-full bg-gray-200 rounded-md' />
    </View>
  );
}
