import { useFinance } from "../hooks/useFinance";
import { financeStore } from "../store/financeStore";
import { Filter } from "../common/Filter";
import { FinanceTable } from "../common/FinanceTable";

function Annual() {
  const { year, month, currency, setYear, setMonthFinance, setCurrency } =
    financeStore();
  const { data: finance, isLoading } = useFinance();

  return (
    <>

      <div className="relative z-20 h-full flex items-center justify-center">
        <h1 className="text-5xl font-bold text-black drop-shadow-lg text-center mt-24 mb-2 select-none">
          FINANZAS
        </h1>
      </div>

      <section className="max-w-[900px] mx-auto mt-6 select-none">
        <div className="flex items-center mb-4 ml-6 justify-end select-none">
          <Filter
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonthFinance}
            currency={currency}
            setCurrency={setCurrency}
          />
        </div>

        <div className="mb-4">
          {isLoading ? (
            <div className="flex justify-center p-20">
              <p className="text-gray-400 font-medium animate-pulse">Cargando finanzas...</p>
            </div>
          ) : finance ? (
            <FinanceTable financeData={finance.data} viewMode={currency} />
          ) : (
            <div className="p-20 text-center text-gray-400 font-medium">
              No se encontraron resultados
            </div>
          )}
        </div>

      </section>

    </>
  );
}

export default Annual;
