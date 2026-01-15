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
            className="capitalize border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-center"
            onClick={() => {
              setIsOpen(true);
              setTripId(trip.id);
            }}
          >
            <td className="p-1">{trip.id}</td>
            <td className="p-1">{trip.apellido}</td>
            <td className="p-1">
              {new Date(trip.fecha).toLocaleDateString("es-AR")}
            </td>
            <td className={`p-1 font-bold capitalize`}>
              {renderEstado(trip.estado)}
            </td>
            <td className="p-1">
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
                onClick={(e) => {
                  e.stopPropagation();
                  toast.warning(
                    `¿Estás seguro de que quieres eliminar el viaje "${trip.id}"?`,
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
            </td>
          </tr>
        )}
      />
    </div>
  );
}
