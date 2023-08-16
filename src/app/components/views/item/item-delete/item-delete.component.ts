import { Component } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-delete',
  templateUrl: './item-delete.component.html',
  styleUrls: ['./item-delete.component.css']
})
export class ItemDeleteComponent {

  id_cat?: number = undefined;

  item: Item = {
    id: undefined,
    name: ``,
    quantidade: undefined,
    valorUn: undefined,
    unMedida: ``,
    total: 0
  }

  constructor(private service: ItemService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_cat');
    const idItem = this.route.snapshot.paramMap.get("id");
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

  deleteById(): void{
    this.service.deleteById(this.item.id!).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/item`])
      this.service.mensagem('Item deletado com sucesso!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/item`])
  }

}
