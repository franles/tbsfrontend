import { Table } from "../layout/Table";
import { IoInformationCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import type { Trip } from "../types/types";
import { tripsStore } from "../store/tripsStore";
import { modalStore } from "../store/modalStore";
import { useDeleteTrip } from "../hooks/useTrips";
import { toast } from "sonner";

const headers = [
  { label: "Legajo", key: "id" },
  { label: "Nombre", key: "apellido" },
  { label: "Fecha creación", key: "fecha" },
  { label: "Estado", key: "estado" },
  { label: "Acciones", key: "acciones" },
];

export function TripsTable({
  filteredTrips,
}: {
  filteredTrips: Trip[] | undefined;
}) {
  const { setTripId } = tripsStore();
  const { setIsOpen } = modalStore();
  const { mutate: trip } = useDeleteTrip();

  const handleDelete = (id: string) => {
    trip(id);
  };
  return (
    <Table
      headers={headers}
      data={filteredTrips || []}
      renderRow={(trip) => (
        <tr
          key={trip.id}
          className="capitalize border-b border-gray-200 hover:bg-gray-100"
        >
          <td className="p-2">{trip.id}</td>
          <td className="p-2">{trip.apellido}</td>
          <td className="p-2">
            {new Date(trip.fecha).toLocaleDateString("es-AR")}
          </td>
          <td
            className={`p-2 font-bold capitalize ${
              trip.estado === "pendiente" ? "text-orange-500" : "text-green-500"
            }`}
          >
            {trip.estado}
          </td>
          <td className="p-2">
            <div className="flex items-center space-x-4 mr">
              <button
                className="text-blue-500 border-none rounded cursor-pointer hover:text-blue-700"
                onClick={() => {
                  setTripId(trip.id);
                  setIsOpen(true);
                }}
                title="Ver"
              >
                <IoInformationCircle size={30} />
              </button>
              <button
                className="text-red-600 border-none rounded cursor-pointer hover:text-red-700"
                onClick={() => {
                  toast.warning(
                    `¿Estás seguro de que quieres eliminar el viaje ${trip.id}?`,
                    {
                      duration: 2200,
                      action: {
                        label: "Eliminar",
                        onClick: () => handleDelete(trip.id),
                      },
                    }
                  );
                }}
                title="Eliminar"
              >
                <IoCloseCircle size={30} />
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
}
