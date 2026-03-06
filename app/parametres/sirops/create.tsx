import SiropForm from "@/components/sirops/SiropForm";
import ThemedView from "@/components/ui/ThemedView";
import { Stack } from "expo-router";
import React from "react";

export default function CreateSiropScreen() {


  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Nouveau sirop", headerBackButtonDisplayMode: "minimal" }} />
      <SiropForm
      />

    </ThemedView>
  );
}
