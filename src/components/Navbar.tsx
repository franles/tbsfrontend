import tbsLogo from './images/tbs-logo.png';
import perfilImg from './images/foto-perfil.webp'; // traer imagen de perfil google

function Navbar() {
    const gmail = "usuario@gmail.com"; // reemplazá por tu dato dinámico si usás auth

    const handleCerrarSesion = () => {
        console.log("Cerrando sesión...");
    };

    return (
        <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <img
                    src={perfilImg}
                    alt="Perfil"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700">{gmail}</span>
            </div>
            <div>
                <img src={tbsLogo} alt="Logo TBS" className="h-12 mr-16" />
            </div>
            <div>
                <button
                    onClick={handleCerrarSesion}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar;