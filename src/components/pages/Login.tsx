import { FcGoogle } from "react-icons/fc";
import { API_URL } from "../config/axios";
import fondoLogin from "../img/loginfondo.jpg"; // Importar la imagen desde src

function Login() {
  const handleLogin = async () => {
    window.location.href = `${API_URL}/auth/callback`;
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: `url(${fondoLogin})` }}>

        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg p-8 rounded-2xl w-full max-w-sm">
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png"
            alt="logo"
            className="h-40 mx-auto mb-10 drop-shadow"
          />

          <h1 className="text-4xl font-bold mb-2 text-white text-center drop-shadow">The Black Sheep</h1>
          <h1 className="text-xl font-normal mb-6 text-white/90 text-center drop-shadow-sm">Conocemos tu destino.</h1>

          <form className="space-y-4">
            <button type="button"
              className="flex items-center justify-center gap-3 w-full border border-red-700 rounded-xl py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-200 text-sm text-white font-medium shadow-sm backdrop-blur"
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
