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
    },
  });

  console.log(services);
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-black">
      <BtnCloseModal onCLick={() => setIsCreate(false)} />

      <section>
        <h1>Crear viaje</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-wrap gap-5">
            <form.Field name="apellido">
              {(field) => (
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Apellido:</label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="border p-2  rounded"
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="valor_total">
              {(field) => (
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Valor:</label>
                  <input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="border p-2  rounded"
                    required
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="destino">
              {(field) => (
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Destino:</label>
                  <select
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value as "nacional" | "internacional" | ""
                      )
                    }
                  >
                    <option value="">Seleccionar</option>
                    <option value="internacional">Internacional</option>
                    <option value="nacional">Nacional</option>
                  </select>
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
                  <div>
                    {services?.servicios.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-2 mb-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(service.id)}
                          onChange={() => toggleService(service.id)}
                        />
                        {service.nombre}
                      </label>
                    ))}
                  </div>
                );
              }}
            </form.Field>
          </div>

          <button type="submit">Crear viaje</button>
        </form>
      </section>
    </div>
  );
};
