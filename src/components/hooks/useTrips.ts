import { tripsStore } from "../store/tripsStore";

export const useTrips = () => {
  const tripSelected = tripsStore((state) => state.tripSelected);
  const trips = tripsStore((state) => state.trips);
  const setTrips = tripsStore((state) => state.setTrips);
  const setTripSelected = tripsStore((state) => state.setTripSelected);

  return { tripSelected, trips, setTrips, setTripSelected };
};
