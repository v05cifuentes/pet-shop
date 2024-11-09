import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-modal-empleado',
  templateUrl: './modal-empleado.component.html',
  styleUrls: ['./modal-empleado.component.css']
})
export class ModalEmpleadoComponent {

  //Variable para controlar si estamos editando
  editando = false;

  obj_empleado = {
    nombre: '',
    cargo: '',
    horario: '',
  };

  mostrarErrorNombre = false;
  mostrarErrorCargo = false;
  mostrarErrorHorario = false;

  constructor(
    private readonly empleadosService: EmpleadosService,
    private readonly dialogRef: MatDialogRef<ModalEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data && data.empleado) {
        this.obj_empleado.nombre = data.empleado.nombre;
        this.obj_empleado.cargo = data.empleado.cargo;
        this.obj_empleado.horario = data.empleado.horario;
        this.editando = true;
      }
     }

  closeModal(): void {
    this.dialogRef.close();
  }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Empleado' : 'Guardar Empleado';
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
    if(this.obj_empleado.nombre === '') {
      this.mostrarErrorNombre = true;
    } else {
      this.mostrarErrorNombre = false;
    }

    if(this.obj_empleado.cargo === '') {
      this.mostrarErrorCargo = true;
    } else {
      this.mostrarErrorCargo = false;
    }

    if(this.obj_empleado.horario === '') {
      this.mostrarErrorHorario = true;
    } else {
      this.mostrarErrorHorario = false;
    }

    if(!this.mostrarErrorNombre && !this.mostrarErrorCargo && !this.mostrarErrorHorario) {
      this.guardar();
    }
  }

  guardar(): void {
    this.empleadosService.insertarEmpleado(this.obj_empleado).subscribe((res) => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }

  editar(): void {
    this.empleadosService.editarEmpleado(this.data.id,this.obj_empleado).subscribe((res) => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }

}
