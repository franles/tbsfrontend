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
    <div>
      <select
        name="filtro"
        id="filtro"
        onChange={(e) => {
          setFilter(e.target.value);
          setMonth(null);
          setYear(null);
        }}
        value={filter ?? "desc"}
        className="mb-4 border border-black w-28 text-sm "
      >
        <optgroup label="Orden por fecha">
          <option value="asc">Más antiguos</option>
          <option value="desc">Más recientes</option>
        </optgroup>
        <optgroup label="Estado">
          <option value="pendiente">Pendiente</option>
          <option value="finalizado">Finalizado</option>
        </optgroup>
      </select>

      <select
        onChange={(e) => {
          const val = e.target.value;
          setMonth(val === "" ? null : Number(val));
        }}
        value={month !== null ? month : ""}
        className="mb-4 border border-black w-28 text-sm "
      >
        <option value={""}>Seleccionar</option>
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
        className="mb-4 border border-black w-28 text-sm "
      >
        <option value={""}>Seleccionar</option>
        <option value={2025}>2025</option>
      </select>
    </div>
  );
};
