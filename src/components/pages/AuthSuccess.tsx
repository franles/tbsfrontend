import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "../common/widget/Spinner";
import { decodeToken } from "../utils/utils";
import { useUser } from "../hooks/useUser";
import { useToken } from "../hooks/useToken";

export const AuthSuccess = () => {
  const location = useLocation();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { setToken } = useToken();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setToken(token);
      const payload = decodeToken(token);
      console.log("payload", payload);
      setUser({
        auth: payload?.auth,
        nombre: payload?.nombre,
        email: payload?.email,
        avatar: payload?.avatar,
      });
      navigate("/home");
    }
  }, [location.search, navigate, setToken, setUser]);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <Spinner text="Iniciando sesión..." size={40} />
    </section>
  );
};
