import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Monthly from "./pages/Monthly.tsx";
import Annual from "./pages/Annual.tsx";
import { AuthSuccess } from "./pages/AuthSuccess.tsx";
import { Failure } from "./pages/Failure.tsx";
import { ProtectedLayout } from "./config/ProtectedLayout.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { ProtectedRoutes } from "./config/ProtectedRoutes.tsx";
import { Toaster } from "sonner";
import Home from "./pages/Home.tsx";
function App() {
  return (
    <Router>
      <Toaster richColors duration={2500} closeButton />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} index />
          <Route path="/failure" element={<Failure />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/ResumenMensual" element={<Monthly />} />
              <Route path="/ResumenAnual" element={<Annual />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
