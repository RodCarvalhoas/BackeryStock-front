import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, CanActivateChildFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CategoriaGuard implements CanActivateChild {
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
        console.log('guarda de rota filha')
        return true;
    }
}