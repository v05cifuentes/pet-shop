import { Component } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ModalServiciosComponent } from '../modales/modal-servicios/modal-servicios.component';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {

  nombreBuscado: string = '';

  servicios: Servicio[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];

  constructor(
    private readonly serviciosService: ServiciosService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarServicios();
  }

  listarServicios(): void {
    this.serviciosService.listarServicios().subscribe(data => {
      this.servicios = data;
    });
  }

  agregarNuevoServicio(): void {
      const dialogRef = this.dialog.open(ModalServiciosComponent, {
        width: '500px',
      });
    }

  editarServicio(servicio: Servicio, id: number): void {
    const dialogRef = this.dialog.open(ModalServiciosComponent, {
      width: '500px',
      data: { servicio, id }
    });
  }

  eliminarServicio(id: number): void {
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
        this.eliminarServicioConfirmado(id);
        swal.fire(
          'Eliminado!',
          'El servicio ha sido eliminado.',
          'success'
        );
      }
    });
  }

  eliminarServicioConfirmado(id: number): void {
    this.serviciosService.eliminarServicio(id).subscribe(() => {
      this.listarServicios();
    });
  }

  filtrarServicios(): void {
    if(this.nombreBuscado === '') {
      this.listarServicios();
    } else {
      this.serviciosService.filtrarPorNombre(this.nombreBuscado).subscribe(data => {
        this.servicios = data;
      });
    }
  }
}
