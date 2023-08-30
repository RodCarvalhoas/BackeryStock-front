import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { usuarioService } from '../views/auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuarioService: usuarioService,private router: Router, private _sack: MatSnackBar) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const userRole = localStorage.getItem('role'); // Ou de onde quer que você tenha armazenado o papel do usuário
    console.log('Papel do Usuário:', userRole);
    if (userRole === 'admin') {
      this.verificarAcesso()
      return true;
    } else {
      this.mensagem("Usuário não possui permissões de Administrador!")
      return this.router.parseUrl('/categorias');
    }
  }

  private verificarAcesso(){
    if(this.usuarioService.usuarioAutenticado()){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
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
