import { ruchersService } from "@/lib/services/rucherService";
import { DeleteRucherRequest, Rucher } from "@/lib/types/rucherTypes";
import { axiosClient } from "@/lib/utils/axiosClient";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Alert } from "react-native";

export const useRuchers = () => {
  const {
    data: ruchers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.RUCHERS.all],
    queryFn: ruchersService.getRuchers,
  });
  return { ruchers, isLoading, error, refetch };
};

export const useRucher = (id: number) => {
  const {
    data: rucher,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.RUCHERS.detail(id)],
    queryFn: async () => {
      const res = await axiosClient.get<Rucher>(`/ruchers/${id}`);
      return res.data;
    },
  });
  return { rucher, isLoading, error, refetch };
};

export const useDeleteRucher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteRucherRequest) => {
      return ruchersService.deleteRucher(data);
    },
    onMutate: ({ rucherId }) => {
      const oldRuchers = queryClient.getQueryData<Rucher[]>([QUERY_KEYS.RUCHERS.all]);
      if (!oldRuchers) return;
      queryClient.setQueryData(
        [QUERY_KEYS.RUCHERS.all],
        oldRuchers.filter((rucher: Rucher) => rucher.id !== rucherId)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RUCHERS.all] });
    },
    onError: (error: AxiosError<any>) => {
      Alert.alert("Erreur", error.response?.data?.message || "Une erreur est survenue");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RUCHES.all] });
    },
  });
};
