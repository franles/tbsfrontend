import { useEffect, useState } from "react";
import { getTrips } from "../services/trips.services";
import { useTrips } from "../hooks/useTrips";
import { Filter } from "../common/Filter";
import { Spinner } from "../common/widget/Spinner";

function TripsTable() {
  const { trips, setTrips } = useTrips();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<number | string | null>(null);

  const totalPages = trips?.pagination.totalPages ?? 1;
  const noTrips = trips?.pagination.totalItems === 0;
  console.log(filter);
  console.log(trips);
  useEffect(() => {
    async function fetchTrips() {
      const response = await getTrips(filter, 10, page);
      if (response && response.viajes) {
        setTrips(response);
      }
      setLoading(false);
    }
    fetchTrips();
  }, [filter, setTrips, page]);

  if (loading) return <Spinner text="Cargando" />;

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      <Filter filter={filter} setFilter={setFilter} />
      <div className="flex flex-wrap justify-between mb-4 items-center gap-3">
        <input
          type="text"
          placeholder="Buscar por legajo o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            trips?.viajes.map((trip) => (
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
      <section className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded"
        >
          Anterior
        </button>
        <span>
          Página {totalPages === 0 ? 0 : page} de {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Siguiente
        </button>
      </section>
    </div>
  );
}

export default TripsTable;
