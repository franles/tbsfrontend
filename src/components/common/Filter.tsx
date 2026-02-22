import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

type Option = {
  label: string;
  value: string | number | null;
};

type CustomSelectProps = {
  label: string;
  value: string | number | null;
  options: Option[];
  onChange: (value: any) => void;
  className?: string;
};

const CustomSelect = ({ label, value, options, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="flex flex-col gap-1.5 relative select-none" ref={containerRef}>
      <span className="text-[11px] font-black text-black uppercase tracking-widest ml-1">{label}</span>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 border border-transparent hover:border-gray-200 shadow-sm rounded-full px-4 py-2 text-xs font-bold text-gray-700 flex items-center justify-between gap-2 cursor-pointer transition-all duration-200 min-w-[125px]"
      >
        <span className="capitalize">{selectedOption?.label}</span>
        <IoChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={14} />
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-[160px] bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[100] animate-in fade-in zoom-in duration-200">
          <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
            {options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-5 py-2.5 text-xs font-semibold cursor-pointer transition-colors capitalize ${opt.value === value ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50 hover:text-black"
                  }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {
  filter?: string;
  setFilter?: (filter: string) => void;
  year?: number | null;
  setYear?: (year: number | null) => void;
  month?: number | null;
  setMonth?: (month: number | null) => void;
  currency?: "ARS" | "USD" | null;
  setCurrency?: (currency: "ARS" | "USD" | null) => void;
};

export const Filter = ({
  filter,
  year,
  month,
  currency,
  setFilter,
  setYear,
  setMonth,
  setCurrency,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Filtro Tipo */}
      {setFilter && (
        <CustomSelect
          label="Tipo"
          value={filter ?? "desc"}
          options={[
            { label: "Antiguos", value: "asc" },
            { label: "Recientes", value: "desc" },
            { label: "Pendiente", value: "pendiente" },
            { label: "Finalizado", value: "finalizado" },
          ]}
          onChange={setFilter}
        />
      )}

      {/* Filtro Año */}
      {setYear && (
        <CustomSelect
          label="Año"
          value={year ?? 2026}
          options={[
            { label: "2025", value: 2025 },
            { label: "2026", value: 2026 },
          ]}
          onChange={setYear}
        />
      )}

      {/* Filtro Mes */}
      {setMonth && (
        <CustomSelect
          label="Mes"
          value={month ?? null}
          options={[
            { label: "Todos", value: null },
            ...Array.from({ length: 12 }, (_, i) => ({
              label: new Date(0, i).toLocaleString("es-AR", { month: "long" }),
              value: i + 1,
            })),
          ]}
          onChange={setMonth}
        />
      )}


      {/* Filtro Moneda */}
      {setCurrency && (
        <div className="flex flex-col gap-1.5 select-none">
          <span className="text-[11px] font-black text-black uppercase tracking-widest ml-1">Moneda</span>
          <div className="flex bg-gray-100 border border-transparent rounded-full p-1 shadow-sm h-[38px] items-center">
            <button
              type="button"
              onClick={() => setCurrency(null)}
              className={`px-3 py-1.5 text-[10px] font-black rounded-full transition-all duration-200 h-full flex items-center ${!currency ? "bg-black text-white shadow-md" : "text-gray-400 hover:text-gray-900"}`}
            >
              TODOS
            </button>
            <button
              type="button"
              onClick={() => setCurrency("ARS")}
              className={`px-3 py-1.5 text-[10px] font-black rounded-full transition-all duration-200 h-full flex items-center ${currency === "ARS" ? "bg-black text-white shadow-md" : "text-gray-400 hover:text-gray-900"}`}
            >
              ARS
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`px-3 py-1.5 text-[10px] font-black rounded-full transition-all duration-200 h-full flex items-center ${currency === "USD" ? "bg-black text-white shadow-md" : "text-gray-400 hover:text-gray-900"}`}
            >
              USD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
