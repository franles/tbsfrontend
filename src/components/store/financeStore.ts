import { create } from "zustand";

interface FinanceStore {
  year: number;
  month: number | null;
  currency: "ARS" | "USD" | null;
  setYear: (year: number) => void;
  setMonthFinance: (month: number | null) => void;
  setCurrency: (currency: "ARS" | "USD" | null) => void;
}

const actuallyYear = new Date().getFullYear();

export const financeStore = create<FinanceStore>((set) => ({
  year: actuallyYear,
  month: null,
  currency: null,
  setCurrency: (currency) => set({ currency }),
  setMonthFinance: (month) => set({ month }),
  setYear: (year) => set({ year }),
}));
