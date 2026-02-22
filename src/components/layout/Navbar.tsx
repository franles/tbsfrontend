import { logOut } from "../services/auth.services";
import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Swal from "sweetalert2";
import { PiSignOutBold } from "react-icons/pi";


function Navbar() {
  const navigate = useNavigate();
  const { clearUser, user } = useUser();

  const handleLogOut = async () => {
    clearUser();
    sessionStorage.clear();
    await logOut();
    navigate("/login");
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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-base font-semibold transition-all duration-200 border-b-2 ${isActive ? "border-[#DB3238] text-white" : "border-transparent text-gray-400 hover:text-white hover:border-[#FFFFFF]"
    }`;

  return (
    <>
      <div className="fixed top-4 left-0 w-full z-50 px-5 flex items-center gap-4">
        {/* Pill 1: Perfil de Usuario */}
        <div className="bg-black rounded-full shadow-lg border border-gray-800 px-4 py-2 flex items-center gap-3 h-[60px] min-w-fit flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-700">
            {user?.avatar ? (
              <img className="w-full h-full object-cover" src={user.avatar} alt="Avatar" />
            ) : (
              <span className="text-black text-sm font-bold uppercase">{user?.nombre?.charAt(0)}</span>
            )}
          </div>
          <span className="text-base font-semibold text-white whitespace-nowrap pr-2">
            ¡Hola, {user?.nombre}!
          </span>
        </div>

        {/* Pill 2: Navegación y Acciones */}
        <nav className="flex-grow bg-black rounded-full shadow-lg border border-gray-800 px-5 py-2 flex items-center justify-between h-[60px] relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png"
              alt="Logo"
              className="h-10 cursor-pointer"
              onClick={() => navigate("/home")}
            />
          </div>

          {/* Espaciador para no pisar los links centrados */}
          <div className="flex-grow" />

          {/* Botón Logout */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 bg-[#DB3238] hover:bg-[#8B181C] text-white text-sm px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm whitespace-nowrap"
            >
              <span>Cerrar sesión</span>
              <PiSignOutBold size={18} />
            </button>
          </div>
        </nav>
      </div>

      {/* Links Centrales - Centrados a la PANTALLA */}
      <div className="fixed top-4 left-0 w-full z-[51] pointer-events-none flex justify-center mt-[10px]">
        <div className="flex items-center gap-5 pointer-events-auto h-[40px]">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/finance" className={navLinkClass}>
            Finanzas
          </NavLink>
          <NavLink to="/expenses" className={navLinkClass}>
            Expensas
          </NavLink>
        </div>
      </div>
    </>
  );
}


export default Navbar;
