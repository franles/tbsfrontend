import { useState } from "react";
import { useTrips } from "../hooks/useTrips";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { Filter } from "../common/Filter";
import { Spinner } from "../common/widget/Spinner";
import { Modal } from "../layout/Modal";
import { TripModal } from "../common/TripModal";
import { Pagination } from "../common/Pagination";
import { TripsTable } from "../common/TripsTable";
import { Link } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoFunnelOutline } from "react-icons/io5";
import { IoListCircle } from "react-icons/io5";
import { TripCreateModal } from "../common/TripCreateModal";
import { TripEditModal } from "../common/TripEditModal";

function Home() {
  const { filter, page, setFilter, setMonth, setPage, year, setYear, month } =
    tripsStore();

  const { isOpen, isCreate, setIsCreate, isEdit } = modalStore();
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
            Historial de Reservas
          </h1>
        </div>
      </div>

      <section className="max-w-[900px] mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <IoSearch size={30} className="text-gray-400 mr-2" />

          <input
            type="text"
            placeholder="Buscar por legajo o nombre"
            value={searchTerm}
            onChange={searchHandleChange}
            className="px-3 py-2 mr-3 rounded border border-gray-300 shadow-sm min-w-[200px] flex-grow"
          />

          <IoFunnelOutline size={30} className="text-gray-400 mr-2 ml-6" />

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
            <button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow"
              onClick={() => setIsCreate(true)}
            >
              <IoAddCircle size={24} />
              Añadir reserva
            </button>

            <Link to="/ResumenAnual">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#007bff] hover:bg-blue-600 text-white font-semibold rounded shadow">
                <IoListCircle size={24} />
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

      {isEdit && (
        <Modal>
          <TripEditModal />
        </Modal>
      )}
      {isCreate && (
        <Modal>
          <TripCreateModal />
        </Modal>
      )}
    </>
  );
}

export default Home;
