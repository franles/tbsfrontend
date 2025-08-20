import { useServices } from "../hooks/useServices";
import { useCreateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import type { CreateTripData } from "../types/types";
import { BtnCloseModal } from "./BtnCloseModal";
import { useForm } from "@tanstack/react-form";
export const TripCreateModal = () => {
  const { setIsCreate } = modalStore();
  const { data: services } = useServices();
  const { mutateAsync: createTrip } = useCreateTrip();

  const form = useForm({
    defaultValues: {
      valor_total: 0,
      destino: "",
      apellido: "",
      servicios: [],
    } as CreateTripData,
    onSubmit: ({ value, formApi }) => {
      const trip: CreateTripData = {
        destino: value.destino,
        apellido: value.apellido,
        valor_total: value.valor_total,
        servicios: value.servicios.map((s) => ({
          id: s.id,
          valor: 0,
          pagado_por: "pendiente",
        })),
      };
      createTrip(trip);
      formApi.reset();
      setIsCreate(false);
    },
  });

  console.log(services);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-black">
      <BtnCloseModal onCLick={() => setIsCreate(false)} />

      <section>
        <h1 className="text-center font-bold text-2xl text-blue-500 mb-6">
          Crear viaje
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-wrap gap-5 items-center">
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
                  <label className="block font-semibold mb-1">Apellido:</label>
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
                  <div className="flex flex-col">
                    <label className="block font-semibold mb-1">
                      Servicios:
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {services?.servicios.map((service) => (
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

          <button
            type="submit"
            className="rounded-md px-2 py-1 bg-blue-500 text-white font-semibold hover:bg-blue-400"
          >
            Crear viaje
          </button>
        </form>
      </section>
    </div>
  );
};
