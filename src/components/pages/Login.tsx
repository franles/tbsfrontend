import { FcGoogle } from "react-icons/fc";
import { API_URL } from "../config/axios";

function Login() {
  const handleLogin = async () => {
    window.location.href = `${API_URL}/auth/callback`;
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png"
            alt="logo"
            className="h-40 mx-auto mb-10"
          />
          <h1 className="text-4xl font-bold mb-2 text-center">
            The Black Sheep
          </h1>
          <h1 className="text-xl font-normal mb-6 text-center">
            Conocemos tu destino.
          </h1>
          <form className="space-y-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full border border-red-700 rounded-lg py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-200 text-sm text-white font-medium shadow-sm"
              onClick={() => handleLogin()}
            >
              <FcGoogle size={28} />
              Iniciar sesión con Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
