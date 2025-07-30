import { useTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { CgClose } from "react-icons/cg";

export const TripEditModal = () => {
  const { setIsEditOpen } = modalStore();
  const { setTripId, tripId } = tripsStore();
  const { data: trip } = useTrip(tripId!);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-white">
      <button
        onClick={() => {
          setTripId(null);
          setIsEditOpen(false);
        }}
        className="absolute top-3 right-3 text-gray-300 transition"
      >
        <CgClose size={30} />
      </button>
      <section className="flex flex-col items-center gap-10">
        <h1 className="font-bold text-2xl">Legajo: {trip?.viaje.id}</h1>
        <div className="flex flex-wrap gap-5">
          <span className="flex gap-1 font-semibold ">
            Apellido: <p className="font-normal">{trip?.viaje.apellido}</p>
          </span>
          <span className="flex gap-1 font-semibold">
            Fecha:{" "}
            <p className="font-normal">
              {trip?.viaje.fecha &&
                new Date(trip.viaje.fecha).toLocaleDateString()}
            </p>
          </span>
          <span className="capitalize flex gap-1 font-semibold">
            Destino: <p className="font-normal">{trip?.viaje.destino}</p>
          </span>
          <span className="flex gap-1 font-semibold">
            Moneda: <p className="font-normal">${trip?.viaje.moneda}</p>
          </span>
          <span className="flex gap-1 font-semibold">
            Valor total:{" "}
            <p className="font-normal">${trip?.viaje.valor_total}</p>
          </span>
          <span className="flex gap-1 font-semibold">
            Costo: <p className="font-normal">${trip?.viaje.costo}</p>
          </span>
          <span className="flex gap-1 font-semibold">
            Ganancia: <p className="font-normal">${trip?.viaje.ganancia}</p>
          </span>
          <div className="capitalize">
            <span className="font-semibold">Servicios:</span>
            {trip?.viaje.servicios.map((s) => (
              <div key={s.id} className="flex gap-7">
                <span>{s.nombre}</span>
                <span>Valor: ${s.valor}</span>
                <span>Pagado por: {s.pagado_por}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
