import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mascota } from 'src/app/models/mascota.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { MascotasService } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-modal-cliente',
  templateUrl: './modal-cliente.component.html',
  styleUrls: ['./modal-cliente.component.css']
})
export class ModalClienteComponent {

  //Variable para controlar si estamos editando
  editando = false;

  mascotas: Mascota[] = [];

  obj_cliente = {
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    notas: '',
    id_mascota: 0,
    nombre_mascota: '',
  };

  mostrarErrorNombre = false;
  mostrarErrorTelefono = false;
  mostrarErrorEmail = false;
  mostrarErrorDireccion = false;
  mostrarErrorMascota = false;

  constructor(
    private readonly servicioCliente: ClientesService,
    private readonly mascotasService: MascotasService,
    private readonly dialogRef: MatDialogRef<ModalClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data && data.cliente) {
        this.obj_cliente.nombre = data.cliente.nombre;
        this.obj_cliente.telefono = data.cliente.telefono;
        this.obj_cliente.email = data.cliente.email;
        this.obj_cliente.direccion = data.cliente.direccion;
        this.obj_cliente.notas = data.cliente.notas;
        this.obj_cliente.nombre_mascota = data.cliente.nombre_mascota;
        this.editando = true;
      }
    }


  ngOnInit(): void {
    this.listarMascotas();
  }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Cliente' : 'Guardar Cliente';
  }

  // Función para realizar acciones según el modo de edición
  realizarAccion(): void {
    if (this.editando) {
      this.editar();
    } else {
      this.validarFormulario();
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  listarMascotas(): void {
    this.mascotasService.listarMascotas().subscribe((data) => {
      this.mascotas = data;
    });
  }

  convertirANumero(id: any): number {
    return Number(id);
  }

  validarFormulario(): void {
    if (this.obj_cliente.nombre === '') {
      this.mostrarErrorNombre = true;
    } else {
      this.mostrarErrorNombre = false;
    }

    if (this.obj_cliente.telefono === '') {
      this.mostrarErrorTelefono = true;
    } else {
      this.mostrarErrorTelefono = false;
    }

    if (this.obj_cliente.email === '') {
      this.mostrarErrorEmail = true;
    } else {
      this.mostrarErrorEmail = false;
    }

    if (this.obj_cliente.direccion === '') {
      this.mostrarErrorDireccion = true;
    } else {
      this.mostrarErrorDireccion = false;
    }

    if (this.obj_cliente.id_mascota === 0){
      this.mostrarErrorMascota = true;
    } else {
      this.mostrarErrorMascota = false;
    }

    if (!this.mostrarErrorNombre && !this.mostrarErrorTelefono && !this.mostrarErrorEmail && !this.mostrarErrorDireccion && !this.mostrarErrorMascota) {
      this.guardar();
    }
  }

  guardar(): void {
    this.servicioCliente.insertarCliente(this.obj_cliente).subscribe(res => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }

  editar(): void {
    this.servicioCliente.editarCliente(this.data.id_cliente, this.obj_cliente).subscribe(res => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }
}
