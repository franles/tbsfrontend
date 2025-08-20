import { useTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { IoClose, IoCloseCircle, IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { renderEstado } from "../utils/utilsTsx";

export const TripEditModal = () => {
  const { setIsEdit } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: trip } = useTrip(tripId!);

  const [servicios, setServicios] = useState<
    { id?: number; nombre: string; valor: number; pagado_por: string }[]
  >([]);

  useEffect(() => {
    if (trip?.viaje?.servicios) {
      setServicios(trip.viaje.servicios);
    }
  }, [trip]);

  const handleAgregarServicio = () => {
    setServicios([...servicios, { nombre: "", valor: 0, pagado_por: "" }]);
  };

  const handleEliminarServicio = (index: number) => {
    const nuevos = [...servicios];
    nuevos.splice(index, 1);
    setServicios(nuevos);
  };

  const handleCambioServicio = (
    index: number,
    campo: "nombre" | "valor" | "pagado_por",
    valor: string
  ) => {
    const nuevos = [...servicios];
    {
      /*nuevos[index][campo] = campo === "valor" ? parseFloat(valor) || 0 : valor;*/
    }
    setServicios(nuevos);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 relative animate-fadeIn text-black max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <button
          onClick={() => {
            setTripId(null);
            setIsEdit(false);
          }}
          className="absolute top-2 right-3 text-red-500 transition"
        >
          <IoClose size={40} />
        </button>

        <section className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2">
            MODIFICAR LEGAJO Nº{" "}
            <span className="underline">{trip?.viaje.id}</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {/* info */}
            <div className="border border-gray-300 rounded-xl p-4">
              <h1 className="font-bold text-xl text-blue-600 mb-3">
                Información:
              </h1>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Apellido</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  defaultValue={trip?.viaje.apellido}
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Destino</label>
                <select
                  className="w-full border rounded px-3 py-2 capitalize"
                  defaultValue={trip?.viaje.destino.toLowerCase()}
                >
                  <option value="nacional">Nacional</option>
                  <option value="internacional">Internacional</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">
                  Fecha creación
                </label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  value={
                    trip?.viaje.fecha
                      ? new Date(trip.viaje.fecha).toISOString().split("T")[0]
                      : ""
                  }
                  disabled
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Estado</label>
                <p>{trip?.viaje.estado && renderEstado(trip.viaje.estado)}</p>
              </div>
            </div>

            {/* detalle económico */}
            <div className="border border-gray-300 rounded-xl p-4">
              <h1 className="font-bold text-xl text-blue-600 mb-3">
                Detalle económico:
              </h1>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Moneda</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  value={trip?.viaje.moneda}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Valor total</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2"
                  defaultValue={trip?.viaje.valor_total}
                />
              </div>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Costo</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  value={trip?.viaje.costo}
                  disabled
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ganancia</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  value={trip?.viaje.ganancia}
                  disabled
                />
              </div>
            </div>

            {/* servicios */}
            <div className="border border-gray-300 rounded-xl p-4 col-span-full">
              <h1 className="font-bold text-xl text-blue-600 mb-4">
                Servicios:
              </h1>

              {/* columnas */}
              <div className="grid grid-cols-12 gap-2 font-semibold text-sm mb-2 px-1">
                <span className="col-span-4">Nombre</span>
                <span className="col-span-3">Valor</span>
                <span className="col-span-4">Pagado por</span>
                <span className="col-span-1 text-center">Quitar</span>
              </div>

              {/* filas de servicios */}
              {servicios.map((s, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 mb-3 px-1 items-center"
                >
                  <select
                    className="col-span-4 border rounded px-2 py-1"
                    value={s.nombre}
                    onChange={(e) =>
                      handleCambioServicio(index, "nombre", e.target.value)
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="Equipaje">Equipaje</option>
                    <option value="Escursiones">Escursiones</option>
                    <option value="Alquiler de ropa">Alquiler de ropa</option>
                    <option value="Alquiler de vehículos">
                      Alquiler de vehículos
                    </option>
                    <option value="Asistencia al viajero">
                      Asistencia al viajero
                    </option>
                    <option value="Traslados">Traslados</option>
                  </select>
                  <input
                    type="number"
                    className="col-span-3 border rounded px-2 py-1"
                    value={s.valor}
                    onChange={(e) =>
                      handleCambioServicio(index, "valor", e.target.value)
                    }
                  />
                  <input
                    className="col-span-4 border rounded px-2 py-1"
                    value={s.pagado_por}
                    onChange={(e) =>
                      handleCambioServicio(index, "pagado_por", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="col-span-1 flex justify-center text-red-500 hover:text-red-700"
                    onClick={() => handleEliminarServicio(index)}
                  >
                    <IoCloseCircle size={25} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                onClick={handleAgregarServicio}
              >
                <IoAddCircleOutline size={20} />
                Agregar servicio
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className=" bg-[#007bff] text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
              Guardar cambios
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
