import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { AuthenticationDTO } from './authentticationDTO';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  baseUrl: String = environment.baseUrl;

  private usuarioAuth: boolean = false;

  isAuthenticatedEmitter = new EventEmitter<boolean>();
  

  constructor(private http: HttpClient) { }

  login(usuario: AuthenticationDTO): Observable<any>{
    const url = `${this.baseUrl}/auth/login`
    this.usuarioAuth = true;
    this.isAuthenticatedEmitter.emit(true);
    return this.http.post(url, usuario);
  }

  usuarioAutenticado(){
    return this.usuarioAuth;
  }

}
 