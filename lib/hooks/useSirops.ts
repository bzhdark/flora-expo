import { siropService } from "@/lib/services/siropService";
import { Sirop, SiropRequest } from "@/lib/types/siropTypes";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from 'expo-router';
import { Alert } from "react-native";

export const useSirops = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SIROPS.list(),
    queryFn: siropService.getSirops,
  });
};

export const useSirop = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: QUERY_KEYS.SIROPS.detail(id),
    queryFn: () => siropService.getSirop(id),
    initialData: () => {
      const sirops = queryClient.getQueryData<Sirop[]>(QUERY_KEYS.SIROPS.list());
      return sirops?.find((s) => s.id === id);
    },
  });
};

export const useCreateSirop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: siropService.createSirop,
    onSuccess: (newSirop) => {
      const oldSirops = queryClient.getQueryData<Sirop[]>(QUERY_KEYS.SIROPS.list());
      if (oldSirops) {
        const nouvelleListe = [...oldSirops, newSirop];
        nouvelleListe.sort((a, b) => a.pourcentage_sucre - b.pourcentage_sucre);
        queryClient.setQueryData(QUERY_KEYS.SIROPS.list(), nouvelleListe);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SIROPS.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création du sirop");
    },
  });
};

export const useUpdateSirop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SiropRequest }) => siropService.updateSirop(id, data),
    onSuccess: (newSirop) => {
      const oldSirops = queryClient.getQueryData<Sirop[]>(QUERY_KEYS.SIROPS.list());
      if (oldSirops) {
        const nouvelleListe = oldSirops.map((s) => (s.id === newSirop.id ? { ...s, ...newSirop } : s));
        nouvelleListe.sort((a, b) => a.pourcentage_sucre - b.pourcentage_sucre);
        queryClient.setQueryData(QUERY_KEYS.SIROPS.list(), nouvelleListe);
      }
      const oldSirop = queryClient.getQueryData<Sirop>(QUERY_KEYS.SIROPS.detail(newSirop.id));
      if (oldSirop) {
        queryClient.setQueryData(QUERY_KEYS.SIROPS.detail(newSirop.id), { ...oldSirop, ...newSirop });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SIROPS.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert(
        "Erreur",
        error.response?.data?.message || "Une erreur est survenue lors de la modification du sirop"
      );
    },
  });
};

export const useDeleteSirop = (instantlyGoBack = false) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => siropService.deleteSirop(id),
    onMutate: (id) => {
      const oldSirops = queryClient.getQueryData<Sirop[]>(QUERY_KEYS.SIROPS.list());
      if (oldSirops) {
        queryClient.setQueryData(
          QUERY_KEYS.SIROPS.list(),
          oldSirops.filter((s) => s.id !== id)
        );
      }
      if (instantlyGoBack) {
        router.back();
      }
    },
    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SIROPS.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la suppression du sirop");
    },
  });
};
