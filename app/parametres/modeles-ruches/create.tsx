import TypeRucheForm from "@/components/types-ruches/TypeRucheForm";
import ThemedView from "@/components/ui/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function CreateTypeRucheScreen() {
  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Nouveau modèle de ruche", headerBackButtonDisplayMode: "minimal" }} />
      <TypeRucheForm />
    </ThemedView>
  );
}
