export interface Cliente {
  id_cliente?: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  notas: string;
  id_mascota: number;
  nombre_mascota?: string;
}
