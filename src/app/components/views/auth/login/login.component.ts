import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationDTO } from '../authentticationDTO';
import { usuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  usuario: AuthenticationDTO ={
    name: ``,
    password: ''
  }

 

  constructor(private service: usuarioService, private router: Router){}
  
  ngOnInit(): void {
  }

  login(): void {
    if (this.usuario.name && this.usuario.password) {
      this.service.login(this.usuario).subscribe(
        (response) => {
          this.service.isAuthenticatedEmitter.emit(true)
          localStorage.setItem('token', response.token); // Armazenar o token JWT
          this.router.navigate(['categorias']); // Redirecionar após o login bem-sucedido
        },
        (error) => {
          console.error('Erro ao efetuar login:', error);
          // Tratar erros de autenticação aqui, se necessário
          this.service.isAuthenticatedEmitter.emit(false)
        }
      );
    } else {
      console.log('Por favor, preencha o nome de usuário e senha.');

    }
  }

}