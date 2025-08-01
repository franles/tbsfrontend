type Props = {
  filter: string;
  setFilter: (filter: string) => void;
  month: number | null;
  setMonth: (month: number | null) => void;
  year: number | null;
  setYear: (year: number | null) => void;
};

export const Filter = ({
  filter,
  year,
  month,
  setFilter,
  setMonth,
  setYear,
}: Props) => {
  return (
    <div className="flex gap-3 flex-wrap items-center">
    <select
  name="filtro"
  id="filtro"
  onChange={(e) => {
    setFilter(e.target.value);
    setMonth(null);
    setYear(null);
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

<select
  onChange={(e) => {
    const val = e.target.value;
    setMonth(val === "" ? null : Number(val));
  }}
  value={month !== null ? month : ""}
  className="w-[100px] border border-gray-300 rounded px-2 py-1 shadow-sm"
>
  <option value={""}>Mes</option>
  <option value={1}>Enero</option>
  <option value={2}>Febrero</option>
  <option value={3}>Marzo</option>
  <option value={4}>Abril</option>
  <option value={5}>Mayo</option>
  <option value={6}>Junio</option>
  <option value={7}>Julio</option>
  <option value={8}>Agosto</option>
  <option value={9}>Septiembre</option>
  <option value={10}>Octubre</option>
  <option value={11}>Noviembre</option>
  <option value={12}>Diciembre</option>
</select>

<select
  onChange={(e) => {
    const val = e.target.value;
    setYear(val === "" ? null : Number(val));
  }}
  value={year !== null ? year : ""}
  className="w-[90px] border border-gray-300 rounded px-2 py-1 shadow-sm "
>
  <option value={""}>Año</option>
  <option value={2025}>2025</option>
</select>

    </div>
  );
};
