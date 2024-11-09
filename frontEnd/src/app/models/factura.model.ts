export interface Factura {
  id_factura?: number;
  id_cliente: number;
  nombre: string;
  fecha_emision: string;
  total: number;
  estado_pago: string;
}
