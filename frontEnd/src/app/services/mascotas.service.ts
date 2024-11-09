import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/mascotas.php?';

  constructor(private readonly http: HttpClient) { }

  listarMascotas() : Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}control=listarMascotas`);
  }

  insertarMascota(mascota: Mascota): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarMascota`, mascota);
  }

  eliminarMascota(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarMascota&id_mascota=${id}`);
  }

  editarMascota(id: number, mascota: Mascota): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarMascota&id_mascota=${id}`, mascota);
  }

  filtrarPorNombre(nombre: string): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.baseUrl}control=filtrarPorNombre&nombre=${nombre}`);
  }

}
