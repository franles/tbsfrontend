import { api, API_URL } from "../config/axios";
import type {
  CreateTripData,
  CreateTripResponse,
  GetTripResponse,
  GetTripsResponse,
} from "../types/types";

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

export async function getTrip(id: string): Promise<GetTripResponse | null> {
  try {
    const { data } = await api.get<GetTripResponse>(`${API_URL}/trips/${id}`);

    return data;
  } catch (error) {
    console.log("Error al obtener el viaje", error);
  }

  return null;
}

export async function createTrip(
  tripData: CreateTripData
): Promise<number | null> {
  try {
    const { data } = await api.post<CreateTripResponse>(`${API_URL}/trips`, {
      tripData,
    });

    return data.trip;
  } catch (error) {
    console.error("Error al crear el viaje", error);
  }
  return null;
}
