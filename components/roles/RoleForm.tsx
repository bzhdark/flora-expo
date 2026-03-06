import ThemedInput from "@/components/ui/ThemedInput";
import { CreateRoleRequest, createRoleSchema } from "@/lib/schemas/roleSchemas";
import { Rucher } from "@/lib/types/rucherTypes";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Pressable, Switch, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

interface DroitItem {
  key: keyof CreateRoleRequest;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: string;
}

const droitsConfig: DroitItem[] = [
  {
    key: "acces_complet_ruchers",
    label: "Accès complet aux ruchers",
    icon: "map",
    category: "Accès",
  },
  {
    key: "peut_creer_ruches",
    label: "Créer des ruches",
    icon: "home",
    category: "Création",
  },
  {
    key: "peut_creer_ruchers",
    label: "Créer des ruchers",
    icon: "location",
    category: "Création",
  },
  {
    key: "peut_creer_taches",
    label: "Créer des tâches",
    icon: "checkmark-circle",
    category: "Création",
  },
  {
    key: "peut_modifier_planning",
    label: "Modifier le planning",
    icon: "calendar",
    category: "Modification",
  },
  {
    key: "peut_inviter_apiculteurs",
    label: "Inviter des apiculteurs",
    icon: "person-add",
    category: "Gestion",
  },
  {
    key: "peut_modifier_exploitation",
    label: "Modifier l'exploitation",
    icon: "business",
    category: "Modification",
  },
  {
    key: "peut_exporter_documents",
    label: "Exporter des documents",
    icon: "download",
    category: "Export",
  },
  {
    key: "peut_gerer_roles",
    label: "Gérer les rôles",
    icon: "people",
    category: "Gestion",
  },
];

const categories = ["Accès", "Création", "Modification", "Gestion", "Export"];

interface RoleFormProps {
  defaultValues?: Partial<CreateRoleRequest>;
  onSubmit: (data: CreateRoleRequest) => void;
  onError?: (errors: any) => void;
  isLoading?: boolean;
  ruchers?: Rucher[];
}

export interface RoleFormRef {
  submit: () => void;
}

