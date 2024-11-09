import { EmpleadosService } from './../../services/empleados.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado.model';
import { ModalEmpleadoComponent } from '../modales/modal-empleado/modal-empleado.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  empleados: Empleado[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'cargo', 'horario', 'acciones'];

  nombreBuscado: string = '';

  constructor(
    private readonly empleadosService: EmpleadosService,
    private readonly dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(): void {
    this.empleadosService.listarEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  agregarNuevoEmpleado(): void {
    const dialogRef = this.dialog.open(ModalEmpleadoComponent, {
      width: '500px',
    });
  }

  editarEmpleado(empleado: Empleado, id: number): void {
    const dialogRef = this.dialog.open(ModalEmpleadoComponent, {
      width: '500px',
      data: { empleado, id }
    });
  }

  eliminarEmpleado(id: number): void {
    swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarEmpleadoConfirmado(id);
        swal.fire(
          'Eliminado!',
          'El empleado ha sido eliminado.',
          'success'
        )
      }
    });
  }

  eliminarEmpleadoConfirmado(id: number): void {
    this.empleadosService.eliminarEmpleado(id).subscribe(() => {
      this.listarEmpleados();
    });
  }

  filtrarEmpleados(): void {
    if(this.nombreBuscado === '') {
      this.listarEmpleados();
    } else {
      this.empleadosService.filtrarPorNombre(this.nombreBuscado).subscribe((data) => {
        this.empleados = data;
      });
    }
  }

}
