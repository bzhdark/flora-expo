import HausseBulkForm from "@/components/hausses/HausseBulkForm";
import ThemedView from "@/components/ui/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function BulkHaussesScreen() {
  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Création en masse", headerBackButtonDisplayMode: "minimal" }} />
      <HausseBulkForm />
    </ThemedView>
  );
}
