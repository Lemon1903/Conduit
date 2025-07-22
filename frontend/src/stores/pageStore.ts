import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  feedPages: { [key: string]: number };
}

interface Action {
  getFeedPage: (feedId: string) => number;
  setFeedPage: (feedId: string, page: number) => void;
  clearPages: () => void;
}

const pageStore = create<State & Action>()(
  persist(
    (set, get) => ({
      feedPages: {},
      getFeedPage: (feedId: string) => {
        const persistedPage = get().feedPages[feedId];

        if (persistedPage) return persistedPage;

        const searchParams = new URLSearchParams(window.location.search);
        const pageParam = searchParams.get("page");
        return pageParam ? parseInt(pageParam, 10) : 1;
      },
      setFeedPage: (feedId: string, page: number) =>
        set((state) => ({
          feedPages: {
            ...state.feedPages,
            [feedId]: page,
          },
        })),
      clearPages: () => set(() => ({ feedPages: {} })),
    }),
    {
      name: "feed-pages-storage",
    },
  ),
);

export { pageStore };

