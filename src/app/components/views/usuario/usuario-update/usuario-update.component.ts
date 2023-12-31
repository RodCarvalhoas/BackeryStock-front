import { Component } from '@angular/core';
import { Usuario } from '../usuario.model';
import { FormControl, Validators } from '@angular/forms';
import { usuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

enum Role {
  admin = 'ADMIN',
  user = 'USER'
}

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent {

//Validações
name = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
email = new FormControl("", [Validators.email]);
cpf = new FormControl("", [Validators.minLength(11), Validators.maxLength(11)]);
role = new FormControl("", [Validators.min(1)]);

usuario: Usuario = {
  id: undefined,
  name: ``,
  email: ``,
  cpf: ``,
  role: ``,
  password: ``
} 

senhaAntiga : string = ``;

constructor(private service: usuarioService, private route: ActivatedRoute, private router: Router){}

ngOnInit(): void {
  const idUsuario = this.route.snapshot.paramMap.get("id");

  if (idUsuario !== null) {
    this.usuario.id = +idUsuario; // Converte para número
  }

  this.findById()
  console.log(this.usuario.role)
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

findById(): void{
    this.service.findById(this.usuario.id!).subscribe((resposta) => {
      this.usuario = resposta;
    })
}

update(): void{
  if(this.senhaAntiga != null || this.senhaAntiga != ""){
    // Se uma nova senha foi fornecida, atualize a senha antiga
    this.usuario.password = this.senhaAntiga;
  }

  this.service.update(this.usuario.id!, this.usuario).subscribe((resposta) => {
    this.router.navigate([`usuarios`])
    this.service.mensagem('Usuario editado com sucesso!')
  }, err => {
    this.service.mensagem(err.error.error)
  })
}

cancel(): void{
  this.router.navigate([`usuarios`])
}



}
