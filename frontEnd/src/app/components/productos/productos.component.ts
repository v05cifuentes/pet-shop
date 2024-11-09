import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto.model';
import { InventarioService } from 'src/app/services/inventario.service';
import { ModalProductoComponent } from '../modales/modal-producto/modal-producto.component';
import swal from 'sweetalert2'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  nombreBuscado: string = '';

  productos: Producto[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'stock', 'precio c/u', 'acciones'];

  constructor(
    private readonly productosService: InventarioService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(): void {
    this.productosService.listarInventario().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarNuevoProducto(): void {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '500px',
    });
  }

  editarProducto(prducto: Producto, id: number): void {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '500px',
      data: { producto: prducto, id }
    });
  }

  eliminarProducto(id: number): void {
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
        this.eliminarProductoConfirmado(id);
        swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
      }
    })
  }

  eliminarProductoConfirmado(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.listarProductos();
    });
  }

  filtrarProductos(): void {
    if (this.nombreBuscado === '') {
      this.listarProductos();
      return;
    }else{
      this.productosService.filtrarPorNombre(this.nombreBuscado).subscribe((data) => {
        this.productos = data;
      });
    }
  }

}

