import { Component } from '@angular/core';
import { Factura } from 'src/app/models/factura.model';
import { FacturasService } from 'src/app/services/facturas.service';
import { ModalFacturaComponent } from '../modales/modal-factura/modal-factura.component';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  facturas: Factura[] = [];

  displayedColumns: string[] = [ 'id_factura', 'nombre', 'fecha_emision', 'total', 'estado_pago', 'acciones'];

  constructor(
    private readonly facturasService: FacturasService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarFacturas();
  }

  listarFacturas(): void {
    this.facturasService.listarFacturas().subscribe((data) => {
      this.facturas = data;
    });
  }

  agregarNuevaFactura(): void {
    const dialogRef = this.dialog.open(ModalFacturaComponent, {
      width: '500px',
    });
  }

  editarFactura(factura: Factura, id_factura: number): void {
    const dialogRef = this.dialog.open(ModalFacturaComponent, {
      width: '500px',
      data: { factura, id_factura }
    });
  }

  eliminarFactura(id_factura: number): void {
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
        this.eliminarFacturaConfirmado(id_factura);
        swal.fire(
          'Eliminado!',
          'La factura ha sido eliminada.',
          'success'
        );
      }
    });
  }

  eliminarFacturaConfirmado(id_factura: number): void {
    this.facturasService.eliminarFactura(id_factura).subscribe(() => {
      this.listarFacturas();
    });
  }
}
