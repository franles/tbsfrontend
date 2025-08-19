import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createServiceForTrip,
  getServices,
} from "../services/servicesTrip.services";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
};

export const useCreateServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createServiceForTrip,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["trips"],
      });
    },
  });
};
