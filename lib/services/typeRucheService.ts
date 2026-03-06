import { TypeRuche, TypeRucheRequest } from '@/lib/types/typeRucheTypes';
import { axiosClient } from '@/lib/utils/axiosClient';

export const typeRucheService = {
  getTypesRuches: async () => {
    const { data } = await axiosClient.get<{ default: TypeRuche[], custom: TypeRuche[] }>("/types-ruches");
    const types = [...data.default, ...data.custom];
    types.sort((a, b) => a.nom.localeCompare(b.nom));
    return types;
  },
  getTypeRuche: async (id: number) => {
    console.log("Fetching from getTypeRuche for ID:", id);
    const { data } = await axiosClient.get<TypeRuche>(`/types-ruches/${id}`);
    console.log("Data from getTypeRuche:", data);
    return data;
  },
  createTypeRuche: async (data: TypeRucheRequest) => {
    const response = await axiosClient.post<TypeRuche>("/types-ruches", data);
    return response.data;
  },
  updateTypeRuche: async (id: number, data: TypeRucheRequest) => {
    console.log(id);
    const response = await axiosClient.put<TypeRuche>(`/types-ruches/${id}`, data);
    return response.data;
  },
  deleteTypeRuche: async (id: number) => {
    await axiosClient.delete(`/types-ruches/${id}`);
  },
};
