import { Component, Inject } from '@angular/core';
import { MascotasService } from 'src/app/services/mascotas.service';
import { ModalMascotaComponent } from '../modal-mascota/modal-mascota.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-detalle-mascota',
  templateUrl: './modal-detalle-mascota.component.html',
  styleUrls: ['./modal-detalle-mascota.component.css']
})
export class ModalDetalleMascotaComponent {

  obj_mascota = {
    id_mascota: 0,
    nombre_mascota: '',
    raza: '',
    edad: 0,
    genero: '',
    notas: '',
    foto: ''
  };

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly dialogRef: MatDialogRef<ModalMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data && data.mascota) {
      this.obj_mascota = data.mascota;
    }

   }

   closeModal(): void {
    this.dialogRef.close();
  }

}
