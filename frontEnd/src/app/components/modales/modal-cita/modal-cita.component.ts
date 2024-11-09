import { CitaService } from 'src/app/services/citas.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MascotasService } from '../../../services/mascotas.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Servicio } from 'src/app/models/servicio.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Cita } from 'src/app/models/cita.model';
import { CitasServiciosService } from 'src/app/services/citas-servicios.service';

@Component({
  selector: 'app-modal-cita',
  templateUrl: './modal-cita.component.html',
  styleUrls: ['./modal-cita.component.css']
})
export class ModalCitaComponent implements OnInit {

   //Variable para controlar si estamos editando
   editando = false;


  servicios: Servicio[] = [];

  clientes: Cliente[] = [];

  citas: Cita[] = [];

  serviciosSeleccionados: Servicio[] = [];

  obj_citas: Cita = {
    nombre: '',
    id_cliente: 0,
    id_mascota: 0,
    nombre_mascota: '',
    precio: 0,
    fecha_hora: '',
    id_total: 0,
    total: 0,
    estado: '',
    notas: ''
  };

  obj_cita_servicio = {
    id_cita: 0,
    id_servicio: 0
  };


  mostrarErrorMascota = false;
  mostrarErrorCliente = false;
  mostrarErrorServicio = false;
  mostrarErrorFecha = false;
  mostrarErrorEstado = false;
  mostrarErrorNotas = false;

  constructor(
    private readonly serviciosService: ServiciosService,
    private readonly serviciosEnCitas: CitasServiciosService,
    private readonly clientesService: ClientesService,
    private readonly citaService: CitaService,
    private readonly dialogRef: MatDialogRef<ModalCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.cita) {

      console.log(data.cita);
      this.obj_citas.id_cliente = data.cita.id_cliente;
      this.obj_citas.id_mascota = data.cita.id_mascota;
      this.obj_citas.nombre = data.cita.nombre;
      this.obj_citas.nombre_mascota = data.cita.nombre_mascota;
      this.obj_citas.fecha_hora = data.cita.fecha_hora;
      this.obj_citas.estado = data.cita.estado;
      this.obj_citas.notas = data.cita.notas;
      this.editando = true;
    }
  }

  ngOnInit(): void {
    this.listarClientes();
    this.listarServicios();
  }

  listarClientes(): void {
    this.clientesService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  actualizarMascota() {
    const clienteSeleccionado = this.clientes.find(cliente => cliente.id_cliente == this.obj_citas.id_cliente);
    if (clienteSeleccionado && clienteSeleccionado.nombre_mascota) {
      this.obj_citas.id_mascota = clienteSeleccionado.id_mascota;
      this.obj_citas.nombre_mascota = clienteSeleccionado.nombre_mascota;
    } else {
      this.obj_citas.nombre_mascota = '';
      this.mostrarErrorMascota = true;
    }
  }

  listarServicios(): void {
    this.serviciosService.listarServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  toggleServicio(servicio: any) {
    const index = this.serviciosSeleccionados.findIndex(s => s.nombre_servicio === servicio.nombre_servicio);
    if (index !== -1) {
      this.serviciosSeleccionados.splice(index, 1);
      this.obj_citas.total -= parseFloat(servicio.precio);
    } else {
      this.serviciosSeleccionados.push(servicio);
      this.obj_citas.total += parseFloat(servicio.precio);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Cita' : 'Guardar Cita';
  }

  realizarAccion(): void {

    if (this.editando) {
      this.editar();
    } else {
      this.validarFormulario();
    }
  }

  validarFormulario(): void {
    if(this.obj_citas.nombre_mascota === '') {
      this.mostrarErrorMascota = true;
    }else{
      this.mostrarErrorMascota = false;
    }

    if(this.obj_citas.id_cliente === 0) {
      this.mostrarErrorCliente = true;
    }else{
      this.mostrarErrorCliente = false;
    }

    if(this.serviciosSeleccionados.length === 0) {
      this.mostrarErrorServicio = true;
    }else {
      this.mostrarErrorServicio = false;
    }

    if(!this.obj_citas.fecha_hora) {
      this.mostrarErrorFecha = true;
    }else {
      this.mostrarErrorFecha = false;
    }

    if(!this.obj_citas.estado) {
      this.mostrarErrorEstado = true;
    }else {
      this.mostrarErrorEstado = false;
    }

    if(!this.obj_citas.notas) {
      this.mostrarErrorNotas = true;
    }else {
      this.mostrarErrorNotas = false;
    }

    if(!this.mostrarErrorMascota && !this.mostrarErrorCliente && !this.mostrarErrorServicio && !this.mostrarErrorFecha && !this.mostrarErrorEstado && !this.mostrarErrorNotas) {
      this.guardar();
    }

  }

  guardar(): void {
    this.citaService.insertarCita(this.obj_citas).subscribe(
      idCita => {
        this.obj_cita_servicio.id_cita = idCita;

        this.serviciosSeleccionados.forEach(servicio => {
          if (servicio.id_servicio !== undefined) {
            this.obj_cita_servicio.id_servicio = servicio.id_servicio;
          }
          this.serviciosEnCitas.insertarServiciosEnCita(this.obj_cita_servicio).subscribe(res => {
            if(res.resultado === 'OK') {
              this.closeModal();
              alert(res.mensaje);
            }
          });
        });
      }
    );
  }

  editar(): void {
    this.citaService.editarCita(this.data.cita.id_cita, this.obj_citas).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
