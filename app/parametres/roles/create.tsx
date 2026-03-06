import RoleForm, { RoleFormRef } from "@/components/roles/RoleForm";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import ThemedView from "@/components/ui/ThemedView";
import { useCreateRole } from "@/lib/hooks/useRoles";
import { useRuchers } from "@/lib/hooks/useRuchers";
import { CreateRoleRequest } from "@/lib/schemas/roleSchemas";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import React, { useRef } from "react";
import { Alert } from "react-native";

export default function CreateRoleScreen() {
  const queryClient = useQueryClient();
  const createMutation = useCreateRole();
  const { ruchers } = useRuchers();
  const formRef = useRef<RoleFormRef>(null);

  const onSubmit = (data: CreateRoleRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.list() });
        router.back();
      },
    });
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

  return (
    <ThemedView className='flex-1'>
      <Stack.Screen options={{ title: "Nouveau rôle", headerBackButtonDisplayMode: "minimal" }} />
      <RoleForm
        ref={formRef}
        onSubmit={onSubmit}
        onError={onError}
        isLoading={createMutation.isPending}
        ruchers={ruchers}
      />
      <FloatingActionButton
        icon='checkmark'
        loading={createMutation.isPending}
        onPress={() => formRef.current?.submit()}
      />
    </ThemedView>
  );
}
