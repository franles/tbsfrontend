import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Monthly from "./pages/Monthly.tsx";
import Annual from "./pages/Annual.tsx";
import Trips from "./pages/Trips.tsx";
import { AuthSuccess } from "./pages/AuthSuccess.tsx";
import { Failure } from "./pages/Failure.tsx";
import { ProtectedLayout } from "./config/ProtectedLayout.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Trips />} />
          <Route path="/ResumenMensual" element={<Monthly />} />
          <Route path="/ResumenAnual" element={<Annual />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
