import googleLogo from './components/images/google-logo.png';

function Login() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
          <h1 className="text-4xl font-bold mb-2 text-center">The Black Sheep</h1>
          <h1 className="text-xl font-normal mb-6 text-center">Conocemos tu destino.</h1>
          <form className="space-y-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full border border-red-700 rounded-lg py-2 px-4 bg-red-600 hover:bg-red-700 transition duration-200 text-sm text-white font-medium shadow-sm"
            >
              <img
                src={googleLogo}
                alt="Logo de Google"
                className="w-5 h-5"
              />
              Iniciar sesión con Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
 

