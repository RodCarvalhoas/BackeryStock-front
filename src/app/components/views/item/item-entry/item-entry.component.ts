import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {

  id_cat?: number = undefined;
  quantidade: number = 0;

  item: Item = {
    name: ``,
    quantidade: undefined,
    valorUn: undefined,
    unMedida: ``,
    total: 0
  }

  constructor(private service: ItemService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    const idItem = this.route.snapshot.paramMap.get("id");
    const idParam = this.route.snapshot.paramMap.get('id_cat');
    if (idParam !== null) {
      this.id_cat = +idParam; // Converte para número
    }

    if (idItem !== null) {
      this.item.id = +idItem; // Converte para número
    }
    this.findById()
  }

  findById(): void{
    this.service.findById(this.item.id!).subscribe((resposta) => {
      this.item = resposta;
    })
  }

  entry(): void{
    const quantidadeObj = { quantidade: this.quantidade }; // Criar o objeto JSON com o campo 'quantidade'

    this.service.entry(this.item.id!, quantidadeObj, this.item).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/item`])
      this.service.mensagem('Entrada do item realizada com sucesso!');
    }, err => {
      this.service.mensagem(err.error.error);
    });
  }
  
  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/item`])
  }
}