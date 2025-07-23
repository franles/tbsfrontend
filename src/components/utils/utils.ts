import { jwtDecode } from "jwt-decode";
import type { User } from "../types/types";

export function isTokenNearExpiry(
  token: string,
  seconds: number = 30
): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const now = Math.floor(Date.now() / 1000);
    return exp - now < seconds;
  } catch {
    return true;
  }
}

export function decodeToken(token: string | undefined): User | null {
  if (!token) return null;
  const payloadBase64 = token?.split(".")[1];
  const fixedBase64 = payloadBase64.padEnd(
    payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
    "="
  );

  const decodedPayload = atob(fixedBase64);
  const payload = JSON.parse(decodedPayload);
  const user: User = {
    auth: true,
    nombre: payload.nombre,
    email: payload.email,
    avatar: payload.avatar,
  };

  return user;
}
