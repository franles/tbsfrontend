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

export type GetServicesResponse = {
  servicios: {
    id: number;
    nombre: string;
  }[];
};

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
};
export type UpdateServiceData = {
  pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
  valor: number;
  id?: number;
};

export type FinanceSummaryResponse = {
  resumen_financiero: {
    mes: string;
    mes_num: number;
    resumen: {
      moneda: "ARS" | "USD";
      ingreso: string;
      egreso: string;
      ganancia: string;
    }[];
  }[];
};

export type Resumen = FinanceSummaryResponse["resumen_financiero"];

export type CreateTripData = {
  servicios: {
    id: number;
    valor: number;
    pagado_por: "pendiente";
  }[];
  apellido: string;
  valor_total: number;
  destino: "internacional" | "nacional" | "";
  fecha_ida: string;
  fecha_vuelta: string;
  moneda: number;
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
  destino: "internacional" | "nacional" | "";
  fecha_ida: Date;
  fecha_vuelta: Date;
  moneda: number;
};

export type UpdateTripData = {
  valor_total?: number;
  destino?: "internacional" | "nacional";
  apellido?: string;
  servicios: {
    id: number;
    valor: number;
    pagado_por: "pendiente" | "pablo" | "soledad" | "mariana";
  }[];
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
