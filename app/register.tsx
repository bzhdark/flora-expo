import { authService } from "@/lib/services/authService";
import { useAuthStore } from "@/lib/stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Alert, Keyboard, ScrollView, Text, View } from "react-native";
import InputWrapper from "../components/ui/InputWrapper";
import InvisibleInput from "../components/ui/InvisibleInput";
import InvisibleInputDivider from "../components/ui/InvisibleInputDivider";
import ThemedButton from "../components/ui/ThemedButton";

export default function RegisterScreen() {
  const [prenom, setPrenom] = useState("Bob");
  const [email, setEmail] = useState("bob@gmail.com");
  const [password, setPassword] = useState("Secret1234");
  const [password_confirmation, setPasswordConfirmation] = useState("Secret1234");

  const setToken = useAuthStore((s) => s.setToken);

  const mutation = useMutation({
    mutationFn: async () => {
      return authService.register({
        prenom,
        email,
        password,
        password_confirmation,
      });
    },
    onSuccess: ({ token }) => {
      setToken(token);
      router.replace("/(drawer)");
    },
    onError: (error: any) => {
      console.log(error.response.data);
      Alert.alert("Erreur", error?.response?.data?.message || "Unknown error");
    },
  });

  const handleRegister = () => {
    Keyboard.dismiss();
    if (mutation.isPending) return;
    if (prenom.trim() === "" || email.trim() === "" || password.trim() === "" || password_confirmation.trim() === "") {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    if (password.trim() !== password_confirmation.trim()) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    mutation.mutate();
  };

  return (
    <ScrollView
      className='flex-1 bg-slate-50'
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='handled'
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Stack.Screen
        options={{
          title: "Inscription",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
      <View className='gap-2 mt-1'>
        <Text className='text-sm font-medium text-emerald-700'>Créer un compte</Text>
        <Text className='text-3xl font-bold text-slate-800'>Inscription</Text>
      </View>

      <InputWrapper>
        <InvisibleInput placeholder='Prénom' textContentType='givenName' value={prenom} onChangeText={setPrenom} />
        <InvisibleInputDivider />
        <InvisibleInput
          placeholder='Adresse email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          value={email}
          onChangeText={setEmail}
        />
        <InvisibleInputDivider />
        <InvisibleInput placeholder='Mot de passe' secureTextEntry value={password} onChangeText={setPassword} />
        <InvisibleInputDivider />
        <InvisibleInput
          placeholder='Confirmer le mot de passe'
          secureTextEntry
          value={password_confirmation}
          onChangeText={setPasswordConfirmation}
        />
      </InputWrapper>

      <ThemedButton title='Inscription' onPress={() => handleRegister()} loading={mutation.isPending} />
      <ThemedButton
        title='Déjà inscrit ?'
        type='neutral'
        className='mt-4'
        onPress={() => router.back()}
        disabled={mutation.isPending}
      />
    </ScrollView>
  );
}
