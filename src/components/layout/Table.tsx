import { useTrips } from "../hooks/useTrips";
import { Filter } from "../common/Filter";
import { Spinner } from "../common/widget/Spinner";
import { Pagination } from "../common/Pagination";
import { tripsStore } from "../store/tripsStore";
import { useState } from "react";

function TripsTable() {
  const { data: trips, isLoading } = useTrips();
  const { filter, page, setFilter, setMonth, setPage, year, setYear, month } =
    tripsStore();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filteredTrips = trips?.viajes.filter(
    (item) =>
      item.id.toString().includes(searchTerm) ||
      item.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const noTrips = trips?.pagination.totalItems === 0;

  console.log(trips);

  if (isLoading) return <Spinner text="Cargando" />;

  return (
    <section className="max-w-[900px] mx-auto">
      <Filter
        filter={filter}
        setFilter={setFilter}
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
      />
      <div className="flex flex-wrap justify-between mb-4 items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por legajo o nombre"
          value={searchTerm}
          onChange={searchHandleChange}
          className="px-3 py-2 rounded border border-gray-300 flex-grow min-w-[200px] shadow-sm"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#007bff] text-white">
            <th className="text-left p-3">Legajo</th>
            <th className="text-left p-3">Nombre</th>
            <th className="text-left p-3">Fecha creacion:</th>
            <th className="text-left p-3">Estado</th>
            <th className="text-left p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noTrips ? (
            <tr>
              <td colSpan={4} className="p-3 text-center">
                No hay resultados
              </td>
            </tr>
          ) : (
            filteredTrips?.map((trip) => (
              <tr key={trip.id} className="capitalize border-b border-gray-200">
                <td className="p-2">{trip.id}</td>
                <td className="p-2">{trip.apellido}</td>
                <td className="p-2">
                  {new Date(trip.fecha).toLocaleDateString("es-AR")}
                </td>
                <td
                  className={`p-2 font-bold capitalize ${
                    trip.estado === "pendiente"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                >
                  {trip.estado}
                </td>
                <td className="p-2">
                  <button
                    className="mr-2 px-2.5 py-1.5 bg-blue-600 text-white border-none rounded cursor-pointer"
                    onClick={() => alert(`Ver detalles de legajo ${trip.id}`)}
                    title="Ver"
                  >
                    Ver
                  </button>
                  <button
                    className="mr-2 px-2.5 py-1.5 bg-green-600 text-white border-none rounded cursor-pointer"
                    onClick={() => alert(`Editar legajo ${trip.id}`)}
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    className="px-2.5 py-1.5 bg-red-600 text-white border-none rounded cursor-pointer"
                    onClick={() => {
                      if (window.confirm(`¿Eliminar legajo ${trip.id}?`)) {
                        alert(`Legajo ${trip.id} eliminado (simulado)`);
                        // eliminar
                      }
                    }}
                    title="Eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination page={page} setPage={setPage} />
    </section>
  );
}

export default TripsTable;
