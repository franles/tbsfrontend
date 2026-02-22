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
  noDataMessage = "No hay reservas añadidas para este período.",
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black shadow-sm">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-black text-white">
            {headers.map((header) => (
              <th key={header.key} className="py-4 px-4 text-center text-xs font-bold uppercase tracking-wider">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="p-3 text-center p-12 text-center text-sm font-medium text-gray-400 italic">
                {noDataMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => renderRow(item))
          )}
        </tbody>
      </table>
    </div>
  );
}

