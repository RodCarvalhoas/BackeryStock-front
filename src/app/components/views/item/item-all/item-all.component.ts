import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-item-all',
  templateUrl: './item-all.component.html',
  styleUrls: ['./item-all.component.css']
})
export class ItemAllComponent implements OnInit{

  itens: Item[] = [];

  id_cat?: number = undefined;

  displayedColumns: string[] = ['id', 'name', 'quantidade','valorUn', 'unMedida', 'total', 'acoes'];

  constructor(private service: ItemService, private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_cat');
    if (idParam !== null) {
      this.id_cat = +idParam; // Converte para número
      this.findAllByCategoria()
    }
  }

  findAllByCategoria(): void{
    this.service.findAllByCategoria(this.id_cat!).subscribe((resposta) => {
      this.itens = resposta;
    })
  }

}
