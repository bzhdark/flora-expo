import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputWrapper from "../components/ui/InputWrapper";
import InvisibleInput from "../components/ui/InvisibleInput";
import ThemedButton from "../components/ui/ThemedButton";
import { useAuthStore } from "../lib/stores/authStore";
import { API_URL } from "../lib/utils/constantes";

export default function LoginScreen() {
  const [email, setEmail] = useState("stephane.aletru@gmail.com");
  const [password, setPassword] = useState("Secret1234");
  const router = useRouter();
  const queryClient = useQueryClient();
  const setToken = useAuthStore((s) => s.setToken);

  const mutation = useMutation({
    mutationFn: async () => {
      Keyboard.dismiss();
      const device_name = Device.deviceName || Device.modelName || "Appareil inconnu";
      const response = await axios.post(`${API_URL}/auth/login`, { email, password, device_name });
      const { token } = response.data;
      return token as string;
    },
    onSuccess: (token) => {
      setToken(token);
      router.replace("/(drawer)");
    },
    onError: (error: any) => {
      console.log(error.response.data);
      Alert.alert("Erreur", error?.response?.data?.message || "Unknown error");
    },
  });

  useEffect(() => {
    SplashScreen.hide();
    queryClient.clear();
  }, [queryClient]);

  return (
    <SafeAreaView style={{ flex: 1 }} className='bg-slate-50'>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        className='flex-1'
        keyboardDismissMode='on-drag'
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ padding: 16, paddingTop: 12, gap: 20 }}
      >
        <View className='items-center gap-2 mt-2'>
          <Text className='text-sm font-medium text-emerald-700'>Bienvenue sur Flora</Text>
          <Text className='text-4xl text-slate-800 font-bold text-center'>Connexion</Text>
        </View>
        <View className='w-52 h-52 mx-auto'>
          <Image source={require("../assets/images/login.png")} style={{ width: "100%", height: "100%" }} />
        </View>
        <InputWrapper>
          <InvisibleInput
            placeholder='Adresse email'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          <View className='h-px bg-slate-200 my-2' />

          <InvisibleInput placeholder='Mot de passe' secureTextEntry value={password} onChangeText={setPassword} />
        </InputWrapper>
        <ThemedButton onPress={() => mutation.mutate()} loading={mutation.isPending} title='Connexion' />

        <ThemedButton
          disabled={mutation.isPending}
          title='Pas encore inscrit ?'
          type='neutral'
          className='mt-4'
          onPress={() => router.push("/register")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
