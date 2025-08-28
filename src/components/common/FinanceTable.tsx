import React from "react";
import { Table } from "../layout/Table";
import type { MesResumen } from "../types/types"; 

const headers = [
  { label: "Mes", key: "mes" },
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
        <tr key={item.mes_num} className="border-b hover:bg-gray-50">
          <td className="p-3">{item.mes}</td>

          {item.resumen.map((r, idx) => (
            <React.Fragment key={idx}>
              <td className="p-3">
                {r.moneda}: {r.ingreso}
              </td>
              <td className="p-3">
                {r.moneda}: {r.egreso}
              </td>
              <td className="p-3">
                {r.moneda}: {r.ganancia}
              </td>
            </React.Fragment>
          ))}
        </tr>
      )}
    />
  );
}
