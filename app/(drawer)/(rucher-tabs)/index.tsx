import { DrawerToggleButton } from "@react-navigation/drawer";
import { useMutation } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Alert, Button, Text, View } from "react-native";
import { useAuthStore } from "../../../lib/stores/authStore";
import { axiosClient } from "../../../lib/utils/axiosClient";
import { API_URL } from "../../../lib/utils/constantes";

export default function Index() {
  const { logout } = useAuthStore();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosClient.post(`${API_URL}/auth/logout`);
    },
    onSettled: () => {
      logout();
    },

    onError: (error: any) => {
      console.log(error);
      Alert.alert("Logout failed", error?.response?.data?.message || "Unknown error");
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs.Screen options={{ headerLeft: () => <DrawerToggleButton tintColor='red' />, title: "Ruchers" }} />
      <Text>Dashboard</Text>
      <Button title='Logout' onPress={() => logoutMutation.mutate()} disabled={logoutMutation.isPending} />
    </View>
  );
}
