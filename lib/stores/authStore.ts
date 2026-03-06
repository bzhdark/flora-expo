import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

const TOKEN_KEY = "token";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: SecureStore.getItem(TOKEN_KEY),
  setToken: (token: string) => {
    SecureStore.setItem(TOKEN_KEY, token);
    set({ token });
  },
  logout: () => {
    SecureStore.deleteItemAsync(TOKEN_KEY);
    set({ token: null });
  },
}));
