import { RegisterRequest, RegisterResponse } from "@/lib/types/authTypes";
import { API_URL } from "@/lib/utils/constantes";
import axios from "axios";
import * as Device from "expo-device";

export const authService = {
  register: async (data: RegisterRequest) => {
    const device_name = Device.deviceName || Device.modelName || "Mobile";
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, { ...data, device_name });
    return response.data;
  },
};
