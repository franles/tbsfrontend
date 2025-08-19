import { api, API_URL } from "../config/axios";
import type {
  CreateServiceTripData,
  GetServicesResponse,
} from "../types/types";

const API_ENDPOINT = `${API_URL}/services`;

export async function getServices(): Promise<GetServicesResponse> {
  try {
    const { data } = await api.get<GetServicesResponse>(`${API_ENDPOINT}`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return { servicios: [] };
}

export async function createServiceForTrip(serviceData: CreateServiceTripData) {
  try {
    const { data } = await api.post(`${API_ENDPOINT}`, serviceData);
    return data;
  } catch (error) {
    console.log(error);
  }
}
