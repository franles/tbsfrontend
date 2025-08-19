import { useCreateServices, useServices } from "../hooks/useServices";
import { useCreateTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import type { CreateTripForm } from "../types/types";
import { BtnCloseModal } from "./BtnCloseModal";
import { useForm } from "@tanstack/react-form";
export const TripCreateModal = () => {
  const { setIsCreate } = modalStore();
  const { data: services } = useServices();
  const { mutate: createServiceTrip } = useCreateServices();
  const { mutateAsync: createTrip } = useCreateTrip();
  const form = useForm({
    defaultValues: {
      valor_total: undefined,
      destino: "",
      apellido: "",
      servicios: [],
    } as CreateTripForm,
    onSubmit: async ({ value, formApi }) => {
      const trip = {
        valor_total: value.valor_total,
        destino: value.destino,
        apellido: value.apellido,
      };

      console.log("value.servicios:", value.servicios);

      try {
        const tripId = await createTrip(trip);
        if (!tripId) {
          throw new Error("Error: no se pudo crear el viaje");
        }
        const servicesValue = value.servicios.map((s) => ({
          servicio_id: s.servicio_id,
          viaje_id: tripId,
        }));

        console.log("Servicios a crear:", servicesValue);

        await Promise.all(
          servicesValue.map((service) => createServiceTrip(service))
        );

        formApi.reset();
      } catch (error) {
        console.error("Error creando viaje y servicio:", error);
      }
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
                const selectedIds = fieldArray.state.value.map(
                  (s) => s.servicio_id
                );

                const toggleService = (serviceId: number) => {
                  const exists = selectedIds.includes(serviceId);

                  if (exists) {
                    // quitar servicio
                    const indexToRemove = fieldArray.state.value.findIndex(
                      (s) => s.servicio_id === serviceId
                    );
                    if (indexToRemove !== -1) {
                      fieldArray.removeValue(indexToRemove);
                    }
                  } else {
                    fieldArray.pushValue({
                      servicio_id: serviceId,
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
