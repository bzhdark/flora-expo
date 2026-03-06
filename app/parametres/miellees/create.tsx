import MielleeForm from "@/components/miellees/MielleeForm";
import ThemedView from "@/components/ui/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function CreateMielleeScreen() {
  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Nouvelle miellée", headerBackButtonDisplayMode: "minimal" }} />
      <MielleeForm />
    </ThemedView>
  );
}
