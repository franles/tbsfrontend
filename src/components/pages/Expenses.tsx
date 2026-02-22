import { useState } from "react";
import { Filter } from "../common/Filter";
import { Pagination } from "../common/Pagination";
import { ExpensesTable } from "../common/ExpensesTable";
import type { Expense } from "../common/ExpensesTable";
import { expensesStore } from "../store/expensesStore";
import { IoAddCircle, IoSearch } from "react-icons/io5";

const MOCK_EXPENSES: Expense[] = [
    { id: 1, motivo: "Alquiler Oficina", moneda: "ARS", cotizacion: null, costo: 150000 },
    { id: 2, motivo: "Servicio Cloud", moneda: "USD", cotizacion: 1100, costo: 50 },
    { id: 3, motivo: "Publicidad Meta", moneda: "USD", cotizacion: 1100, costo: 200 },
    { id: 4, motivo: "Insumos Limpieza", moneda: "ARS", cotizacion: null, costo: 12000 },
];

function Expenses() {
    const { year, setYear, month, setMonth, page, setPage } = expensesStore();
    const [searchTerm, setSearchTerm] = useState<string>("");

    const searchHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredExpenses = MOCK_EXPENSES.filter(
        (exp) =>
            exp.motivo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="relative z-20 h-full flex items-center justify-center">
                <h1 className="text-5xl font-bold text-black drop-shadow-lg text-center mt-24 mb-2 select-none cursor-default">
                    EXPENSAS
                </h1>
            </div>

            <section className="max-w-[900px] mx-auto mt-2 px-2 pb-10">
                {/* Barra de Búsqueda y Filtros */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4 select-none">
                    {/* Buscador Estilo Pill */}
                    <div className="flex flex-col gap-1.5 flex-grow max-w-xs w-full">
                        <div className="relative w-full group">
                            <IoSearch size={22} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar expensa..."
                                value={searchTerm}
                                onChange={searchHandleChange}
                                className="w-full pl-14 pr-6 py-3 bg-gray-100 rounded-full border border-transparent focus:border-gray-200 focus:bg-white shadow-sm focus:ring-2 focus:ring-black focus:outline-none transition-all duration-200 text-sm font-semibold text-gray-700 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    <Filter
                        year={year}
                        setYear={setYear}
                        month={month}
                        setMonth={setMonth}
                    />
                </div>

                {/* Tabla */}
                <div className="mb-2">
                    <ExpensesTable expenses={filteredExpenses} />
                </div>

                {/* Paginación y Botón Añadir */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 select-none">
                    <Pagination page={page} setPage={setPage} />

                    <button
                        className="flex items-center gap-2 px-6 py-2 mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow transition-colors"
                        onClick={() => console.log("Añadir expensa clicked")}
                    >
                        <IoAddCircle size={24} />
                        <span>Añadir expensa</span>
                    </button>
                </div>
            </section>
        </>
    );
}

export default Expenses;
