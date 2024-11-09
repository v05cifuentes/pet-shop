import { MascotasService } from './../../services/mascotas.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mascota } from 'src/app/models/mascota.model';
import { ModalMascotaComponent } from '../modales/modal-mascota/modal-mascota.component';
import swal from 'sweetalert2';
import { ModalDetalleMascotaComponent } from '../modales/modal-detalle-mascota/modal-detalle-mascota.component';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {

  nombreBuscado: string = '';

  mascotas: Mascota[] = [];

  displayedColumns: string[] = ['id_mascota', 'nombre_mascota', 'raza', 'edad', 'genero', 'notas', 'acciones'];

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.listarMascotas();
  }

  listarMascotas(): void {
    this.mascotasService.listarMascotas().subscribe((data) => {
      this.mascotas = data;
    });
  }

  agregarNuevaMascota(): void {
    const dialogRef = this.dialog.open(ModalMascotaComponent, {
      width: '500px',
    });
  }

  editarMascota(event: Event, mascota: Mascota, id_mascota: number): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ModalMascotaComponent, {
      width: '500px',
      data: { mascota, id_mascota }
    });
  }

  eliminarMascota(event: Event, id_mascota: number): void {
    event.stopPropagation();
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
        this.eliminarMascotaConfirmado(id_mascota);
        swal.fire(
          'Eliminado!',
          'La mascota ha sido eliminada.',
          'success'
        );
      }
    });
  }

  eliminarMascotaConfirmado(id_mascota: number): void {
    this.mascotasService.eliminarMascota(id_mascota).subscribe(() => {
      this.listarMascotas();
    });
  }

  verDetalleMascota(mascota: Mascota): void {
    const dialogRef = this.dialog.open(ModalDetalleMascotaComponent, {
      width: '500px',
      data: { mascota }
    });
  }

  filtrarMascotas(): void {
    if(this.nombreBuscado === '') {
      this.listarMascotas();
    } else {
      this.mascotasService.filtrarPorNombre(this.nombreBuscado).subscribe((data) => {
        this.mascotas = data;
      });
    }
  }
}
