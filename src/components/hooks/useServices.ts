import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceForTrip,
  getServices,
} from "../services/servicesTrip.services";
import { tripsStore } from "../store/tripsStore";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export const useCreateServices = () => {
  const queryClient = useQueryClient();
  const { year, month, filter, page } = tripsStore.getState();

  return useMutation({
    mutationFn: createServiceForTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["trips", { year, month, filter, page }],
      });
    },
  });
};
