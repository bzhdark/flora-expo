import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { useCreateMiellee, useUpdateMiellee } from "@/lib/hooks/useMiellees";
import { CreateMielleeRequest, createMielleeSchema } from "@/lib/schemas/mielleeSchemas";
import { Miellee } from "@/lib/types/mielleeTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface MielleeFormProps {
  miellee?: Miellee;
}

export default function MielleeForm({ miellee }: MielleeFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMielleeRequest>({
    resolver: zodResolver(createMielleeSchema),
    defaultValues: {
      nom: miellee?.nom || "",
    },
  });

  const updateMutation = useUpdateMiellee();
  const createMutation = useCreateMiellee();
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

  const handleFormSubmit = (data: CreateMielleeRequest) => {
    Keyboard.dismiss();
    if (miellee) {
      updateMutation.mutate(
        { id: miellee.id, data },
        {
          onSuccess: () => {
            router.back();
          },
          onError,
        }
      );
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
                  autoFocus
                  value={value}
                  label='Nom de la miellée'
                  placeholder='Ex: Acacia, Châtaignier...'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  error={errors.nom?.message}
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
