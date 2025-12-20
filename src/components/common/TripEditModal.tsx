import { useTrip, useUpdateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { renderEstado } from "../utils/utilsTsx";
import { useForm } from "@tanstack/react-form";
import type { UpdateTripRequest, UpdateServiceData } from "../types/types";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { toast } from "sonner";
import {
  useCreateService,
  useDeleteService,
  useServices,
} from "../hooks/useServices";
import { formattedAmount } from "../utils/utils";
import { useState, useEffect } from "react";

// Local type for Form State including UI-specific fields

export const TripEditModal = () => {
  const { setIsEdit } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: tripResponse } = useTrip(tripId!);
  const { updateTripMutate } = useUpdateTrip();
  const { deleteServiceMutate } = useDeleteService();
  const { data: services } = useServices();
  const { createServiceMutate } = useCreateService();
  const [add, setAdd] = useState<boolean>(false);

  const trip = tripResponse?.data;

  if (trip) {
    // Trip loaded
  }

  const form = useForm({
    defaultValues: {
      apellido: trip?.apellido,
      destino: trip?.destino,
      valor_total: trip?.valor_total,
      moneda: trip?.moneda?.toLowerCase() === "usd" ? 2 : 1,
      servicios:
        trip?.servicios?.map((s) => ({
          id: s.id,
          valor: s.valor,
          pagado_por: s.pagado_por,
          moneda: (s.moneda as unknown as string)?.toLowerCase() === "usd" ? 2 : 1,
          cotizacion: s.cotizacion,
        })) ?? [],
      valor_tasa_cambio: trip?.valor_tasa_cambio ?? null,
    } as UpdateTripRequest,
    onSubmit: ({ value }) => {
      const serviciosOriginales = trip?.servicios ?? [];

      // detectamos cambios en servicios (solo los que se modificaron)
      const serviciosActualizados: UpdateServiceData[] = (value.servicios ?? [])
        .filter((s) => {
          const original = serviciosOriginales.find((o) => o.id === s.id);
          // Check if original exists and compare values.
          // Note: original.tipo_cambio_id vs s.valor_tasa_cambio
          if (!original) return true; // New service? (Shouldn't happen here usually but safe to include)

          return (
            s.valor !== original.valor ||
            s.pagado_por !== original.pagado_por ||
            s.moneda !== ((original.moneda as unknown as string)?.toLowerCase() === "usd" ? 2 : 1) ||
            s.cotizacion !== (original.cotizacion ?? null)
          );
        })
        .map((s) => ({
          id: s.id,
          valor: Number(s.valor),
          pagado_por: s.pagado_por,
          moneda: s.moneda,
          cotizacion: s.cotizacion ?? null,
        }));

      const dataUpdated: UpdateTripRequest = {
        apellido: value.apellido ?? trip?.apellido,
        valor_total: Number(value.valor_total ?? trip?.valor_total),
        destino: value.destino ?? trip?.destino,
        valor_tasa_cambio: value.valor_tasa_cambio,
        servicios: serviciosActualizados,
      };
      updateTripMutate({ tripId: tripId!, dataUpdated });
    },
  });

  // Cuando llega la data del viaje, resetear el form para precargar valores
  useEffect(() => {
    if (!trip) return;
    form.reset({
      apellido: trip.apellido ?? "",
      destino:
        (trip.destino as "internacional" | "nacional") ?? "internacional",
      valor_total: trip.valor_total ?? 0,
      moneda: trip.moneda?.toLowerCase() === "usd" ? 2 : 1,
      valor_tasa_cambio: trip.valor_tasa_cambio ?? null,
      servicios:
        trip.servicios?.map((s) => ({
          id: s.id,
          valor: s.valor ?? 0,
          pagado_por: s.pagado_por ?? "pendiente",
          moneda: (s.moneda as unknown as string)?.toLowerCase() === "usd" ? 2 : 1,
          cotizacion: s.cotizacion ?? null,
        })) ?? [],
    } as UpdateTripRequest);
  }, [trip, form]);

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
        <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2 select-none">
          MODIFICAR LEGAJO Nº <span className="underline">{trip?.id}</span>
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="w-full flex flex-col gap-10"
        >
          <div className="flex gap-10">
            {/* Información */}
            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <h1 className="font-bold text-xl text-blue-600 mb-3 select-none">
                Información:
              </h1>
              <form.Field name="apellido">
                {(field) => (
                  <div className="mb-3">
                    <label className="block font-semibold mb-1">Apellido</label>
                    <input
                      className="w-2/3 border rounded px-3 py-2"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="destino">
                {(field) => (
                  <div className="mb-3">
                    <label className="block font-semibold mb-1 select-none">
                      Destino:
                    </label>
                    <select
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "internacional" | "nacional"
                        )
                      }
                      value={field.state.value ?? "internacional"}
                      className="border p-2 rounded w-1/2"
                    >
                      <option value="internacional">Internacional</option>
                      <option value="nacional">Nacional</option>
                    </select>
                  </div>
                )}
              </form.Field>

              <div className="mb-3">
                <label className="block font-semibold mb-1 select-none">
                  Fecha creación
                </label>
                <p>
                  {trip?.fecha && new Date(trip.fecha).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block font-semibold mb-1 select-none">
                  Estado
                </label>
                <p>{trip?.estado && renderEstado(trip.estado)}</p>
              </div>
            </div>

            {/* Detalle económico */}
            <div className="border border-gray-300 rounded-xl p-4 w-full">
              <h1 className="font-bold text-xl text-blue-600 mb-3 select-none">
                Detalle económico:
              </h1>

              {/* Moneda + (si aplica) cotización USD en ARS al lado */}
              <div className="mb-3 flex items-start gap-6">
                <div className="w-1/2">
                  <label className="block font-semibold mb-1 select-none">
                    Moneda
                  </label>
                  <form.Field name="moneda">
                    {(field) => (
                      <select
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        className="border p-2 rounded w-full"
                      >
                        <option value={1}>ARS</option>
                        <option value={2}>USD</option>
                      </select>
                    )}
                  </form.Field>
                </div>

                <form.Subscribe selector={(state) => state.values.moneda}>
                  {(moneda) =>
                    moneda === 2 ? (
                      <div className="w-1/2">
                        <form.Field
                          name="valor_tasa_cambio"
                          validators={{
                            onSubmit: ({ value }) => {
                              if (Number(moneda) === 2) {
                                if (value == null)
                                  return "La cotización es obligatoria para viajes en USD";
                                if (Number(value) <= 0)
                                  return "La cotización debe ser mayor a 0";
                              }
                            },
                          }}
                        >
                          {(field) => (
                            <div>
                              <label className="block font-semibold mb-1 select-none">
                                Cotización USD en ARS
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
                                  const soloNumeros = e.target.value.replace(
                                    /\D/g,
                                    ""
                                  );
                                  field.handleChange(
                                    soloNumeros === ""
                                      ? null
                                      : Number(soloNumeros)
                                  );
                                }}
                                className="border p-2 rounded w-full"
                              />

                              {field.state.meta.errors.length > 0 && (
                                <em className="text-red-600 text-sm">
                                  {field.state.meta.errors.join(", ")}
                                </em>
                              )}
                            </div>
                          )}
                        </form.Field>
                      </div>
                    ) : (
                      <div className="w-1/2"></div>
                    )
                  }
                </form.Subscribe>
              </div>

              <form.Field name="valor_total">
                {(field) => (
                  <div className="mb-3">
                    <label className="block font-semibold mb-1 select-none">
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
                      className="border p-2 rounded w-1/2"
                    />
                  </div>
                )}
              </form.Field>



              <div className="mb-3">
                <label className="block font-semibold mb-1 select-none">
                  Costo
                </label>
                <p>${trip?.costo && formattedAmount(trip.costo)}</p>
              </div>

              <div>
                <label className="block font-semibold mb-1 select-none">
                  Ganancia
                </label>
                <p>${trip?.ganancia && formattedAmount(trip.ganancia)}</p>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="border border-gray-300 rounded-xl p-4">
            <h1 className="font-bold text-xl text-blue-600 mb-4 select-none">
              Servicios:
            </h1>

            <form.Field name="servicios">
              {(field) => (
                <div className="flex flex-col gap-3 px-10">
                  {(field.state.value ?? []).map((s, index) => {
                    return (
                      <div
                        key={s.id}
                        className="flex flex-wrap items-center justify-between gap-3 border p-3 rounded-md select-none"
                      >
                        {/* Nombre */}
                        <div className="capitalize w-40 font-semibold">
                          {
                            services?.data?.find(
                              (service) => service.id === s.id
                            )?.nombre
                          }
                        </div>

                        {/* Valor */}
                        <div className="flex flex-col">
                          <label className="block text-xs font-semibold mb-1 select-none">
                            Valor:
                          </label>
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
                                const newServicios = [
                                  ...(field.state.value ?? []),
                                ];
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
                        </div>

                        {/* Moneda */}
                        <div className="flex flex-col">
                          <label className="block text-xs font-semibold mb-1 select-none">
                            Moneda:
                          </label>
                          <select
                            className="border p-2 rounded"
                            value={s.moneda}
                            onChange={(e) => {
                              const newServicios = [
                                ...(field.state.value ?? []),
                              ];
                              newServicios[index] = {
                                ...s,
                                moneda: Number(e.target.value),
                              };
                              field.handleChange(newServicios);
                            }}
                          >
                            <option value={1}>ARS</option>
                            <option value={2}>USD</option>
                          </select>
                        </div>


                        {/* Verifica si aplica cotización (Mostrar SIEMPRE salvo que AMBOS sean ARS) */}
                        {!(Number(field.form.getFieldValue("moneda")) === 1 && Number(s.moneda) === 1) && (
                          <div className="flex flex-col">
                            <label className="block text-xs font-semibold mb-1 select-none">
                              Cotización:
                            </label>
                            <input
                              type="number"
                              value={
                                s.cotizacion ?? ""
                              }
                              onChange={(e) => {
                                const newServicios = [
                                  ...(field.state.value ?? []),
                                ];
                                const soloNumeros = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                newServicios[index] = {
                                  ...s,
                                  cotizacion: soloNumeros === "" ? null : Number(soloNumeros),
                                };
                                field.handleChange(newServicios);
                              }}
                              className="border p-2 rounded w-24"
                            />
                          </div>
                        )}

                        {/* Pagado por */}
                        <div className="flex flex-col">
                          <label className="block text-xs font-semibold mb-1 select-none">
                            Pagado por:
                          </label>
                          <select
                            className="border p-2 rounded"
                            value={s.pagado_por}
                            onChange={(e) => {
                              const newServicios = [
                                ...(field.state.value ?? []),
                              ];
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
                        </div>

                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const nombreServicio = services?.data.find(
                              (service) => service.id === s.id
                            )?.nombre;

                            toast.warning(
                              `¿Estás seguro de que quieres eliminar el servicio "${nombreServicio}"?`,
                              {
                                duration: 2200,
                                action: {
                                  label: "Eliminar",
                                  onClick: () => {
                                    deleteServiceMutate({
                                      serviceId: s.id!,
                                      tripId: trip!.id,
                                    });

                                    const newServicios = (
                                      field.state.value ?? []
                                    ).filter((serv) => serv.id !== s.id);
                                    field.handleChange(newServicios);
                                  },
                                },
                              }
                            );
                          }}
                          className="text-red-500 rounded-full hover:text-red-600"
                        >
                          <IoCloseCircle size={30} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Agregar servicio */}
                  {add &&
                    services?.data.some(
                      (s) =>
                        !(field.state.value ?? []).some((fs) => fs.id === s.id)
                    ) && (
                      <div className="flex items-center justify-between gap-3 border p-3 rounded-md border-blue-500 shadow-sm">
                        <select
                          className="border p-2 rounded w-40 capitalize"
                          onChange={(e) => {
                            const serviceId = Number(e.target.value);

                            if (!serviceId) return;

                            const serviceToAdd = services?.data?.find(
                              (s) => s.id === serviceId
                            );

                            if (!serviceToAdd) return;

                            field.handleChange([
                              ...(field.state.value ?? []),
                              {
                                id: serviceToAdd.id,
                                valor: 0,
                                pagado_por: "pendiente",
                                moneda: Number(trip?.moneda) ?? 1,
                                cotizacion: null,
                              },
                            ]);

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
                          {services?.data
                            ?.filter(
                              (s) =>
                                !(field.state.value ?? []).some(
                                  (fs) => fs.id === s.id
                                )
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
                            disabled
                          />
                        </div>

                        <select className="border p-2 rounded" disabled>
                          <option>Pendiente</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => setAdd(false)}
                          className="text-red-500 rounded-full hover:text-red-600"
                        >
                          <IoCloseCircle size={30} />
                        </button>
                      </div>
                    )}

                  {services?.data?.some(
                    (s) =>
                      !(field.state.value ?? []).some((fs) => fs.id === s.id)
                  ) && (
                      <button
                        type="button"
                        className="border-blue-500 border-2 text-blue-500 self-center flex items-center rounded-full hover:bg-blue-500 hover:text-white transition py-2 px-4"
                        onClick={() => setAdd(true)}
                      >
                        <IoIosAdd className="mr-2" />
                        Agregar servicio
                      </button>
                    )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEdit(false)}
              className="bg-blue-600 text-white rounded-full py-2 px-6 font-semibold transition-all flex items-center gap-2 hover:bg-blue-700"
            >
              <IoCloseCircle />
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEdit(false);
              }}
              className="bg-red-500 text-white rounded-full py-2 px-6 font-semibold transition-all flex items-center gap-2 hover:bg-red-600"
            >
              <IoIosRemove />
              Eliminar viaje
            </button>

            <button
              type="submit"
              className="bg-green-500 text-white rounded-full py-2 px-6 font-semibold transition-all flex items-center gap-2 hover:bg-green-600"
            >
              <IoIosAdd />
              Guardar cambios
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
