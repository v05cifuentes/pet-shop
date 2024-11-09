import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/clientes.php?';

  constructor(private readonly http: HttpClient) { }

  listarClientes() : Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}control=listarClientes`);
  }

  insertarCliente(cliente: Cliente): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarCliente`, cliente);
  }

  eliminarCliente(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarCliente&id_cliente=${id}`);
  }

  editarCliente(id: number, cliente: Cliente): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarCliente&id_cliente=${id}`, cliente);
  }

  filtrarPorNombre(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}control=filtrarPorNombre&nombre=${nombre}`);
  }

}
