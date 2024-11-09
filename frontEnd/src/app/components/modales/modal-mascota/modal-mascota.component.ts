import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.css']
})
export class ModalMascotaComponent {

  //Variable para controlar si estamos editando
  editando = false;

  obj_mascota = {
    nombre_mascota: '',
    raza: '',
    edad: 0,
    genero: '',
    notas: '',
    foto: ''
  };

  mostrarErrorNombre = false;
  mostrarErrorRaza = false;
  mostrarErrorEdad = false;
  mostrarErrorGenero = false;
  mostrarErrorNotas = false;
  mostrarErrorFoto = false;

  constructor(
    private readonly mascotasService: MascotasService,
    private readonly dialogRef: MatDialogRef<ModalMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
    ) {
      if (data && data.mascota) {
        this.obj_mascota.nombre_mascota = data.mascota.nombre_mascota;
        this.obj_mascota.raza = data.mascota.raza;
        this.obj_mascota.edad = data.mascota.edad;
        this.obj_mascota.genero = data.mascota.genero;
        this.obj_mascota.notas = data.mascota.notas;
        this.obj_mascota.foto = data.mascota.foto;
        this.editando = true;
      }
    }

  closeModal(): void {
    this.dialogRef.close();
  }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Mascota' : 'Guardar Mascota';
  }

  // Función para realizar acciones según el modo de edición
  realizarAccion(): void {
    if (this.editando) {
      this.editar();
    } else {
      this.guardar();
    }
  }

  onFileSelected(event: any) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {

      this.obj_mascota.foto = imagen.base;
    });
  }

  extraerBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {}
    });

  validarFormulario(): void {
    if (this.obj_mascota.nombre_mascota === '') {
      this.mostrarErrorNombre = true;
    }else {
      this.mostrarErrorNombre = false;
    }

    if (this.obj_mascota.raza === '') {
      this.mostrarErrorRaza = true;
    }else {
      this.mostrarErrorRaza = false;
    }

    if (this.obj_mascota.edad === 0) {
      this.mostrarErrorEdad = true;
    }else {
      this.mostrarErrorEdad = false;
    }

    if (this.obj_mascota.genero === '') {
      this.mostrarErrorGenero = true;
    }else {
      this.mostrarErrorGenero = false;
    }

    if (this.obj_mascota.notas === '') {
      this.mostrarErrorNotas = true;
    }else {
      this.mostrarErrorNotas = false;
    }

    if (this.obj_mascota.foto === '') {
      this.mostrarErrorFoto = true;
    }else {
      this.mostrarErrorFoto = false;
    }



    if (!this.mostrarErrorNombre && !this.mostrarErrorRaza && !this.mostrarErrorEdad && !this.mostrarErrorGenero && !this.mostrarErrorNotas && !this.mostrarErrorFoto) {
      this.guardar();
    }
  }

  guardar(): void {
    this.mascotasService.insertarMascota(this.obj_mascota).subscribe(() => {
      this.closeModal();
    });

  }

  editar(): void {
    if(this.obj_mascota.foto === ''){
      this.obj_mascota.foto = this.data.mascota.foto;
    }else{
      this.mascotasService.editarMascota(this.data.id_mascota, this.obj_mascota).subscribe(res => {
        if(res.resultado === 'OK') {
          this.closeModal();
          alert(res.mensaje);
        }
      });
    }
  }
}
