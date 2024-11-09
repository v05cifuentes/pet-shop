import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//external modules
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';

// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CitasComponent } from './components/citas/citas.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalCitaComponent } from './components/modales/modal-cita/modal-cita.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomCurrencyPipe } from './services/custom-currency.pipe';
import { ModalServiciosComponent } from './components/modales/modal-servicios/modal-servicios.component';
import { ModalProductoComponent } from './components/modales/modal-producto/modal-producto.component';
import { ModalEmpleadoComponent } from './components/modales/modal-empleado/modal-empleado.component';
import { ModalMascotaComponent } from './components/modales/modal-mascota/modal-mascota.component';
import { ModalClienteComponent } from './components/modales/modal-cliente/modal-cliente.component';
import { ModalFacturaComponent } from './components/modales/modal-factura/modal-factura.component';
import { LoginComponent } from './components/login/login.component';
import { ModalDetalleMascotaComponent } from './components/modales/modal-detalle-mascota/modal-detalle-mascota.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientesComponent,
    CitasComponent,
    EmpleadosComponent,
    FacturasComponent,
    ProductosComponent,
    MascotasComponent,
    ServiciosComponent,
    DashboardComponent,
    ModalCitaComponent,
    CustomCurrencyPipe,
    ModalServiciosComponent,
    ModalProductoComponent,
    ModalEmpleadoComponent,
    ModalMascotaComponent,
    ModalClienteComponent,
    ModalFacturaComponent,
    LoginComponent,
    ModalDetalleMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCheckboxModule,
    MatMenuModule,
    RecaptchaV3Module
  ],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: '6LcVuL4pAAAAAMdwbtAl0AsTMWPCIfT-osgRx9ME',
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
