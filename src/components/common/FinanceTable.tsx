import type { FinanceData } from "../types/types";
import { formattedAmount } from "../utils/utils";

export function FinanceTable({ financeData, viewMode = null }: { financeData: FinanceData; viewMode?: "ARS" | "USD" | null }) {
  // viewMode comes from parent. null = 'all'.

  const showArs = viewMode === null || viewMode === "ARS";
  const showUsd = viewMode === null || viewMode === "USD";

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-black bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th rowSpan={2} className="py-1 px-6 text-lg font-bold uppercase tracking-widest text-center border-r border-b border-gray-700 ">
                MES
              </th>
              {showArs && (
                <th colSpan={3} className="py-1 px-4 text-lg font-bold uppercase tracking-widest text-center border-b-[3px] border-blue-500">
                  ARS
                </th>
              )}
              {showUsd && (
                <th colSpan={3} className={`py-1 px-4 text-lg font-bold uppercase tracking-widest text-center border-b-[3px] border-green-500 border-l border-l-gray-700`}>
                  USD
                </th>
              )}
            </tr>
            <tr className="bg-black text-white">
              {showArs && (
                <>
                  <th className="py-2 px-4 text-[13px] font-bold text-center border-b border-gray-700">INGRESO</th>
                  <th className="py-2 px-4 text-[13px] font-bold text-center border-l border-b border-gray-700">EGRESO</th>
                  <th className="py-2 px-4 text-[13px] font-bold text-center border-l border-b border-gray-700">GANANCIA</th>
                </>
              )}
              {showUsd && (
                <>
                  <th className={`py-2 px-4 text-[13px] font-bold text-center border-b border-gray-700 border-l border-gray-700`}>INGRESO</th>
                  <th className="py-2 px-4 text-[13px] font-bold text-center border-l border-b border-gray-700">EGRESO</th>
                  <th className="py-2 px-4 text-[13px] font-bold text-center border-l border-b border-gray-700">GANANCIA</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-black">
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
                <tr key={item.mes_num} className="group hover:bg-gray-200 transition-colors">
                  <td className="whitespace-nowrap py-3 px-6 text-[15px] font-semibold text-gray-900 capitalize border-b border-r border-b-gray-250 border-r-gray-700 text-center">
                    {item.mes}
                  </td>

                  {showArs && (
                    <>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700 text-center border-b border-b-gray-250 group-hover:bg-gray-200">
                        ${formattedAmount(Number(ars.ingreso))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700 text-center  border-b border-b-gray-250 group-hover:bg-gray-200">
                        ${formattedAmount(Number(ars.egreso))}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-3 font-semibold text-center border-r border-b border-r-black border-b-gray-250 group-hover:bg-gray-200 ${Number(ars.ganancia) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${formattedAmount(Number(ars.ganancia))}
                      </td>
                    </>
                  )}

                  {showUsd && (
                    <>
                      <td className={`whitespace-nowrap px-4 py-3 text-gray-700 text-center border-b border-b-gray-250 group-hover:bg-gray-200 ${showArs ? '' : ''}`}>
                        ${formattedAmount(Number(usd.ingreso))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-700 text-center border-b border-b-gray-250 group-hover:bg-gray-200">
                        ${formattedAmount(Number(usd.egreso))}
                      </td>
                      <td className={`whitespace-nowrap px-4 py-3 font-semibold text-center border-b border-b-gray-250 group-hover:bg-gray-200 ${Number(usd.ganancia) >= 0 ? 'text-green-600' : 'text-red-700'}`}>
                        ${formattedAmount(Number(usd.ganancia))}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
            {(!financeData || financeData.length === 0) && (
              <tr>
                <td colSpan={viewMode === null ? 7 : 4} className="p-12 text-center text-sm font-medium text-gray-400 italic">
                  No hay datos financieros disponibles para este período.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

