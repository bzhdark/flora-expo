import { useMutation } from "@tanstack/react-query";
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
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../lib/stores/authStore";
import { API_URL } from "../lib/utils/constantes";

export default function LoginScreen() {
  const [email, setEmail] = useState("stephane.aletru@gmail.com");
  const [password, setPassword] = useState("Secret1234");
  const router = useRouter();
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
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView keyboardShouldPersistTaps='handled' style={{ flex: 1, padding: 16 }}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            textContentType='emailAddress'
          />

          <TextInput
            style={styles.input}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 16,
    // backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
