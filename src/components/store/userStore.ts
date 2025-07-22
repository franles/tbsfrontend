import { create } from "zustand";
import type { User } from "../types/types";

interface UserStore {
  accessToken: string | undefined;
  user: User | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string | undefined) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: undefined,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setAccessToken: (accessToken: string | undefined) => set({ accessToken }),
}));
