import { api, API_URL } from "../config/axios";
import type { GetAccessTokenResponse, LogOutResponse } from "../types/types";

export async function generateAccessToken(): Promise<GetAccessTokenResponse> {
  try {
    const { data } = await api.post<GetAccessTokenResponse>(
      `${API_URL}/auth/refresh`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return { accessToken: "" };
}
export async function logOut(): Promise<LogOutResponse> {
  try {
    const { data } = await api.post<LogOutResponse>(`${API_URL}/auth/logout`);
    return data;
  } catch (error) {
    console.log(error);
  }
  return { message: "" };
}
