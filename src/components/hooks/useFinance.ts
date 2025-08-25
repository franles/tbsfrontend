import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../services/finance.services";
import { financeStore } from "../store/financeStore";

export function useFinance() {
  const { year, month, currency } = financeStore();
  return useQuery({
    queryKey: ["financeSummary", year, month, currency],
    queryFn: () => getSummary(year, month, currency),
  });
}
