import { Component } from '@angular/core';
import { Usuario } from '../usuario.model';
import { usuarioService } from '../usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-all',
  templateUrl: './usuario-all.component.html',
  styleUrls: ['./usuario-all.component.css']
})
export class UsuarioAllComponent {

  usuarios: Usuario[] = [];

  displayedColumns: string[] = ['id', 'name', 'email','cpf', 'role', 'acoes'];

  constructor(private service: usuarioService, private router: Router){}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findall().subscribe(resposta => {
      console.log('findAll')
      console.log(resposta);
      this.usuarios = resposta;
    })
  }

  navegarParaUsuarioCreate(){
    this.router.navigate(["usuarios/create"])
  }


}
