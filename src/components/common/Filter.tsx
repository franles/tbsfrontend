import { IoFunnelOutline } from "react-icons/io5";

type Props = {
  filter?: string;
  setFilter?: (filter: string) => void;
  year?: number | null;
  setYear?: (year: number) => void;
  month?: number | null;
  setMonth?: (month: number | null) => void;
  currency?: "ARS" | "USD" | null;
  setCurrency?: (currency: "ARS" | "USD" | null) => void;
};

export const Filter = ({
  filter,
  year,
  month,
  currency,
  setFilter,
  setYear,
  setMonth,
  setCurrency,
}: Props) => {
  return (
    <div className="flex gap-3 items-center">
      <IoFunnelOutline size={30} className="text-gray-400 mr-2 ml-6" />
      {setFilter && (
        <div className="flex flex-col">
          <span className="font-semibold">Tipo:</span>
          <select
            name="filtro"
            id="filtro"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter ?? "desc"}
            className="w-[120px] border border-gray-300 rounded px-2 py-1 shadow-sm"
          >
            <option value="asc">Antiguos</option>
            <option value="desc">Recientes</option>
            <option value="pendiente">Pendiente</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>
      )}

      {/* Año */}
      {setYear && (
        <div className="flex flex-col">
          <span className="font-semibold">Año:</span>
          <select
            onChange={(e) => {
              setYear(Number(e.target.value));
            }}
            value={year ?? ""}
            className="w-[90px] border border-gray-300 rounded px-2 py-1 shadow-sm"
          >
            <option value={""}>Año</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
      )}

      {/* Mes */}
      {setMonth && (
        <div className="flex flex-col">
          <span className="font-semibold">Mes:</span>
          <select
            value={month ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setMonth(val === "" ? null : Number(val));
            }}
            className="w-[100px] border border-gray-300 rounded px-2 py-1 shadow-sm capitalize"
          >
            <option value={""}>Mes</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("es-AR", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Moneda */}
      {setCurrency && (
        <div className="flex flex-col">
          <span className="font-semibold">Moneda:</span>
          <select
            onChange={(e) => {
              const val = e.target.value;
              setCurrency(val === "" ? null : (val as "ARS" | "USD"));
            }}
            value={currency ?? ""}
            className="w-[105px] border border-gray-300 rounded px-2 py-1 shadow-sm"
          >
            <option value={""}>ARS/USD</option>
            <option value="ARS">ARS</option>
            <option value="USD">USD</option>
          </select>
        </div>
      )}
    </div>
  );
};