const RoleForm = forwardRef<RoleFormRef, RoleFormProps>(
  ({ defaultValues, onSubmit, onError, isLoading, ruchers }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      setValue,
      reset,
      formState: { errors },
    } = useForm<CreateRoleRequest>({
      resolver: zodResolver(createRoleSchema),
      defaultValues: defaultValues || {
        nom: "",
        acces_complet_ruchers: true,
        peut_creer_ruches: true,
        peut_creer_ruchers: true,
        peut_creer_taches: true,
        peut_modifier_planning: true,
        peut_inviter_apiculteurs: true,
        peut_modifier_exploitation: true,
        peut_exporter_documents: true,
        peut_gerer_roles: true,
        ruchers: [],
      },
    });

    // Réinitialiser le formulaire quand les defaultValues changent
    useEffect(() => {
      if (defaultValues) {
        reset(defaultValues);
      }
    }, [defaultValues, reset]);

    const ruchersPermissions = watch("ruchers") || [];

    // Initialiser les permissions pour chaque rucher
    useEffect(() => {
      if (ruchers && ruchers.length > 0) {
        const currentPermissions = watch("ruchers") || [];
        const existingIds = currentPermissions.map((p) => p.rucher_id);

        // Ajouter les ruchers qui n'ont pas encore de permissions
        const newPermissions = ruchers
          .filter((r) => !existingIds.includes(r.id))
          .map((rucher) => ({
            rucher_id: rucher.id,
            peut_lire: false,
            peut_modifier: false,
          }));

        if (newPermissions.length > 0) {
          setValue("ruchers", [...currentPermissions, ...newPermissions]);
        }
      }
    }, [ruchers, setValue, watch]);

    // Exposer la fonction de soumission au parent
    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(handleFormSubmit, onError)(),
    }));

    const handleFormSubmit = (data: CreateRoleRequest) => {
      Keyboard.dismiss();
      // Filtrer les ruchers qui ont au moins une permission (lecture ou écriture)
      const ruchersWithPermissions = data.ruchers?.filter((p) => p.peut_lire || p.peut_modifier) || [];
      const submitData: CreateRoleRequest = {
        ...data,
        ruchers: ruchersWithPermissions.length > 0 ? ruchersWithPermissions : undefined,
      };
      onSubmit(submitData);
    };

    const droitsParCategorie = categories.map((category) => ({
      category,
      droits: droitsConfig.filter((droit) => droit.category === category),
    }));

    return (
      <KeyboardAwareScrollView className='flex-1' bottomOffset={100} showsVerticalScrollIndicator={false}>
        <View className='p-4 gap-6 pb-36'>
          {/* Nom du rôle */}
          <View>
            <Controller
              control={control}
              name='nom'
              render={({ field: { onBlur, onChange, value } }) => (
                <ThemedInput
                  value={value}
                  label='Nom du rôle'
                  placeholder='Ex: Apiculteur, Assistant...'
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCorrect={false}
                  error={errors.nom?.message}
                  editable={!isLoading}
                />
              )}
            />
          </View>

          {/* Permissions par catégorie */}
          {droitsParCategorie.map(({ category, droits }) => {
            if (droits.length === 0) return null;

            return (
              <View key={category} className='gap-3'>
                <Text className='text-sm font-semibold text-gray-400 uppercase tracking-wide px-1'>{category}</Text>
                <View className='gap-2'>
                  {droits.map((droit) => (
                    <Controller
                      key={droit.key}
                      control={control}
                      name={droit.key}
                      render={({ field: { onChange, value } }) => {
                        const boolValue = Boolean(value);
                        return (
                          <Pressable
                            onPress={() => !isLoading && onChange(!boolValue)}
                            disabled={isLoading}
                            className='bg-white rounded-2xl border border-gray-100 p-4 flex-row items-center gap-4 active:bg-gray-50'
                          >
                            <View
                              className={`w-12 h-12 rounded-xl items-center justify-center ${
                                boolValue ? "bg-teal-50" : "bg-gray-50"
                              }`}
                            >
                              <Ionicons name={droit.icon} size={24} color={boolValue ? "#14b8a6" : "#9ca3af"} />
                            </View>
                            <View className='flex-1'>
                              <Text
                                className={`text-base font-semibold ${boolValue ? "text-gray-900" : "text-gray-500"}`}
                              >
                                {droit.label}
                              </Text>
                            </View>
                            <Switch
                              className='mt-2'
                              value={boolValue}
                              onValueChange={onChange}
                              disabled={isLoading}
                              trackColor={{ false: "#e5e7eb", true: "#5eead4" }}
                              thumbColor={boolValue ? "#14b8a6" : "#f3f4f6"}
                              ios_backgroundColor='#e5e7eb'
                            />
                          </Pressable>
                        );
                      }}
                    />
                  ))}
                </View>
              </View>
            );
          })}

          {/* Permissions par rucher */}
          {!watch("acces_complet_ruchers") && ruchers && ruchers.length > 0 && (
            <View className='gap-3'>
              <Text className='text-sm font-semibold text-gray-400 uppercase tracking-wide px-1'>Ruchers</Text>
              <View className='gap-2'>
                {ruchers.map((rucher) => {
                  const permission = ruchersPermissions.find((p) => p.rucher_id === rucher.id) || {
                    rucher_id: rucher.id,
                    peut_lire: false,
                    peut_modifier: false,
                  };

                  const updatePermission = (field: "peut_lire" | "peut_modifier", value: boolean) => {
                    if (isLoading) return;
                    const updatedPermissions = ruchersPermissions.filter((p) => p.rucher_id !== rucher.id);
                    if (field === "peut_lire" && !value) {
                      updatedPermissions.push({
                        ...permission,
                        peut_lire: false,
                        peut_modifier: false,
                      });
                    } else if (field === "peut_modifier" && value) {
                      updatedPermissions.push({
                        ...permission,
                        peut_lire: true,
                        peut_modifier: true,
                      });
                    } else {
                      updatedPermissions.push({
                        ...permission,
                        [field]: value,
                      });
                    }
                    setValue("ruchers", updatedPermissions);
                  };

                  return (
                    <View key={rucher.id} className='bg-white rounded-2xl border border-gray-100 p-4 gap-3'>
                      <View className='flex-row items-center gap-3'>
                        <View className='w-10 h-10 rounded-xl bg-teal-50 items-center justify-center'>
                          <Ionicons name='location' size={20} color='#14b8a6' />
                        </View>
                        <View className='flex-1'>
                          <Text className='text-base font-semibold text-gray-900'>{rucher.nom}</Text>
                          <Text className='text-sm text-gray-500'>
                            {rucher.ruches_count ?? 0} {rucher.ruches_count === 1 ? "ruche" : "ruches"}
                          </Text>
                        </View>
                      </View>

                      <View className='flex-row gap-2 pt-2 border-t border-gray-100'>
                        <Pressable
                          onPress={() => updatePermission("peut_lire", !permission.peut_lire)}
                          disabled={isLoading}
                          className={`flex-1 rounded-xl border-2 p-3 items-center ${
                            permission.peut_lire ? "bg-blue-50 border-blue-300" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <Ionicons
                            name={permission.peut_lire ? "eye" : "eye-outline"}
                            size={20}
                            color={permission.peut_lire ? "#3b82f6" : "#9ca3af"}
                          />
                          <Text
                            className={`text-sm font-medium mt-1 ${
                              permission.peut_lire ? "text-blue-700" : "text-gray-500"
                            }`}
                          >
                            Lecture
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => updatePermission("peut_modifier", !permission.peut_modifier)}
                          disabled={isLoading}
                          className={`flex-1 rounded-xl border-2 p-3 items-center ${
                            permission.peut_modifier ? "bg-green-50 border-green-300" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <Ionicons
                            name={permission.peut_modifier ? "create" : "create-outline"}
                            size={20}
                            color={permission.peut_modifier ? "#10b981" : "#9ca3af"}
                          />
                          <Text
                            className={`text-sm font-medium mt-1 ${
                              permission.peut_modifier ? "text-green-700" : "text-gray-500"
                            }`}
                          >
                            Écriture
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
);

RoleForm.displayName = "RoleForm";

export default RoleForm;
