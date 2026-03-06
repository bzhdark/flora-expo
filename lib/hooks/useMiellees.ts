import { mielleeService } from "@/lib/services/mielleeService";
import { Miellee, MielleeRequest } from "@/lib/types/mielleeTypes";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const useMiellees = () => {
  return useQuery({
    queryKey: QUERY_KEYS.MIELLEES.list(),
    queryFn: mielleeService.getMiellees,
  });
};

export const useMiellee = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.MIELLEES.detail(id),
    queryFn: () => mielleeService.getMiellee(id),
    initialData: () => {
      const miellees = queryClient.getQueryData<Miellee[]>(QUERY_KEYS.MIELLEES.list());
      return miellees?.find((m) => m.id === id);
    },
    enabled: Number.isFinite(id) && id > 0,
  });
};

export const useCreateMiellee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mielleeService.createMiellee,
    onSuccess: (newMiellee) => {
      const oldMiellees = queryClient.getQueryData<Miellee[]>(QUERY_KEYS.MIELLEES.list());
      if (oldMiellees) {
        const nouvelleListe = [...oldMiellees, newMiellee];
        nouvelleListe.sort((a, b) => a.nom.localeCompare(b.nom));
        queryClient.setQueryData(QUERY_KEYS.MIELLEES.list(), nouvelleListe);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MIELLEES.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création de la miellée");
    },
  });
};

export const useUpdateMiellee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: MielleeRequest }) => mielleeService.updateMiellee(id, data),
    onSuccess: (newMiellee) => {
      const oldMiellees = queryClient.getQueryData<Miellee[]>(QUERY_KEYS.MIELLEES.list());
      if (oldMiellees) {
        const nouvelleListe = oldMiellees.map((m) => (m.id === newMiellee.id ? { ...m, ...newMiellee } : m));
        nouvelleListe.sort((a, b) => a.nom.localeCompare(b.nom));
        queryClient.setQueryData(QUERY_KEYS.MIELLEES.list(), nouvelleListe);
      }
      const oldMiellee = queryClient.getQueryData<Miellee>(QUERY_KEYS.MIELLEES.detail(newMiellee.id));
      if (oldMiellee) {
        queryClient.setQueryData(QUERY_KEYS.MIELLEES.detail(newMiellee.id), { ...oldMiellee, ...newMiellee });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MIELLEES.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la modification de la miellée");
    },
  });
};

export const useDeleteMiellee = (instantlyGoBack = false) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => mielleeService.deleteMiellee(id),
    onMutate: (id) => {
      const oldMiellees = queryClient.getQueryData<Miellee[]>(QUERY_KEYS.MIELLEES.list());
      if (oldMiellees) {
        queryClient.setQueryData(
          QUERY_KEYS.MIELLEES.list(),
          oldMiellees.filter((m) => m.id !== id)
        );
      }
      if (instantlyGoBack) {
        router.back();
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MIELLEES.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la suppression de la miellée");
    },
  });
};
