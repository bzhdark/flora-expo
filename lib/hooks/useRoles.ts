import { CreateRoleRequest } from "@/lib/schemas/roleSchemas";
import { rolesService } from "@/lib/services/rolesService";
import { Role } from "@/lib/types/roleTypes";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Alert } from "react-native";

export const useRoles = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ROLES.list(),
    queryFn: rolesService.getRoles,
  });
};

export const useRole = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    initialData: () => {
      const roles = queryClient.getQueryData<Role[]>(QUERY_KEYS.ROLES.list());
      return roles?.find((role) => role.id === id);
    },
    queryKey: QUERY_KEYS.ROLES.detail(id),
    queryFn: () => rolesService.getRole(id),
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => rolesService.createRole(data),
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.list() });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création du rôle");
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateRoleRequest }) => rolesService.updateRole(id, data),
    onSuccess: (newRole) => {
      const oldRoles = queryClient.getQueryData<Role[]>(QUERY_KEYS.ROLES.list());
      if (oldRoles) {
        queryClient.setQueryData(
          QUERY_KEYS.ROLES.list(),
          oldRoles.map((r) => (r.id === newRole.id ? { ...r, ...newRole } : r))
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.current });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la modification du rôle");
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => rolesService.deleteRole(id),
    onMutate: (id: number) => {
      const oldRoles = queryClient.getQueryData<Role[]>(QUERY_KEYS.ROLES.all);
      if (!oldRoles) return;
      queryClient.setQueryData(
        QUERY_KEYS.ROLES.all,
        oldRoles.filter((role) => role.id !== id)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.current });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROLES.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la suppression du rôle");
    },
  });
};
