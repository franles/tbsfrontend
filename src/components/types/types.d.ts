export type GetTripsResponse = {
  viajes: Trip[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export type GetAccessTokenResponse = {
  accessToken: string;
};

export type GetStatusResponse = {
  user: User;
};

export type LogOutResponse = {
  message: string;
};

export type User = {
  auth: boolean;
  nombre: string;
  email: string;
};

export type Trip = {
  id: string;
  estado: "pendiente" | "finalizado";
  fecha: Date;
  moneda: "ARS" | "USD";
  destino: "internacional" | "nacional";
  apellido: string;
  valor_total: number;
  ganancia: number;
  costo: number;
  servicios: { id: number; valor: number; nombre: string }[];
};

export type AuthContextType = {
  user: User | null;
  token: string | undefined;
  signOut: () => Promise<string | undefined>;
};
