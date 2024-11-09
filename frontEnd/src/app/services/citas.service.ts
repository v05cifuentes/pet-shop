import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cita } from '../models/cita.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/citas.php?';

  constructor(private readonly http: HttpClient) { }

  listarCitas() : Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.baseUrl}control=listarCitas`);
  }

  insertarCita(cita: Cita): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}control=insertarCita`, cita);
  }

  eliminarCita(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarCita&id_cita=${id}`);
  }

  editarCita(id: number, cita: Cita): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarCita&id_cita=${id}`, cita);
  }

  filtrarPorCliente(cliente: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.baseUrl}control=filtrarPorCliente&cliente=${cliente}`);
  }

}
