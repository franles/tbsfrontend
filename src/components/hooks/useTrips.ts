import { useQuery } from "@tanstack/react-query";
import { tripsStore } from "../store/tripsStore";
import { getTrips } from "../services/trips.services";

export const useTrips = () => {
  const { filter, year, month, page } = tripsStore();

  return useQuery({
    queryKey: ["trips", filter, year, month, page],
    queryFn: () => getTrips(filter, 10, page, month, year),
  });
};
