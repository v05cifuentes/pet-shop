import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css']
})
export class ModalProductoComponent {

  //Variable para controlar si estamos editando
  editando = false;

  obj_producto = {
    nombre_producto: '',
    descripcion: '',
    cantidad_stock: 0,
    precio_unitario: 0,
  };

  mostrarErrorNombre = false;
  mostrarErrorDescripcion = false;
  mostrarErrorCantidad = false;
  mostrarErrorPrecio = false;

  constructor(
    private readonly productosService: InventarioService,
    private readonly dialogRef: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.producto) {
      this.obj_producto.nombre_producto = data.producto.nombre_producto;
      this.obj_producto.descripcion = data.producto.descripcion;
      this.obj_producto.cantidad_stock = data.producto.cantidad_stock;
      this.obj_producto.precio_unitario = data.producto.precio_unitario;
      this.editando = true;
    }
   }

  obtenerTextoBoton(): string {
    return this.editando ? 'Editar Producto' : 'Guardar Producto';
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

  validarFormulario(): void {
    if(this.obj_producto.nombre_producto === '') {
      this.mostrarErrorNombre = true;
    } else {
      this.mostrarErrorNombre = false;
    }

    if(this.obj_producto.descripcion === '') {
      this.mostrarErrorDescripcion = true;
    } else {
      this.mostrarErrorDescripcion = false;
    }

    if(this.obj_producto.cantidad_stock === 0) {
      this.mostrarErrorCantidad = true;
    } else {
      this.mostrarErrorCantidad = false;
    }

    if(this.obj_producto.precio_unitario === 0) {
      this.mostrarErrorPrecio = true;
    } else {
      this.mostrarErrorPrecio = false;
    }

    if(!this.mostrarErrorNombre && !this.mostrarErrorDescripcion && !this.mostrarErrorCantidad && !this.mostrarErrorPrecio) {
      this.guardar();
    }
  }

  guardar(): void {
    this.productosService.insertarProducto(this.obj_producto).subscribe(res => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }

  editar(): void {
    this.productosService.editarProducto(this.data.id, this.obj_producto).subscribe(res => {
      if(res.resultado === 'OK') {
        this.closeModal();
        alert(res.mensaje);
      }
    });
  }
}
