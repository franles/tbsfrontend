export type GetTripsResponse = {
  viajes: Trip[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export type GetTripResponse = {
  viaje: {
    id: string;
    estado: "pendiente" | "finalizado";
    fecha: Date;
    moneda: "ARS" | "USD";
    destino: "internacional" | "nacional";
    apellido: string;
    valor_total: number;
    ganancia: number;
    costo: number;
    servicios: {
      id: number;
      valor: number;
      nombre: string;
      pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
    }[];
  };
};

export type GetAccessTokenResponse = {
  accessToken: string;
};

export type CreateTripData = {
  apellido: string;
  valor_total: number;
  destino: "internacional" | "nacional";
};

export type CreateTripResponse = {
  trip: number;
};

export type LogOutResponse = {
  message: string;
};

export type User = {
  auth: boolean | undefined;
  nombre: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
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
