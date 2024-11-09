import swal from 'sweetalert2';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cita } from 'src/app/models/cita.model';
import { CitaService } from 'src/app/services/citas.service';
import { ModalCitaComponent } from '../modales/modal-cita/modal-cita.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent {

  nombreBuscado: string = '';

  citas: Cita[] = [];

  citasFiltradas: Cita[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'nombre_mascota', 'fecha_hora', 'estado', 'notas', 'acciones'];

  constructor(
    private readonly citasService: CitaService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarCitas();
  }

  listarCitas(): void {
    this.citasService.listarCitas().subscribe(data => {
      this.citas = data;
      this.filtrarCitasPorEstado();
    });
  }

  pedirNuevaCita(): void {
    const dialogRef = this.dialog.open(ModalCitaComponent, {
      width: '800px',
    });
  }

  filtrarCitas(): void {
    if(this.nombreBuscado === '') {
      this.listarCitas();
    }else {
      this.citasService.filtrarPorCliente(this.nombreBuscado).subscribe(data => {
        this.citasFiltradas = data;
      });
    }
  }

  filtrarCitasPorEstado(): void {
    this.citasFiltradas = this.citas.filter(cita => cita.estado !== 'Cancelada');
  }

  editarCita(cita: Cita, id: number): void {
    const dialogRef = this.dialog.open(ModalCitaComponent, {
      width: '600px',
      data: { cita, id }
    });
  }

  cancelarCita(idCita: number): void {
    const cita = this.citas.find(cita => cita.id_cita === idCita);
    if (cita) {
      swal.fire({
        title: '¿Estás seguro de cancelar la cita?',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, conservar'
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          this.actualizarEstadoCita(idCita, cita);
          swal.fire(
            'Cancelada!',
            'La cita ha sido cancelada.',
            'success'
          )
        }
      });
    }
  }

  actualizarEstadoCita(idCita: number, cita: Cita): void {
    cita.estado = 'Cancelada';
    console.log(cita)
    this.citasService.editarCita(idCita, cita).subscribe(() => {
      this.listarCitas();
    });
  }

}
