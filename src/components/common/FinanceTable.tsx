import type { FinanceData } from "../types/types";
import { formattedAmount } from "../utils/utils";

export function FinanceTable({ financeData, viewMode = null }: { financeData: FinanceData; viewMode?: "ARS" | "USD" | null }) {
  // viewMode comes from parent. null = 'all'.

  const showArs = viewMode === null || viewMode === "ARS";
  const showUsd = viewMode === null || viewMode === "USD";

  const headers = [
    { label: "Mes", key: "mes", rowSpan: 2 },
    // Conditionally add grouped headers
    ...(showArs
      ? [{ label: "ARS", colSpan: 3, className: "bg-blue-500/30 text-gray-900 border-l border-gray-300" }]
      : []),
    ...(showUsd
      ? [{ label: "USD", colSpan: 3, className: "bg-green-500/30 text-gray-900 border-l border-gray-300" }]
      : []),
  ];

  const subHeaders = [
    ...(showArs
      ? [
        { label: "Ingreso", className: "text-gray-900 bg-blue-500/20 border-l border-gray-300" },
        { label: "Egreso", className: "text-gray-900 bg-blue-500/20 border-y border-gray-300" },
        { label: "Ganancia", className: "font-bold text-gray-900 bg-blue-500/20 border-r border-y border-gray-300" },
      ]
      : []),
    ...(showUsd
      ? [
        { label: "Ingreso", className: "text-gray-900 bg-green-500/20 border-l border-gray-300" },
        { label: "Egreso", className: "text-gray-900 bg-green-500/20 border-y border-gray-300" },
        { label: "Ganancia", className: "font-bold text-gray-900 bg-green-500/20 border-r border-y border-gray-300" },
      ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg shadow ring-1 ring-gray-300">
        <table className="w-full divide-y divide-gray-300 border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  rowSpan={h.rowSpan}
                  colSpan={h.colSpan}
                  className={`py-3 px-3 text-center font-bold text-gray-900 border border-gray-300 ${h.className || ""}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
            <tr>
              {subHeaders.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`px-3 py-2 text-center font-semibold text-gray-900 border-t border-b border-gray-300 ${h.className || ""}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300 bg-white">
            {financeData?.map((item) => {
              const ars = item.resumen.find((r) => r.moneda === "ars") || {
                ingreso: 0,
                egreso: 0,
                ganancia: 0,
              };
              const usd = item.resumen.find((r) => r.moneda === "usd") || {
                ingreso: 0,
                egreso: 0,
                ganancia: 0,
              };

              return (
                <tr key={item.mes_num} className="group hover:bg-gray-100 transition-colors">
                  <td className="whitespace-nowrap py-2 px-3 font-medium text-gray-900 capitalize border border-gray-300 bg-gray-50 text-center">
                    {item.mes}
                  </td>

                  {(showArs) && (
                    <>
                      {/* ARS Group - Left border only on first column, no vertical borders between data columns, right border on last column */}
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700 text-center border-y border-l border-gray-300 bg-transparent group-hover:bg-gray-100">
                        ${formattedAmount(Number(ars.ingreso))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700 text-center border-y border-gray-300 bg-transparent group-hover:bg-gray-100">
                        ${formattedAmount(Number(ars.egreso))}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-2 font-bold text-center border-y border-r border-gray-300 bg-transparent group-hover:bg-gray-100 ${Number(ars.ganancia) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        ${formattedAmount(Number(ars.ganancia))}
                      </td>
                    </>
                  )}

                  {(showUsd) && (
                    <>
                      {/* USD Group - Left border to separate from ARS, no internal verticals, right border on last */}
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700 text-center border-y border-l border-gray-300 bg-transparent group-hover:bg-gray-100">
                        ${formattedAmount(Number(usd.ingreso))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-gray-700 text-center border-y border-gray-300 bg-transparent group-hover:bg-gray-100">
                        ${formattedAmount(Number(usd.egreso))}
                      </td>
                      <td className={`whitespace-nowrap px-3 py-2 font-bold text-center border-y border-r border-gray-300 bg-transparent group-hover:bg-gray-100 ${Number(usd.ganancia) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        ${formattedAmount(Number(usd.ganancia))}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            {(!financeData || financeData.length === 0) && (
              <tr>
                <td colSpan={viewMode === null ? 7 : 4} className="p-3 text-center text-gray-500 border border-gray-300">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
