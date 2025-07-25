import { create } from "zustand";
import type { GetTripsResponse } from "../types/types";

interface TripsStore {
  trips: GetTripsResponse | null;
  setTrips: (trips: GetTripsResponse) => void;
  tripSelected: string | undefined;
  setTripSelected: (trip: string | undefined) => void;
}

export const tripsStore = create<TripsStore>((set) => ({
  trips: null,
  tripSelected: undefined,
  setTrips: (trips) => set({ trips }),
  setTripSelected: (tripSelected) => set({ tripSelected }),
}));
