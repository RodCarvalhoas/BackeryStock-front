import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { usuarioService } from '../views/auth/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private usuarioService: usuarioService, private router: Router) { }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{

    console.log('AuthGuard');
    return this.verificarAcesso();
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
  }

