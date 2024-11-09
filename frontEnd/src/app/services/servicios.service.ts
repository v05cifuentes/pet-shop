import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/servicios.php?';

  constructor(private readonly http: HttpClient) { }

  listarServicios() : Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}control=listarServicios`);
  }

  insertarServicio(servicio: Servicio): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarServicio`, servicio);
  }

  eliminarServicio(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarServicio&id_servicio=${id}`);
  }

  editarServicio(id: number, servicio: Servicio): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarServicio&id_servicio=${id}`, servicio);
  }

  filtrarPorNombre(nombre: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}control=filtrarPorNombre&nombre_servicio=${nombre}`);
  }

}
