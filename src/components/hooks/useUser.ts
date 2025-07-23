import { useUserStore } from "../store/userStore";

export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  return { user, setUser, clearUser };
};
