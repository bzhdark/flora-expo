import ThemedInput from "@/components/ui/ThemedInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView keyboardShouldPersistTaps='handled' className="flex-1 p-4">
          <View className="flex flex-col gap-4">
            <Text className="text-2xl font-bold">Login</Text>
            <ThemedInput
              placeholder='Email'
              autoCapitalize='none'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              textContentType='emailAddress'

            />

            <ThemedInput
              placeholder='Password'
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => mutation.mutate()}
              disabled={mutation.isPending}
              className='bg-blue-500 active:bg-blue-600 p-4 rounded-md flex items-center justify-center flex-row'
            >
              <Text className='text-white'>Login</Text>
              {mutation.isPending && <ActivityIndicator size='small' color='#fff' className='ml-2' />}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
