interface Service {
  id: number;
  nombre: string;
  valor: number;          
  pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
  moneda: number;            
  tipo_cambio_id: number | null;
}

export interface Trip {
  id: string;
  estado: string;
  fecha: string;
  fecha_ida: string;
  fecha_vuelta: string;
  moneda: string;
  destino: "nacional" | "internacional";
  apellido: string;
  valor_total: number;
  ganancia: number;
  costo: number;
  valor_usd: number | null;
  servicios: Service[];
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination?: Pagination;
  timestamp: string;
}

interface ApiSingleResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export type TripsApiResponse = ApiResponse<Trip>;
export type TripApiResponse = ApiSingleResponse<Trip>;
export type ServiceApiResponse = ApiResponse<Service>;
export type FinanceApiResponse = ApiResponse<Finance>;

export type GetAccessTokenResponse = {
  accessToken: string;
};

export type CreateTripResponse = {
  trip: string;
};

export type LogOutResponse = {
  message: string;
};

export type UpdateDeleteTripResponse = {
  message: string;
  trip: string;
};

export type CreateServiceTripData = {
  viaje_id: string;
  servicio_id: number;
  valor: number;
  pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
  tipo_cambio_id?: number | null;
};
export type UpdateServiceData = {
  id: number;
  valor: number;
  pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
  moneda: number;
  tipo_cambio_id: number | null;
};

type FinanceResume = {
  moneda: "ars" | "usd";
  ingreso: number;
  egreso: number;
  ganancia: number;
};

export type Finance = {
  data: {
    mes: string;
    mes_num: number;
    resumen: FinanceResume[];
  };
};

export type FinanceData = Finance["data"];

export type CreateTripData = {
  servicios: {
    id: number;
    valor: number;
    pagado_por: "pendiente";
    tipo_cambio_id?: number;
  }[];
  apellido: string;
  valor_total: number;
  destino: "internacional" | "nacional" | "";
  fecha_ida: string;
  fecha_vuelta: string;
  moneda: number;
  valor_usd?: number | null;

};

export type CreateTripFormData = {
  servicios: {
    id: number;
    valor: number;
    pagado_por: "pendiente";
    moneda: number;
  }[];
  apellido: string;
  valor_total: number;
  valor_usd?: number | null;
  destino: "internacional" | "nacional" | "";
  fecha_ida: Date;
  fecha_vuelta: Date;
  moneda: number;
};

export type UpdateTripData = {
  valor_total?: number;
  destino?: "internacional" | "nacional";
  apellido?: string;
  moneda?: number;          
  valor_usd?: number | null;
  servicios: UpdateServiceData[];
};

export type User = {
  auth: boolean | undefined;
  nombre: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
};
