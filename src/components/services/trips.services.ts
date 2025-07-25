import { api, API_URL } from "../config/axios";
import type { GetTripsResponse } from "../types/types";

export async function getTrips(
  filter: string | number | null,
  limit: number,
  page: number
): Promise<GetTripsResponse | undefined> {
  try {
    const { data } = await api.get<GetTripsResponse>(
      `${API_URL}/trips?filter=${filter}&limit=${limit}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener los viajes", error);
  }
}
