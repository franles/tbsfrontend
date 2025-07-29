import { create } from "zustand";

interface TripsStore {
  filter: string;
  year: number | null;
  month: number | null;
  page: number;
  setFilter: (filter: string) => void;
  setYear: (year: number | null) => void;
  setMonth: (month: number | null) => void;
  setPage: (page: number | ((prev: number) => number)) => void;
}

export const tripsStore = create<TripsStore>((set) => ({
  filter: "desc",
  year: null,
  month: null,
  page: 1,
  setFilter: (filter) => set({ filter }),
  setYear: (year) => set({ year }),
  setMonth: (month) => set({ month }),
  setPage: (page) =>
    set((state) => ({
      page: typeof page === "function" ? page(state.page) : page,
    })),
}));
