import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { RespuestaServidor } from '../models/respuesta-servidor.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl = 'http://localhost/pet_shop/backEnd/controlador/empleados.php?';

  constructor(private readonly http: HttpClient) { }

  listarEmpleados() : Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}control=listarEmpleados`);
  }

  insertarEmpleado(empleado: Empleado): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=insertarEmpleado`, empleado);
  }

  eliminarEmpleado(id: number): Observable<RespuestaServidor> {
    return this.http.delete<RespuestaServidor>(`${this.baseUrl}control=eliminarEmpleado&id_empleado=${id}`);
  }

  editarEmpleado(id: number, empleado: Empleado): Observable<RespuestaServidor> {
    return this.http.post<RespuestaServidor>(`${this.baseUrl}control=editarEmpleado&id_empleado=${id}`, empleado);
  }

  filtrarPorNombre(nombre: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.baseUrl}control=filtrarPorNombre&nombre=${nombre}`);
  }

}
