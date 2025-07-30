import { Table } from "../layout/Table";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import type { Trip } from "../types/types";
import { tripsStore } from "../store/tripsStore";
import { modalStore } from "../store/modalStore";
import { useDeleteTrip } from "../hooks/useTrips";

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
    if (window.confirm(`¿Eliminar legajo ${id}?`)) {
      trip(id);
    }
  };
  return (
    <Table
      headers={headers}
      data={filteredTrips || []}
      renderRow={(trip) => (
        <tr key={trip.id} className="capitalize border-b border-gray-200">
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
          <td className="flex items-center p-2">
            <button
              className="text-blue-600 border-none rounded cursor-pointer hover:text-blue-400"
              onClick={() => {
                setTripId(trip.id);
                setIsOpen(true);
              }}
              title="Ver"
            >
              <IoIosInformationCircleOutline size={30} />
            </button>
            <button
              className="text-red-600 border-none rounded cursor-pointer hover:text-red-400"
              onClick={() => handleDelete(trip.id)}
              title="Eliminar"
            >
              <MdDeleteForever size={30} />
            </button>
          </td>
        </tr>
      )}
    />
  );
}
