import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Monthly from "../Monthly.tsx";
import Annual from "../Annual.tsx";
import Trips from "../Trips.tsx";
import { AuthSuccess } from "./pages/AuthSuccess.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/PaquetesTuristicos" element={<Trips />} />
        <Route path="/ResumenMensual" element={<Monthly />} />
        <Route path="/ResumenAnual" element={<Annual />} />
      </Routes>
    </Router>
  );
}

export default App;
