import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tripsStore } from "../store/tripsStore";
import {
  createTrip,
  deleteTrip,
  getTrip,
  getTrips,
} from "../services/trips.services";
import { toast } from "sonner";

export const useTrips = () => {
  const { filter, year, month, page } = tripsStore();

  return useQuery({
    queryKey: ["trips", filter, year, month, page],
    queryFn: () => getTrips(filter, 10, page, month, year),
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: ["trip", id],
    queryFn: () => getTrip(id),
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  const { year, month, filter, page } = tripsStore.getState();

  return useMutation({
    mutationFn: createTrip,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["trips", { year, month, filter, page }],
      });

      const previousTrips = queryClient.getQueryData([
        "trips",
        { year, month, filter, page },
      ]);

      return { previousTrips };
    },

    onSuccess: () => {
      toast.success("Viaje creado exitosamente");
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },

    onError: (err, newTripData, context) => {
      console.error("Error al crear el viaje", err);

      if (context?.previousTrips) {
        queryClient.setQueryData(
          ["trips", { year, month, filter, page }],
          context.previousTrips
        );
      }
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: () => {
      toast.success("Viaje eliminado exitosamente");
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};
