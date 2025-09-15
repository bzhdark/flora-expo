import { Rucher } from "@/lib/models/rucher.model";
import { axiosClient } from "@/lib/utils/axiosClient";
import { QUERY_KEYS } from "@/lib/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useRuchers = () => {
    const { data: ruchers, isLoading, error, refetch } = useQuery({
        queryKey: [QUERY_KEYS.RUCHERS.all],
        queryFn: async () => {
            const res = await axiosClient.get<Rucher[]>("/ruchers")
            return res.data;
        },
    });
    return { ruchers, isLoading, error, refetch };
};

export const useRucher = (id: number) => {
    const { data: rucher, isLoading, error, refetch } = useQuery({
        queryKey: [QUERY_KEYS.RUCHERS.detail(id)],
        queryFn: async () => {
            const res = await axiosClient.get<Rucher>(`/ruchers/${id}`);
            return res.data;
        },
    });
    return { rucher, isLoading, error, refetch };
}