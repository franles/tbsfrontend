import { api, API_URL } from "../config/axios";
import type { FinanceResponse } from "../types/types";

const API_ENDPOINT = `${API_URL}/finance`;

export async function getSummary(
  year: number,
  month: number | null,
  currency: "ARS" | "USD" | null
) {
  try {
    const { data } = await api.get<FinanceResponse>(API_ENDPOINT, {
      params: {
        anio: year,
        mes: month ?? "",
        moneda: currency ?? "",
      },
    });

    return data.resumen_financiero ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
