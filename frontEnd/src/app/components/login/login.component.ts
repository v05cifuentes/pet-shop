import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { LoginService } from 'src/app/services/login.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: any;
  clave: any;
  error: boolean = false;
  user: any;

  usuario = {
    nombre: '',
    direccion: '',
    celular: '',
    identificacion: '',
    email: '',
    rol: '',
    clave: '',
  }

  constructor(
  private loginService: LoginService,
  private router: Router,
  private recaptchaV3Service: ReCaptchaV3Service
  ) {  }

  ngOnInit(): void {
    sessionStorage.setItem('id_usuario', "");
    sessionStorage.setItem('nombre', "");
    sessionStorage.setItem('direccion', "");
    sessionStorage.setItem('celular', "");
    sessionStorage.setItem('identificacion', "");
    sessionStorage.setItem('email', "");
    sessionStorage.setItem('rol', "");
  }

  consulta(tecla: any, form: NgForm){
  if(tecla == '13' || tecla == ''){
    this.loginService.consultar(this.email, this.clave).subscribe((resultado: any) =>{
      this.user = resultado;
      if(this.user[0].validar == "valida"){
        sessionStorage.setItem('id_usuario', this.user[0]['id_usuario']);
        sessionStorage.setItem('nombre', this.user[0]['nombre']);
        sessionStorage.setItem('direccion', this.user[0]['direccion']);
        sessionStorage.setItem('celular', this.user[0]['celular']);
        sessionStorage.setItem('identificacion', this.user[0]['identificacion']);
        sessionStorage.setItem('email', this.user[0]['email']);
        sessionStorage.setItem('rol', this.user[0]['rol']);
        this.router.navigate(['/dashboard']);
        }else{
          this.error = true;
        }
      });
    }
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.recaptchaV3Service.execute('importantAction')
    .subscribe((token: string) => {
      this.handleToken(token);

    });
  }

  handleToken(token: string) {

  }

}
