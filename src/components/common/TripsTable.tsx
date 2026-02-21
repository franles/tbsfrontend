import { Table } from "../layout/Table";
import { IoInformationCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import type { Trip } from "../types/types";
import { tripsStore } from "../store/tripsStore";
import { modalStore } from "../store/modalStore";
import { useDeleteTrip } from "../hooks/useTrips";
import { toast } from "sonner";
import { renderEstado } from "../utils/utilsTsx";

const headers = [
  { label: "Legajo", key: "id" },
  { label: "Apellido", key: "apellido" },
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
    <div className="select-none">
      <Table
        headers={headers}
        data={filteredTrips || []}
        renderRow={(trip) => (
          <tr
            key={trip.id}
            className="border-b border-gray-250 hover:bg-gray-100 transition-colors cursor-pointer group "
            onClick={() => {
              setIsOpen(true);
              setTripId(trip.id);
            }}
          >
            <td className="py-2 px-4 text-sm font-medium text-gray-900 text-center">{trip.id}</td>
            <td className="py-2 px-4 text-sm text-gray-700 capitalize text-center">{trip.apellido}</td>
            <td className="py-2 px-4 text-sm text-gray-700 text-center">
              {new Date(trip.fecha).toLocaleDateString("es-AR")}
            </td>
            <td className="py-2 px-4 text-center">
              {renderEstado(trip.estado)}
            </td>
            <td className="py-2 px-4 text-center">
              <div className="flex justify-center gap-2">
                <button
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTripId(trip.id);
                    setIsOpen(true);
                  }}
                  title="Ver detalles"
                >
                  <IoInformationCircle size={28} />
                </button>
                <button
                  className="text-red-600 hover:text-red-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.warning(
                      `¿Estás seguro de que quieres eliminar el viaje "${trip.id}"?`,
                      {
                        duration: 3000,
                        action: {
                          label: "Eliminar",
                          onClick: () => handleDelete(trip.id),
                        },
                      }
                    );
                  }}
                  title="Eliminar"
                >
                  <IoCloseCircle size={28} />
                </button>
              </div>
            </td>
          </tr>
        )}

      />
    </div>
  );
}
