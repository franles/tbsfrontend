import { useParams } from "react-router-dom";
import { useTrip } from "../hooks/useTrips";

export const TripEdit = () => {
  const { id } = useParams();
  const { data: trip } = useTrip(id!);
  return <div className="mt-20">{trip?.viaje.id}</div>;
};
