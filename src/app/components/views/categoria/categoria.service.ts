import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _sack: MatSnackBar) { }

  findAll():Observable<Categoria[]>{
    const url = `${this.baseUrl}/categorias`
    return this.http.get<Categoria[]>(url)
  }

  findById(id: number): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias/${id}`
    return this.http.get<Categoria>(url)
  }

  create(categoria: Categoria): Observable<Categoria>{
    const url = `${this.baseUrl}/categorias`
    return this.http.post<Categoria>(url, categoria);
  }

  delete(id: number): Observable<void>{
    const url = `${this.baseUrl}/categorias/${id}`
    return this.http.delete<void>(url);
  }


  mensagem(str: String): void {
    this._sack.open(`${str}`, `OK`, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }


}
