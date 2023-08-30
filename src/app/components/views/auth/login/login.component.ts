import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationDTO } from '../authentticationDTO';
import { usuarioService } from '../usuario.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from '../usuario.model';

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

  constructor(private service: usuarioService, private router: Router, private route: ActivatedRoute){}
  
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
              console.error('Erro ao efetuar login:', error);
              this.service.isAuthenticatedEmitter.emit(false)
            }
          );
       
    } else {
      console.log('Por favor, preencha o nome de usuário e senha.');
    }
  }
}