import { useState } from "react";
import { useTrips } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { Filter } from "../common/Filter";
import { Spinner } from "../common/widget/Spinner";
import { Modal } from "../layout/Modal";
import { TripModal } from "../common/TripModal";
import { TripEditModal } from "../common/TripEditModal";
import { Pagination } from "../common/Pagination";
import { TripsTable } from "../common/TripsTable";
import { Link } from "react-router-dom";


function Home() {
  const { filter, page, setFilter, setMonth, setPage, year, setYear, month } =
    tripsStore();

  const { isOpen, isEditOpen } = modalStore();
  const { data: trips, isLoading } = useTrips();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const filteredTrips = trips?.viajes.filter(
    (item) =>
      item.id.toString().includes(searchTerm) ||
      item.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner text="Cargando" />;
  return (
    <>
      <div className="relative h-[225px] bg-cover bg-[center_top_0%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274365/maletas_jzcjf2.webp')]">
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
            Paquetes Turísticos
          </h1>
        </div>
      </div>

      <section className="max-w-[900px] mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar por legajo o nombre"
            value={searchTerm}
            onChange={searchHandleChange}
            className="px-3 py-2 rounded border border-gray-300 shadow-sm min-w-[200px] flex-grow"
          />

          <Filter
            filter={filter}
            setFilter={setFilter}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
        </div>

        <TripsTable filteredTrips={filteredTrips} />
<div className="flex justify-between items-center mt-4">
  <Pagination page={page} setPage={setPage} />
  <div className="flex gap-2">
    <Link to="/ResumenMensual">
      <button className="px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-semibold rounded shadow">
        Resumen Mensual
      </button>
    </Link>
    <Link to="/ResumenAnual">
      <button className="px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-semibold rounded shadow">
        Resumen Anual
      </button>
    </Link>
  </div>
</div>

      </section>

      {isOpen && (
        <Modal>
          <TripModal />
        </Modal>
      )}

      {isEditOpen && (
        <Modal>
          <TripEditModal />
        </Modal>
      )}
    </>
  );
}

export default Home;
