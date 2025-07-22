import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { getTrips } from "./components/services/trips.services";
import type { Trip } from "./components/types/types";
import { useUserStore } from "./components/store/userStore";

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

  console.log(user);
  console.log(token);
  return (
    <>
      <Navbar />
      <h1 className="text-5xl font-bold mb-2 text-center mt-14 text-orange-600">
        Paquetes turisticos
      </h1>

      <div>
        {viajes?.map((viaje) => (
          <div key={viaje.id}>ID: {viaje.id}</div>
        ))}
      </div>
    </>
  );
}

export default Trips;
