import { useEffect, useState } from "react";
import { getTrips } from "../services/trips.services";
import type { Trip } from "../types/types";
import { useUser } from "../hooks/useUser";

function Trips() {
  const [viajes, setViajes] = useState<Trip[]>();
  const { user, loading } = useUser();
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

  useEffect(() => {
    console.log(user);
    console.log(loading);
  }, [user, loading]);

  return (
    <>
      <div className="relative h-[400px] bg-cover bg-[center_top_0%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274365/maletas_jzcjf2.webp')]">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
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
