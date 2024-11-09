import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { ModalClienteComponent } from '../modales/modal-cliente/modal-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'telefono', 'email', 'direccion', 'notas', 'nombre_mascota', 'acciones'];

  nombreBuscado: string = '';

  constructor(
    private readonly servicioCliente: ClientesService,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit(): void{
    this.listarClientes();
  }

  listarClientes(): void {
    this.servicioCliente.listarClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  agregarNuevoCliente(): void {
    const dialogRef = this.dialog.open(ModalClienteComponent, {
      width: '600px',
    });
  }

  editarCliente(cliente: Cliente, id: number): void {
    const dialogRef = this.dialog.open(ModalClienteComponent, {
      width: '600px',
      data: { cliente, id }
    });
  }

  eliminarCliente(id: number): void {
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
        this.eliminarClienteConfirmado(id);
        swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
      }
    })
  }

  eliminarClienteConfirmado(id: number): void {
    this.servicioCliente.eliminarCliente(id).subscribe(() => {
      this.listarClientes();
      swal.fire(
        'Eliminado!',
        'El cliente ha sido eliminado.',
        'success'
      )
    });
  }

  filtrarClientes(): void {
    if(this.nombreBuscado === '') {
      this.listarClientes();
    } else {
      this.servicioCliente.filtrarPorNombre(this.nombreBuscado).subscribe((data) => {
        this.clientes = data;
      });
    }
  }

}
