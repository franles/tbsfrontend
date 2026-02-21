import { useTrips } from "../hooks/useTrips";
import { BiLastPage } from "react-icons/bi";
import { BiFirstPage } from "react-icons/bi";

type Props = {
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
};

export const Pagination = ({ page, setPage }: Props) => {
  const { data: trips } = useTrips();
  const totalPages = trips?.pagination?.totalPages ?? 1;

  return (
    <section className="flex justify-center items-center gap-6 mt-4 select-none">
      {page > 1 && (
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-gray-600 disabled:opacity-50"
        >
          <BiFirstPage size={24} />
        </button>
      )}

      <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
        Página <span className="text-black font-bold">{totalPages === 0 ? 0 : page}</span> de <span className="text-black font-bold">{totalPages}</span>
      </span>

      {totalPages > 0 && page !== totalPages && (
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md hover:border-gray-200 transition-all text-gray-600 disabled:opacity-50"
        >
          <BiLastPage size={24} />
        </button>
      )}
    </section>
  );
};
