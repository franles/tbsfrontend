import { useUserStore } from "../store/userStore";

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);

  return { user, setUser, clearUser, loading, setLoading };
};
