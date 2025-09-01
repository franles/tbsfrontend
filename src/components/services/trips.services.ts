import { api, API_URL } from "../config/axios";
import type {
  CreateTripData,
  CreateTripResponse,
  UpdateDeleteTripResponse,
  GetTripResponse,
  GetTripsResponse,
  UpdateTripData,
} from "../types/types";

const API_ENDPOINT = `${API_URL}/trips`;

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
      `${API_ENDPOINT}?${params.toString()}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener los viajes", error);
  }
}

export async function getTrip(id: string): Promise<GetTripResponse | null> {
  try {
    const { data } = await api.get<GetTripResponse>(`${API_ENDPOINT}/${id}`);

    return data;
  } catch (error) {
    console.log("Error al obtener el viaje", error);
  }

  return null;
}

export async function createTrip(
  tripData: CreateTripData
): Promise<string | null> {
  try {
    const { data } = await api.post<CreateTripResponse>(
      `${API_ENDPOINT}`,
      tripData
    );

    return data.trip;
  } catch (error) {
    console.error("Error al crear el viaje", error);
  }
  return null;
}

export async function updateTrip(tripId: string, dataUpdated: UpdateTripData) {
  try {
    const { data } = await api.patch<UpdateDeleteTripResponse>(
      `${API_ENDPOINT}/${tripId}`,
      dataUpdated
    );
    return data.trip;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTrip(id: string) {
  try {
    const { data } = await api.delete<UpdateDeleteTripResponse>(
      `${API_ENDPOINT}/${id}`
    );
    return data;
  } catch (error) {
    console.log("Error al eliminar el viaje", error);
  }
}
