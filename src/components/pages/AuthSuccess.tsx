import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { status } from "../services/auth.services";

export const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setAccessToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) setToken(token);
    status().then((res) => {
      if (res?.user) {
        setUser(res.user);
        navigate("/PaquetesTuristicos");
      }
    });
  }, []);
  return <div>Autenticando...</div>;
};
