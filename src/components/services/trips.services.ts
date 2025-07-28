import { api, API_URL } from "../config/axios";
import type { GetTripsResponse } from "../types/types";

export async function getTrips(
  filter: string | number | null,
  limit: number,
  page: number,
  month: number | null,
  year: number | null
): Promise<GetTripsResponse | undefined> {
  try {
    const params = new URLSearchParams();
    if (month !== null && month !== undefined) {
      params.append("month", String(month));
    }

    if (year !== null && year !== undefined) {
      params.append("year", String(year));
    }

    const { data } = await api.get<GetTripsResponse>(
      `${API_URL}/trips?filter=${filter}&limit=${limit}&page=${page}&${params.toString()}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener los viajes", error);
  }
}
