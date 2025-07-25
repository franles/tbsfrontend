import { create } from "zustand";
import type { Trip } from "../types/types";

interface TripsStore {
  trips: Trip[] | null;
  setTrips: (trips: Trip[] | null) => void;
  tripSelected: string | undefined;
  setTripSelected: (trip: string | undefined) => void;
}

export const tripsStore = create<TripsStore>((set) => ({
  trips: null,
  tripSelected: undefined,
  setTrips: (trips) => set({ trips }),
  setTripSelected: (tripSelected) => set({ tripSelected }),
}));
