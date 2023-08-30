import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';
import { AuthenticationDTO } from './authentticationDTO';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {

  baseUrl: String = environment.baseUrl;

  private usuarioAuth: boolean = false;

  isAuthenticatedEmitter = new EventEmitter<boolean>();
  

  constructor(private http: HttpClient, private _sack: MatSnackBar) { }

  login(usuario: AuthenticationDTO): Observable<any>{
    const url = `${this.baseUrl}/auth/login`
    this.usuarioAuth = true;
    this.isAuthenticatedEmitter.emit(true);
    return this.http.post(url, usuario);
  }

  usuarioAutenticado(){
    return this.usuarioAuth;
  }

  findall(): Observable<Usuario[]>{
    const url = `${this.baseUrl}/Usuario`
    return this.http.get<Usuario[]>(url);
  }

  findById(id: number): Observable<Usuario>{
    const url = `${this.baseUrl}/Usuario/${id}`
    return this.http.get<Usuario>(url);
  }

  update(id: number, usuario: Usuario): Observable<Usuario>{
    const url = `${this.baseUrl}/Usuario/${id}`
    return this.http.put<Usuario>(url, usuario);
  }

  mensagem(str: String): void {
    this._sack.open(`${str}`, `OK`, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}
 