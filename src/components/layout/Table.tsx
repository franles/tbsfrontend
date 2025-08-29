import React from "react";

type Header = {
  label: string;
  key: string;
};

type Props<T> = {
  headers: Header[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  noDataMessage?: string;
};

export function Table<T>({
  headers,
  data,
  renderRow,
  noDataMessage = "No hay resultados",
}: Props<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#007bff] text-white ">
          {headers.map((header) => (
            <th key={header.key} className=" p-3 text-center">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="p-3 text-center">
              {noDataMessage}
            </td>
          </tr>
        ) : (
          data.map((item) => renderRow(item))
        )}
      </tbody>
    </table>
  );
}
