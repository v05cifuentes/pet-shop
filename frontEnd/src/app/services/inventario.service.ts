import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/inventario.php?';

  constructor(private readonly http: HttpClient) { }

  listarInventario() : Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}control=listarInventario`);
  }

  insertarProducto(producto: Producto): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarProducto`, producto);
  }

  eliminarProducto(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarProducto&id_producto=${id}`);
  }

  editarProducto(id: number, producto: Producto): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarProducto&id_producto=${id}`, producto);
  }

  filtrarPorNombre(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}control=filtrarPorNombre&nombre_producto=${nombre}`);
  }

}
