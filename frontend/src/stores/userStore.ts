import type { BasicUser } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: BasicUser | null;
}

interface Action {
  setUser: (user: BasicUser | null) => void;
}

const userStore = create<State & Action>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: user })),
    }),
    {
      name: "logged-user",
    },
  ),
);

export { userStore };

