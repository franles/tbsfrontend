import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { getTrips } from "./components/services/trips.services";
import type { Trip } from "./components/types/types";
import { useUserStore } from "./components/store/userStore";
import maletasImg from "./components/img/maletas.webp";

function Trips() {
  const [viajes, setViajes] = useState<Trip[]>();
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.accessToken);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getTrips();
        if (response) {
          setViajes(response.viajes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative h-[400px] bg-cover bg-[center_top_0%]" style={{ backgroundImage: `url(${maletasImg})` }}>

        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)", }}>

        </div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-7xl font-bold text-white drop-shadow-lg text-center">
            Paquetes Turísticos
          </h1>
        </div>
      </div>

      <div className="px-4 py-8">
        {viajes?.map((viaje) => (
          <div key={viaje.id} className="mb-4">
            ID: {viaje.id}
          </div>
        ))}
      </div>
      
    </>
  );
}

export default Trips;