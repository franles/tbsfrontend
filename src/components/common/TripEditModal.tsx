import { useTrip, useUpdateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { renderEstado } from "../utils/utilsTsx";
import { useForm } from "@tanstack/react-form";
import type { UpdateTripData } from "../types/types";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

import {
  useCreateService,
  useDeleteService,
  useServices,
} from "../hooks/useServices";
import { formattedAmount } from "../utils/utils";
import { useState } from "react";

export const TripEditModal = () => {
  const { setIsEdit } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: trip } = useTrip(tripId!);
  const { updateTripMutate } = useUpdateTrip();
  const { deleteServiceMutate } = useDeleteService();
  const { data: services } = useServices();
  const { createServiceMutate } = useCreateService();
  const [add, setAdd] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      destino: trip?.viaje.destino,
      apellido: trip?.viaje.apellido,
      valor_total: trip?.viaje.valor_total,
      servicios: trip?.viaje.servicios.map((s) => ({
        id: s.id,
        pagado_por: s.pagado_por,
        valor: s.valor,
      })),
    } as UpdateTripData,
    onSubmit: ({ value }) => {
      const serviciosOriginales = trip?.viaje.servicios ?? [];

      const serviciosActualizados = value.servicios
        .filter((s) => {
          const original = serviciosOriginales.find((o) => o.id === s.id);
          return (
            original &&
            (s.valor !== original.valor || s.pagado_por !== original.pagado_por)
          );
        })
        .map((s) => ({
          id: s.id,
          valor: Number(s.valor),
          pagado_por: s.pagado_por,
        }));

      const dataUpdated = {
        apellido: value.apellido ?? trip?.viaje.apellido,
        valor_total: Number(value.valor_total ?? trip?.viaje.valor_total),
        destino: value.destino ?? trip?.viaje.destino,
        servicios: serviciosActualizados,
      };

      updateTripMutate({ tripId: tripId!, dataUpdated });
    },
  });
  return (
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="w-full flex flex-col gap-10"
        >
          <div className="flex gap-10">
            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <h1 className="font-bold text-xl text-blue-600 mb-3">
                Información:
              </h1>
              <form.Field name="apellido">
                {(field) => (
                  <div className="mb-3">
                    <label className="block font-semibold mb-1">Apellido</label>
                    <input
                      className="w-2/3 border rounded px-3 py-2"
                      value={field.state.value!}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="destino">
                {(field) => (
                  <div className="mb-3">
                    <label className="block font-semibold mb-1">Destino:</label>
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
            </div>

            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <h1 className="font-bold text-xl text-blue-600 mb-3">
                Detalle económico:
              </h1>
              <div className="mb-3">
                <label className="block font-semibold mb-1">Moneda</label>
                <p>{trip?.viaje.moneda}</p>
              </div>
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
              <div className="mb-3">
                <label className="block font-semibold mb-1">Costo</label>
                <p>${trip?.viaje.costo && formattedAmount(trip.viaje.costo)}</p>
              </div>
              <div>
                <label className="block font-semibold mb-1">Ganancia</label>
                <p>
                  $
                  {trip?.viaje.ganancia && formattedAmount(trip.viaje.ganancia)}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl p-4">
            <h1 className="font-bold text-xl text-blue-600 mb-4">Servicios:</h1>

            <form.Field name="servicios">
              {(field) => (
                <div className="flex flex-col gap-3 px-10">
                  {field.state.value?.map((s, index) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 border p-3 rounded-md"
                    >
                      <div className="capitalize w-40 font-semibold">
                        {services?.servicios.map(
                          (service) =>
                            service.id === s.id && <p>{service.nombre}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xl font-semibold">$</span>
                        <input
                          type="text"
                          className="border py-2 px-4 rounded w-32"
                          value={
                            s.valor
                              ? new Intl.NumberFormat("es-AR", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                }).format(s.valor)
                              : ""
                          }
                          onChange={(e) => {
                            const newServicios = [...field.state.value];
                            const soloNumeros = e.target.value.replace(
                              /\D/g,
                              ""
                            );

                            newServicios[index] = {
                              ...s,
                              valor: Number(soloNumeros),
                            };

                            field.handleChange(newServicios);
                          }}
                        />
                      </div>

                      <select
                        className="border p-2 rounded "
                        value={s.pagado_por}
                        onChange={(e) => {
                          const newServicios = [...field.state.value];
                          newServicios[index] = {
                            ...s,
                            pagado_por: e.target.value as
                              | "pendiente"
                              | "pablo"
                              | "soledad"
                              | "mariana",
                          };
                          field.handleChange(newServicios);
                        }}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="mariana">Mariana</option>
                        <option value="pablo">Pablo</option>
                        <option value="soledad">Soledad</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          deleteServiceMutate({
                            serviceId: s.id,
                            tripId: trip!.viaje.id,
                          });
                          const newServicios = field.state.value.filter(
                            (serv) => serv.id !== s.id
                          );
                          field.handleChange(newServicios);
                        }}
                        className="text-red-500  rounded-full hover:text-red-600"
                      >
                        <IoCloseCircle size={30} />
                      </button>
                    </div>
                  ))}

                  {add && (
                    <div
                      className={`flex items-center justify-between gap-3 border p-3 rounded-md ${
                        add && "border-blue-500 shadow-sm"
                      }`}
                    >
                      <select
                        className="border p-2 rounded w-40 capitalize"
                        onChange={(e) => {
                          const serviceId = Number(e.target.value);
                          if (!serviceId) return;

                          const serviceToAdd = services?.servicios.find(
                            (s) => s.id === serviceId
                          );
                          if (!serviceToAdd) return;

                          createServiceMutate({
                            viaje_id: tripId!,
                            valor: 0,
                            servicio_id: serviceToAdd.id,
                            pagado_por: "pendiente",
                          });
                          setAdd(false);
                        }}
                      >
                        <option value="">Agregar servicio...</option>
                        {services?.servicios
                          .filter(
                            (s) =>
                              !field.state.value?.some((fs) => fs.id === s.id)
                          )
                          .map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.nombre}
                            </option>
                          ))}
                      </select>

                      <div className="flex items-center gap-1">
                        <span className="text-xl font-semibold">$</span>
                        <input
                          type="text"
                          className="border py-2 px-4 rounded w-32"
                          value=""
                          disabled
                        />
                      </div>

                      <select className="border p-2 rounded" disabled>
                        <option>Pendiente</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => setAdd(false)}
                        className="text-red-500  rounded-full hover:text-red-600"
                      >
                        <IoCloseCircle size={30} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="border-blue-500 border-2  text-blue-500 self-center flex items-center rounded-full hover:bg-blue-50 transition"
                    onClick={add ? () => setAdd(false) : () => setAdd(true)}
                  >
                    {add ? <IoIosRemove size={27} /> : <IoIosAdd size={27} />}
                  </button>
                </div>
              )}
            </form.Field>
          </div>
          <button
            type="submit"
            className="w-1/4 self-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Actualizar
          </button>
        </form>
      </section>
    </div>
  );
};
