import { create } from "zustand";
import { mmkv } from "../utils/mmkvClient";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: mmkv.getString("token") || null,
  setToken: (token: string) => {
    mmkv.set("token", token);
    set({ token });
  },
  logout: () => {
    mmkv.delete("token");
    set({ token: null });
  },
}));
