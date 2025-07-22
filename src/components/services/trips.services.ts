import { api, API_URL } from "../config/axios";
import type { GetTripsResponse } from "../types/types";

export async function getTrips(): Promise<GetTripsResponse | undefined> {
  try {
    const { data } = await api.get<GetTripsResponse>(`${API_URL}/trips`);
    return data;
  } catch (error) {
    console.error("Error al obtener los viajes", error);
  }
}
