import { create } from "zustand";
import type { User } from "../types/types";

interface UserStore {
  accessToken: string | undefined;
  user: User | null;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | undefined) => void;
  clearUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: undefined,
  loading: true,
  setLoading: (loading) => set({ loading }),
  setUser: (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => set({ user: null }),
  setAccessToken: (accessToken: string | undefined) => {
    if (accessToken) {
      sessionStorage.setItem("token", accessToken);
      set({ accessToken });
    }
  },
}));
