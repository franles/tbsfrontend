import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { financeStore } from "../store/financeStore";
import type { FinanceResponse } from "../types/types";

export function useFinance() {
  const { year, month, currency } = financeStore();

  return useQuery({
    queryKey: ["finance", year, month, currency],
    queryFn: async (): Promise<FinanceResponse> => {
      const res = await axios.get("/api/finance", {
        params: {
          year: year!,         
          month: month ?? undefined, 
          currency: currency ?? undefined, 
        },
      });

      return res.data;
    },
  });
}
