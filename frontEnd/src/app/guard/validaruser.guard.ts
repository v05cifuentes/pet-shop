import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class validaruserGuard implements CanActivate {

  id_usuario: any;

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.id_usuario = sessionStorage.getItem('id_usuario');

      if(this.id_usuario == null || this.id_usuario==""){
        this.router.navigate(['login']);
        return false;
      }
      return true;
  }
}
