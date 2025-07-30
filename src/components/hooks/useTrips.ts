import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tripsStore } from "../store/tripsStore";
import { createTrip, getTrip, getTrips } from "../services/trips.services";

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

    // Se ejecuta justo antes de la mutación
    onMutate: async () => {
      // Cancelar cualquier consulta pendiente
      await queryClient.cancelQueries({
        queryKey: ["trips", { year, month, filter, page }],
      });

      // Obtener el valor anterior (por si queremos hacer rollback)
      const previousTrips = queryClient.getQueryData([
        "trips",
        { year, month, filter, page },
      ]);

      // Podemos hacer algo como mostrar el nuevo trip localmente (optimista)
      // queryClient.setQueryData(...) si quisiéramos eso

      return { previousTrips };
    },

    onSuccess: () => {
      // Refetch los viajes después de crear uno nuevo
      queryClient.invalidateQueries({
        queryKey: ["trips", { year, month, filter, page }],
      });
    },

    onError: (err, newTripData, context) => {
      console.error("Error al crear el viaje", err);

      // Si hubo error, restaurar el estado anterior si hiciste optimista
      if (context?.previousTrips) {
        queryClient.setQueryData(
          ["trips", { year, month, filter, page }],
          context.previousTrips
        );
      }
    },
  });
};
