import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedLayout } from "./config/ProtectedLayout.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { ProtectedRoutes } from "./config/ProtectedRoutes.tsx";
import { Toaster } from "sonner";
import { Loader } from "./common/Loader.tsx";

import Login from "./pages/Login.tsx";
import { AuthSuccess } from "./pages/AuthSuccess.tsx";
import { Failure } from "./pages/Failure.tsx";
import CreateTrip from "./pages/CreateTrip.tsx";

const Annual = lazy(() => import("./pages/Annual.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const Expenses = lazy(() => import("./pages/Expenses.tsx"));

function App() {
  return (
    <Router>
      <Toaster richColors duration={2500} closeButton />
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} index />
            <Route path="/failure" element={<Failure />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/finance" element={<Annual />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/createtrip" element={<CreateTrip />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
