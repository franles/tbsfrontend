import { useServices } from "../hooks/useServices";
import { useCreateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import type { CreateTripData, CreateTripFormData } from "../types/types";
import { BtnCloseModal } from "./BtnCloseModal";
import { useForm } from "@tanstack/react-form";
import React, { useState, useEffect } from "react";



export const TripCreateModal = () => {
  const { setIsCreate } = modalStore();
  const { data: services } = useServices();
  const { mutateAsync: createTrip } = useCreateTrip();

  const form = useForm({
    defaultValues: {
      valor_usd: 0,
      moneda: 0,
      valor_total: 0,
      destino: "",
      apellido: "",
      fecha_ida: "",
      fecha_vuelta: "",
      servicios: [],
    } as CreateTripData,
    onSubmit: ({ value, formApi }) => {
      const trip: CreateTripFormData = {
        fecha_ida: new Date(value.fecha_ida),
        fecha_vuelta: new Date(value.fecha_vuelta),
        moneda: value.moneda,
        destino: value.destino,
        apellido: value.apellido,
        valor_total: value.valor_total,
        //valor_usd: value.valor_usd,
        servicios: value.servicios.map((s) => ({
          id: s.id,
          valor: 0,
          pagado_por: "pendiente",
          moneda: value.moneda,
        })),
      };
      createTrip(trip);
      formApi.reset();
      setIsCreate(false);
    },
  });


  //  🔥🔥🔥 PUNTO 2 VA EXACTAMENTE AQUÍ 🔥🔥🔥
  const [selectedMoneda, setSelectedMoneda] = useState<number>(
    form.getFieldValue("moneda") ?? 0
  );

  useEffect(() => {
    const m = form.getFieldValue("moneda");
    setSelectedMoneda(m ?? 0);
  }, []);
  //  🔥🔥🔥 FIN DEL PUNTO 2 🔥🔥🔥

  console.log(services);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-black">
      <BtnCloseModal onCLick={() => setIsCreate(false)} />

      <section>
        <div className="flex flex-col items-center gap-10 w-full mb-10">
          <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2 select-none">
            CREAR VIAJE
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className=" flexflex-wrap gap-5 items-center select-none">
            <div className="flex">
              <form.Field
                name="apellido"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">
                      Apellido:
                    </label>
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border p-2  rounded"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="destino"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">Destino:</label>
                    <select
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as "nacional" | "internacional" | ""
                        )
                      }
                      value={field.state.value}
                      className="border p-2  rounded"
                    >
                      <option value="">Seleccionar</option>
                      <option value="internacional">Internacional</option>
                      <option value="nacional">Nacional</option>
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>
            </div>
            <div className="flex">
              <form.Field
                name="valor_total"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">Valor:</label>
                    <input
                      type="text"
                      value={
                        field.state.value &&
                        new Intl.NumberFormat("es-AR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(field.state.value)
                      }
                      onChange={(e) => {
                        const soloNumeros = e.target.value.replace(/\D/g, "");
                        field.handleChange(Number(soloNumeros));
                      }}
                      className="border p-2  rounded"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="moneda"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">Moneda:</label>
                    <select
                      onChange={(e) => {
                        const val = Number(e.target.value) as 0 | 1 | 2;
                        field.handleChange(val);        // actualiza el form
                        setSelectedMoneda(val);         // actualiza estado local

                        // --- manejar el valor_usd automáticamente ---
                        if (val === 2) {
                          // USD → mostrar el campo y poner valor por defecto
                          form.setFieldValue("valor_usd", 0);
                        } else {
                          // ARS → ocultar y borrar valor_usd
                          form.setFieldValue("valor_usd", undefined);
                        }
                      }}
                      value={field.state.value ?? 0}
                      className="border p-2  rounded"
                    >
                      <option value={0}>Seleccionar</option>
                      <option value={1}>ARS</option>
                      <option value={2}>USD</option>
                    </select>
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Mostrar valor usd si  moneda = USD */}
              {selectedMoneda === 2 && (
                <form.Field
                  name="valor_usd"
                  validators={{
                    onSubmit: ({ value }) => {
                      if (!value) return "Este campo es obligatorio cuando la moneda es USD";
                      if (value <= 0) return "La cotización debe ser mayor a 0";
                    },
                  }}
                >
                  {(field) => (
                    <div className="mb-4 flex flex-col ml-4">
                      <label className="block font-semibold mb-1">
                        Cotización USD en ARS:
                      </label>

                      <input
                        type="number"
                        value={
                          typeof field.state.value === "number"
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
                        className="border p-2 rounded"
                      />

                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  )}
                </form.Field>
              )}

              {/* <form.Field
                name="valor_usd"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "Este campo es obligatorio";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">Cotizacion USD en ARS:</label>
                    <input
                      type="text"
                      value={
                        field.state.value &&
                        new Intl.NumberFormat("es-AR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(field.state.value)
                      }
                      onChange={(e) => {
                        const soloNumeros = e.target.value.replace(/\D/g, "");
                        field.handleChange(Number(soloNumeros));
                      }}
                      className="border p-2  rounded"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field> */}
            </div>
            <div className="flex">
              <form.Field
                name="fecha_ida"
                validators={{
                  onSubmit: ({ value }) => {
                    if (!value) return "La fecha de ida es obligatoria";
                  },
                }}
              >
                {(field) => (
                  <div className="mb-4 flex flex-col">
                    <label className="block font-semibold mb-1">
                      Fecha de ida:
                    </label>
                    <input
                      type="date"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border p-2 rounded"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <em className="text-red-600 text-sm">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="fecha_vuelta"
                validators={{
                  onSubmit: ({ value, fieldApi }) => {
                    if (!value) return "La fecha de vuelta es obligatoria";
                    const fechaIda = fieldApi.form.getFieldValue("fecha_ida");
                    if (fechaIda && value < fechaIda) {
                      return "La vuelta no puede ser antes que la ida";
                    }
                  },
                }}
              >
                {(field) => {
                  const fechaIda = field.form.getFieldValue(
                    "fecha_ida"
                  ) as string;
                  return (
                    <div className="mb-4 flex flex-col">
                      <label className="block font-semibold mb-1">
                        Fecha de vuelta:
                      </label>
                      <input
                        type="date"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border p-2 rounded"
                        min={fechaIda} // 👈 string YYYY-MM-DD
                      />
                      {field.state.meta.errors.length > 0 && (
                        <em className="text-red-600 text-sm">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      )}
                    </div>
                  );
                }}
              </form.Field>
            </div>
            <form.Field name="servicios">
              {(fieldArray) => {
                const selectedIds = fieldArray.state.value.map((s) => s.id);

                const toggleService = (serviceId: number) => {
                  const currentValues = fieldArray.state.value;
                  const exists = currentValues.some((s) => s.id === serviceId);

                  if (exists) {
                    const indexToRemove = currentValues.findIndex(
                      (s) => s.id === serviceId
                    );
                    if (indexToRemove !== -1) {
                      fieldArray.removeValue(indexToRemove);
                    }
                  } else {
                    fieldArray.pushValue({
                      id: serviceId,
                      valor: 0,
                      pagado_por: "pendiente",
                    });
                  }
                };

                return (
                  <div className="flex flex-col select-none">
                    <label className="block font-semibold mb-3">
                      Servicios:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {services?.data.map((service) => (
                        <label
                          key={service.id}
                          className="flex items-center gap-2 mb-2 cursor-pointer capitalize"
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(service.id)}
                            onChange={() => toggleService(service.id)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          {service.nombre}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              }}
            </form.Field>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/4 py-2 mt-6 bg-blue-600 text-white rounded hover:bg-blue-700 select-none"
            >
              Crear viaje
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
