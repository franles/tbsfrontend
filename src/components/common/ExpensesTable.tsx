import { Table } from "../layout/Table";
import { formattedAmount } from "../utils/utils";
import { IoPencil, IoCloseCircle } from "react-icons/io5";

const headers = [
    { label: "Motivo", key: "motivo" },
    { label: "Moneda", key: "moneda" },
    { label: "Cotización USD", key: "cotizacion" },
    { label: "Costo", key: "costo" },
    { label: "Acciones", key: "acciones" },
];

export interface Expense {
    id: number;
    motivo: string;
    moneda: string;
    cotizacion: number | null;
    costo: number;
}

export function ExpensesTable({
    expenses,
}: {
    expenses: Expense[];
}) {
    return (
        <div className="select-none">
            <Table
                headers={headers}
                data={expenses}
                noDataMessage="No hay expensas añadidas para este período."
                renderRow={(expense) => (
                    <tr
                        key={expense.id}
                        className="border-b border-gray-250 hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                        <td className="py-2.5 px-4 text-sm font-medium text-gray-900 text-center">
                            {expense.motivo}
                        </td>
                        <td className="py-2.5 px-4 text-sm text-gray-700 uppercase text-center">
                            {expense.moneda}
                        </td>
                        <td className="py-2.5 px-4 text-sm text-gray-700 text-center">
                            {expense.cotizacion ? `$${formattedAmount(expense.cotizacion)}` : "-"}
                        </td>
                        <td className="py-2.5 px-4 text-sm font-bold text-gray-900 text-center">
                            ${formattedAmount(expense.costo)}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                            <div className="flex justify-center gap-2">
                                <button
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Modificar expensa", expense.id);
                                    }}
                                    title="Modificar"
                                >
                                    <IoPencil size={24} />
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-700 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Eliminar expensa", expense.id);
                                    }}
                                    title="Eliminar"
                                >
                                    <IoCloseCircle size={28} />
                                </button>
                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
}
