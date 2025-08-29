import React from "react";
import { Table } from "../layout/Table";
import type { MesResumen } from "../types/types";

const headers = [
  { label: "Mes", key: "mes" },
  { label: "Moneda", key: "moneda" },
  { label: "Ingreso", key: "ingreso" },
  { label: "Egreso", key: "egreso" },
  { label: "Ganancia", key: "ganancia" },
];

export function FinanceTable({
  financeData,
}: {
  financeData: MesResumen[] | undefined;
}) {
  return (
    <Table
      headers={headers}
      data={financeData || []}
      renderRow={(item) => (
        <React.Fragment key={item.mes_num}>
          {item.resumen.map((r, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === item.resumen.length - 1;
            return (
              <tr
                key={`${item.mes_num}-${r.moneda}`}
                className={`${isLast ? "border-b border-gray-200" : ""} hover:bg-gray-50`}
              >
                {isFirst && (
                  <td
                    rowSpan={item.resumen.length}
                    className="p-3 align-middle font-medium"
                  >
                    {item.mes}
                  </td>
                )}

                <td className="p-1">{r.moneda}</td>
                <td className="p-1">{r.ingreso}</td>
                <td className="p-1">{r.egreso}</td>
                <td className="p-1">{r.ganancia}</td>
              </tr>
            );
          })}
        </React.Fragment>
      )}
    />
  );
}
