import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { Item } from './item.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _sack: MatSnackBar) { }

  findAllByCategoria(id_cat: number): Observable<Item[]>{
    const url = `${this.baseUrl}/item?categoria_id=${id_cat}`
    return this.http.get<Item[]>(url)
  }

  findById(id: number): Observable<Item>{
    const url = `${this.baseUrl}/item/${id}`
    return this.http.get<Item>(url);
  }

  create(id_cat: number, item: Item): Observable<Item>{
    const url = `${this.baseUrl}/item?categoria_id=${id_cat}`
    return this.http.post<Item>(url, item);
  }

  deleteById(id: number): Observable<void>{
    const url = `${this.baseUrl}/item/${id}`
    return this.http.delete<void>(url);
  }
  
  update(id: number,id_cat: number, item: Item): Observable<Item>{
    const url = `${this.baseUrl}/item/${id}?categoria_id=${id_cat}`
    return this.http.put<Item>(url, item);
  }

  output(id: number, quantidadeObj: any, item: Item): Observable<Item>{
    const url = `${this.baseUrl}/item/${id}/item-output`
    return this.http.patch<Item>(url, quantidadeObj);
  }
  
  entry(id: number, quantidade: any, item: Item): Observable<Item>{
    const url = `${this.baseUrl}/item/${id}/entry-item`
    return this.http.patch<Item>(url, quantidade);
  }

  mensagem(str: String): void {
    this._sack.open(`${str}`, `OK`, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

}
