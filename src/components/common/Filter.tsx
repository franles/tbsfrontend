type Props = {
  filter?: string;
  setFilter?: (filter: string) => void;
  year?: number | null;
  setYear?: (year: number | null) => void;
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
  setMonth,
  setYear,
  setCurrency,
}: Props) => {
  return (
    <div className="flex gap-3 flex-wrap items-center">
      {/* Tipo */}
      {setFilter && (
        <select
          name="filtro"
          id="filtro"
          onChange={(e) => {
            setFilter(e.target.value);
            setMonth && setMonth(null);
            setYear && setYear(null);
          }}
          value={filter ?? "desc"}
          className="w-[120px] border border-gray-300 rounded px-2 py-1 shadow-sm "
        >
          <option value={""}>Tipo</option>
          <option value="asc">Antiguos</option>
          <option value="desc">Recientes</option>
          <option value="pendiente">Pendiente</option>
          <option value="finalizado">Finalizado</option>
        </select>
      )}

      {/* Mes */}
      {setMonth && (
        <select
          onChange={(e) => {
            const val = e.target.value;
            setMonth(val === "" ? null : Number(val));
          }}
          value={month ?? ""}
          className="w-[100px] border border-gray-300 rounded px-2 py-1 shadow-sm"
        >
          <option value={""}>Mes</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("es-AR", { month: "long" })}
            </option>
          ))}
        </select>
      )}

      {/* Año */}
      {setYear && (
        <select
          onChange={(e) => {
            const val = e.target.value;
            setYear(val === "" ? null : Number(val));
          }}
          value={year ?? ""}
          className="w-[90px] border border-gray-300 rounded px-2 py-1 shadow-sm "
        >
          <option value={""}>Año</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
      )}

      {/* Moneda */}
      {setCurrency && (
        <select
          onChange={(e) => {
            const val = e.target.value;
            setCurrency(val === "" ? null : (val as "ARS" | "USD"));
          }}
          value={currency ?? ""}
          className="w-[100px] border border-gray-300 rounded px-2 py-1 shadow-sm "
        >
          <option value={""}>Moneda</option>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>
      )}
    </div>
  );
};
