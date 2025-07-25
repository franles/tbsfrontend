import { MdLogout } from "react-icons/md";
import { logOut } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { useUser } from "../hooks/useUser";

function Navbar() {
  const navigate = useNavigate();
  const { clearUser, user } = useUser();

  const handleLogOut = async () => {
    clearUser();
    sessionStorage.clear();
    await logOut();
    navigate("/login");
  };

  return (
    <nav className="w-full py-2 px-6 fixed top-0 left-0 z-50 backdrop-blur-sm bg-white/20 shadow-md flex items-center justify-between rounded-none">
      <div className="flex items-center gap-2">
        {user?.avatar ? (
          <img className="rounded-full w-10" src={user.avatar} />
        ) : (
          <AiOutlineUser size={30} color="white" />
        )}

        <span className="text-sm font-semibold text-white drop-shadow-sm capitalize">
          Hola, {user?.nombre}!
        </span>
      </div>

      <div>
        <img
          src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png"
          alt="Logo TBS"
          className="h-12 drop-shadow-md"
        />
      </div>

      <div>
        <button
          onClick={handleLogOut}
          className="flex items-center gap-1 bg-red-600/80 hover:bg-red-700/80 text-white text-sm px-4 py-2 rounded-md shadow-sm transition-all duration-200 backdrop-blur-sm font-medium"
        >
          <MdLogout size={21} />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
