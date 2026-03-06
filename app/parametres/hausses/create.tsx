import HausseForm from "@/components/hausses/HausseForm";
import ThemedView from "@/components/ui/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function CreateHausseScreen() {
  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Nouvelle hausse", headerBackButtonDisplayMode: "minimal" }} />
      <HausseForm />
    </ThemedView>
  );
}
