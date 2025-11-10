import React from "react";
import { Table } from "../layout/Table";
import type { FinanceData } from "../types/types";
import { formattedAmount } from "../utils/utils";

const headers = [
  { label: "Mes", key: "mes" },
  { label: "Moneda", key: "moneda" },
  { label: "Ingreso", key: "ingreso" },
  { label: "Egreso", key: "egreso" },
  { label: "Ganancia", key: "ganancia" },
];

export function FinanceTable({ financeData }: { financeData: FinanceData }) {
  return (
    <div className="select-none">
      <Table
        headers={headers}
        data={financeData || []}
        renderRow={(item) => (
          <React.Fragment key={item.mes_num}>
            {item.resumen.map((r, idx) => {
              const isFirst = idx === 0;
              return (
                <tr
                  key={`${item.mes_num}-${r.moneda}`}
                  className={"border-b border-gray-200 text-center"}
                >
                  {isFirst && (
                    <td
                      rowSpan={item.resumen.length}
                      className="p-3 align-middle font-medium capitalize border-r"
                    >
                      {item.mes}
                    </td>
                  )}

                  <td className="p-1">{r.moneda}</td>
                  <td className="p-1">${formattedAmount(Number(r.ingreso))}</td>
                  <td className="p-1">${formattedAmount(Number(r.egreso))}</td>
                  <td className="p-1">
                    ${formattedAmount(Number(r.ganancia))}
                  </td>
                </tr>
              );
            })}
          </React.Fragment>
        )}
      />
    </div>
  );
}
