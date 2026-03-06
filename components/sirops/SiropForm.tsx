import FloatingActionButton from '@/components/ui/FloatingActionButton';
import ThemedInput from "@/components/ui/ThemedInput";
import { useCreateSirop, useUpdateSirop } from '@/lib/hooks/useSirops';
import { CreateSiropRequest, createSiropSchema } from "@/lib/schemas/siropSchemas";
import { Sirop } from '@/lib/types/siropTypes';
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Controller, useForm } from "react-hook-form";
import { Alert, Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface SiropFormProps {
  sirop?: Sirop;
}

const SiropForm = ({ sirop }: SiropFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSiropSchema),
    defaultValues: {
      nom: sirop?.nom || "",
      pourcentage_sucre: sirop?.pourcentage_sucre.toString() || "",
    }
  });
  const updateMutation = useUpdateSirop();
  const createMutation = useCreateSirop();
  const isLoading = updateMutation.isPending || createMutation.isPending;

  const pourcentageSucreValue = watch("pourcentage_sucre") as string;

  const pourcentageSucre = useMemo(() => {
    const stringValue = pourcentageSucreValue.replaceAll(",", ".");
    return Number(stringValue.replaceAll(",", ".")) || 0;
  }, [pourcentageSucreValue]);

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors)
      .map((error: any) => error?.message)
      .filter(Boolean)
      .join("\n");
    if (errorMessages) {
      Alert.alert("Erreur", errorMessages);
    }
  };




  const handleFormSubmit = (data: CreateSiropRequest) => {
    Keyboard.dismiss();
    if (sirop) {
      updateMutation.mutate({ id: sirop.id, data }, {
        onSuccess: () => {
          router.back();
        },
        onError: onError,
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.back();
        },
        onError: onError,
      });
    }
  };

  return (<>
    <KeyboardAwareScrollView className='flex-1' bottomOffset={100} showsVerticalScrollIndicator={false}>
      <View className='p-4 gap-6 pb-36'>
        {/* Nom du sirop */}
        <View>
          <Controller
            control={control}
            name='nom'
            render={({ field: { onBlur, onChange, value } }) => (
              <ThemedInput
                value={value}
                label='Nom du sirop'
                placeholder='Ex: Sirop de sucre, Sirop de miel...'
                onChangeText={onChange}
                onBlur={onBlur}
                autoCorrect={false}
                error={errors.nom?.message}
                editable={!isLoading}
              />
            )}
          />
        </View>

        {/* Pourcentage de sucre */}
        <View>
          <Controller
            control={control}
            name='pourcentage_sucre'
            render={({ field: { onBlur, onChange, value } }) => (
              <ThemedInput
                value={value?.toString() || ""}
                label='Pourcentage de sucre (%)'
                placeholder='Ex: 50'
                onChangeText={onChange}
                // onChangeText={(text) => {
                //   const numValue = parseFloat(text.replaceAll(",", ".")) || undefined;
                //   onChange(numValue);
                //   // onChange(Number(text.replaceAll(",", ".")));
                // }}
                onBlur={onBlur}
                keyboardType='numeric'
                error={errors.pourcentage_sucre?.message}
                editable={!isLoading}
              />
            )}
          />
          <View className='mt-2'>
            <View className='h-2 bg-gray-100 rounded-full overflow-hidden'>
              <View
                className='h-full bg-amber-500 rounded-full'
                style={{ width: `${Math.min(Math.max(pourcentageSucre, 0), 100)}%` }}
              />
            </View>
            <Text className='text-xs text-gray-500 mt-1 text-center'>{pourcentageSucre}% de sucre</Text>
          </View>
        </View>
      </View>

    </KeyboardAwareScrollView>
    <FloatingActionButton
      icon='checkmark'
      onPress={handleSubmit(handleFormSubmit)}
      loading={isLoading}
    />
  </>
  );
};

SiropForm.displayName = "SiropForm";

export default SiropForm;
