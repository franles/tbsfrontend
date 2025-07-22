import { jwtDecode } from "jwt-decode";

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
