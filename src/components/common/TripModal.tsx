import { useTrip } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { Spinner } from "./widget/Spinner";
import { IoPencil } from "react-icons/io5";
import { BtnCloseModal } from "./BtnCloseModal";
import { formattedAmount } from "../utils/utils";
import { renderEstado } from "../utils/utilsTsx";

export const TripModal = () => {
  const { tripId, setTripId } = tripsStore();
  const { data: tripResponse, isLoading } = useTrip(tripId!);
  const { setIsOpen, setIsEdit } = modalStore();

  const trip = tripResponse?.data;

  return (
    <div className="bg-white rounded-2xl shadow-lg w-[1070px] p-6 relative animate-fadeIn text-black">
      <BtnCloseModal
        onCLick={() => {
          setTripId(null);
          setIsOpen(false);
        }}
      />
      <button
        onClick={() => {
          setTripId(tripId);
          setIsOpen(false);
          setIsEdit(true);
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
        <section className="flex flex-col items-center gap-10 select-none">
          <h1 className="font-bold text-4xl text-blue-600 flex items-center gap-2 ">
            LEGAJO Nº {trip?.id}
          </h1>

          <div className="grid grid-cols-3 gap-5 w-full">
            {/* Columna 1: Información */}
            <div className="border border-gray-300 rounded-xl p-4 bg-gray-50">
              <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">
                Información:
              </h1>
              <span className="capitalize flex gap-1 font-semibold">
                Apellido: <p className="font-normal ml-2">{trip?.apellido}</p>
              </span>
              <span className="capitalize flex gap-1 font-semibold">
                Destino: <p className="font-normal ml-2">{trip?.destino}</p>
              </span>
              <span className="flex gap-1 font-semibold">
                Fecha creación:
                <p className="font-normal ml-2">
                  {trip?.fecha && new Date(trip.fecha).toLocaleDateString()}
                </p>
              </span>
              <span className="flex gap-1 font-semibold">
                Estado:
                <p className="font-normal ml-2">
                  {" "}
                  {trip?.estado && renderEstado(trip.estado)}
                </p>
              </span>
            </div>

            {/* Columna 2: Detalle económico ARS */}
            {(trip?.moneda?.toLowerCase() === "ars" ||
              trip?.moneda?.toLowerCase() === "mixto") ? (
              <div className="border border-gray-300 rounded-xl p-4 select-none bg-gray-50">
                <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">
                  Detalle económico ARS:
                </h1>
                <span className="flex gap-1 font-semibold">
                  Moneda: <p className="font-normal ml-2 uppercase">ARS</p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Valor total:{" "}
                  <p className="font-normal ml-2">
                    ${trip?.valor_total && formattedAmount(trip.valor_total)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Costo:{" "}
                  <p className="font-normal ml-2">
                    ${trip?.costo && formattedAmount(trip.costo)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Ganancia:{" "}
                  <p
                    className={`font-semibold ml-2 ${(trip?.ganancia ?? 0) < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    ${trip?.ganancia && formattedAmount(trip.ganancia)}
                  </p>
                </span>
              </div>
            ) : trip?.moneda?.toLowerCase() === "usd" ? (
              /* Si es USD puro, el detalle USD va en la columna 2 */
              <div className="border border-gray-300 rounded-xl p-4 select-none bg-gray-50">
                <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">
                  Detalle económico USD:
                </h1>
                <span className="flex gap-1 font-semibold">
                  Moneda: <p className="font-normal ml-2 uppercase">USD</p>
                </span>
                {trip?.cotizacion && (
                  <span className="flex gap-1 font-semibold">
                    Cotización USD en ARS:{" "}
                    <p className="font-normal ml-2">
                      ${formattedAmount(trip.cotizacion)}
                    </p>
                  </span>
                )}
                <span className="flex gap-1 font-semibold">
                  Valor total:{" "}
                  <p className="font-normal ml-2">
                    U$D {trip?.valor_total_usd && formattedAmount(trip.valor_total_usd)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Costo:{" "}
                  <p className="font-normal ml-2">
                    U$D {trip?.costo_usd && formattedAmount(trip.costo_usd)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Ganancia:{" "}
                  <p
                    className={`font-semibold ml-2 ${(trip?.ganancia_usd ?? 0) < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    U$D {trip?.ganancia_usd && formattedAmount(trip.ganancia_usd)}
                  </p>
                </span>
              </div>
            ) : (
              <div />
            )}

            {/* Columna 3: Detalle económico USD (solo para Mixto) */}
            {trip?.moneda?.toLowerCase() === "mixto" ? (
              <div className="border border-gray-300 rounded-xl p-4 select-none bg-gray-50">
                <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-3">
                  Detalle económico USD:
                </h1>
                <span className="flex gap-1 font-semibold">
                  Moneda: <p className="font-normal ml-2 uppercase">USD</p>
                </span>
                {trip?.cotizacion && (
                  <span className="flex gap-1 font-semibold">
                    Cotización USD en ARS:{" "}
                    <p className="font-normal ml-2">
                      ${formattedAmount(trip.cotizacion)}
                    </p>
                  </span>
                )}
                <span className="flex gap-1 font-semibold">
                  Valor total:{" "}
                  <p className="font-normal ml-2">
                    U$D {trip?.valor_total_usd && formattedAmount(trip.valor_total_usd)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Costo:{" "}
                  <p className="font-normal ml-2">
                    U$D {trip?.costo_usd && formattedAmount(trip.costo_usd)}
                  </p>
                </span>
                <span className="flex gap-1 font-semibold">
                  Ganancia:{" "}
                  <p
                    className={`font-semibold ml-2 ${(trip?.ganancia_usd ?? 0) < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    U$D {trip?.ganancia_usd && formattedAmount(trip.ganancia_usd)}
                  </p>
                </span>
              </div>
            ) : (
              <div />
            )}

            <div className="border border-gray-300 rounded-xl p-4 col-span-full">
              <h1 className="font-bold text-xl text-blue-600 flex items-center gap-2 mb-2 select-none">
                Servicios:
              </h1>

              {/* Encabezado */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-base mb-4 px-1 select-none">
                <span className="col-span-2">Nombre:</span>
                <span className="col-span-1">Valor:</span>
                <span className="col-span-1">Moneda:</span>
                <span className="col-span-2">Cotización:</span>
                <span className="col-span-1">Pago:</span>
                <span className="col-span-5">Observación:</span>
              </div>

              {/* Servicios */}
              {trip?.servicios?.length ? (
                <div className="flex flex-col gap-3 select-none ">
                  {trip.servicios.map((s) => (
                    <div
                      key={s.id}
                      className="grid grid-cols-12 gap-4 items-center border-l-4 px-1 border-blue-400"
                    >
                      <span className="col-span-2 capitalize text-sm">{s.nombre}</span>
                      <span className="col-span-1 text-sm">${s.valor && formattedAmount(s.valor)}</span>
                      <span className="col-span-1 uppercase text-sm">{s.moneda}</span>
                      <span className="col-span-2 text-sm">
                        {!(
                          trip?.moneda?.toLowerCase() === "ars" &&
                          s.moneda?.toLowerCase() === "ars"
                        ) && s.cotizacion
                          ? `$${formattedAmount(s.cotizacion)}`
                          : "-"}
                      </span>
                      <span className="col-span-1 capitalize text-sm">
                        {s.pagado_por === "pendiente"
                          ? renderEstado(s.pagado_por)
                          : s.pagado_por}
                      </span>
                      <span className="col-span-5 text-sm italic text-gray-600 truncate">
                        {s.observacion || "-"}
                      </span>
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
