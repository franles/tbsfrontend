type Props = {
  filter: string | number | null;
  setFilter: React.Dispatch<React.SetStateAction<string | null | number>>;
};
export const Filter = ({ filter, setFilter }: Props) => {
  return (
    <select
      name="filtro"
      id="filtro"
      onChange={(e) => setFilter(e.target.value)}
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
      <optgroup label="Mes">
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
      </optgroup>
    </select>
  );
};
