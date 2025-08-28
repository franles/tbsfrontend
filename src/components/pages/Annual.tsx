import { useFinance } from "../hooks/useFinance";
import { financeStore } from "../store/financeStore";
import { Filter } from "../common/Filter";
import { FinanceTable } from "../common/FinanceTable";
import { Link } from "react-router-dom";
import { IoArrowBackCircle, IoFunnelOutline } from "react-icons/io5";

function Annual() {
  const { year, month, currency, setYear, setMonthFinance, setCurrency } =
    financeStore();
  const { data: finance, isLoading } = useFinance();

  return (
    <>
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

      <section className="max-w-[900px] mx-auto mt-6">

        <div className="flex items-center mb-4 ml-6 justify-end">
          <IoFunnelOutline size={30} className="text-gray-400 mr-2" />

          <Filter
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonthFinance}
            currency={currency}
            setCurrency={setCurrency}
          />
        </div>


        {isLoading ? (
          <p className="text-center mt-6 text-gray-600">Cargando finanzas...</p>
        ) : finance ? (
          <FinanceTable financeData={finance.resumen_financiero} />
        ) : (
          <p className="text-center mt-6 text-gray-600">
            No se encontraron resultados
          </p>
        )}

        <div className="flex justify-center mt-10">
          <Link to="/home">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-semibold rounded shadow">
              <IoArrowBackCircle size={24} />
              Volver
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Annual;
