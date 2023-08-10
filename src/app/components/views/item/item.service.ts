import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _sack: MatSnackBar) { }

  findAllByCategoria(id_cat: number):Observable<Item[]>{
    const url = `${this.baseUrl}/item?categoria_id=${id_cat}`
    return this.http.get<Item[]>(url)
  }

}
