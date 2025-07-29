import { api, API_URL } from "../config/axios";
import type { GetTripsResponse } from "../types/types";

export async function getTrips(
  filter: string,
  limit: number,
  page: number,
  month: number | null,
  year: number | null
): Promise<GetTripsResponse | undefined> {
  try {
    const params = new URLSearchParams();
    params.append("filter", filter);
    params.append("limit", limit.toString());
    params.append("page", page.toString());

    if (year !== null) params.append("year", year.toString());
    if (month !== null) params.append("month", month.toString());

    const { data } = await api.get<GetTripsResponse>(
      `${API_URL}/trips?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener los viajes", error);
  }
}
