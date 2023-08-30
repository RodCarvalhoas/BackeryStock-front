import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { usuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

enum Role {
  admin = 'ADMIN',
  user = 'USER'
}

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent {

//Validações
name = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
email = new FormControl("", [Validators.email]);
cpf = new FormControl("", [Validators.minLength(11), Validators.maxLength(11)]);
role = new FormControl("", [Validators.min(1)]);

usuario: Usuario = {
  name: ``,
  email: ``,
  cpf: ``,
  role: ``,
  password: ``
} 


constructor(private service: usuarioService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {

}

roles: Role[] = [Role.admin, Role.user];
selectedRole: Role | undefined;

hasErrors(): boolean {
  return (
    this.name.invalid ||
    this.email.invalid ||
    this.cpf.invalid ||
    this.role.invalid
  );
}

//mensagens caso der erro
getMessage(fieldName: string): string {
  if (fieldName === 'name' && this.name.invalid) {
    return 'O campo NAME deve conter entre 3 e 100 caracteres';
  }
  
  if (fieldName === 'email' && this.email.invalid) {
    return 'O campo EMAIL deve conter um email válido';
  }
  
  if (fieldName === 'cpf' && this.cpf.invalid) {
    return 'O campo CPF é requerido';
  }
  
  if (fieldName === 'role' && this.role.invalid) {
    return 'O campo PERMISSÃO é requerido';
  }
  return '';
}

create(): void{
  this.service.create(this.usuario).subscribe((resposta) => {
    this.router.navigate([`usuarios`])
    this.service.mensagem('Usuário criado com sucesso!')
  }, err => {
    this.service.mensagem(err.error.error)
  })
}

cancel(): void{
  this.router.navigate([`usuarios`])
}

}
