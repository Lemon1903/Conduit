import type { IUser } from "@/types";
import { create } from "zustand";

interface State {
  user: IUser | null;
  isAuthInitialized: boolean;
}

interface Action {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  setIsAuthInitialized: (isInitialized: boolean) => void;
}

const userStore = create<State & Action>((set) => ({
  user: null,
  isAuthInitialized: false,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
  setIsAuthInitialized: (isAuthInitialized) => set(() => ({ isAuthInitialized })),
}));

export { userStore };

