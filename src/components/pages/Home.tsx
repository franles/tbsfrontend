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
      <div className="relative h-[400px] bg-cover bg-[center_top_0%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274365/maletas_jzcjf2.webp')]">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-7xl font-bold text-white drop-shadow-lg text-center">
            Paquetes Turísticos
          </h1>
        </div>
      </div>

      <section className="max-w-[900px] mx-auto">
        <Filter
          filter={filter}
          setFilter={setFilter}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
        <div className="flex flex-wrap justify-between mb-4 items-center gap-3">
          <input
            type="text"
            placeholder="Buscar por legajo o nombre"
            value={searchTerm}
            onChange={searchHandleChange}
            className="px-3 py-2 rounded border border-gray-300 flex-grow min-w-[200px] shadow-sm"
          />
        </div>

        <TripsTable filteredTrips={filteredTrips} />
        <Pagination page={page} setPage={setPage} />
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
