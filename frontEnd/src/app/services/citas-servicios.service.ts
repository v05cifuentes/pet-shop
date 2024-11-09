import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita, Cita_Serivicio } from '../models/cita.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class CitasServiciosService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/citas_servicios.php?';

  constructor(private readonly http: HttpClient) { }

  listarCitasServicios(): Observable<Cita_Serivicio[]> {
    return this.http.get<Cita_Serivicio[]>(`${this.baseUrl}control=listarCitasServicios`);;
  }

  insertarServiciosEnCita(servicio: Cita_Serivicio): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarServiciosEnCita`, servicio);

  }

}
