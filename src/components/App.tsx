import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login.tsx";
import Monthly from '../Monthly.tsx';
import Annual from '../Annual.tsx';
import Trips from '../Trips.tsx';


function App() {
  const [count, setCount] = useState(0)

  return (


    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/PaquetesTuristicos" element={<Trips />} />
        <Route path="/ResumenMensual" element={<Monthly />} />
        <Route path="/ResumenAnual" element={<Annual />} />
      </Routes>
    </Router>

  )
}

export default App
