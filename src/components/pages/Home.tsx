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
import { IoAddCircle, IoSearch } from "react-icons/io5";
import { TripCreateModal } from "../common/TripCreateModal";
import { TripEditModal } from "../common/TripEditModal";
import { useNavigate, NavLink } from "react-router-dom";


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




  const filteredTrips = trips?.data.filter(
    (item) =>
      item.id.toString().includes(searchTerm) ||
      item.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner text="Cargando" />
      </div>
    );

  return (
    <>
      <div className="relative z-20 h-full flex items-center justify-center">
        <h1 className="text-5xl font-bold text-black drop-shadow-lg text-center mt-24 mb-2 select-none cursor-default">
          HOME
        </h1>
      </div>
      <section className="max-w-[900px] mx-auto mt-2 px-2 pb-10">
        {/* Barra de Búsqueda y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4 select-none">
          {/* Buscador Estilo Pill */}
          <div className="flex flex-col gap-1.5 flex-grow max-w-xs w-full">
            <span className="text-[11px] font-black text-black uppercase tracking-widest ml-4"></span>
            <div className="relative w-full group">
              <IoSearch size={22} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="Buscar por legajo o nombre..."
                value={searchTerm}
                onChange={searchHandleChange}
                className="w-full pl-14 pr-6 py-3 bg-gray-100 rounded-full border border-transparent focus:border-gray-200 focus:bg-white shadow-sm focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200 text-sm font-semibold text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          <Filter
            filter={filter}
            setFilter={setFilter}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
          />
        </div>



        {/* Tabla */}
        <div className="mb-2">
          <TripsTable filteredTrips={filteredTrips} />
        </div>

        {/* Paginación y Botón Añadir */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4  select-none">
          <Pagination page={page} setPage={setPage} />

          <button
            className="flex items-center gap-2 px-6 py-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow transition-colors"
            onClick={() => setIsCreate(true)}
          >
            <IoAddCircle size={24} />
            <NavLink to="/createtrip">
              Añadir reserva
            </NavLink>
          </button>
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
