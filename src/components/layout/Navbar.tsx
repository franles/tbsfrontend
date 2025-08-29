import { MdLogout } from "react-icons/md";
import { logOut } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { IoExitOutline, IoMenu, IoChatboxSharp, IoAirplane, IoEarth, IoHeartSharp, IoSnow } from "react-icons/io5";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const { clearUser, user } = useUser();
  const [openMenu, setOpenMenu] = useState(false);

  // Para el icono que aparece temporalmente
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);

  const icons = [
    { icon: <IoAirplane size={18} color="#007BFF" />, name: "Airplane" },
    { icon: <IoEarth size={18} color="#2ECC71" />, name: "Earth" },
    { icon: <IoHeartSharp size={18} color="#FF4136" />, name: "Heart" },
    { icon: <IoSnow size={18} color="#7FDBFF" />, name: "Snow" },
  ];

  const handleLogOut = async () => {
    clearUser();
    sessionStorage.clear();
    await logOut();
    navigate("/login");
  };

  const handleLogoClick = () => {
    setIconIndex((prev) => (prev + 1) % icons.length); // cambia al siguiente icono
    setShowChatIcon(true);
    setTimeout(() => setShowChatIcon(false), 3000); // desaparece después de 3 segundos
  };

  const handleLogoutClick = async () => {
    const result = await Swal.fire({
      title: "Cerrar Sesión",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      handleLogOut();
    }
  };

  return (
    <nav className="w-full py-2 px-6 fixed top-0 left-0 z-50 backdrop-blur-sm bg-white/20 shadow-md flex items-center justify-between rounded-none">
      {/* Usuario */}
      <div className="flex items-center gap-2">
        {user?.avatar ? (
          <img className="rounded-full w-10" src={user.avatar} />
        ) : (
          <IoExitOutline size={30} color="white" />
        )}
        <span className="text-sm font-semibold text-white drop-shadow-sm capitalize">
          Hola, {user?.nombre}!
        </span>
      </div>

      {/* Logo y Chat Icon */}
      <div className="relative flex items-center">
        <img
          src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png"
          alt="Logo TBS"
          className="h-12 drop-shadow-md cursor-pointer"
          onClick={handleLogoClick}
        />

        {showChatIcon && (
          <div className="absolute -top-4 -right-5">
            <IoChatboxSharp size={32} color="white" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {icons[iconIndex].icon}
            </div>
          </div>
        )}
      </div>

      {/* Menús */}
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="gap-2 px-4 py-2 text-white rounded-md shadow-sm transition-all duration-200 backdrop-blur-sm font-medium"
          >
            <IoMenu size={21} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={() => {
                  navigate("/home");
                  setOpenMenu(false); // cierra el menú
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate("/ResumenAnual");
                  setOpenMenu(false); // cierra el menú
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Resumen Anual
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogoutClick}
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
