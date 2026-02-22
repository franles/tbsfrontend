import { create } from "zustand";

interface ExpensesStore {
    year: number;
    month: number | null;
    page: number;
    setYear: (year: number | null) => void;
    setMonth: (month: number | null) => void;
    setPage: (page: number | ((prev: number) => number)) => void;
}

export const expensesStore = create<ExpensesStore>((set) => ({
    year: 2026,
    month: null,
    page: 1,
    setYear: (year) => set({ year: year ?? 2026 }),
    setMonth: (month) => set({ month }),
    setPage: (page) =>
        set((state) => ({
            page: typeof page === "function" ? page(state.page) : page,
        })),
}));
