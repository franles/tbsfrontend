import { useUserStore } from "../store/userStore";

export const useToken = () => {
  const setToken = useUserStore((state) => state.setAccessToken);
  const token = useUserStore((state) => state.accessToken);

  return { setToken, token };
};
