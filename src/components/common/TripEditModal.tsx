import { useTrip, useUpdateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { IoClose } from "react-icons/io5";
import { renderEstado } from "../utils/utilsTsx";
import { useForm } from "@tanstack/react-form";
import type { UpdateTripData } from "../types/types";

export const TripEditModal = () => {
  const { setIsEdit } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: trip } = useTrip(tripId!);
  const { updateTripMutate } = useUpdateTrip();

  const form = useForm({
    defaultValues: {
      destino: trip?.viaje.destino,
      apellido: trip?.viaje.apellido,
      valor_total: trip?.viaje.valor_total,
    } as UpdateTripData,
    onSubmit: ({ value }) => {
      const dataUpdated = {
        apellido: value.apellido ?? trip?.viaje.apellido,
        valor_total: value.valor_total ?? trip?.viaje.valor_total,
        destino: value.destino ?? trip?.viaje.destino,
      };
      console.log("Data", dataUpdated);
      updateTripMutate({ tripId: tripId!, dataUpdated });
    },
  });

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

        <section className="flex flex-col items-center gap-10 w-full">
          <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2">
            MODIFICAR LEGAJO Nº{" "}
            <span className="underline">{trip?.viaje.id}</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {/* info */}
            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <h1 className="font-bold text-xl text-blue-600 mb-3">
                Información:
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <form.Field name="apellido">
                  {(field) => (
                    <div className="mb-3">
                      <label className="block font-semibold mb-1">
                        Apellido
                      </label>
                      <input
                        className="w-2/3 border rounded px-3 py-2"
                        value={field.state.value!}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="valor_total">
                  {(field) => (
                    <div className="mb-3">
                      <label className="block font-semibold mb-1">
                        Valor total
                      </label>
                      <input
                        type="text"
                        value={
                          field.state.value
                            ? new Intl.NumberFormat("es-AR", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(field.state.value)
                            : ""
                        }
                        onChange={(e) => {
                          const soloNumeros = e.target.value.replace(/\D/g, "");
                          field.handleChange(Number(soloNumeros));
                        }}
                        className="border p-2  rounded w-1/2"
                      />
                    </div>
                  )}
                </form.Field>
                <form.Field name="destino">
                  {(field) => (
                    <div className="mb-3">
                      <label className="block font-semibold mb-1">
                        Destino:
                      </label>
                      <select
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value as "internacional" | "nacional"
                          )
                        }
                        value={field.state.value!}
                        className="border p-2 rounded w-1/2"
                      >
                        <option value="internacional">Internacional</option>
                        <option value="nacional">Nacional</option>
                      </select>
                    </div>
                  )}
                </form.Field>

                <div className="mb-3">
                  <label className="block font-semibold mb-1">
                    Fecha creación
                  </label>

                  <input
                    type="date"
                    className="w-1/2 border rounded px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                    value={
                      trip?.viaje.fecha &&
                      new Date(trip.viaje.fecha).toISOString().split("T")[0]
                    }
                    disabled
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Estado</label>
                  <p>{trip?.viaje.estado && renderEstado(trip.viaje.estado)}</p>
                </div>

                <button
                  type="submit"
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Actualizar
                </button>
              </form>
            </div>

            {/* detalle económico */}
            <div className="border border-gray-300 rounded-xl p-4 ">
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

            <div className="border border-gray-300 rounded-xl p-4 col-span-full">
              <h1 className="font-bold text-xl text-blue-600 mb-4">
                Servicios:
              </h1>
            </div>
            {/* <button
              type="button"
              className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              onClick={() =>
                createServiceMutate({
                  viaje_id: tripId!,
                  servicio_id: s.id,
                  valor: 0,
                  pagado_por: "pendiente",
                })
              }
            >
              <IoAddCircleOutline size={20} />
              Agregar servicio
            </button> */}
          </div>
        </section>
      </div>
    </div>
  );
};
