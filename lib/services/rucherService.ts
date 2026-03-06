import { CreateRucherRequest, DeleteRucherRequest, Rucher } from "@/lib/types/rucherTypes";
import { axiosClient } from "@/lib/utils/axiosClient";

export const ruchersService = {
  getRuchers: async () => {
    const res = await axiosClient.get<Rucher[]>("/ruchers");
    return res.data;
  },
  createRucher: async (data: CreateRucherRequest) => {
    const res = await axiosClient.post<Rucher>("/ruchers", data);
    return res.data;
  },
  deleteRucher: async (data: DeleteRucherRequest) => {
    const res = await axiosClient.delete(`/ruchers/${data.rucherId}`, {
      data: { garder_ruches: data.garder_ruches },
    });
    return res.data;
  },
  getRuchesByRucherId: async (rucherId: number | string) => {
    const res = await axiosClient.get<any[]>(`/ruchers/${rucherId}/ruches`);
    return res.data;
  },
} as const;
