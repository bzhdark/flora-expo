import { haussesService } from '@/lib/services/haussesService';
import { CreateHausseBulkRequest, Hausse, HausseRequest } from '@/lib/types/hausseTypes';
import { QUERY_KEYS } from '@/lib/utils/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const useHausses = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HAUSSES.list(),
    queryFn: haussesService.getHausses,
  });
};

export const useHausse = (id: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: QUERY_KEYS.HAUSSES.detail(id),
    queryFn: () => haussesService.getHausse(id),
    initialData: () => {
      const hausses = queryClient.getQueryData<Hausse[]>(QUERY_KEYS.HAUSSES.list());
      return hausses?.find((h) => h.id === id);
    },
  });
};

export const useCreateHaussesBulk = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateHausseBulkRequest) => haussesService.createHaussesBulk(data),
    onSuccess: async (res) => {
      if (res.haussesIgnorees > 0) {
        Alert.alert("Attention", `Certaines hausses ont été ignorées car elles existent déjà: ${res.haussesIgnorees} hausses ignorées.`);
      }
      return await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HAUSSES.lists() });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création des hausses");
    },
  });
};

export const useCreateHausse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HausseRequest) => haussesService.createHausse(data),
    onSuccess: (newHausse) => {
      const oldHausses = queryClient.getQueryData<Hausse[]>(QUERY_KEYS.HAUSSES.list());
      if (oldHausses) {
        queryClient.setQueryData(QUERY_KEYS.HAUSSES.list(), [...oldHausses, newHausse]);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HAUSSES.list() });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création de la hausse");
    },
  });
};

export const useUpdateHausse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: HausseRequest }) => haussesService.updateHausse(id, data),
    onSuccess: (newHausse) => {
      const oldHausses = queryClient.getQueryData<Hausse[]>(QUERY_KEYS.HAUSSES.list());
      if (oldHausses) {
        queryClient.setQueryData(QUERY_KEYS.HAUSSES.list(), oldHausses.map((h) => h.id === newHausse.id ? { ...h, ...newHausse } : h));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HAUSSES.all });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la modification de la hausse");
    },
  });
};

export const useDeleteHausse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => haussesService.deleteHausse(id),
    onMutate: (id: number) => {
      const oldHausses = queryClient.getQueryData<Hausse[]>(QUERY_KEYS.HAUSSES.list());
      if (oldHausses) {
        queryClient.setQueryData(QUERY_KEYS.HAUSSES.list(), oldHausses.filter((h) => h.id !== id));
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HAUSSES.list() });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la suppression de la hausse");
    },
  });
};
