import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { useCreateTypeRuche, useUpdateTypeRuche } from "@/lib/hooks/useTypeRuche";
import { createTypeRucheSchema } from "@/lib/schemas/typeRucheSchemas";
import { TypeRuche, TypeRucheRequest } from "@/lib/types/typeRucheTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface TypeRucheFormProps {
  typeRuche?: TypeRuche;
}

export default function TypeRucheForm({
  typeRuche,
}: TypeRucheFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTypeRucheSchema),
    defaultValues: {
      nom: typeRuche?.nom || "",
      nb_cadres: typeRuche?.nb_cadres?.toString() || "",
    },
  });

  const updateMutation = useUpdateTypeRuche();
  const createMutation = useCreateTypeRuche();
  const isLoading = updateMutation.isPending || createMutation.isPending;

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors)
      .map((error: any) => error?.message)
      .filter(Boolean)
      .join("\n");
    if (errorMessages) {
      Alert.alert("Erreur", errorMessages);
    }
  };

  const handleFormSubmit = (data: TypeRucheRequest) => {
    Keyboard.dismiss();
    if (typeRuche) {
      updateMutation.mutate({ id: typeRuche.id, data }, {
        onSuccess: () => {
          router.back();
        },
        onError,
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.back();
        },
        onError,
      });
    }
  };

  return (
    <>
      <KeyboardAwareScrollView className='flex-1' bottomOffset={100} showsVerticalScrollIndicator={false}>
        <View className='p-4 gap-6 pb-36'>
          <View>
            <Controller
              control={control}
              name='nom'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value}
                  label='Nom du modèle'
                  placeholder='Ex: Dadant 10 cadres'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  error={errors.nom?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name='nb_cadres'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value?.toString() || ""}
                  label='Nombre de cadres'
                  placeholder='Ex: 10'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='numeric'
                  error={errors.nb_cadres?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <FloatingActionButton
        icon='checkmark'
        onPress={handleSubmit(handleFormSubmit, onError)}
        loading={isLoading}
      />

    </>
  );
}
