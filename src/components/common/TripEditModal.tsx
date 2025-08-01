import { useTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { CgClose } from "react-icons/cg";

export const TripEditModal = () => {
  const { setIsEditOpen } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: trip } = useTrip(tripId!);

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative animate-fadeIn text-black">
      <button
        onClick={() => {
          setTripId(null);
          setIsEditOpen(false);
        }}
        className="absolute top-3 right-3 text-red-500 transition"
      >
        <CgClose size={30} />
      </button>

      <section className="flex flex-col items-center gap-10">
        <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2">
          MODIFICAR LEGAJO Nº <span className="underline">{trip?.viaje.id}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          <div className="border border-gray-300 rounded-xl p-4">
            <h1 className="font-bold text-xl text-blue-600 mb-3">Información:</h1>
            <span className="flex gap-1 font-semibold mb-2">
              Apellido: <p className="font-normal ml-3">{trip?.viaje.apellido}</p>
            </span>
            <span className="capitalize flex gap-1 font-semibold mb-2">
              Destino: <p className="font-normal ml-3">{trip?.viaje.destino}</p>
            </span>
            <span className="flex gap-1 font-semibold">
              Fecha creación:{" "}
              <p className="font-normal ml-3">
                {trip?.viaje.fecha &&
                  new Date(trip.viaje.fecha).toLocaleDateString()}
              </p>
            </span>
          </div>

          <div className="border border-gray-300 rounded-xl p-4">
            <h1 className="font-bold text-xl text-blue-600 mb-3">Detalle económico:</h1>
            <span className="flex gap-1 font-semibold mb-2">
              Moneda: <p className="font-normal ml-3">${trip?.viaje.moneda}</p>
            </span>
            <span className="flex gap-1 font-semibold mb-2">
              Valor total: <p className="font-normal ml-3">${trip?.viaje.valor_total}</p>
            </span>
            <span className="flex gap-1 font-semibold mb-2">
              Costo: <p className="font-normal ml-3">${trip?.viaje.costo}</p>
            </span>
            <span className="flex gap-1 font-semibold">
              Ganancia: <p className="font-normal ml-3">${trip?.viaje.ganancia}</p>
            </span>
          </div>

          <div className="border border-gray-300 rounded-xl p-4 col-span-full">
            <h1 className="font-bold text-xl text-blue-600 mb-2">Servicios:</h1>
            {trip?.viaje.servicios?.length ? (
              trip.viaje.servicios.map((s) => (
                <div
                  key={s.id}
                  className="flex flex-wrap gap-7 pl-2 border-l-4 border-blue-400 mb-2"
                >
                  <span>{s.nombre}</span>
                  <span>Valor: ${s.valor}</span>
                  <span>Pagado por: {s.pagado_por}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay servicios cargados.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
