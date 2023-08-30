import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationDTO } from '../../usuario/authentticationDTO';
import { usuarioService } from '../../usuario/usuario.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../../usuario/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  usuario: Usuario ={
    name: ``,
    email: ``,
    cpf: ``,
    role: ``,
    password: ''
  }

  constructor(private service: usuarioService, private router: Router, private route: ActivatedRoute, private _sack: MatSnackBar){}
  
  ngOnInit(): void {
  }


  login(): void {
    if (this.usuario.name && this.usuario.password) {
          this.service.login(this.usuario).subscribe(
            (response) => {
              this.service.isAuthenticatedEmitter.emit(true)
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.role)
              this.router.navigate(['/']);
            },
            (error) => {
              this.mensagem('Digite um Nome e senha válido.');
              this.service.isAuthenticatedEmitter.emit(false)
            }
          );
       
    } else {
      this.mensagem('Por favor, preencha o nome de usuário e senha.');
    }
  }

  mensagem(str: String): void {
    this._sack.open(`${str}`, `OK`, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}