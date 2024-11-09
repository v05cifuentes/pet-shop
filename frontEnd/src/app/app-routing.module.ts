import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { CitasComponent } from './components/citas/citas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MascotasComponent } from './components/mascotas/mascotas.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { LoginComponent } from './components/login/login.component';
import { validaruserGuard } from './guard/validaruser.guard';

const routes: Routes = [

  {
    path: '', component: NavbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [validaruserGuard]},
      { path: 'facturas', component: FacturasComponent, canActivate: [validaruserGuard]},
      { path: 'productos', component: ProductosComponent, canActivate: [validaruserGuard]},
      { path: 'empleados', component: EmpleadosComponent, canActivate: [validaruserGuard]},
      { path: 'citas', component: CitasComponent, canActivate: [validaruserGuard]},
      { path: 'clientes', component: ClientesComponent, canActivate: [validaruserGuard]},
      { path: 'mascotas', component: MascotasComponent, canActivate: [validaruserGuard]},
      { path: 'servicios', component: ServiciosComponent, canActivate: [validaruserGuard]},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },

  {
    path: 'login', component: LoginComponent
  },

    { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
