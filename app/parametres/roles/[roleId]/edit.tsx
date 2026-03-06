import RoleForm, { RoleFormRef } from "@/components/roles/RoleForm";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedView from "@/components/ui/ThemedView";
import { useRole, useUpdateRole } from "@/lib/hooks/useRoles";
import { useRuchers } from "@/lib/hooks/useRuchers";
import { CreateRoleRequest } from "@/lib/schemas/roleSchemas";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Alert, Text } from "react-native";

export default function EditRoleScreen() {
  const { roleId } = useLocalSearchParams<{ roleId: string }>();
  const updateMutation = useUpdateRole();
  const { ruchers } = useRuchers();
  const { data: role, isLoading: isLoadingRole } = useRole(Number(roleId));
  const formRef = useRef<RoleFormRef>(null);

  // Transformer les données du rôle en format pour le formulaire
  const defaultValues = useMemo<Partial<CreateRoleRequest> | undefined>(() => {
    if (!role) return undefined;

    return {
      nom: role.nom,
      is_proprietaire: role.is_proprietaire,
      acces_complet_ruchers: role.acces_complet_ruchers,
      peut_creer_ruches: role.peut_creer_ruches,
      peut_creer_ruchers: role.peut_creer_ruchers,
      peut_creer_taches: role.peut_creer_taches,
      peut_modifier_planning: role.peut_modifier_planning,
      peut_inviter_apiculteurs: role.peut_inviter_apiculteurs,
      peut_modifier_exploitation: role.peut_modifier_exploitation,
      peut_exporter_documents: role.peut_exporter_documents,
      peut_gerer_roles: role.peut_gerer_roles,
      ruchers:
        role.ruchers?.map((rucher) => ({
          rucher_id: rucher.id,
          peut_lire: rucher.pivot?.peut_lire ?? false,
          peut_modifier: rucher.pivot?.peut_modifier ?? false,
        })) || [],
    };
  }, [role]);

  const onSubmit = (data: CreateRoleRequest) => {
    if (!roleId) return;

    updateMutation.mutate(
      { id: Number(roleId), data },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const onError = (errors: any) => {
    const errorMessages = Object.values(errors)
      .map((error: any) => error?.message)
      .filter(Boolean)
      .join("\n");
    if (errorMessages) {
      Alert.alert("Erreur", errorMessages);
    }
  };

  if (isLoadingRole || !role) {
    return (
      <ThemedView className='flex-1'>
        <Stack.Screen options={{ title: "Modifier le rôle", headerBackButtonDisplayMode: "minimal" }} />
        <Text className='text-center text-gray-500 mt-8 p-4'>Chargement du rôle...</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Modifier le rôle", headerBackButtonDisplayMode: "minimal" }} />
      <RoleForm
        ref={formRef}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        onError={onError}
        isLoading={updateMutation.isPending}
        ruchers={ruchers}
      />
      <FloatingActionButton
        icon='checkmark'
        loading={updateMutation.isPending}
        onPress={() => formRef.current?.submit()}
      />
    </ThemedView>
  );
}
