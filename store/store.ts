
import { create } from "zustand";
import { CombinedUser } from "../types";


interface UserState {
  user: CombinedUser | null;
  setUser: (user: CombinedUser | null) => void;
  signOutZustand: () => void;
}

export const usePersonStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  signOutZustand: () => set({ user: null }),
}));
