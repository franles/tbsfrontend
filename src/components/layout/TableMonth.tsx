import { useEffect, useState } from "react";
import { getTrips } from "../services/trips.services";
import type { Trip } from "../types/types";

function TripsTable() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<"todos" | "pendiente" | "finalizado">("todos");

  useEffect(() => {
    async function fetchTrips() {
      const response = await getTrips();
      if (response && response.viajes) {
        setTrips(response.viajes);
        setFilteredTrips(response.viajes);
      }
      setLoading(false);
    }
    fetchTrips();
  }, []);

  // Filtrar por búsqueda y estado
  useEffect(() => {
    let filtered = trips;

    if (filterEstado !== "todos") {
      filtered = filtered.filter((trip) => trip.estado === filterEstado);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (trip) =>
          trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.apellido.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTrips(filtered);
  }, [searchTerm, filterEstado, trips]);

  if (loading) return <p>Cargando viajes...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "auto" }}>
      {/* Buscador y filtros */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar por legajo o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            flexGrow: 1,
            minWidth: 200,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        />

        {/* Botones de filtro por estado */}
        <div>
          {["todos", "pendiente", "finalizado"].map((estado) => (
            <button
              key={estado}
              onClick={() => setFilterEstado(estado as any)}
              style={{
                marginRight: 8,
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                backgroundColor: filterEstado === estado ? "#007bff" : "#e0e0e0",
                color: filterEstado === estado ? "white" : "black",
                fontWeight: filterEstado === estado ? "bold" : "normal",
                textTransform: "capitalize",
              }}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#007bff", color: "white" }}>
            <th style={{ textAlign: "left", padding: "12px" }}>Legajo</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Nombre</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Estado</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: 12, textAlign: "center" }}>
                No hay resultados
              </td>
            </tr>
          ) : (
            filteredTrips.map((trip) => (
              <tr key={trip.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "10px" }}>{trip.id}</td>
                <td style={{ padding: "10px" }}>{trip.apellido}</td>
                <td
                  style={{
                    padding: "10px",
                    color: trip.estado === "pendiente" ? "orange" : "green",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {trip.estado}
                </td>
                <td style={{ padding: "10px" }}>
                  <button
                    style={{
                      marginRight: 8,
                      padding: "6px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                    onClick={() => alert(`Ver detalles de legajo ${trip.id}`)}
                    title="Ver"
                  >
                    Ver
                  </button>
                  <button
                    style={{
                      marginRight: 8,
                      padding: "6px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                    onClick={() => alert(`Editar legajo ${trip.id}`)}
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
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
    </div>
  );
}

export default TripsTable;
