import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { useCreateHausse, useUpdateHausse } from "@/lib/hooks/useHausses";
import { createHausseSchema } from "@/lib/schemas/hausseSchemas";
import { Hausse, HausseRequest } from "@/lib/types/hausseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { z } from "zod";

interface HausseFormProps {
  hausse?: Hausse;
}

type HausseFormData = z.infer<typeof createHausseSchema>;

export default function HausseForm({ hausse }: HausseFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createHausseSchema),
    defaultValues: {
      reference: hausse?.reference || "",
      taux_remplissage: hausse?.taux_remplissage?.toString() || "",
    },
  });

  const updateMutation = useUpdateHausse();
  const createMutation = useCreateHausse();
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

  const handleFormSubmit = (data: HausseFormData) => {
    Keyboard.dismiss();
    const payload: HausseRequest = {
      reference: data.reference,
      taux_remplissage: data.taux_remplissage,
      ruche_id: hausse?.ruche_id ?? null,
    };

    if (hausse) {
      updateMutation.mutate(
        { id: hausse.id, data: payload },
        {
          onSuccess: () => {
            router.back();
          },
          onError,
        }
      );
    } else {
      createMutation.mutate(payload, {
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
              name='reference'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value}
                  label='Référence'
                  placeholder='Ex: H-001'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize='characters'
                  error={errors.reference?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name='taux_remplissage'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value?.toString() || ""}
                  label='Taux de remplissage (%)'
                  placeholder='Ex: 75'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='numeric'
                  error={errors.taux_remplissage?.message}
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
