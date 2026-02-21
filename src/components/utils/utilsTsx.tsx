export const renderEstado = (estado: string) => {
  const base =
    "text-sm font-semibold px-1 border rounded-md capitalize text-center ";
  const colores: Record<string, string> = {
    cancelado: "text-red-500 border-red-500 bg-red-100",
    pendiente: "text-yellow-500 border-yellow-500 bg-yellow-100",
    finalizado: "text-green-500 border-green-500 bg-green-100",
  };
  return <span className={`${base} ${colores[estado] || ""}`}>{estado}</span>;
};
