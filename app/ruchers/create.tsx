import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, Keyboard, ScrollView, TextInput, View } from "react-native";
import { axiosClient } from "../../lib/utils/axiosClient";
import { QUERY_KEYS } from "../../lib/utils/queryKeys";

export default function CreateRucherScreen() {
  const [nom, setNom] = useState("");
  const queryClient = useQueryClient();

  const createRucher = useMutation({
    mutationFn: async () => {
      const res = await axiosClient.post("/ruchers", { nom });
      return res.data;
    },
    onMutate: () => {
      Keyboard.dismiss();
    },
    onSuccess: (data) => {
      console.log("success", data);
      router.back();
    },
    onError: (error: AxiosError<any>) => {
      console.log("error", error);
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RUCHERS.all] });
    },
  });

  return (
    <ScrollView className='flex-1 p-4' keyboardShouldPersistTaps='handled'>
      <Stack.Screen options={{ title: "Créer un rucher", headerBackButtonDisplayMode: "minimal" }} />
      <View className='flex flex-col gap-4'>
        <TextInput
          className='border border-gray-300 rounded-md p-3 bg-white text-black'
          placeholder='Nom du rucher'
          value={nom}
          onChangeText={setNom}
        />
        <Button title='Choisir emplacement' onPress={() => router.push("/ruchers/rucher-location-picker")} />
        <Button title='Créer' onPress={() => createRucher.mutate()} />
      </View>
    </ScrollView>
  );
}
