import { useFinance } from "../hooks/useFinance";
import { financeStore } from "../store/financeStore";
import { Table } from "../layout/Table";
import { Filter } from "../common/Filter"; // importa el componente Filter

function Annual() {
  const { year, month, currency, setYear, setMonthFinance, setCurrency } = financeStore();
  const { data: finance } = useFinance();

  const headers = [
    { label: "Mes", key: "mes" },
    { label: "Ingreso", key: "ingreso" },
    { label: "Egreso", key: "egreso" },
    { label: "Ganancia", key: "ganancia" },
  ];

  return (
    <div className="p-6">
      {/* Banner */}
      <div className="relative h-[225px] bg-cover bg-[center_top_53%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274364/anual_ffm5o0.jpg')]">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white drop-shadow-lg text-center mt-10">
            Resumen Anual
          </h1>
        </div>
      </div>

      {/* Filtros */}
<Filter
  year={year}
  setYear={setYear}
  month={month}
  setMonth={setMonthFinance}
  currency={currency}
  setCurrency={setCurrency}
/>


      <Table
        headers={headers}
        data={finance ?? []}
        renderRow={(item: any) => (
          <tr key={item.mes} className="border-b hover:bg-gray-50">
            <td className="p-3">{item.mes}</td>
            <td className="p-3">{item.ingreso}</td>
            <td className="p-3">{item.egreso}</td>
            <td className="p-3">{item.ganancia}</td>
          </tr>
        )}
      />
    </div>
  );
}

export default Annual;
