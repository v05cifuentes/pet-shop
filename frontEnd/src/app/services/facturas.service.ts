import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/facturas.php?';

  constructor(private readonly http: HttpClient) { }

  listarFacturas() : Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.baseUrl}control=listarFacturas`);
  }

  insertarFactura(factura: Factura): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarFactura`, factura);
  }

  eliminarFactura(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarFactura&id_factura=${id}`);
  }

  editarFactura(id: number, factura: Factura): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarFactura&id_factura=${id}`, factura);
  }

  filtrarPorCliente(idCliente: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.baseUrl}control=filtrarPorCliente&id_cliente=${idCliente}`);
  }

}
