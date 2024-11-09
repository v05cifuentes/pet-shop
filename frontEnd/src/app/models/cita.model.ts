export interface Cita {
  id_cita?: number;
  id_cliente: number;
  nombre: string;
  id_mascota: number;
  nombre_mascota: string;
  fecha_hora: string;
  precio: number;
  estado: string;
  id_total: number;
  total: number;
  notas: string;
}

export interface Cita_Serivicio {
  id_cita: number;
  id_servicio: number;
  nombre_servicio?: string;
}
