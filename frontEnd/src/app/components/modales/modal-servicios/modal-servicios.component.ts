import { Servicio } from './../../../models/servicio.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-modal-servicios',
  templateUrl: './modal-servicios.component.html',
  styleUrls: ['./modal-servicios.component.css']
})
export class ModalServiciosComponent {

  //Variable para controlar si estamos editando
  editando = false;

  obj_servicio = {
    nombre_servicio: '',
    descripcion: '',
    precio: 0
  };

  mostrarErrorNombre = false;
  mostrarErrorDescripcion = false;
  mostrarErrorPrecio = false;

  constructor(
    private readonly serviciosService: ServiciosService,
    private readonly dialogRef: MatDialogRef<ModalServiciosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.servicio) {
      this.obj_servicio.nombre_servicio = data.servicio.nombre_servicio;
      this.obj_servicio.descripcion = data.servicio.descripcion;
      this.obj_servicio.precio = data.servicio.precio;
      this.editando = true;
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Servicio' : 'Guardar Servicio';
  }

  // Función para realizar acciones según el modo de edición
  realizarAccion(): void {
    console.log(this.editando);
    if (this.editando) {
      this.editar();
    } else {
      this.validarFormulario();
    }
  }

  validarFormulario(): void {
    if (this.obj_servicio.nombre_servicio === '') {
      this.mostrarErrorNombre = true;
    }else{
      this.mostrarErrorNombre = false;
    }

    if (this.obj_servicio.descripcion === '') {
      this.mostrarErrorDescripcion = true;
    }else {
      this.mostrarErrorDescripcion = false;
    }

    if (this.obj_servicio.precio === 0) {
      this.mostrarErrorPrecio = true;
    }else {
      this.mostrarErrorPrecio = false;
    }

    if (!this.mostrarErrorNombre && !this.mostrarErrorDescripcion && !this.mostrarErrorPrecio) {
      this.guardar();
    }
  }

  guardar(): void {
    this.serviciosService.insertarServicio(this.obj_servicio).subscribe(res => {
      if (res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }

  editar(): void {
    this.serviciosService.editarServicio(this.data.id, this.obj_servicio).subscribe(res => {
      if (res.resultado === 'OK') {
        this.closeModal();

        alert(res.mensaje);
      }else {
        console.log(this.obj_servicio);
      }
    });
  }
}
