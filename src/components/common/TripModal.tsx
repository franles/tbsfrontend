import { useTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { Spinner } from "./widget/Spinner";
import { IoClose } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";

export const TripModal = () => {
  const { tripId, setTripId } = tripsStore();
  const { data: trip, isLoading } = useTrip(tripId!);
  const { setIsOpen, setIsEditOpen } = modalStore();
  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-black">
      <button
        onClick={() => {
          setTripId(null);
          setIsOpen(false);
        }}
        className="absolute top-2 right-3 text-red-500 transition"
      >
        <IoClose size={40} />
      </button>

      <button
        onClick={() => {
          setTripId(tripId);
          setIsOpen(false);
          setIsEditOpen(true);
        }}
        className="absolute top-3 right-14 text-blue-600 transition"
      >
        <IoPencil size={30} />
      </button>

      {isLoading ? (
        <div className="text-center text-gray-500 ">
          <Spinner size={40} text="Cargando..." />
        </div>
      ) : (

        <section className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2">
            LEGAJO Nº {trip?.viaje.id}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            <div className="border border-gray-300 rounded-xl p-4">
              <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">Información:</h1>
              <span className="flex gap-1 font-semibold">
                Apellido: <p className="font-normal ml-3">{trip?.viaje.apellido}</p>
              </span>
              <span className="capitalize flex gap-1 font-semibold">
                Destino: <p className="font-normal ml-3">{trip?.viaje.destino}</p>
              </span>
              <span className="flex gap-1 font-semibold">
                Fecha creación:
                <p className="font-normal ml-3">
                  {trip?.viaje.fecha &&
                    new Date(trip.viaje.fecha).toLocaleDateString()}
                </p>
              </span>
            </div>

            <div className="border border-gray-300 rounded-xl p-4">
              <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">Detalle económico: </h1>
              <span className="flex gap-1 font-semibold">
                Moneda: <p className="font-normal ml-3">${trip?.viaje.moneda}</p>
              </span>
              <span className="flex gap-1 font-semibold">
                Valor total: <p className="font-normal ml-3">${trip?.viaje.valor_total}</p>
              </span>
              <span className="flex gap-1 font-semibold">
                Costo: <p className="font-normal ml-3">${trip?.viaje.costo}</p>
              </span>
              <span className="flex gap-1 font-semibold">
                Ganancia: <p className="font-normal ml-3">${trip?.viaje.ganancia}</p>
              </span>
            </div>

<div className="border border-gray-300 rounded-xl p-4 col-span-full">
  <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-2">
    Servicios:
  </h1>

  {/* Encabezado */}
  <div className="grid grid-cols-12 gap-2 font-semibold text-sm mb-2 px-1">
    <span className="col-span-4">Nombre</span>
    <span className="col-span-3">Valor</span>
    <span className="col-span-4">Pagado por</span>
  </div>

  {/* Servicios */}
  {trip?.viaje.servicios?.length ? (
    <div className="flex flex-col gap-2 border-l-4 border-blue-400 px-1">
      {trip.viaje.servicios.map((s) => (
        <div key={s.id} className="grid grid-cols-12 gap-2 items-center">
          <span className="col-span-4">{s.nombre}</span>
          <span className="col-span-3">${s.valor}</span>
          <span className="col-span-4">{s.pagado_por}</span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No hay servicios cargados.</p>
  )}
</div>


          </div>
        </section>

      )}
    </div>
  );
};
