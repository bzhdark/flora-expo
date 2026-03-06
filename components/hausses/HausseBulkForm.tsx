import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedInput from "@/components/ui/ThemedInput";
import { useCreateHaussesBulk } from "@/lib/hooks/useHausses";
import { createHausseBulkSchema } from "@/lib/schemas/hausseSchemas";
import { CreateHausseBulkRequest } from "@/lib/types/hausseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { z } from "zod";

type HausseBulkFormData = z.infer<typeof createHausseBulkSchema>;

export default function HausseBulkForm() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createHausseBulkSchema),
    defaultValues: {
      prefixe: "",
      suffixe: "",
      nb_a_creer: "10",
      numero_depart: "1",
    },
  });

  const createBulkMutation = useCreateHaussesBulk();
  const isLoading = createBulkMutation.isPending;

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors)
      .map((error: any) => error?.message)
      .filter(Boolean)
      .join("\n");
    if (errorMessages) {
      Alert.alert("Erreur", errorMessages);
    }
  };

  const handleFormSubmit = (data: HausseBulkFormData) => {
    Keyboard.dismiss();
    createBulkMutation.mutate(data as CreateHausseBulkRequest, {
      onSuccess: () => {
        router.back();
      },
      onError,
    });
  };

  const prefixe = watch("prefixe");
  const suffixe = watch("suffixe");
  const nbACreer = Number(watch("nb_a_creer"));
  const numeroDepart = Number(watch("numero_depart"));

  const preview = useMemo(() => {
    if (!Number.isFinite(nbACreer) || !Number.isFinite(numeroDepart) || nbACreer <= 0) {
      return null;
    }
    const first = `${prefixe}${numeroDepart}${suffixe}`;
    const last = `${prefixe}${numeroDepart + nbACreer - 1}${suffixe}`;
    return { first, last };
  }, [prefixe, suffixe, nbACreer, numeroDepart]);

  return (
    <>
      <KeyboardAwareScrollView className='flex-1' bottomOffset={100} showsVerticalScrollIndicator={false}>
        <View className='p-4 gap-6 pb-36'>
          <View className='flex-row gap-4'>
            <View className='flex-1'>
              <Controller
                control={control}
                name='prefixe'
                render={({ field: { onBlur, onChange, value } }) => (
                  <ThemedInput
                    value={value}
                    label='Préfixe'
                    placeholder='Ex: H-'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCorrect={false}
                    error={errors.prefixe?.message}
                    editable={!isLoading}
                  />
                )}
              />
            </View>
            <View className='flex-1'>
              <Controller
                control={control}
                name='suffixe'
                render={({ field: { onBlur, onChange, value } }) => (
                  <ThemedInput
                    value={value}
                    label='Suffixe'
                    placeholder='Ex: -A'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCorrect={false}
                    error={errors.suffixe?.message}
                    editable={!isLoading}
                  />
                )}
              />
            </View>
          </View>

          <View>
            <Controller
              control={control}
              name='numero_depart'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value?.toString() || ""}
                  label='Numéro de départ'
                  placeholder='Ex: 1'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='numeric'
                  error={errors.numero_depart?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name='nb_a_creer'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value?.toString() || ""}
                  label='Nombre à créer'
                  placeholder='Ex: 10'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType='numeric'
                  error={errors.nb_a_creer?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>

          <View className='rounded-2xl bg-amber-50 border border-amber-100 p-4'>
            <Text className='text-sm font-medium text-amber-800'>Aperçu des références</Text>
            <Text className='text-xs text-amber-700 mt-1'>
              {preview ? `De ${preview.first} à ${preview.last}` : "Renseignez les valeurs pour afficher l'aperçu."}
            </Text>
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
