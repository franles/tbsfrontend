import { LogOut } from "lucide-react";

function Navbar() {
    const gmail = "usuario@gmail.com";

    const handleCerrarSesion = () => {
        console.log("Cerrando sesión...");
    };

    return (
        <nav className="w-full h-20 px-6 fixed top-0 left-0 z-50 backdrop-blur-sm bg-white/20 border-b border-white/30 shadow-md flex items-center justify-between rounded-none">

            <div className="flex items-center gap-4">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Perfil" className="w-10 h-10 rounded-full object-cover border border-white/30 shadow-sm"/>
                <span className="text-sm font-semibold text-white drop-shadow-sm">
                    {gmail}
                </span>
            </div>

            <div>
                <img src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1752706284/tbs-logo_frbbyo.png" alt="Logo TBS"className="h-12 drop-shadow-md"/>
            </div>

            <div>
                <button
                    onClick={handleCerrarSesion}
                    className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700/80 text-white text-sm px-4 py-2 rounded-xl shadow-sm transition-all duration-200 backdrop-blur-sm"
                >
                    <LogOut size={16} />
                    Cerrar sesión
                </button>
            </div>
            
        </nav>

    );
}

export default Navbar;