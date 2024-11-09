import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre: string = '';
  rol: string = '';

  mostrarMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('nombre') || '';
    this.rol = sessionStorage.getItem('rol') || '';

  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  cerrar() {
    sessionStorage.setItem('id_usuario', "");
    sessionStorage.setItem('nombre', "");
    sessionStorage.setItem('direccion', "");
    sessionStorage.setItem('celular', "");
    sessionStorage.setItem('identificacion', "");
    sessionStorage.setItem('email', "");
    sessionStorage.setItem('rol', "");
    this.router.navigate(['login']);
  }
}
