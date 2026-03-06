import { useAuthStore } from "@/lib/stores/authStore";
import { API_URL } from "@/lib/utils/constantes";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { axiosClient } from "../utils/axiosClient";

export const useAuth = () => {
  const logoutFromStore = useAuthStore((state) => state.logout);

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await axiosClient.post(`${API_URL}/auth/logout`);
    },
    onSettled: () => {
      logoutFromStore();
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert("Logout failed", error?.response?.data?.message || "Unknown error");
    },
  });

  return { logout, isLoggingOut };
};
