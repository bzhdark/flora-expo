import { typeRucheService } from '@/lib/services/typeRucheService';
import { TypeRuche, TypeRucheRequest } from '@/lib/types/typeRucheTypes';
import { QUERY_KEYS } from '@/lib/utils/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const useTypesRuches = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TYPE_RUCHES.list(),
    queryFn: () => typeRucheService.getTypesRuches(),
  });
};

export const useTypeRuche = (id: number) => {
  const queryClient = useQueryClient();
  console.log("Fetching from useTypeRuche for ID:", id);

  return useQuery({
    queryKey: QUERY_KEYS.TYPE_RUCHES.detail(id),
    queryFn: () => typeRucheService.getTypeRuche(id),
    initialData: () => {
      const typesRuches = queryClient.getQueryData<TypeRuche[]>(QUERY_KEYS.TYPE_RUCHES.list());
      return typesRuches?.find((typeRuche) => typeRuche.id === id);
    },
  });
};

export const useCreateTypeRuche = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TypeRucheRequest) => typeRucheService.createTypeRuche(data),
    onSuccess: (newTypeRuche) => {
      const oldTypesRuches = queryClient.getQueryData<TypeRuche[]>(QUERY_KEYS.TYPE_RUCHES.list());
      if (oldTypesRuches) {
        const nouvelleListe = [...oldTypesRuches, newTypeRuche];
        nouvelleListe.sort((a, b) => a.nom.localeCompare(b.nom));
        queryClient.setQueryData(QUERY_KEYS.TYPE_RUCHES.list(), nouvelleListe);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TYPE_RUCHES.list() });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la création du modèle de ruche");
    },
  });
};

export const useUpdateTypeRuche = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TypeRucheRequest }) => typeRucheService.updateTypeRuche(id, data),
    onSuccess: (updatedTypeRuche) => {
      const oldTypesRuches = queryClient.getQueryData<TypeRuche[]>(QUERY_KEYS.TYPE_RUCHES.list());
      if (oldTypesRuches) {
        const nouvelleListe = oldTypesRuches.map((typeRuche) => typeRuche.id === updatedTypeRuche.id ? updatedTypeRuche : typeRuche);
        nouvelleListe.sort((a, b) => a.nom.localeCompare(b.nom));
        queryClient.setQueryData(QUERY_KEYS.TYPE_RUCHES.list(), nouvelleListe);
      }
      const oldTypeRuche = queryClient.getQueryData<TypeRuche>(QUERY_KEYS.TYPE_RUCHES.detail(updatedTypeRuche.id));
      if (oldTypeRuche) {
        queryClient.setQueryData(QUERY_KEYS.TYPE_RUCHES.detail(updatedTypeRuche.id), { ...oldTypeRuche, ...updatedTypeRuche });
      }
    },
    onSettled: (typeRuche) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TYPE_RUCHES.list() });
      if (typeRuche) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TYPE_RUCHES.detail(typeRuche.id) });
      }
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la modification du modèle de ruche");
    },
  });
};

export const useDeleteTypeRuche = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => typeRucheService.deleteTypeRuche(id),
    onMutate: () => {
      const oldTypesRuches = queryClient.getQueryData<TypeRuche[]>(QUERY_KEYS.TYPE_RUCHES.list());
      if (oldTypesRuches) {
        const nouvelleListe = oldTypesRuches.filter((typeRuche) => typeRuche.id !== id);
        queryClient.setQueryData(QUERY_KEYS.TYPE_RUCHES.list(), nouvelleListe);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TYPE_RUCHES.list() });
    },
    onError: (error: AxiosError<any>) => {
      console.log(error);
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue lors de la suppression du modèle de ruche");
    },
  });
};
