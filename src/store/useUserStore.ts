import { create } from "zustand";
import { User } from "../types/user";

interface UserState {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  clearUser: () => set({ user: null }),
}));
